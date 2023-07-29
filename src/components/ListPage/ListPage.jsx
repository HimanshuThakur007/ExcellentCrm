import React from 'react'
import { Helmet } from "react-helmet";
import { Table } from 'antd';
import 'antd/dist/antd.css';
import {itemRender,onShowSizeChange} from "../paginationfunction"
 import "../antdstyle.css";
 import ReactLoader from '../CommonFile/ReactLoader';
import zIndex from '@material-ui/core/styles/zIndex';

const ListPage = ({disableHeader,HelmetTitle,subHeader,columns,data,defaultHead,onRow,onClick,loading}) => {
  return (
    <div className="page-wrapper">
    <Helmet>
          <title>{HelmetTitle}</title>
          <meta name="description" content="Data Tables"/>					
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
               <i className="fas fa-table" />
               </span>{subHeader}</h3>
           </div>
           <div className="col p-0 text-end">
           <ul className="breadcrumb bg-white float-end m-0 pl-0 pr-0">
               <li className="breadcrumb-item"><a href="/">Dashboard</a></li>
               <li className="breadcrumb-item active">{disableHeader}</li>
           </ul>
           </div>
       </div>
      {/* /Page Header */}
      <div className="row">
        <div className="col-sm-12">
          <div className="card mb-0">
          <div className="card-header">
               <h4 className="card-title mb-0">{defaultHead}</h4>
               {/* <p className="card-text py-3">
               This is the most basic example of the datatables with zero configuration. Use the <code>.datatable</code> class to initialize datatables.
               </p> */}
           </div>
            <div className="card-body">
              <div className="table-responsive">
              <Table
                    pagination= { {total : data.length,
                        showTotal : (total, range) => `Showing ${range[0]} to ${range[1]} of ${total} entries`,
                        showSizeChanger : true,onShowSizeChange: onShowSizeChange ,itemRender : itemRender } }
                    style = {{overflowX : 'auto'}}
                    columns={columns}                 
                    bordered
                    dataSource={data}
                    rowKey={record => record.id}
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