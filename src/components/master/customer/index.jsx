import React, { useEffect, useState } from "react";
import CustomerInformation from "./CustomerInformation";
import useFetch from "../../Hooks/useFetch";
import {
  useHistory,
  useLocation,
} from "react-router-dom/cjs/react-router-dom.min";
import ReactToast, { showToastError, showToastMessage } from "../../CustomComp/ReactToast";

const Customer = () => {
  const api = useFetch();
  let { state } = useLocation();

  const [inputValue, setInputValue] = useState({
    custname: "",
    archname: "",
    email: "",
    mobile: "",
    reference: "",
    add1: "",
    add2: "",
    add3: "",
    add4: "",
    archmobile: "",
    gst: "",
  });
  const [loading, setLoading] = useState(false);
  const [masterGrpData, setMasterGrpData] = useState([]);
  const [masterGroupSelect, setMasterGroupSelect] = useState(null);
  const [masterGroupLabel, setMasterGroupLabel] = useState(null);

  const selectHandler = (masterGroupSelect) => {
    setMasterGroupSelect(masterGroupSelect);
    setMasterGroupLabel(masterGroupSelect.label);

    //  console.log("label",masterGroupSelect.label)
  };

  const handleInputField = (e) => {
    const { name, value } = e.target;
    setInputValue((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const {
    custname,
    archname,
    email,
    mobile,
    reference,
    gst,
    archmobile,
    add1,
    add2,
    add3,
    add4,
  } = inputValue;

  const saveHandler = async (e) => {
    e.preventDefault();
    if (state && state.code) {
      var code = state.code;
    }

    const urlCustomer = "/api/SaveCustomerMaster";
    // console.log('codeUsers', code)
    var body = {
      CustomerMasterData: [
        {
          Code: code || 0,
          Name: custname,
          MobNo: mobile,
          Email: email,
          Ref: reference,
          ArchName: archname,
          Add1: add1,
          Add2: add2,
          Add3: add3,
          Add4: add4,
          ArchMobNo: archmobile,
          GSTNo: gst,
          MasterGrp: `${masterGroupLabel}`,
          UserName: custname,
        },
      ],
    };
    console.log("bodyjson", body);
    try {
      setLoading(true);
      let { res, got } = await api(urlCustomer, "POST", body);
      if (res.status == 200) {
        console.log("maindata", body);
        showToastMessage(got.msg);
        setInputValue({
          custname: "",
          archname: "",
          email: "",
          mobile: "",
          reference: "",
          add1: "",
          add2: "",
          add3: "",
          add4: "",
          archmobile: "",
          gst: "",
        });
        if(code !== 0 && code != undefined){
          history.push('/modify/2')
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

  // ======================masterGroup List===================
  const getMasterGrpHandler = async () => {
    var correctData = [];

    let modifyUrl = `/api/LoadMasterData?MasterType=3`;
    try {
      setLoading(true);
      let { res, got } = await api(modifyUrl, "GET", "");
      if (res.status == 200) {
        let listData = got.data;
        console.log("CustomerModify", listData);
        listData.forEach((item) => {
          correctData.push({ value: item.code, label: item.name });
        });
        //  console.log('modifyData', correctData)
        setMasterGrpData(correctData);
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

  const getModifyHandler = async () => {
    var code = state.code;

    // setLoader(true);
    let modifyUrl = `/api/LoadCustomerMasterDetails?Code=${code}&MobNo=""`;
    try {
      setLoading(true);
      let { res, got } = await api(modifyUrl, "GET", "");
      if (res.status == 200) {
        console.log("data", got.data);
        let listData = got.data[0];
        // setModifiedValue(listData);
        setInputValue({
          custname: listData.name,
          mobile: listData.mobNo,
          email: listData.email,
          reference: listData.ref,
          add1: listData.add1,
          add2: listData.add2,
          add3: listData.add3,
          add4: listData.add4,
          archname: listData.archName,
          custname: listData.name,
          archmobile: listData.archMobNo,
          gst: listData.gstNo,
        });
        setMasterGroupSelect({ label: listData.masterGrp });
        setMasterGroupLabel(listData.masterGrp);
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

  useEffect(() => {
    getMasterGrpHandler();
    if (state && state.code) {
      getModifyHandler();
    }
  }, [state]);

  return (
    <>
    <ReactToast/>
      <CustomerInformation
        handleInputField={handleInputField}
        saveHandler={saveHandler}
        loading={loading}
        inputValue={inputValue}
        masterGrpData={masterGrpData}
        selectHandler={selectHandler}
        masterGroupSelect={masterGroupSelect}
      />
    </>
  );
};
export default Customer;
