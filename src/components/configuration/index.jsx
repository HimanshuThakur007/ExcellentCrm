import React, { useState } from "react";
import PageHeader from "../CustomComp/PageHeader";
import useFetch from "../Hooks/useFetch";
import ReactLoader from "../CommonFile/ReactLoader";
import PageHelmet from "../CustomComp/PageHelmet";
import SubmitButton from "../CustomComp/SubmitButton";
import InputField from "../CustomComp/InputField";

const Configuration = () => {
  let api = useFetch();
  const [assignData, setAssignData] = useState(false);
  const [autoLeadAssign, setAutoLeadAssign] = useState(false);
  const [loading, setLoading] = useState(false);
  const [inputValue, setInputValue] = useState({
    fyear: "",
    prefix: "",
    compCode: "",
    seriesName: "",
    seriesPrefix: "",
    busyUrl: "",
  });

  let bool = assignData;
  let boo1 = autoLeadAssign;
  let generateNumber = Number(bool);
  let generateAutoLeadAssign = Number(boo1);
  // console.log("booollll", generateNumber);
  const checkHandler = (e) => {
    setAssignData(e.target.checked);
  };
  const autoLeadAssignHandler = (e) => {
    setAutoLeadAssign(e.target.checked);
  };

  const handleInputField = (e) => {
    const { name, value } = e.target;
    setInputValue((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const { fyear, prefix, compCode, seriesName, seriesPrefix, busyUrl } =
    inputValue;

  const saveHandler = async (e) => {
    e.preventDefault();
    // if (state) {
    //   if (state && state.code) {
    //     var code = state.code;
    //   }
    // }

    const urlCreateUser = "/api/ConfigurationSave";
    // console.log('codeUsers', code)
    var body = {
      LAA: generateNumber,
      AutoLeadAssign: generateAutoLeadAssign,
      FY: parseInt(fyear) || 0,
      PER: prefix,
      CompCode: compCode,
      SOQSeries: seriesName,
      SOQSeriesPre: seriesPrefix,
      SQURL: busyUrl,
    };
    // console.log("body", body);
    try {
      let { res, got } = await api(urlCreateUser, "POST", body);
      if (res.status == 200) {
        // console.log("maindata", body);
        alert(got.msg);
        setInputValue({
          fyear: "",
          prefix: "",
          compCode: "",
          seriesName: "",
          seriesPrefix: "",
          busyUrl: "",
        });
        // setAssignData('')
        loadConfigList();
      } else {
        alert(got.msg);
      }
    } catch (error) {
      alert(error);
    }
  };

  const loadConfigList = async () => {
    let Url = `/api/Loadconfiguration`;
    try {
      setLoading(true);
      let { res, got } = await api(Url, "GET", "");
      if (res.status == 200) {
        let listData = got.data[0];
        console.log("ConfigloadData", listData);
        setInputValue({
          fyear: listData.fy,
          prefix: listData.per,
          compCode: listData.compCode,
          seriesName: listData.soqSeries,
          seriesPrefix: listData.soqSeriesPre,
          busyUrl: listData.squrl,
        });
        let compCode = listData.compCode;
        sessionStorage.setItem("compCode", JSON.stringify({ compCode }));
        setAssignData(listData.laa);
        setAutoLeadAssign(listData.autoLeadAssign);

        // setConfigList(correctData);
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

  React.useEffect(() => {
    loadConfigList();
  }, []);

  return (
    <div className="page-wrapper">
      <PageHelmet
        helmetTitle="Configuration - S&S Enterprises"
        helmetName="description"
        helmetContent="Configuration Page"
      />
      {loading ? (
        <ReactLoader loaderClass="position-absolute" loading={loading} />
      ) : null}
      <div className="content container-fluid">
        {/* Page Header */}
        <PageHeader
          iclassName="fa fa-object-group"
          pageTitle="CRM Configuration"
          disableTitle="Configuration"
        />

        {/* /Page Header */}

        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-header">
                <h4 className="card-title mb-0">Configuration</h4>
              </div>
              <div className="card-body">
                <h4 className="card-title"></h4>
                <form onSubmit={saveHandler}>
                  <div className="row">
                    {/* <div className="col-xl-6"> */}
                    <div className="form-group row">
                      {/* <div className="selectBox-cont"> */}
                      <label className="custom_check w-50 m-2">
                        <input
                          type="checkbox"
                          name="assign"
                          onChange={checkHandler}
                          checked={assignData}
                        />
                        <span className="checkmark" /> Auto Assign
                      </label>
                    </div>
                    <div className="form-group row">
                      {/* <div className="selectBox-cont"> */}
                      <label className="custom_check w-50 m-2">
                        <input
                          type="checkbox"
                          name="leadAssign"
                          onChange={autoLeadAssignHandler}
                          checked={autoLeadAssign}
                        />
                        <span className="checkmark" />
                        Auto Lead Assign
                      </label>
                    </div>
                    <div className="col-xl-6">
                      <InputField
                        type="number"
                        name="fyear"
                        labelName="Financial Year"
                        value={fyear}
                        onChange={handleInputField}
                        required
                      />
                      <InputField
                        type="text"
                        name="compCode"
                        labelName="Item CompCode"
                        value={compCode}
                        onChange={handleInputField}
                        required
                      />
                      <InputField
                        type="text"
                        name="seriesName"
                        labelName="Series Name"
                        value={seriesName}
                        onChange={handleInputField}
                        required
                      />
                    </div>

                    <div className="col-xl-6">
                      <InputField
                        type="text"
                        name="prefix"
                        labelName="Prefix"
                        value={prefix}
                        onChange={handleInputField}
                        required
                      />
                      <InputField
                        type="text"
                        name="seriesPrefix"
                        labelName="Series Prefix"
                        value={seriesPrefix}
                        onChange={handleInputField}
                        required
                      />
                      <InputField
                        type="text"
                        name="busyUrl"
                        labelName="BusyApiUrl"
                        value={busyUrl}
                        onChange={handleInputField}
                        required
                      />
                    </div>
                  </div>
                  <SubmitButton parentClass="text-end" btnName="Submit" />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Configuration;
