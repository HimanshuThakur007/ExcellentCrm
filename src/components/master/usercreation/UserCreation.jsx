import React, { useEffect } from "react";
import * as FiIcons from "react-icons/fi";
import PageHelmet from "../../CustomComp/PageHelmet";
import PageHeader from "../../CustomComp/PageHeader";
import InputSelect from "../../CustomComp/InputSelect";
import ReactLoader from "../../CommonFile/ReactLoader";
import InputField from "../../CustomComp/InputField";
import SubmitButton from "../../CustomComp/SubmitButton";
import CardComp from "../../CustomComp/CardComp";
import DateTimeInput from "../../CommonFile/DateTimeInput";
import ImagesUploder from "../../image_uploder";
import CheckboxTree from "react-checkbox-tree";
import "react-checkbox-tree/lib/react-checkbox-tree.css";

const UserCreation = (props) => {
  const {
    username,
    password,
    email,
    confirmpassword,
    mobile,
    type,
    address,
    whtsap,
  } = props.inputValue;
  const userData = sessionStorage.getItem("userData");
  // let Admintype = JSON.parse(userData).AdminType
  // console.log('aaaddd',Admintype)

  let iconStyles = { color: "grey" };

  return (
    <>
      <div className="page-wrapper">
        <PageHelmet
          helmetTitle="User"
          helmetName="description"
          helmetContent="User Page"
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
            pageTitle="User"
            disableTitle="User"
          />

          {/* /Page Header */}

          <CardComp cardTitle="User Form" cardBodyTitle="Information">
            <form onSubmit={props.saveHandler}>
              <div className="row">
                <div className="col-xl-6">
                  <InputField
                    star="*"
                    type="text"
                    name="username"
                    labelName="Name"
                    value={username}
                    onChange={props.handleInputField}
                    required
                  />
                  <InputField
                    star="*"
                    type="email"
                    name="email"
                    labelName="Email"
                    value={email}
                    onChange={props.handleInputField}
                    required
                  />

                  <DateTimeInput
                    datelblClass="col-lg-3"
                    dateinpClass="col-lg-9"
                    datelabel="DOB"
                    dateFormat="dd/MM/yyyy"
                    selected={props.dates.dob}
                    onChange={(date) => props.handleDateChange("dob", date)}
                  />

                  <InputSelect
                    star="*"
                    labelClass="col-lg-3"
                    selectName="Block"
                    selectClass="col-lg-9"
                    name="block"
                    placeholder="Yes/No"
                    value={props.blockOption}
                    onChange={props.blockHandler}
                    options={props.blockList}
                    // isClearable
                    required
                  />

                  <InputField
                    star="*"
                    type={props.visibility ? "text" : "password"}
                    name="password"
                    labelName="Password"
                    value={password}
                    onChange={props.handleInputField}
                    required
                  />

                  {props.visibility === true ? (
                    <span
                      onClick={props.togglePasswordVisibility}
                      className="d-flex justify-content-end"
                    >
                      <i className="eye-icon eye-on-pswd pe-4">
                        <FiIcons.FiEye style={iconStyles} />
                      </i>
                    </span>
                  ) : (
                    <span
                      onClick={props.togglePasswordVisibility}
                      className="d-flex justify-content-end"
                    >
                      <i className="eye-icon eye-on-pswd pe-4">
                        <FiIcons.FiEyeOff style={iconStyles} />
                      </i>
                    </span>
                  )}
                  {/* <div className="form-group row">
                <label className="col-lg-3 col-form-label ">
                  Add Images
                  <div>
                    <span
                      style={{
                        color: "red",
                        fontSize: "10px",
                        fontWeight: "bold",
                      }}
                    >
                      {" "}
                      Max 1 Image Upload *
                    </span>
                  </div>
                </label>

                <div className="col-lg-9">
                  <ImagesUploder imageHandler={props.imageHandler} />
                </div>
              </div> */}
                  <div className="form-group row">
                    <label className="col-lg-3 col-form-label">Address</label>
                    <div className="col-lg-9">
                      <textarea
                        type="text"
                        name="address"
                        rows="4"
                        className="form-control"
                        placeholder="Address.."
                        value={address}
                        onChange={props.handleInputField}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-xl-6">
                  <InputField
                    star="*"
                    type="number"
                    min="0"
                    name="mobile"
                    labelName="Mobile"
                    value={mobile}
                    onChange={props.handleInputField}
                    required
                  />

                  <InputField
                    type="number"
                    min="0"
                    name="whtsap"
                    labelName="WhatsApp No."
                    value={whtsap}
                    onChange={props.handleInputField}
                  />

                  <InputSelect
                    star="*"
                    labelClass="col-lg-3"
                    selectName="Type"
                    selectClass="col-lg-9"
                    name="typelist"
                    placeholder="Type"
                    value={props.selectedOption}
                    onChange={props.selectHandler}
                    options={props.typelist}
                    required
                  />
                  {/* {props.typeVal != 4 ? ( */}
                  <InputSelect
                    star="*"
                    labelClass="col-lg-3"
                    selectName="Department"
                    selectClass="col-lg-9"
                    name="department"
                    placeholder="Department"
                    value={props.department}
                    onChange={props.DepartementHandler}
                    options={props.departmentList}
                    required
                  />
                  {/* ) : ( */}
                  {/* <InputSelect
                  labelClass="col-lg-3"
                  selectName="Department"
                  selectClass="col-lg-9"
                  name="multidepartment"
                  placeholder="Multiselect Department"
                  value={props.multiSelectValue}
                  onChange={props.handleMultiSelectChange}
                  options={props.departmentList}
                  isMulti
                  required
                /> */}
                  {/* )} */}

                  <InputField
                    type="file"
                    labelName="Upload File"
                    onChange={props.onImageChange}
                  />
                  {props.image && (
                    <div className="form-group row">
                      <label className="col-lg-3 col-form-label">Image</label>
                      <div className="col-lg-9">
                        <img
                          src={props.image}
                          alt="preview image"
                          style={{ width: "37%" }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
              {/* {Admintype == 1?( */}
              <CardComp
                cardTitle="User Rights"
                cardBodyTitle=""
                crdStyle={{ backgroundColor: "lavender" }}
              >
                <CheckboxTree
                  nodes={props.nodes}
                  checked={props.checked}
                  expanded={props.expanded}
                  onCheck={(checkedData) => {
                    props.setChecked(checkedData);
                  }}
                  onExpand={(expandedData) => {
                    props.setExpanded(expandedData);
                  }}
                />
              </CardComp>
              {/* ):null} */}
              <SubmitButton parentClass="text-end" btnName="Submit" />
            </form>
          </CardComp>
        </div>
      </div>
    </>
  );
};

export default UserCreation;
