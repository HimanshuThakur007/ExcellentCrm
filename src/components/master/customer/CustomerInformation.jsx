import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import Select from "react-select";
import ReactLoader from "../../CommonFile/ReactLoader";

const CustomerInformation = ({handleInputField, saveHandler, loading, inputValue,masterGrpData,selectHandler,masterGroupSelect}) => {
  const { custname, archname, email, mobile, reference, gst, archmobile,add1 ,add2, add3, add4, masterGrp } = inputValue;
  return (
    <div className="page-wrapper">
    <Helmet>
      <title>CustomerInformation - S&S Enterprises</title>
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
            Customer{" "}
          </h3>
        </div>
        <div className="col p-0 text-end">
          <ul className="breadcrumb bg-white float-end m-0 pl-0 pr-0">
            <li className="breadcrumb-item">
              <Link to="/">Dashboard</Link>
            </li>
            <li className="breadcrumb-item active">Customer</li>
          </ul>
        </div>
      </div>
      {/* /Page Header */}

      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title mb-0">Customer Form</h4>
            </div>
            <div className="card-body">
              <h4 className="card-title">Customer Information</h4>
              <form action="#">
                <div className="row">
                  <div className="col-xl-6">
                    <div className="form-group row">
                      <label className="col-lg-3 col-form-label">Name</label>
                      <div className="col-lg-9">
                        <input type="text" name="custname" className="form-control" onChange={handleInputField} value={custname}/>
                      </div>
                    </div>
                    <div className="form-group row">
                      <label className="col-lg-3 col-form-label">Email</label>
                      <div className="col-lg-9">
                        <input type="text" name="email" className="form-control" onChange={handleInputField} value={email}/>
                      </div>
                    </div>
                    <div className="form-group row">
                    <label className="col-lg-3 col-form-label">Master Group</label>
                  <div className="col-lg-9">
                      <Select
                          name='masterGrp'
                           placeholder = "Master Group"
                           value={masterGroupSelect}
                           onChange={selectHandler}
                           options={masterGrpData}
                       />
                  </div>
                    
                    </div>

                    <div className="form-group row">
                    <label className="col-lg-3 col-form-label">
                      GST No.
                      </label>
                      <div className="col-lg-9">
                        <input type="text" name="gst" className="form-control" onChange={handleInputField} value={gst} />
                      </div>
                      {/* <label className="col-lg-3 col-form-label">
                      Architect Name
                      </label>
                      <div className="col-lg-9">
                        <input type="text" name="archname" className="form-control" onChange={handleInputField} value={archname}/>
                      </div> */}
                    </div>
                    <div className="form-group row">
                    <label className="col-lg-3 col-form-label">
                      Reference
                      </label>
                      <div className="col-lg-9">
                        <input type="text" name="reference" className="form-control" onChange={handleInputField} value={reference}/>
                      </div>
                     
                    </div>
                   
                    <div className="form-group row">
                    
                      <label className="col-lg-3 col-form-label">
                      Architect Name
                      </label>
                      <div className="col-lg-9">
                        <input type="text" name="archname" className="form-control" onChange={handleInputField} value={archname}/>
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
                      Address
                      </label>
                      <div className="col-lg-9">
                        <input type="text" name="add1" placeholder='Address' className="form-control" onChange={handleInputField} value={add1}/>
                      </div>
                    </div>
                    <div className="form-group row">
                      <label className="col-lg-3 col-form-label">
                      {/* Address */}
                      </label>
                      <div className="col-lg-9">
                        <input type="text" name="add2" placeholder='Address' className="form-control" onChange={handleInputField} value={add2}/>
                      </div>
                    </div>
                    <div className="form-group row">
                      <label className="col-lg-3 col-form-label">
                      {/* Address */}
                      </label>
                      <div className="col-lg-9">
                        <input type="text" name="add3" placeholder='Address' className="form-control" onChange={handleInputField} value={add3}/>
                      </div>
                    </div>
                    <div className="form-group row">
                      <label className="col-lg-3 col-form-label">
                      {/* Address */}
                      </label>
                      <div className="col-lg-9">
                        <input type="text" name="add4" placeholder='Address' className="form-control" onChange={handleInputField} value={add4}/>
                      </div>
                    </div>
                  
                    <div className="form-group row">
                    
                    <label className="col-lg-3 col-form-label">
                    Architect Mobile No.
                    </label>
                    <div className="col-lg-9">
                      <input type="text" name="archmobile" className="form-control" onChange={handleInputField} value={archmobile} />
                    </div> 
                  </div>
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

export default CustomerInformation