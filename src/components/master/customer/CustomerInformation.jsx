
import React, { useEffect } from "react";
import Select from "react-select";
import ReactLoader from "../../CommonFile/ReactLoader";
import InputField from "../../CustomComp/InputField";
import InputSelect from "../../CustomComp/InputSelect";
import PageHelmet from "../../CustomComp/PageHelmet";
import PageHeader from "../../CustomComp/PageHeader";
import SubmitButton from "../../CustomComp/SubmitButton";
import CardComp from "../../CustomComp/CardComp";
import { C_logo, C_logo2, Circle1, CircleImg } from '../../../components/imagepath';
import { Collapse } from 'antd';

import { Link } from "react-router-dom";

const CustomerInformation = (props) => {
  const { Panel } = Collapse;
  const {
    custname,
    archname,
    email,
    mobile,
  
    reference,
    gst,
    archmobile,
    add1,
    add2,
    add3,
    add4,
  } = props.inputValue;
React.useEffect(()=>{console.log('kjdgf', props.selectedOptions)},[])

  return (
    <div className="page-wrapper">
      <PageHelmet
        helmetTitle="CustomerInformation - S&S Enterprises"
        helmetName="Customer"
        helmetContent="Customer Page"
      />

      {props.loading ? (
        <ReactLoader loaderClass="position-absolute" loading={props.loading} />
      ) : null}

      <div className="content container-fluid">
        {/* Page Header */}
        <PageHeader
          iclassName="fa fa-object-group"
          pageTitle="Customer"
          disableTitle="Customer"
        />
        {/* /Page Header */}

        <CardComp
          cardTitle="Customer Form"
          cardBodyTitle="Customer Information"
        >
          <form onSubmit={props.saveHandler}>
            <div className="row">
              <div className="col-xl-6">
                <InputField
                  type="text"
                  name="custname"
                  labelName="Name"
                  value={custname}
                  onChange={props.handleInputField}
                  required
                />
                <InputField
                  type="text"
                  name="email"
                  labelName="Email"
                  onChange={props.handleInputField}
                  value={email}
                  required
                />

                <InputSelect
                  labelClass="col-lg-3"
                  selectName="Master Group"
                  selectClass="col-lg-9"
                  name="masterGrp"
                  placeholder="Master Group"
                  value={props.masterGroupSelect}
                  onChange={props.selectHandler}
                  options={props.masterGrpData}
                  required
                />
                <InputField
                  type="text"
                  name="gst"
                  labelName="GST No."
                  maxLength='15'
                  minLength='15'
                  onChange={props.handleInputField}
                  value={gst}
                  errClass={gst?.length != 0 && gst?.length > 14 ? "invalid-feedback" : ''}
                  errormsg={gst?.length != 0 && gst?.length < 15 ?`Minimum 15 Characters Required :${gst.length}`:null}
                  required
                />
                <InputField
                  type="text"
                  name="reference"
                  labelName="Reference"
                  onChange={props.handleInputField}
                  value={reference}
                />
              
                {/* <SubmitButton parentClass="text-start" btnName="+ Contact Master"/> */}
                
              </div>
              {/* --------other side Input------ */}
              <div className="col-xl-6">
                <InputField
                  type="number"
                  name="mobile"
                  labelName="Mobile No."
                  onChange={props.handleInputField}
                  value={mobile}
                  required
                />
                <InputField
                  type="text"
                  name="add1"
                  labelName="Address"
                  onChange={props.handleInputField}
                  value={add1}
                  required
                />
                <InputField
                  type="text"
                  name="add2"
                  labelName=""
                  onChange={props.handleInputField}
                  value={add2}
                  required
                />
                <InputField
                  type="text"
                  name="add3"
                  labelName=""
                  onChange={props.handleInputField}
                  value={add3}
                  required
                />
                <InputField
                  type="text"
                  name="add4"
                  labelName=""
                  onChange={props.handleInputField}
                  value={add4}
                  required
                />
               
              </div>
            </div>
            <SubmitButton parentClass="text-end" btnName="Submit" />
          </form>
          <button onClick={props.getBusinessNatureHandler} className="add btn btn-gradient-primary font-weight-bold text-white todo-list-add-btn btn-rounded" id="company-details" data-bs-toggle="modal" data-bs-target="#company_details">+ Contact Master</button>
        </CardComp>


        <div className="modal right fade" id="company_details" tabIndex={-1} role="dialog"  aria-modal="true">
    <div className="modal-dialog" role="document">
      <button
        type="button"
        className="close md-close"
        data-bs-dismiss="modal"
        aria-label="Close"
      >
        {" "}
      </button>
      <div className="modal-content">
        <div className="modal-header">
          <div className="row w-100">
            <div className="col-md-7 account d-flex">
              <div className="company_img">
                <img
                  src={C_logo}
                  alt="User"
                  className="user-image"
                />
              </div>
              <div>
                <p className="mb-0">Contact Master</p>
                {/* <span className="modal-title">Clampett Oil and Gas Corp</span>
                <span className="rating-star">
                  <i className="fa fa-star" aria-hidden="true" />
                </span> */}
                {/* <span className="lock">
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
              <div className="tab-pane show active" id="task-details">
                <div className="crms-tasks">
                  <div className="tasks__item crms-task-item active">
                    {props.businessNatureList.map((item,index)=>{
                    
                      return (
                        <Collapse accordion expandIconPosition="right">
                          <Panel header={item.bnName} key={index} id={index} onClick={()=>{props.getBnCodeListHandler(index)}}>
                            <table className="table">
                              <tbody>
                                <tr>
                                  <td className="border-0">Name</td>
                                  <td className="border-0">
                                    <Select
                                     
                                      style={{ width: "20%" }}
                                      defaultValue={props.selectedOptions.find(opn => opn.BNCode == item.bnCode )}
                                      onChange={selectedOption => props.handleSelectChange(index, selectedOption)
                                      }
                                      options={props.bnCodeList}
                                      // styles={customStyles}
                                      maxMenuHeight={170}
                                    />
                                  </td>
                                </tr>
                                <tr>
                                  <td>Mobile No.</td>
                                  <td id={index}>{props.mobiledata && props.mobiledata.length > 0 && props.mobiledata[index] ? props.mobiledata[index] :  (props.selectedOptions.find(opn => opn.BNCode == item.bnCode ) ? props.selectedOptions.find(opn => opn.BNCode == item.bnCode ).MobNo : '')}</td>
                                </tr>
                              </tbody>
                            </table>
                          </Panel>
                        </Collapse>
                      );
                    })}
                   
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* modal-content */}
    </div>
    {/* modal-dialog */}
  </div>
      </div>
    </div>
  );
};

export default CustomerInformation;

