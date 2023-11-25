import React from "react";
import PageHelmet from "../CustomComp/PageHelmet";
import PageHeader from "../CustomComp/PageHeader";
import CardComp from "../CustomComp/CardComp";
import InputSelect from "../CustomComp/InputSelect";
import DateTimeInput from "../CommonFile/DateTimeInput";
import SubmitButton from "../CustomComp/SubmitButton";
import { Link } from "react-router-dom";
import { Table } from "antd";
import {
  itemRender,
  onShowSizeChange,
} from "../../components/paginationfunction";
import QuotationTable from "./QuotationTable";
import ReactLoader from "../CommonFile/ReactLoader";
import { FiBookOpen, FiBookmark, FiCalendar, FiGrid, FiList, FiPlusCircle, FiSettings, FiUserPlus } from "react-icons/fi";

const AddQuotation = (props) => {
  return (
    <>
      <div className="page-wrapper">
        <PageHelmet
          helmetTitle="Quotation - S&S Enterprises"
          helmetName="Quotation"
          helmetContent="Quotation Page"
        />
        <div className="content container-fluid">
          {/* <PageHeader
            iclassName="fa fa-object-group"
            pageTitle="Quotation"
            disableTitle="Quotation"
          /> */}
          <div className="page-header invoices-page-header">
            <div className="row align-items-center">
              <div className="col">
                <ul className="breadcrumb invoices-breadcrumb">
                  <li className="breadcrumb-item invoices-breadcrumb-item">
                    <a >
                      <i className="fa fa-object-group" /> Quotation
                    </a>
                  </li>
                </ul>
              </div>
              <div className="col-auto">
                <div className="invoices-create-btn">
                  {/* <a
                    className="invoices-preview-link"
                    href="#"
                    data-bs-toggle="modal"
                    data-bs-target="#invoices_preview"
                  >
                    <i className="fa fa-eye" /> Preview
                  </a> */}
                  {/* <a
                    href="#"
                    data-bs-toggle="modal"
                    data-bs-target="#delete_invoices_details"
                    className="btn delete-invoice-btn"
                  >
                    Delete Invoice
                  </a> */}
                   <div className="invoices-settings-btn">
                   <button
                    className="btn"
                    onClick={()=>{
                      props.setQuotationShowHide(!props.quotationShowHide)
                    {props.quotationShowHide === false? props.setRecord({ }):''}
                    }}
                  >{props.quotationShowHide === false ?<FiPlusCircle/> :''} 
                    {props.quotationShowHide === false ? "New Quotation":"Go Back"}
                  </button>
                      {/* <button to="/add-invoice" className="btn">
                        <FiPlusCircle/> New Quotation
                      </button> */}
                    </div>
                 
                </div>
              </div>
            </div>
          </div>

          {props.loading ? (
            <ReactLoader
              loaderClass="position-absolute"
              loading={props.loading}
            />
          ) : null}

          {props.quotationShowHide === false ? (
            <span>
              <div className="row">
                <div className="col-md-12">
                  <div className="card invoices-add-card">
                    <div className="card-header">
                    <h4>Quotation from leads</h4>
                    </div>
                    {/* <h4></h4> */}
                    <div className="card-body">
                      <form action="#" className="invoices-form" onSubmit={props.getQuotationList}>
                        <div className="row">
                          <div className="col-xl-6">
                            <InputSelect
                              labelClass="col-lg-3"
                              selectName="Customer"
                              selectClass="col-lg-9"
                              name="customer"
                              placeholder="Customer"
                              // value={props.selectCustomer}
                              getOptionLabel={(option) =>
                                `${option.label}`
                              }
                              getOptionValue={(option) => `${option}`}
                              isOptionSelected={(option) => props.customerCode === option.value}
                              onChange={props.customerListHandler}
                              options={props.customerList}
                              isSearchable={true}
                              filterOption={props.customFilter}
                              onMenuOpen={() => props.toggleMenu(true)}
                              onMenuClose={() => props.toggleMenu(false)}
                              noOptionsMessage={() => null}
                              autoFocus={true}
                              menuIsOpen={props.menuOpen}
                              
                            />
                            <DateTimeInput
                              datelblClass="col-lg-3"
                              dateinpClass="col-lg-9"
                              datelabel="From Date"
                              dateFormat="dd/MM/yyyy"
                              selected={props.dates.fdate}
                              onChange={(date) =>
                                props.handleDateChange("fdate", date)
                              }
                            />
                          </div>

                          <div className="col-xl-6">
                            <DateTimeInput
                              datelblClass="col-lg-3"
                              dateinpClass="col-lg-9"
                              datelabel="To Date"
                              dateFormat="dd/MM/yyyy"
                              selected={props.dates.tdate}
                              onChange={(date) =>
                                props.handleDateChange("tdate", date)
                              }
                            />
                            <label className="custom_check w-50 m-2">
                              <input
                                type="checkbox"
                                name="assign"
                                onChange={props.checkHandler}
                                checked={props.allPending}
                              />
                              <span className="checkmark" /> All Pending Leads
                            </label>
                          </div>
                        </div>
                        <SubmitButton
                          parentClass="text-lg-end text-center"
                          btnName="Load Leads"
                        />
                      </form>
                    </div>
                    {props.data.length > 0 ?(
                    <div className="table-responsive" >
                      <Table
                        // rowSelection={props.rowSelection}
                        className="table table-striped table-nowrap custom-table mb-0 datatable dataTable no-footer"
                        pagination={{
                          total: props.data.length,
                          showTotal: (total, range) =>
                            `Showing ${range[0]} to ${range[1]} of ${total} entries`,
                          showSizeChanger: true,
                          onShowSizeChange: onShowSizeChange,
                          itemRender: itemRender,
                        }}
                        style={{ overflowX: "auto" }}
                        scroll={{
                          y: 250,
                          x: 1000
                        }}
                        // sticky={true}
                        columns={props.columns}
                        dataSource={props.data}
                        rowKey={(record) => record.code}
                      />
                    </div>
                    ):null}
                  </div>
                </div>
              </div>
            </span>
          ) : null}
          {props.quotationShowHide === true ? (
            <QuotationTable
              setQuotationShowHide={props.setQuotationShowHide}
              selectCustomer={props.selectCustomer}
              customerListHandler={props.customerListHandler}
              customerList={props.customerList}
              record={props.record}
            />
          ) : null}
        </div>
      </div>
    </>
  );
};

export default AddQuotation;
