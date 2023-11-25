import React from "react";
import InputField from "../CustomComp/InputField";
import InputSelect from "../CustomComp/InputSelect";

import { Collapse } from "antd";
import SubmitButton from "../CustomComp/SubmitButton";
const AddOpportunityModal = (props) => {
  const { Panel } = Collapse;
  if (
    props.displayCustomerData[0] !== undefined &&
    props.displayCustomerData[0] !== null
  ) {
    var AllData = props.displayCustomerData;
  }
let f = props.checkedItems
let valuesToFilter =Object.keys(f)
const value = f[valuesToFilter];
console.log('keys',value)
const filteredItems = props.departmentList.filter(item => valuesToFilter.includes(item.label));


console.log(filteredItems,'ffffffffff')
  console.log(props.departmentList,"ppppppppp")
  const { BathNo, cArea, Remark } = props.inputValue;

  return (
    <>
      {/* Modal */}
      <div
        className="modal right fade"
        id="add_lead"
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
      >
        <div className="modal-dialog" role="document">
          <button
            type="button"
            className="close md-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">×</span>
          </button>
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title text-center">Add Opportunity</h4>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
              ></button>
            </div>
            <div className="modal-body">
              <div className="row">
                <div className="col-md-12">
                  <form>
                    <h4
                      style={{
                        backgroundColor: "darkslateblue",
                        color: "white",
                      }}
                    >
                      Customer Information
                    </h4>

                    <form onSubmit={() => {}}>
                      <div className="row">
                        <div className="col-xl-8">
                          <InputSelect
                            labelClass="col-lg-3"
                            selectName="Name"
                            selectClass="col-lg-9"
                            name="name"
                            placeholder="Customer-Name"
                            value={props.selectedValues.customer}
                          onChange={(selectedOption) =>
                            props.handleSelectChange(
                              selectedOption,
                              "customer",
                              props.setSelectedValues
                            )
                          }
                            // value={props.customerSelect}
                            // onChange={props.customerSelectHandler}
                            options={props.customerList}
                          />
                        </div>
                        <div className="col-xl-4 text-center">
                          <SubmitButton
                            onClick={props.navigteHandler}
                            btnName="Add Customer"
                          />
                        </div>
                      </div>
                      <div className="tab-content">
                        <div
                          className="tab-pane show active p-0"
                          id="not-contact-task-details"
                        >
                          <div className="crms-tasks">
                            <div className="tasks__item crms-task-item active">
                              {/* <Collapse accordion expandIconPosition='right'>
                          <Panel header="Lead Information" key="1"> */}
                              <table className="table">
                                <tbody>
                                  <tr>
                                    <td className="">Name</td>
                                    <td className="text-primary">
                                      {AllData &&
                                      AllData.length > 0 &&
                                      AllData[0].name
                                        ? AllData[0].name
                                        : ""}
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>Mobile No.</td>
                                    <td className="text-primary">
                                      {AllData &&
                                      AllData.length > 0 &&
                                      AllData[0].mobNo
                                        ? AllData[0].mobNo
                                        : ""}
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>Email</td>
                                    <td className="text-primary">
                                      {AllData &&
                                      AllData.length > 0 &&
                                      AllData[0].email
                                        ? AllData[0].email
                                        : ""}
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>Master Group</td>
                                    <td className="text-primary">
                                      {AllData &&
                                      AllData.length > 0 &&
                                      AllData[0].masterGrp
                                        ? AllData[0].masterGrp
                                        : ""}
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>GST NO.</td>
                                    <td className="text-primary">
                                      {AllData &&
                                      AllData.length > 0 &&
                                      AllData[0].gstNo
                                        ? AllData[0].gstNo
                                        : ""}
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>Reference</td>
                                    <td className="text-primary">
                                      {AllData &&
                                      AllData.length > 0 &&
                                      AllData[0].ref
                                        ? AllData[0].ref
                                        : ""}
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                              {/* </Panel>
                        </Collapse> */}
                            </div>
                          </div>
                        </div>
                      </div>
                    </form>

                    <h4
                      style={{
                        backgroundColor: "darkgoldenrod",
                        color: "white",
                      }}
                    >
                      Segment
                    </h4>
                    <div className="row">
                      <div className="col-12 d-flex flex-wrap ">
                        {props.departmentList.map((item) => (
                          <div className="col-4">
                            <label className="custom_check w-50 m-2 ">
                              <input
                                type="checkbox"
                                name={item.label}
                                value={item.value}
                                checked={props.checkedItems[item.label]}
                                defaultChecked={
                                  item.value == props.chk ? true : false 
                                }
                                onChange={props.handleCheckboxChange}
                              />
                              <span className="checkmark" />
                              {item.label}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="form-group row">
                      <div className="col-sm-6">
                        <label className="col-form-label">
                          Number of Bathroom
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          name="BathNo"
                          value={BathNo}
                          placeholder="No of Bath"
                          onChange={props.handleInputField}
                        />
                      </div>
                      <div className="col-sm-6">
                        <label className="col-form-label">
                          Construction Area
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          name="cArea"
                          value={cArea}
                          onChange={props.handleInputField}
                        />
                      </div>
                    </div>
                    <div className="form-group row">
                      <div className="col-sm-6">
                        <InputSelect
                          labelClass=""
                          selectName="Source"
                          selectClass="col-lg-12"
                          name="source"
                          placeholder=""
                          value={props.selectedValues.source}
                          onChange={(selectedOption) =>
                            props.handleSelectChange(
                              selectedOption,
                              "source",
                              props.setSelectedValues
                            )
                          }
                          options={props.sourceData}
                        />
                      </div>

                      <div className="col-sm-6">
                        <InputSelect
                          labelClass=""
                          selectName="Purpose"
                          selectClass="col-lg-12"
                          name="purpose"
                          placeholder=""
                          value={props.selectedValues.purpose}
                          onChange={(selectedOption) =>
                            props.handleSelectChange(
                              selectedOption,
                              "purpose",
                              props.setSelectedValues
                            )
                          }
                          options={props.purposeData}
                        />
                      </div>
                    </div>
                    <div className="form-group row">
                      <div className="col-sm-6">
                        <label className="col-form-label">Remark</label>
                        <input
                          type="text"
                          className="form-control"
                          name="Remark"
                          value={Remark}
                          onChange={props.handleInputField}
                        />
                      </div>
                      <div className="col-sm-6">
                        <InputSelect
                          labelClass=""
                          selectName="Assign to"
                          selectClass="col-lg-12"
                          placeholder="Multiselect"
                          value={props.multiSelectValue}
                          onChange={props.handleMultiSelectChange}
                          options={props.assignUserList}
                          isMulti
                          required
                        />
                      </div>
                    </div>

                    <div className="text-center py-3">
                      <button
                        onClick={props.saveHandler}
                        type="button"
                        className="border-0 btn btn-primary btn-gradient-primary btn-rounded"
                      >
                        Save
                      </button>
                      &nbsp;&nbsp;
                      <button
                        type="button"
                        className="btn btn-secondary btn-rounded"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          {/* modal-content */}
        </div>
        {/* modal-dialog */}
      </div>
      {/* modal */}
    </>
  );
};

export default AddOpportunityModal;
