import React from "react";
import ReactLoader from "../../CommonFile/ReactLoader";
import InputField from "../../CustomComp/InputField";
import InputSelect from "../../CustomComp/InputSelect";
import PageHelmet from "../../CustomComp/PageHelmet";
import PageHeader from "../../CustomComp/PageHeader";
import SubmitButton from "../../CustomComp/SubmitButton";
import DateTimeInput from "../../CommonFile/DateTimeInput";

const ArchitectPage = (props) => {
  const {name,mobile,mobile2,email,org,rAdd,oAdd,pincode,location} = props.inputValue
  return (
    <div className="page-wrapper">
      <PageHelmet
        helmetTitle="Architect - S&S Enterprises"
        helmetName="description"
        helmetContent="Architect Page"
      />

      {props.loading ? (
        <ReactLoader loaderClass="position-absolute" loading={props.loading} />
      ) : null}

      <div className="content container-fluid">
        {/* Page Header */}
        <PageHeader
          iclassName="fa fa-object-group"
          pageTitle="Architect"
          disableTitle="Architect"
        />
        {/* /Page Header */}

        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-header">
                <h4 className="card-title mb-0">Architect Form</h4>
              </div>
              <div className="card-body">
                <h4 className="card-title">Architect Information</h4>
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
                        type="number"
                        name="mobile"
                        labelName="Mobile No."
                        placeholder="Mobile No"
                        value={mobile}
                        onChange={props.handleInputField}
                        required
                      />
                      <InputField
                        type="number"
                        name="mobile2"
                        labelName="Alternate No"
                        placeholder="Alternate Mobile No."
                        value={mobile2}
                        onChange={props.handleInputField}
                        required
                      />
                      <InputField
                        type="email"
                        name="email"
                        labelName="Email"
                        placeholder="abc@gmail.com"
                        value={email}
                        onChange={props.handleInputField}
                        required
                      />

                      <InputSelect
                        labelClass="col-lg-3"
                        selectName="Type"
                        selectClass="col-lg-9"
                        name="type"
                        placeholder="Type"
                        value={props.selectType}
                        onChange={props.typeSelectHandler}
                        options={props.typeList}
                        
                      />

                      <InputSelect
                        labelClass="col-lg-3"
                        selectName="Business Nature"
                        selectClass="col-lg-9"
                        name="businness"
                        placeholder="Business Nature"
                        value={props.selectBusinessNature}
                        onChange={props.businessNatureHandler}
                        options={props.businessList}
                        
                      />

                      <DateTimeInput
                        datelblClass="col-lg-3"
                        dateinpClass="col-lg-9"
                        datelabel="DOB"
                        dateFormat="dd/MM/yyyy"
                        selected={props.dates.dob}
                        onChange={(date) => props.handleDateChange("dob", date)}
                      />
                    </div>
                    {/* --------other side Input------ */}
                    <div className="col-xl-6">
                      <InputField
                        type="text"
                        name="org"
                        labelName="Organisation"
                        value={org}
                        onChange={props.handleInputField}
                        required
                      />
                      <InputField
                        type="text"
                        name="rAdd"
                        labelName="Res. Address"
                        placeholder="Residential Address"
                        value={rAdd}
                        onChange={props.handleInputField}
                        required
                      />
                      <InputField
                        type="text"
                        name="oAdd"
                        labelName="Office Address"
                        value={oAdd}
                        onChange={props.handleInputField}
                        required
                      />
                      <InputField
                        type="number"
                        name="pincode"
                        labelName="Pincode"
                        value={pincode}
                        onChange={props.handleInputField}
                        required
                      />
                      <InputField
                        type="text"
                        name="location"
                        labelName="Location"
                        value={location}
                        onChange={props.handleInputField}
                        required
                      />

                      <DateTimeInput
                        datelblClass="col-lg-3"
                        dateinpClass="col-lg-9"
                        datelabel="DOA"
                        dateFormat="dd/MM/yyyy"
                        selected={props.dates.doa}
                        onChange={(date) => props.handleDateChange("doa", date)}
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

export default ArchitectPage;
