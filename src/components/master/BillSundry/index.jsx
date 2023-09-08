import React from "react";
import AddBillSundry from "./AddBillSundry";
import useFetch from "../../Hooks/useFetch";
import ReactToast, {
  showToastMessage,
  showToastError,
} from "../../CustomComp/ReactToast";
import { useHistory, useLocation } from "react-router-dom/cjs/react-router-dom.min";
const sundryType = [
  { value: 1, label: "Additive" },
  { value: 2, label: "Substractive" },
];
const Feed = [
  { value: 1, label: "Percentage (%)" },
  { value: 2, label: "Amount" },
];

const BillsundryComp = () => {
  const userData = sessionStorage.getItem("userData");
  if (userData != null) {
    var username = JSON.parse(userData).Admin;
    // console.log("+++", username);
  }
  let api = useFetch();
  const { state } = useLocation();
  const history = useHistory()
  const [inputValues, setInputValues] = React.useState({
    name: "",
    userName: "",
    sunderType: "",
    value: "",
    feedas: "",
  });
  const [selectedValues, setSelectedValues] = React.useState({
    select1: null,
    select2: null,
  });
  const [loading, setLoading] = React.useState(false);
  const [billsundryCode, setBillSundryCode] = React.useState(0);
  const [feedAsCode, setFeedAsCode] = React.useState(0);

//   ----------inputField Handler--------------------

  const { name, value } = inputValues;

  const handleInputField = (e) => {
    const { name, value } = e.target;
    setInputValues((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  //  ------for select Handler--------------------------//
  const handleSelectChange = (
    selectedOption,
    selectName,
    setSelectedValues
  ) => {
    // console.log(`Selected value for ${selectName}:`, selectedOption);

    {
      selectName == "select1"
        ? setBillSundryCode(selectedOption.value)
        : selectName == "select2"
        ? setFeedAsCode(selectedOption.value)
        : null;
    }

    setSelectedValues((prevSelectedValues) => ({
      ...prevSelectedValues,
      [selectName]: selectedOption,
    }));
  };

  //   ------------save Handler----------------

  const saveHandler = async (e) => {
    e.preventDefault();
    if (state) {
      if (state && state.code) {
        var code = state.code;
        var path = state.path;
      }
    }

    const urlCreateUser = "/api/BillSundarySave";
    // console.log('codeUsers', code)
    var body = {
      Code: code || 0,
      Name: name,
      BSType: billsundryCode,
      Value: parseFloat(value),
      FeedAs: feedAsCode,
      UserName: username,
    };
    console.log("body", body);
    try {
      setLoading(true);
      let { res, got } = await api(urlCreateUser, "POST", body);
      if (res.status == 200) {
        console.log("maindata", body);
        // alert(got.msg);
        showToastMessage(got.msg);
        setInputValues({
          name: "",
          value: "",
        });
        setSelectedValues({
          select1: null,
          select2: null,
        });

        if(code !== 0 && code != undefined){
          history.push('/list/7')
        }
        setLoading(false);
      } else {
        setLoading(false);
        showToastError(got.msg);
      }
    } catch (error) {
      setLoading(false);
      showToastError(error);
    }
  };

  const getModifyHandler = async () => {
    var code = state.code;

    // setLoader(true);
    let modifyUrl = `/api/BillSundaryDetails?Code=${code}`;
    try {
      setLoading(true);
      let { res, got } = await api(modifyUrl, "GET", "");
      if (res.status == 200) {
        // console.log("data", got.data);
        let listData = got.data[0];
        setInputValues({
          name: listData.name,
          value: listData.value,
          userName: listData.userName,
        });
        setSelectedValues({
          select1: { label: listData.bsTypeName },
          select2: { label: listData.feedAsName },
        });
        setBillSundryCode(listData.bsType);
        setFeedAsCode(listData.feedAs);
        setLoading(false);
      } else {
        setLoading(false);
        showToastError("Something Went Wrong in List loading");
      }
    } catch (err) {
      setLoading(false);
      showToastError(err);
    }
  };

  React.useEffect(() => {
    if (state && state.code) {
      getModifyHandler();
    }
  }, [state]);

  return (
    <>
      <ReactToast />
      <AddBillSundry
        sundryType={sundryType}
        Feed={Feed}
        inputValues={inputValues}
        handleInputField={handleInputField}
        handleSelectChange={handleSelectChange}
        selectedValues={selectedValues}
        setSelectedValues={setSelectedValues}
        loading={loading}
        saveHandler={saveHandler}
      />
    </>
  );
};

export default BillsundryComp;
