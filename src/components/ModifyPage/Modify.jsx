import React, { useEffect, useState } from "react";
import PageHelmet from "../CustomComp/PageHelmet";
import { Link } from "react-router-dom";
import {
  useHistory,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";
import Select from "react-select";
import useFetch from "../Hooks/useFetch";
import ReactLoader from "../CommonFile/ReactLoader";
import InputSelect from "../CustomComp/InputSelect";
import SubmitButton from "../CustomComp/SubmitButton";
import PageHeader from "../CustomComp/PageHeader";

const Modify = (props) => {
  const history = useHistory();
  var api = useFetch();
  const { location } = props;
  var path = props.location.pathname;

  const routeParams = useParams();
  // console.log('params', routeParams)

  const [selectedOption, setSelectedOption] = useState(null);
  const [modifyCode, setModifyCode] = useState(null);
  const [modifyList, setModifyList] = useState([]);
  const [loading, setLoading] = useState(false);

  const selectHandler = (selectedOption) => {
    setSelectedOption(selectedOption);
    setModifyCode(selectedOption.value);

    console.log("label", selectedOption.label);
    console.log("value", selectedOption.value);
  };

  // ------------------userCreation--------------

  const getModifyList = async () => {
    var correctData = [];
    // setLoader(true);
    let modifyUrl = `/api/LoadUserMasterList`;
    try {
      setLoading(true);
      let { res, got } = await api(modifyUrl, "GET", "");
      if (res.status == 200) {
        console.log("datass", got.data);
        let listData = got.data;
        listData.forEach((item) => {
          correctData.push({ value: item.code, label: item.name });
        });
        console.log("modifyData", correctData);
        setModifyList(correctData);
        setLoading(false);
      } else {
        setLoading(false);
        alert("Something Went Wrong in List loading");
      }
    } catch (err) {
      setLoading(false);
      alert(err);
    }
  };

  // -------------------customerInformation-------------------------------
  const getCustomerModifyList = async () => {
    var correctData = [];
    let modifyUrl = `/api/LoadCustomerMasterList`;
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
        setModifyList(correctData);
        setLoading(false);
      } else {
        setLoading(false);
        alert("Something Went Wrong in List loading");
      }
    } catch (err) {
      setLoading(false);
      alert(err);
    }
  };
  //   ----------------------------------Departement----------------------------------------

  const getDepartementModifyList = async () => {
    var correctData = [];
    let Url = `/api/LoadDepMasterList`;
    try {
      setLoading(true);
      let { res, got } = await api(Url, "GET", "");
      if (res.status == 200) {
        console.log("data", got.data);
        let listData = got.data;
        listData.forEach((item) => {
          correctData.push({ value: item.code, label: item.name });
        });
        console.log("modifyData", correctData);
        setModifyList(correctData);
        setLoading(false);
      } else {
        setLoading(false);
        alert("Something Went Wrong in List loading");
      }
    } catch (err) {
      setLoading(false);
      alert(err);
    }
  };

  // ----------------purposeModify--------------
  const getPurposeModifyList = async () => {
    var correctData = [];
    // setLoader(true);
    let modifyUrl = `/api/LoadMasterData?MasterType=6`;
    try {
      setLoading(true);
      let { res, got } = await api(modifyUrl, "GET", "");
      if (res.status == 200) {
        console.log("datass", got.data);
        let listData = got.data;
        listData.forEach((item) => {
          correctData.push({ value: item.code, label: item.name });
        });
        console.log("modifyData", correctData);
        setModifyList(correctData);
        setLoading(false);
      } else {
        setLoading(false);
        alert("Something Went Wrong in List loading");
      }
    } catch (err) {
      setLoading(false);
      alert(err);
    }
  };
  // -----------------------businessNature------------------------------------------------
  const getBusinessPurposeModifyList = async () => {
    var correctData = [];
    // setLoader(true);
    let modifyUrl = `/api/LoadMasterData?MasterType=60`;
    try {
      setLoading(true);
      let { res, got } = await api(modifyUrl, "GET", "");
      if (res.status == 200) {
        console.log("datass", got.data);
        let listData = got.data;
        listData.forEach((item) => {
          correctData.push({ value: item.code, label: item.name });
        });
        console.log("modifyData", correctData);
        setModifyList(correctData);
        setLoading(false);
      } else {
        setLoading(false);
        alert("Something Went Wrong in List loading");
      }
    } catch (err) {
      setLoading(false);
      alert(err);
    }
  };
  // -----------------------Contractor------------------------------------------------
  const getContractorModifyList = async () => {
    var correctData = [];
    // setLoader(true);
    let modifyUrl = `/api/ArchMasterList`;
    try {
      setLoading(true);
      let { res, got } = await api(modifyUrl, "GET", "");
      if (res.status == 200) {
        console.log("datass", got.data);
        let listData = got.data;
        listData.forEach((item) => {
          correctData.push({ value: item.code, label: item.name });
        });
        console.log("modifyData", correctData);
        setModifyList(correctData);
        setLoading(false);
      } else {
        setLoading(false);
        alert("Something Went Wrong in List loading");
      }
    } catch (err) {
      setLoading(false);
      alert(err);
    }
  };

  // --------------------------------------------------------------------------------------

  const modifyHandler = () => {
    switch (routeParams.id) {
      case "1":
        history.push({
          pathname: "/ursecreation",
          state: { code: modifyCode, path: path },
        });
        break;
      case "2":
        history.push({ pathname: "/customer", state: { code: modifyCode } });
        break;
      case "3":
        history.push({ pathname: "/department", state: { code: modifyCode } });
        break;
      case "4":
        history.push({ pathname: "/purpose", state: { code: modifyCode } });
        break;
      case "5":
        history.push({ pathname: "/architect", state: { code: modifyCode } });
        break;
      case "6":
        history.push({ pathname: "/businessnature", state: { code: modifyCode } });
        break;
      default:
    }
  };

  useEffect(() => {
    switch (routeParams.id) {
      case "1":
        getModifyList();
        break;
      case "2":
        getCustomerModifyList();
        break;
      case "3":
        getDepartementModifyList();
        break;
      case "4":
        getPurposeModifyList();
        break;
      case "5":
        getContractorModifyList();
        break;
      case "6":
        getBusinessPurposeModifyList();
        break;
      default:
    }
  }, [routeParams.id]);
  return (
    <div className="page-wrapper">
      <PageHelmet
        helmetTitle="Modify - S&S Enterprises"
        helmetName="description"
        helmetContent="Modify Page"
      />
      {loading ? (
        <ReactLoader loaderClass="position-absolute" loading={loading} />
      ) : null}
      <div className="content container-fluid">
        {/* Page Header */}
        <PageHeader
          iclassName="fa fa-object-group"
          pageTitle="Modify"
          disableTitle="Modify"
        />
        {/* /Page Header */}

        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-header">
                <h4 className="card-title mb-0">Modify Form</h4>
              </div>
              <div className="card-body">
                <h4 className="card-title">Modify</h4>
                <form action="#">
                  <div className="row">
                    <div className="col-xl-10">
                      <InputSelect
                        labelClass="col-lg-2"
                        selectName="Modify"
                        selectClass="col-lg-10"
                        name="modify"
                        placeholder="Modify User"
                        value={selectedOption}
                        onChange={selectHandler}
                        options={modifyList}
                        required
                      />
                    </div>
                    <div className="col-xl-2">

                  <SubmitButton
                    parentClass="text-center"
                    onClick={modifyHandler}
                    btnName="Modify Data"
                  />
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modify;
