import React, { useState } from "react";
import PageHelmet from "../../CustomComp/PageHelmet";
import PageHeader from "../../CustomComp/PageHeader";
import InputField from "../../CustomComp/InputField";
import ReactLoader from "../../CommonFile/ReactLoader";
import SubmitButton from "../../CustomComp/SubmitButton";

const DepartmentPage = (props) => {
  const { name, address, email, compcode, mobile, segment } = props.inputValue;
  return (
    <div className="page-wrapper">
      <PageHelmet
        helmetTitle="Department - S&S Enterprises"
        helmetName="Department"
        helmetContent="Department Page"
      />
      {props.loading ? (
        <ReactLoader loaderClass="position-absolute" loading={props.loading} />
      ) : null}
      <div className="content container-fluid">
        {/* Page Header */}
        <PageHeader
          iclassName="fa fa-object-group"
          pageTitle="Department"
          disableTitle="Department"
        />

        {/* /Page Header */}

        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-header">
                <h4 className="card-title mb-0">Department Form</h4>
              </div>
              <div className="card-body">
                <h4 className="card-title">Department Information</h4>
                <form onSubmit={props.saveHandler}>
                  <div className="row">
                    <div className="col-xl-6">
                      <InputField
                        type="text"
                        name="name"
                        labelName="Name"
                        value={name}
                        onChange={props.handleInputField}
                        required
                      />
                      <InputField
                        type="email"
                        name="email"
                        labelName="Email"
                        value={email}
                        onChange={props.handleInputField}
                        required
                      />
                      <InputField
                        type="text"
                        name="address"
                        labelName="Address"
                        value={address}
                        onChange={props.handleInputField}
                        required
                      />
                    </div>
                    <div className="col-xl-6">
                      <InputField
                        type="text"
                        name="mobile"
                        labelName="Mobile No."
                        value={mobile}
                        onChange={props.handleInputField}
                        required
                      />
                      <InputField
                        type="text"
                        name="compcode"
                        labelName="Company Code"
                        value={compcode}
                        onChange={props.handleInputField}
                        required
                      />
                    </div>
                  </div>
                  <SubmitButton parentClass="text-end" btnName="Submit" />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DepartmentPage;
