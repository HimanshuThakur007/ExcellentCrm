import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import Select from "react-select";
import useFetch from "../Hooks/useFetch";
import ReactLoader from "../CommonFile/ReactLoader";

const Configuration = () => {
  let api = useFetch()
  const [assignData, setAssignData] = useState(false)
  const [loading, setLoading] = useState(false)
  const [inputValue, setInputValue] = useState({

  })

  let  bool = assignData;
  let generateNumber = Number(bool);
  console.log('booollll',generateNumber)
  const checkHandler = (e)=>{
      setAssignData(e.target.checked)
     
  }

  const handleInputField = (e) => {
    const { name, value } = e.target;
    setInputValue((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const { fyear, prefix} = inputValue

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
      LAA : generateNumber,
      FY : parseInt(fyear),
      PER : prefix
      
    };
    console.log("body", body);
    try {
      let { res, got } = await api(urlCreateUser, "POST", body);
      if (res.status == 200) {
        // console.log("maindata", body);
        alert(got.msg);
        // setInputValue({
        //   fyear:'',
        //   prefix:''
        // })
        // setAssignData('')
       
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
        console.log('loadData',listData)
        setInputValue({
          fyear:listData.fy,
          prefix:listData.per
        })
        setAssignData(listData.laa)
       
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

  React.useEffect(()=>{
    loadConfigList()
  },[])

  return (
    <div className="page-wrapper">
    <Helmet>
      <title>Configuration - S&S Enterprises</title>
      <meta name="description" content="Login page" />
    </Helmet>
    {loading ?
         <> 
          <div className="loader-box" style={{height:'100vh'}}>
        <div className="position-absolute" style={{marginLeft:'0%',marginTop:'0%'}}>
          <ReactLoader loading={loading}  />
        </div>
        </div>
        </>
        : null}
    <div className="content container-fluid">
      {/* Page Header */}
      <div className="crms-title row bg-white mb-4">
        <div className="col  p-0">
          <h3 className="page-title">
            <span className="page-title-icon bg-gradient-primary text-white me-2">
              <i className="fa fa-object-group" aria-hidden="true" />
            </span>{" "}
            CRM Configuration{" "}
          </h3>
        </div>
        <div className="col p-0 text-end">
          <ul className="breadcrumb bg-white float-end m-0 pl-0 pr-0">
            <li className="breadcrumb-item">
              <Link to="/">Dashboard</Link>
            </li>
            <li className="breadcrumb-item active">Configuration</li>
          </ul>
        </div>
      </div>
      {/* /Page Header */}

      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title mb-0">Configuration</h4>
            </div>
            <div className="card-body">
              <h4 className="card-title"></h4>
              <form action="#">
                <div className="row">
                {/* <div className="col-xl-6"> */}
                    <div className="form-group row">
                    {/* <div className="selectBox-cont"> */}
                              <label className="custom_check w-50 m-2">
                                <input type="checkbox" name="assign" onChange={checkHandler} checked={assignData}/>
                                <span className="checkmark" /> Auto Assign
                              </label>
                    {/* </div> */}
                    
                  {/* </div> */}
                  </div>
                  <div className="col-xl-6">
                  <div className="form-group row">
                      <label className="col-lg-3 col-form-label">Financial Year</label>
                      <div className="col-lg-9">
                        <input type="number" name="fyear" className="form-control" value={fyear} onChange={handleInputField}/>
                      </div>
                    </div>
                  </div>
                
                <div className="col-xl-6">
                <div className="form-group row">
                      <label className="col-lg-3 col-form-label">Prefix</label>
                      <div className="col-lg-9">
                        <input type="text" name="prefix" className="form-control" value={prefix} onChange={handleInputField}/>
                      </div>
                    </div>
                  </div>

                  </div>

                <div className="text-end">
                  <button type="submit" className="btn btn-primary" onClick={saveHandler}>
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default Configuration;