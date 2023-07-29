import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import { Helmet } from "react-helmet";
import Select from "react-select";
import {itemRender,onShowSizeChange} from '../../../paginationfunction'
import { Table } from 'antd';
import useFetch from "../../../Hooks/useFetch";
import ReactLoader from "../../../CommonFile/ReactLoader";

const ImportData = () => {
    const api = useFetch()
    
    const [departmentList, setDepartmentList]= useState([])
    const [compCode, setCompcode] = useState([])
    const [loading, setLoading]= useState(false)
    const [department, setDepartment] = useState(null)
    const [tableData, setTableData] = useState([])
    // const [tableBodyData, setTableBodyData] = useState([])

    const DepartementHandler = (department)=>{
      setDepartment(department);
      setCompcode(department.comp)
     }

    const getDepartementList = async () => {
        var correctData = []
        let Url = `/api/LoadDepMasterList`;
        try {
          setLoading(true);
          let { res, got } = await api(Url, "GET", "");
          if (res.status == 200) {
            console.log('data',got.data)
            let listData = got.data;
          
           listData.forEach((item)=>{
            correctData.push({value:item.code, label:item.name, comp:item.compCode})
           })
           console.log('modifyData', correctData)
            setDepartmentList(correctData);
            // setCompcode(correctData[0].comp)
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
      // console.log('department all Data', compCode)
      


      const tableDataHandler = async (e)=>{
        e.preventDefault();

        let Url = `/api/LoadBusyAccMasterList?CompCode=${compCode}`;
        console.log('urlData', Url)
        try {
          setLoading(true);
          let { res, got } = await api(Url, "GET", "");
          if (res.status == 200) {
            console.log('data',got.data)
            let tableData = got.data;
            setTableData(tableData)
           
          console.log('tabledata', tableData)
           
            setLoading(false);
          } else {
            setLoading(false);
            alert("Something Went Wrong in List loading");
          }
        } catch (err) {
          setLoading(false);
          alert(err);
        }

      }

   const saveTableDataHandler = async ()=>{
    var collectedData=[]
    tableData.forEach((item)=>{
      console.log('itemName',item.name)
      var tableBody = {
        Code: 0,
        Name : item.name,
        MobNo : item.contact,
        Email: '',
        Ref : '',
        ArchName : '',
        ArchMobNo : '',
        Add1 : item.address1,
        Add2 : item.address2,
        Add3 : item.address3,
        Add4 : item.address4,
        MasterGrp :item.masterGrp,
        GSTNo : '',
        UserName: item.name,
      };
      collectedData.push(tableBody)
      
      // setTableBodyData(tableBody)
    })
    
    var body = {CustomerMasterData : collectedData}
    console.log('tableDataBody',body)

    const urlCustomer = "/api/SaveCustomerMaster"
    
    try {
      setLoading(true)
      let { res, got } = await api(urlCustomer, "POST", body);
      if (res.status == 200) {
        console.log("response");
        alert(got.msg);
       
        setLoading(false)
      
      } else {
        setLoading(false)
        alert(got.msg);
      }
    } catch (error) {
      setLoading(false)
      alert(error);
    }
   
   

   }

    
      useEffect(()=>{
     
        getDepartementList()
      },[])
        
           const columns = [
             
             {
               title: 'Name',
               dataIndex: 'name',
                 sorter: (a, b) => a.name.length - b.name.length,
             },
             {
               title: 'Master Grp.',
               dataIndex: 'masterGrp',
                 sorter: (a, b) => a.masterGrp.length - b.masterGrp.length,
             },
             {
               title: 'Mobile No.',
               dataIndex: 'contact',
                 sorter: (a, b) => a.masterGrp.length - b.masterGrp.length,
             },
             {
               title: 'Address',
               dataIndex: 'address1',
                 sorter: (a, b) => a.masterGrp.length - b.masterGrp.length,
             },
            
           
           
           ]

  return (
    <div>
      <div className="page-wrapper">
    <Helmet>
          <title>ImportData - S&S Enterprises</title>
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
           </span>Import </h3>
       </div>
       <div className="col p-0 text-end">
       <ul className="breadcrumb bg-white float-end m-0 pl-0 pr-0">
           <li className="breadcrumb-item"><Link to="/">Dashboard</Link></li>
           <li className="breadcrumb-item active">Import</li>
       </ul>
       </div>
   </div>
  {/* /Page Header */}
  
  <div className="row">
    <div className="col-md-12">
      <div className="card">
        <div className="card-header">
          <h4 className="card-title mb-0">Import Customer</h4>
        </div>
        <div className="card-body">
          <h4 className="card-title">Import Customer Data</h4>
          <form action="#">
            <div className="row">
              <div className="col-xl-10">
              
                <div className="form-group row">
                  <label className="col-lg-2 col-form-label">Department</label>
                  <div className="col-lg-10">
                      <Select
                           placeholder = "Department List"
                           value={department}
                           onChange={DepartementHandler}
                           options={departmentList}
                       />
                  </div>
                </div>
               
              </div>
              <div className="col-xl-2">

            <div className="text-end">
              <button type="submit" className="btn btn-primary" onClick={tableDataHandler}>Load Data</button>
            </div>
              </div>
              
            </div>
           
          </form>
        </div>
        {tableData.length != 0?(
        <div className="card-body">
              <div className="table-responsive">
              <Table
                    pagination= { {total : tableData.length,
                        showTotal : (total, range) => `Showing ${range[0]} to ${range[1]} of ${total} entries`,
                        showSizeChanger : true,onShowSizeChange: onShowSizeChange ,itemRender : itemRender } }
                    style = {{overflowX : 'auto'}}
                    columns={columns}                 
                    bordered
                    dataSource={tableData}
                    rowKey={record => record.id}
                    // onRow={onRow}
                    // onClick={onClick}
                   //  onChange={this.handleTableChange}
                />                         
              </div>
              <div className="text-end">
              <button type="submit" className="btn btn-primary" onClick={saveTableDataHandler}>Save Data</button>
            </div>
            </div>
            ):<div className="text-center"><h6>No Data found</h6></div>}
      </div>
    </div>
  </div>
 
</div>			
</div>
    </div>
  );
};

export default ImportData;
