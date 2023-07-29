import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import { Helmet } from "react-helmet";
import Select from "react-select";
import {itemRender,onShowSizeChange} from '../../../paginationfunction'
import { Table } from 'antd';
import useFetch from "../../../Hooks/useFetch";
import ReactLoader from "../../../CommonFile/ReactLoader";

const ImportItem = () => {
    const api = useFetch()
    
    const [departmentList, setDepartmentList]= useState([]);
    const [tableData, setTableData] = useState([]);
    const [loading, setLoading]= useState(false);
    const [department, setDepartment] = useState(null)
    const [compCode, setCompcode] = useState([]);
    const [departmentCode, setDepartmentCode] = useState(0);


    const DepartementHandler = (department)=>{
      setDepartment(department);
      setDepartmentCode(department.value)
      setCompcode(department.comp)
     }

     console.log('77777',departmentCode)

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


      const tableDataHandler = async (e)=>{
        e.preventDefault();

        let Url = `/api/LoadBusyItemMasterList?CompCode=${compCode}`;
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



      // ----------------------save Data---------------------------

      const saveTableDataHandler = async ()=>{
        var collectedData=[]
        tableData.forEach((item)=>{
          // console.log('itemName',item.name)
          var tableBody = {
            Code: 0,
            BCode:item.bCode,
            SegCode : departmentCode,
            Alias :item.alias,
            Name :item.name,
            ItemGRP :item.itemGRP,
            HSNCode :item.hsnCode,
            SalePrice :item.salePrice,
            MRP :item.mrp,
            PurchasePrice: item.purchasePrice,
            Unit : item.unit,
            UserName :''

          };
          collectedData.push(tableBody)
          
          // setTableBodyData(tableBody)
        })
        
        var body = {ItemMasterDetails : collectedData}
        console.log('tableDataBody',body)
    
        const urlCustomer = "/api/SaveItemMaster"
        
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
               title: 'Alias',
               dataIndex: 'alias',
               sorter: (a, b) => a.alias.length - b.alias.length,
             },
           
            
             {
               title: 'Name',
               dataIndex: 'name',
               sorter: (a, b) => a.name.length - b.name.length,
             },
             {
               title: 'Item Group',
               dataIndex: 'itemGRP',
               sorter: (a, b) => a.itemGRP.length - b.itemGRP.length,
             },
             {
               title: 'HSN',
               dataIndex: 'hsnCode',
               sorter: (a, b) => a.hsnCode.length - b.hsnCode.length,
             },
             {
               title: 'Sale Price',
               dataIndex: 'salePrice',
               sorter: (a, b) => a.salePrice.length - b.salePrice.length,
             },
             {
               title: 'Purchase Price',
               dataIndex: 'purchasePrice',
               sorter: (a, b) => a.purchasePrice.length - b.purchasePrice.length,
             },
             {
               title: 'MRP',
               dataIndex: 'mrp',
               sorter: (a, b) => a.mrp.length - b.mrp.length,
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
          <h4 className="card-title mb-0">Import Item</h4>
        </div>
        <div className="card-body">
          <h4 className="card-title">Import Item Data</h4>
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
              <div className="text-start">
              <button type="submit" className="btn btn-primary" onClick={tableDataHandler}>Load Data</button>
            </div>
              </div>
              
            </div>
           
            
          </form>
        </div>
        
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
      </div>
    </div>
  </div>
 
</div>			
</div>
    </div>
  );
};

export default ImportItem;
