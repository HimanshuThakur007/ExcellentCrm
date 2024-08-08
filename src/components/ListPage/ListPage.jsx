import React from 'react'
import { Helmet } from "react-helmet";
import { Table } from 'antd';
import 'antd/dist/antd.css';
import {Link} from 'react-router-dom'
import {itemRender,onShowSizeChange} from "../paginationfunction"
 import "../antdstyle.css";
 import ReactLoader from '../CommonFile/ReactLoader';
import zIndex from '@material-ui/core/styles/zIndex';
import SubmitButton from '../CustomComp/SubmitButton';
import InputSearch from '../CustomComp/InputSearch';
import {FiPlusCircle} from "react-icons/fi";
import { SiMicrosoftexcel } from 'react-icons/si'

const ListPage = ({setSearchText,disableHeader,HelmetTitle,subHeader,columns,data,defaultHead,onRow,onClick,loading,onRowClick,routeParams}) => {
  let id =routeParams.id
  return (
    <div className="page-wrapper">
    <Helmet>
          <title>{HelmetTitle}</title>
          <meta name="description" content="Data Tables"/>					
    </Helmet>
    {loading ? <ReactLoader loaderClass="position-absolute" loading={loading}  />: null}
    <div className="content container-fluid">
      {/* Page Header */}
      <div className="crms-title row bg-white mb-4">
           <div className="col  p-0">
           <h3 className="page-title">
               <span className="page-title-icon bg-gradient-primary text-white me-2">
               <i className="fas fa-table" />
               </span>{subHeader}</h3>
           </div>
           <div className="col p-0 text-end">
           <ul className="breadcrumb bg-white float-end m-0 pl-0 pr-0">
               <li className="breadcrumb-item"><Link to="/">Dashboard</Link></li>
               <li className="breadcrumb-item active">{disableHeader}</li>
           </ul>
           </div>
       </div>
       <div className="page-header mb-0 ">
              <div className="row">
                
                <div className="col text-end">
                  <ul className="list-inline-item pl-0">
                    
                    <li className="list-inline-item">
                    <div className="invoices-settings-btn">
                      <button className="add btn" onClick={onRowClick}>
                      <FiPlusCircle/>
                      <span className='ml-2'>
                        {
                      id == 1 ?'New User': 
                      id == 2 ?'New Customer':
                      id == 3 ?"New Department":
                      id == 4 ?"New Purpose":
                      id == 6 ? "New Trade Type":
                      id == 5 ? "New Contact":
                      id == 7 ? "New BillSundry":
                      id == 8 ? "New Location":
                      id == 9 ? "New Source":
                      id == 10 ? "New User Type":"Add"
                    } 
                    </span>
                      </button>
                      {/* <SubmitButton 
                      btnName={
                      id == 1 ?'Add User': 
                      id == 2 ?'Add Customer':
                      id == 3 ?"Add Department":
                      id == 4 ?"Add Purpose":
                      id == 6 ? "Add Trade Type":
                      id == 5 ? "Add Contact":
                      id == 7 ? "Add BillSundry":
                      id == 8 ? "Add Location":
                      id == 9 ? "Add Source":
                      id == 10 ? "Add User Type":"Add"
                    } 
                      onClick={onRowClick}
                      /> */}
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
      {/* /Page Header */}
      <div className="row">
        <div className="col-sm-12">
          <div className="card mb-0">
          <div className="col-xl-12 card-header d-flex justify-content-between">
               <h4 className="card-title mb-0 d-flex">
                <span className='mt-1'>
                {defaultHead}
                </span>
                <span className='ml-5'>
                <InputSearch search1={setSearchText} search2={setSearchText}/>
                </span>
                </h4>
              
           </div>
            <div className="card-body">
              <div className="table-responsive">
              <Table
               
                    pagination= { {total : data.length,
                        showTotal : (total, range) => `Showing ${range[0]} to ${range[1]} of ${total} entries`,
                        showSizeChanger : true,onShowSizeChange: onShowSizeChange ,itemRender : itemRender } }
                        className="table table-striped table-nowrap custom-table mb-0 datatable dataTable no-footer"
                    style = {{overflowX : 'auto'}}
                    columns={columns}                 
                    bordered
                    dataSource={data}
                    rowKey={record => record.code}
                    onRow={onRow}
                    onClick={onClick}
                   //  onChange={this.handleTableChange}
                />                         
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>			
  </div>
  )
}

export default ListPage