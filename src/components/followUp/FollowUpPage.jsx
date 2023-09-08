import React from "react";
import PageHeader from "../CustomComp/PageHeader";
import PageHelmet from "../CustomComp/PageHelmet";
import InputField from "../CustomComp/InputField";
import InputSelect from "../CustomComp/InputSelect";
import SubmitButton from "../CustomComp/SubmitButton";
import {
  itemRender,
  onShowSizeChange,
} from "../../components/paginationfunction";
import { Divider, Radio, Table } from 'antd';
import DateTimeInput from "../CommonFile/DateTimeInput";
import { Circle1, CircleImg, Task1 } from '../imagepath';
import 'antd/dist/antd.css';
import { Collapse } from 'antd';
import { Link } from "react-router-dom";
import ReactLoader from "../CommonFile/ReactLoader";



const FollowUpPage = (props) => {
  // var rowSelect = props.rowSelection
  // let nameData = props.selectedTableData[0]
  let d = props.selectedTableData
  const { Panel } = Collapse;
  const {callStatus,feedback} = props.inputValue
  // console.log('statusLead', props.leadStatusCode)

  return (
    <>
      <div className="page-wrapper">
        <PageHelmet
          helmetTitle="FollowUp - S&S Enterprises"
          helmetName="description"
          helmetContent="Followup Page"
        />

        {props.loading ? (
          <ReactLoader
            loaderClass="position-absolute"
            loading={props.loading}
          />
        ) : null}
        <div className="content container-fluid">
          {/* Page Header */}
          <PageHeader
            iclassName="fa fa-object-group"
            pageTitle="FollowUp"
            disableTitle="FollowUp"
          />

          {/* ---------------Table in Card---------------- */}
          <div className="row">
            <div className="col-md-12">
              <div className="card">
                <div className="card-header">
                  <h4 className="card-title mb-0">FollowUp</h4>
                </div>
                <div className="card-body">
                  <div className="table-responsive">
                    {/* <Radio.Group
                      onChange={({ target: { value } }) => {
                        props.setSelectionType(value);
                      }}
                      value={props.selectionType}
                    >
                      <Radio value="checkbox">Checkbox</Radio>
                      <Radio value="radio">radio</Radio>
                    </Radio.Group> */}

                    {/* <Divider /> */}
                    <Table
                      // rowSelection={{ type: props.selectionType, ...rowSelect }}
                     
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
                      // onRow={(record) => ({
                      //   onClick: () => props.onRowClick(record),
                      // })}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* --------Customer Information----------------- */}
        </div>
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
                      <p className="mb-0">Customer Information</p>
                      <span className="modal-title">
                        Personalize your Information
                      </span>
                      <span className="rating-star">
                        <i className="fa fa-star" aria-hidden="true" />
                      </span>
                      <span className="lock">
                        <i className="fa fa-lock" aria-hidden="true" />
                      </span>
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  className="btn-close xs-close"
                  data-bs-dismiss="modal"
                />
              </div>
              {/* <div className="card due-dates">
              <div className="card-body">
                <div className="row">
                  <div className="col">
                    <span>Due Date</span>
                    <p>03-Jul-2020</p>
                  </div>
                  <div className="col">
                    <span>Priority</span>
                    <p>Medium</p>
                  </div>
                  <div className="col">
                    <span>Status</span>
                    <p>Not Started</p>
                  </div>
                  <div className="col">
                    <span>Progress</span>
                    <p>0</p>
                  </div>
                  <div className="col">
                    <span>Assigned To</span>
                    <p>John Doe</p>
                  </div>
                </div>
              </div>
            </div> */}
              <div className="modal-body">
                <div className="task-infos">
                  <div className="tab-content">
                    <div className="tab-pane show active" id="tasks-details">
                      <div className="crms-tasks">
                        <div className="tasks__item crms-task-item active">
                          <Collapse accordion expandIconPosition="right" defaultActiveKey={['1']}>
                            {/* <Panel header=" Name &amp; Occupation" key="1"> */}
                            <Panel header="Information" key="1">
                              <table className="table">
                                <tbody>
                                  <tr>
                                    <td className="border-0">Name</td>
                                    <td className="border-0">{d.customerName}</td>
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
                                    <td>{d.vchNo}</td>
                                  </tr>
                                  <tr>
                                    <td>Lead Created</td>
                                    <td>{d.vchDate}</td>
                                  </tr>
                                  <tr>
                                    <td>Lead Assign</td>
                                    <td>{d.assignDate}</td>
                                  </tr>
                                  <tr>
                                    <td>Lead Status</td>
                                    <td>{d.lstatus}</td>
                                  </tr>
                                  <tr>
                                    <td>Reschedule Date</td>
                                    <td>{d.rescheduleDate}</td>
                                  </tr>
                                  {/* <tr>
                                    <td className="border-0"> Lead Status</td>
                                    <label className={`${d.className}`}>
                                    {d.status}
                                    </label>
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
                        <h4>followup</h4>
                        <div className="form-group row">
                          <div className="col-sm-6">
                          <InputSelect
                              labelClass=""
                              selectName="Call Status"
                              selectClass=""
                              name="callstatus"
                              placeholder="Call Status"
                              value={props.selectedValues.select3}
                              onChange={(selectedOption) =>
                                props.handleSelectChange(selectedOption, 'select3', props.setSelectedValues)}
                                options={props.CallStatus}
                                required
                            />
                          </div>
                          <div className="col-sm-6">
                            <DateTimeInput
                              datelabel="Date"
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
                            <label className="col-form-label">Feedback</label>
                            <input
                              className="form-control"
                              type="text"
                              name="feedback"
                              id="task-name"
                              autoComplete="off"
                              placeholder="feedback"
                              value={feedback}
                              onChange={props.handleInputField}
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
                              value={props.selectedValues.select1}
                              onChange={(selectedOption) =>
                                props.handleSelectChange(selectedOption, 'select1', props.setSelectedValues)}
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
    </>
  );
};

export default FollowUpPage;
