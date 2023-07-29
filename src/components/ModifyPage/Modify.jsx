import React, { useEffect, useState } from 'react';
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { useHistory, useParams } from 'react-router-dom/cjs/react-router-dom.min';
import Select from 'react-select';
import useFetch from '../Hooks/useFetch';
import ReactLoader from '../CommonFile/ReactLoader';


const Modify = () => {
    const history = useHistory()
    var api = useFetch()
    
    const routeParams = useParams()
    console.log('params', routeParams)

    const [selectedOption, setSelectedOption] = useState(null);
    const [modifyCode, setModifyCode] = useState(null);
    const [modifyList, setModifyList] = useState([]);
    const [loading, setLoading] = useState(false)

    const selectHandler = (selectedOption)=>{
     setSelectedOption(selectedOption)
     setModifyCode(selectedOption.value)

        console.log("label",selectedOption.label)
        console.log("value",selectedOption.value)
    }
   

    // ------------------userCreation--------------

    const getModifyList = async () => {
      var correctData = []
      // setLoader(true);
      let modifyUrl = `/api/LoadUserMasterList`;
      try {
        setLoading(true)
        let { res, got } = await api(modifyUrl, "GET", "");
        if (res.status == 200) {
          console.log('datass',got.data)
          let listData = got.data;
         listData.forEach((item)=>{
          correctData.push({value:item.code, label:item.name})
         })
         console.log('modifyData', correctData)
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
        var correctData = []
        let modifyUrl = `/api/LoadCustomerMasterList`;
        try {
          setLoading(true);
          let { res, got } = await api(modifyUrl, "GET", "");
          if (res.status == 200) {
            let listData = got.data;
            console.log('CustomerModify',listData)
           listData.forEach((item)=>{
            correctData.push({value:item.code, label:item.name})
           })
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
        var correctData = []
        let Url = `/api/LoadDepMasterList`;
        try {
          setLoading(true);
          let { res, got } = await api(Url, "GET", "");
          if (res.status == 200) {
            console.log('data',got.data)
            let listData = got.data;
           listData.forEach((item)=>{
            correctData.push({value:item.code, label:item.name})
           })
           console.log('modifyData', correctData)
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


    const modifyHandler = ()=>{
        switch(routeParams.id){
            case '1':
                history.push({ pathname: "/ursecreation", state: {code : modifyCode }})
                break;
            case '2':
                history.push({ pathname: "/customer", state: {code : modifyCode }})
                break;
            case '3':
                history.push({ pathname: "/department", state: {code : modifyCode }})
                break;
                default:
        }
    }

    useEffect(()=>{
        switch(routeParams.id){
            case '1':
                getModifyList();
                break;
            case '2':
                getCustomerModifyList();
                break;
            case '3':
                getDepartementModifyList();
                break;
                default:
        }
        },[routeParams.id])
  return (
    <div className="page-wrapper">
    <Helmet>
          <title>Modify - CRMS</title>
          <meta name="description" content="Login page"/>					
    </Helmet>
    {loading ?
         <> 
          <div className="loader-box" style={{height:'100vh'}}>
        <div className="position-absolute" style={{marginLeft:'0%',marginTop:'0%', zIndex:'1000'}}>
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
           </span>Modify </h3>
       </div>
       <div className="col p-0 text-end">
       <ul className="breadcrumb bg-white float-end m-0 pl-0 pr-0">
           <li className="breadcrumb-item"><Link to="/">Dashboard</Link></li>
           <li className="breadcrumb-item active">Modify</li>
       </ul>
       </div>
   </div>
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
              <div className="col-xl-12">
              
                <div className="form-group row">
                  <label className="col-lg-2 col-form-label">Modify</label>
                  <div className="col-lg-10">
                      <Select
                           placeholder = "Modify User"
                           defaultValue={selectedOption}
                           onChange={selectHandler}
                           options={modifyList}
                       />
                  </div>
                </div>
               
                
               
              </div>
              
            </div>
           
            <div className="text-end">
              <button type="submit" className="btn btn-primary" onClick={modifyHandler}>Modify</button>
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

export default Modify