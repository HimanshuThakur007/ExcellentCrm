import React from "react";
import ReactLoader from "../../CommonFile/ReactLoader";
import InputField from "../../CustomComp/InputField";
import InputSelect from "../../CustomComp/InputSelect";
import PageHelmet from "../../CustomComp/PageHelmet";
import PageHeader from "../../CustomComp/PageHeader";
import SubmitButton from "../../CustomComp/SubmitButton";
import CardComp from "../../CustomComp/CardComp";

const CustomerInformation = (props) => {
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
                  onChange={props.handleInputField}
                  value={gst}
                  required
                />
                <InputField
                  type="text"
                  name="reference"
                  labelName="Reference"
                  onChange={props.handleInputField}
                  value={reference}
                  required
                />
                <InputField
                  type="text"
                  name="archname"
                  labelName="Architect Name"
                  onChange={props.handleInputField}
                  value={archname}
                  required
                />
              </div>
              {/* --------other side Input------ */}
              <div className="col-xl-6">
                <InputField
                  type="number"
                  name="mobile"
                  labelName="Mobile No."
                  onChange={props.handleInputField}
                  value={mobile.slice(0, 10)}
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
                <InputField
                  type="text"
                  name="archmobile"
                  labelName="Architect Mobile No."
                  onChange={props.handleInputField}
                  value={archmobile}
                  required
                />
              </div>
            </div>
            <SubmitButton parentClass="text-end" btnName="Submit" />
          </form>
        </CardComp>
      </div>
    </div>
  );
};

export default CustomerInformation;
