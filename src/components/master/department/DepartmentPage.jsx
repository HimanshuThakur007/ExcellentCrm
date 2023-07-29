import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import Select from "react-select";
import ReactLoader from "../../CommonFile/ReactLoader";

const DepartmentPage = ({handleInputField,saveHandler,inputValue,loading}) => {
  const { name, address, email, compcode,mobile,segment } = inputValue;
  return (
    <div className="page-wrapper">
      <Helmet>
        <title>Department - CRMS</title>
        <meta name="description" content="Login page" />
      </Helmet>
      {loading ?
         <> 
          <div className="loader-box" style={{height:'100vh'}}>
        <div className="position-absolute" style={{marginLeft:'0%',marginTop:'0%'}}>
          <ReactLoader loading={loading}  />
        </div>
        </div>
        </>
        : null}
      <div className="content container-fluid">
        {/* Page Header */}
        <div className="crms-title row bg-white mb-4">
          <div className="col  p-0">
            <h3 className="page-title">
              <span className="page-title-icon bg-gradient-primary text-white me-2">
                <i className="fa fa-object-group" aria-hidden="true" />
              </span>{" "}
              Department{" "}
            </h3>
          </div>
          <div className="col p-0 text-end">
            <ul className="breadcrumb bg-white float-end m-0 pl-0 pr-0">
              <li className="breadcrumb-item">
                <Link to="/">Dashboard</Link>
              </li>
              <li className="breadcrumb-item active">Department</li>
            </ul>
          </div>
        </div>
        {/* /Page Header */}

        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-header">
                <h4 className="card-title mb-0">Department Form</h4>
              </div>
              <div className="card-body">
                <h4 className="card-title">Department Information</h4>
                <form action="#">
                  <div className="row">
                    <div className="col-xl-6">
                      <div className="form-group row">
                        <label className="col-lg-3 col-form-label">Name</label>
                        <div className="col-lg-9">
                          <input type="text" name="name" className="form-control" onChange={handleInputField} value={name}/>
                        </div>
                      </div>
                      <div className="form-group row">
                        <label className="col-lg-3 col-form-label">Email</label>
                        <div className="col-lg-9">
                          <input type="text" name="email" className="form-control" onChange={handleInputField} value={email}/>
                        </div>
                      </div>

                      <div className="form-group row">
                        <label className="col-lg-3 col-form-label">
                          Address
                        </label>
                        <div className="col-lg-9">
                          <input type="text" name='address'className="form-control" onChange={handleInputField} value={address}/>
                        </div>
                      </div>
                    </div>
                    <div className="col-xl-6">
                      <div className="form-group row">
                      <label className="col-lg-3 col-form-label">
                          Mobile No.
                        </label>
                        <div className="col-lg-9">
                          <input type="text" name="mobile" className="form-control" onChange={handleInputField} value={mobile}/>
                        </div>
                       
                      </div>
                      <div className="form-group row">
                      <label className="col-lg-3 col-form-label">
                          Company Code
                        </label>
                        <div className="col-lg-9">
                          <input type="text" name="compcode" className="form-control" onChange={handleInputField} value={compcode}/>
                        </div>
                      
                      </div>
                      {/* <div className="form-group row">
                      <label className="col-lg-3 col-form-label">
                          Segment
                        </label>
                        <div className="col-lg-9">
                          <input type="text" name="segment" className="form-control" onChange={handleInputField} value={segment}/>
                        </div>
                      
                      </div> */}
                    </div>
                  </div>

                  <div className="text-end">
                    <button type="submit" className="btn btn-primary" onClick={saveHandler}>
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DepartmentPage