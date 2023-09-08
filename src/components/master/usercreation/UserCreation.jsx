import React, { useEffect } from "react";
import * as FiIcons from "react-icons/fi";
import PageHelmet from "../../CustomComp/PageHelmet";
import PageHeader from "../../CustomComp/PageHeader";
import InputSelect from "../../CustomComp/InputSelect";
import ReactLoader from "../../CommonFile/ReactLoader";
import InputField from "../../CustomComp/InputField";
import SubmitButton from "../../CustomComp/SubmitButton";
import CardComp from "../../CustomComp/CardComp";

const UserCreation = (props) => {
  const { username, password, email, confirmpassword, mobile, type } =
    props.inputValue;

  let iconStyles = { color: "grey" };

  return (
    <div className="page-wrapper">
      <PageHelmet
        helmetTitle="CreateUser - S&S Enterprises"
        helmetName="description"
        helmetContent="User Page"
      />
      {props.loading ? (
        <ReactLoader loaderClass="position-absolute" loading={props.loading} />
      ) : null}
      <div className="content container-fluid">
        {/* Page Header */}
        <PageHeader
          iclassName="fa fa-object-group"
          pageTitle="Create Users"
          disableTitle="Create Users"
        />

        {/* /Page Header */}

        <CardComp
          cardTitle="Create Users Form"
          cardBodyTitle="Users Information"
        >
          <form onSubmit={props.saveHandler}>
            <div className="row">
              <div className="col-xl-6">
                <InputField
                  type="text"
                  name="username"
                  labelName="Name"
                  value={username}
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
                <InputSelect
                  labelClass="col-lg-3"
                  selectName="Block"
                  selectClass="col-lg-9"
                  name="block"
                  placeholder="Yes/No"
                  value={props.blockOption}
                  onChange={props.blockHandler}
                  options={props.blockList}
                  required
                />
                <InputField
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
              </div>
              <div className="col-xl-6">
                <InputField
                  type="number"
                  min="0"
                  name="mobile"
                  labelName="Mobile"
                  value={mobile}
                  onChange={props.handleInputField}
                  required
                />

                <InputSelect
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
                {props.typeVal != 4 ? (
                  <InputSelect
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
                ) : (
                  <InputSelect
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
                  />
                )}
              </div>
            </div>
            <SubmitButton parentClass="text-end" btnName="Submit" />
          </form>
        </CardComp>
      </div>
    </div>
  );
};

export default UserCreation;
