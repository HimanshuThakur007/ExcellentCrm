import React from "react";
import { Link } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import PageHelmet from "../CustomComp/PageHelmet";
import {
  itemRender,
  onShowSizeChange,
} from "../../components/paginationfunction";
import { Table } from "antd";
import ReactLoader from "../CommonFile/ReactLoader";
import { BiUser } from "react-icons/bi";
import InputSelect from "../CustomComp/InputSelect";
import SubmitButton from "../CustomComp/SubmitButton";
import { SiMicrosoftexcel } from 'react-icons/si';
import AddLeadModal from "./AddLeadModal";
import DateTimeInput from "../CommonFile/DateTimeInput";
import { Task1 } from '../imagepath';
import { Collapse } from 'antd';
import InputSearch from "../CustomComp/InputSearch";
import {FiPlusCircle} from "react-icons/fi";

const LeadPage = (props) => {
  let iconStyles = { color: "#10793F", cursor:'pointer'};
  const customStyles = {
    control: base => ({
      ...base,
      height: 45,
      minHeight: 45
    })
  };
  const userData = sessionStorage.getItem("userData");
  if (userData !== null) {
    var dep = JSON.parse(userData).department;
    var depname = JSON.parse(userData).depName;
  }
  
  const { Panel } = Collapse;
  let d = props.selectedTableData
  // const {callStatus,feedback} = props.inputValue
  return (
    <div>
      <div className="page-wrapper">
        <PageHelmet
          helmetTitle="Leads - S&S Enterprises"
          helmetName="description"
          helmetContent="Leads Page"
        />

        {props.loading ? (
          <ReactLoader
            loaderClass="position-absolute"
            loading={props.loading}
          />
        ) : null}
        <div className="content container-fluid">
          <div className="crms-title row bg-white">
            <div className="col">
              <h3 className="page-title m-0">
                <span className="page-title-icon bg-gradient-primary text-white me-2">
                  {/* <i className="feather-user" /> */}
                  <i>
                    <BiUser />
                  </i>
                </span>{" "}
                Leads{" "}
              </h3>
            </div>
            <div className="col text-end">
              <ul className="breadcrumb bg-white float-end m-0 pl-0 pr-0">
                <li className="breadcrumb-item">
                  <Link to="/">Dashboard</Link>
                </li>
                <li className="breadcrumb-item active">Leads</li>
              </ul>
            </div>
          </div>
          {/* Page Header */}
          <div className="page-header pt-3 mb-0 ">
            <div className="row">
              <div className="col text-end">
                <ul className="list-inline-item pl-0">
                  <li className="list-inline-item">
                  <div className="invoices-settings-btn">
                    <button
                      className="btn"
                      id="add-task"
                      data-bs-toggle="modal"
                      data-bs-target="#add_lead"
                      onClick={props.clearHandler}
                    >
                      <FiPlusCircle/> 
                     <span className="ml-2">New Lead</span>
                    </button>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          {/* /Page Header----------2 */}
          {/* <div className="page-header pt-0 mb-0 ">
            <div className="row">
              <div className="col">
                <h4 className="advanced-report">Total Lead</h4>
              </div>
              <div className="col text-end">
                <ul className="list-inline-item pl-0"></ul>
              </div>
            </div>
          </div> */}

          {/* /-------------Page Header with inputField-----*/}
          <div className="row">
            <div className="col-md-12">
              <div className="card">
                <div className="card-body">
                  <div className="row pt-2">
                    {/* <div className="col-xl-3">
                      <InputSelect
                        labelClass=""
                        selectName="Department"
                        selectClass="col-lg-12"
                        name="department"
                        placeholder="Department"
                        value={props.selectedValues.select1}
                        onChange={(selectedOption) =>
                          props.handleSelectChange(
                            selectedOption,
                            "select1",
                            props.setSelectedValues
                          )
                        }
                        options={props.departmentList}
                        styles={customStyles}
                      />
                    </div> */}
                    {/* <div className="col-xl-3">
                    <InputSelect
                        labelClass=""
                        selectName="Lead Status"
                        selectClass="col-lg-12"
                        name="department"
                        placeholder="Lead Status"
                        value={props.selectedValues.leadStatus}
                        onChange={(selectedOption) =>
                          props.handleSelectChange(
                            selectedOption,
                            "leadStatus",
                            props.setSelectedValues
                          )
                        }
                        options={props.leadStatus}
                        styles={customStyles}
                      />
                      
                    </div> */}
                    <div className="col-xl-6">
                      <DateTimeInput
                        datelblClass=""
                        dateinpClass="col-lg-12"
                        datelabel="From"
                        dateFormat="dd/MM/yyyy"
                        selected={props.dates.from}
                        onChange={(date) => props.handleDateChange("from", date)}
                      />
                    </div>
                    <div className="col-xl-6">
                      <DateTimeInput
                        datelblClass=""
                        dateinpClass="col-lg-12"
                        datelabel="To"
                        dateFormat="dd/MM/yyyy"
                        selected={props.dates.to}
                        onChange={(date) => props.handleDateChange("to", date)}
                      />
                    </div>
                 
                    {/* <div
                    className="col-xl-2"
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <div className="mt-4">
                      <SubmitButton
                        parentClass="text-center"
                        onClick={props.getTableList}
                        btnName="Load Data"
                      />
                    </div>
                  </div> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* ---------------Table in Card---------------- */}
          <div className="row">
            <div className="col-md-12">
              <div className="card">
                <div className="card-header d-flex justify-content-between">
                  <h4 className="card-title d-flex mb-0">
                    <span className="mt-1">
                    Leads Table
                    </span>
                    <span className="ml-2">
                    <InputSearch
                        search1={props.setSearchText}
                        search2={props.setSearchText}
                      />
                    </span>
                    </h4>
                    {/* <span onClick={props.data.length > 0 ? props.handleExportClick:null}><SiMicrosoftexcel size={25} style={iconStyles}/></span> */}
                </div>
                <div className="card-body">
                  <div className="table-responsive">
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
                      columns={props.columns}
                      dataSource={props.data}
                      rowKey={(record) => record.code}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* --------assign to----------------- */}
          {/* {props.data.length > 0 ? (
            <div className="row">
              <div className="col-md-12">
                <div className="card">
                  <div className="card-body">
                    <div className="row pt-2">
                      <div className="col-xl-10">
                        <InputSelect
                          labelClass="col-lg-2"
                          selectName="Assign"
                          selectClass="col-lg-10"
                          name="assign"
                          placeholder="Assign"
                          value={props.selectedOption}
                          onChange={props.selectHandler}
                          options={props.assignList}
                          required
                        />
                      </div>
                      <div className="col-xl-2">
                        <SubmitButton
                          parentClass="text-center"
                          onClick={props.assignHandler}
                          btnName="Assign Lead"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : null} */}
          {/* -----------------Leadfollowup-Modal-------------------- */}
           {/* Modal */}
        <div
          className="modal right fade"
          id="followup-modal"
          tabIndex={-1}
          role="dialog"
          aria-modal="true"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <div className="row w-100">
                  <div className="col-md-7 account d-flex">
                    <div className="company_img">
                      <img src={Task1} alt="User" className="user-image" />
                    </div>
                    <div>
                      <p className="mb-0">Lead Followup</p>
                      <span className="modal-title">
                        Personalize your Followup
                      </span>
                      {/* <span className="rating-star">
                        <i className="fa fa-star" aria-hidden="true" />
                      </span>
                      <span className="lock">
                        <i className="fa fa-lock" aria-hidden="true" />
                      </span> */}
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  className="btn-close xs-close"
                  data-bs-dismiss="modal"
                />
              </div>
             
              <div className="modal-body">
                <div className="task-infos">
                  <div className="tab-content">
                    <div className="tab-pane show active" id="tasks-details">
                      <div className="crms-tasks">
                        <div className="tasks__item crms-task-item active">
                          <Collapse accordion expandIconPosition="right" defaultActiveKey={['1']} style={{backgroundColor:'chocolate', color:"white",fontWeight:'bold'}}>
                            {/* <Panel header=" Name &amp; Occupation" key="1"> */}
                            <Panel header="Information" key="1">
                              <table className="table">
                                <tbody>
                                  <tr>
                                    <td className="border-0">Name</td>
                                    <td className="border-0">{d.customer}</td>
                                  </tr>
                                  <tr>
                                    <td>Mobile No.</td>
                                    <td>{d.mobNo}</td>
                                  </tr>
                                  <tr>
                                    <td>Email</td>
                                    <td>{d.email}</td>
                                  </tr>
                                  <tr>
                                    <td>Lead No.</td>
                                    <td>{d.leadNo}</td>
                                  </tr>
                                  <tr>
                                    <td>Lead Created</td>
                                    <td>{d.leadDate}</td>
                                  </tr>
                                  {/* <tr>
                                    <td>Department</td>
                                    <td>{d.departemnt}</td>
                                  </tr> */}
                                 
                                </tbody>
                              </table>
                            </Panel>
                          </Collapse>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* ----------modal---form */}
                  <div className="row mt-2">
                    <div className="col-md-12">
                      <form onSubmit={props.savefollowUpHandler}>
                        <h4 style={{backgroundColor:'darkolivegreen', color:"white"}}>Interaction</h4>
                        <div className="form-group row">
                          <div className="col-sm-6">
                          <InputSelect
                              labelClass=""
                              selectName="Interaction"
                              selectClass=""
                              name="callstatus"
                              placeholder="Interaction"
                              value={props.selectedValues.select3}
                              onChange={(selectedOption) =>
                                props.handleSelectChange(selectedOption, 'select3', props.setSelectedValues)}
                                options={props.CallStatus}
                                required
                            />
                          </div>
                          <div className="col-sm-6">
                            <DateTimeInput
                              datelabel="Due Date"
                              selected={props.dates.startDate}
                              timeInputLabel='Time'
                              dateFormat='dd/MM/yyyy'
                              onChange={(date) =>
                                props.handleDateChange("startDate", date)
                              }
                            />
                          </div>
                        </div>
                        <div className="form-group row">
                          <div className="col-sm-6">
                            <label className="col-form-label">Log a note</label>
                            <input
                              className="form-control"
                              type="text"
                              name="feedback"
                              id="task-name"
                              autoComplete="off"
                              placeholder=""
                              value={props.feedbackInput}
                              onChange={props.feedBackHandler}
                              required
                            />
                          </div>
                         
                          {/* <div className="col-sm-6">
                          <InputSelect
                              labelClass=""
                              selectName="Reschedule"
                              selectClass=""
                              name="Reschedule"
                              placeholder="Lead Status"
                                value={props.selectedValues.select2}
                                onChange={(selectedOption) =>
                                  props.handleSelectChange(selectedOption, 'select2', props.setSelectedValues)}
                                options={props.Reschedule}
                                
                            />
                            </div> */}
                          <div className="col-sm-6">
                            <InputSelect
                              labelClass=""
                              selectName="Lead Status"
                              selectClass=""
                              name="leadstatus"
                              placeholder="Lead Status"
                              value={props.selectedValues.select4}
                              onChange={(selectedOption) =>
                                props.handleSelectChange(selectedOption, 'select4', props.setSelectedValues)}
                                options={props.leadStatus}
                                required
                            />
                          </div>
                           <div className="col-sm-6">
                            {props.leadStatusCode === 2?(
                            <DateTimeInput
                              datelabel="Reschedule Date"
                              timeInputLabel='Time'
                              dateFormat='dd/MM/yyyy'
                              selected={props.dates.dateandtime}
                              onChange={(date) =>
                                props.handleDateChange("dateandtime", date)
                              }
                            />
                            ):null}
                          </div>
                        </div>

                        <div className="text-center py-3">
                          <button
                            type="submit"
                            className="border-0 btn btn-primary btn-gradient-primary btn-rounded"
                          >
                            Save
                          </button>
                          &nbsp;&nbsp;
                          <button
                            type="button"
                            className="btn btn-secondary btn-rounded"
                            data-bs-dismiss="modal"
                          >
                            Cancel
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
        <AddLeadModal
        toggleMenu={props.toggleMenu}
        customFilter={props.customFilter}
        menuOpen={props.menuOpen}
        setSelectedValues={props.setSelectedValues}
          chk={props.defaultCheckDept}
          checkedItems={props.checkedItems}
          departmentList={props.departmentList}
          selectedValues={props.selectedValues}
          handleCheckboxChange={props.handleCheckboxChange}
          customerList={props.customerList}
          navigteHandler={props.navigteHandler}
          displayCustomerData={props.displayCustomerData}
          selectedCustomer={props.selectedCustomer}
          customerSelectHandler={props.customerSelectHandler}
          handleSelectChange={props.handleSelectChange}
          purposeData={props.purposeData}
          sourceData={props.sourceData}
          multiSelectValue={props.multiSelectValue}
          handleMultiSelectChange={props.handleMultiSelectChange}
          assignUserList={props.assignUserList}
          inputValue={props.inputValue}
          handleInputField={props.handleInputField}
          saveHandler={props.saveHandler}
        />
      </div>
    </div>
  );
};

export default LeadPage;
