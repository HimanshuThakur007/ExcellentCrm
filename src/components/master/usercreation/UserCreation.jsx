import React, { useEffect, useState } from 'react';
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import Select from 'react-select';

const UserCreation = ({typelist,selectHandler,blockList,blockOption,handleInputField,blockHandler,
  saveHandler,inputValue,selectedOption,departmentList,DepartementHandler,department,typeVal,handleMultiSelectChange,multiSelectValue}) => {
    const {username, password,email,confirmpassword,mobile, type} = inputValue;

   
  return (
    <div className="page-wrapper" key={inputValue}>
    <Helmet>
          <title>Create User - CRMS</title>
          <meta name="description" content="Login page"/>					
    </Helmet>
<div className="content container-fluid">
  {/* Page Header */}
  <div className="crms-title row bg-white mb-4">
       <div className="col  p-0">
       <h3 className="page-title">
           <span className="page-title-icon bg-gradient-primary text-white me-2">
           <i className="fa fa-object-group" aria-hidden="true" />
           </span> Create Users </h3>
       </div>
       <div className="col p-0 text-end">
       <ul className="breadcrumb bg-white float-end m-0 pl-0 pr-0">
           <li className="breadcrumb-item"><Link to="/">Dashboard</Link></li>
           <li className="breadcrumb-item active">Create Users</li>
       </ul>
       </div>
   </div>
  {/* /Page Header */}
  
  <div className="row">
    <div className="col-md-12">
      <div className="card">
        <div className="card-header">
          <h4 className="card-title mb-0">Create Users Form</h4>
        </div>
        <div className="card-body">
          <h4 className="card-title">Users Information</h4>
          <form action="#">
            <div className="row">
              <div className="col-xl-6">
                <div className="form-group row">
                  <label className="col-lg-3 col-form-label">Name</label>
                  <div className="col-lg-9">
                    <input type="text" name='username' className="form-control" onChange={handleInputField} value={username}/>
                  </div>
                </div>
                <div className="form-group row">
                    
              
                  <label className="col-lg-3 col-form-label">Email</label>
                  <div className="col-lg-9">
                    <input type="text" name='email' className="form-control" onChange={handleInputField} value={email}/>
                  </div>
               
                </div>
                <div className="form-group row">
                  <label className="col-lg-3 col-form-label">Block</label>
                  <div className="col-lg-9">
                      <Select
                           placeholder = "Yes/No"
                           value={blockOption}
                           onChange={blockHandler}
                           options={blockList}
                       />
                  </div>
                 
                </div>
                
                 
               
                <div className="form-group row">
                   <label className="col-lg-3 col-form-label">Password</label>
                  <div className="col-lg-9">
                    <input type="password" name='password' className="form-control" onChange={handleInputField} value={password}/>
                  </div>
                 
                </div>
              </div>
              <div className="col-xl-6">
              <div className="form-group row">
                  <label className="col-lg-3 col-form-label">Mobile No</label>
                  <div className="col-lg-9">
                    <input type="text" name='mobile' className="form-control" onChange={handleInputField} value={mobile}/>
                  </div>
                </div>
              
                <div className="form-group row">
                  
                 <label className="col-lg-3 col-form-label">Type</label>
                  <div className="col-lg-9">
                      <Select
                          name='typelist'
                           placeholder = "Type"
                           value={selectedOption}
                           onChange={selectHandler}
                           options={typelist}
                       />
                  </div>
                  
                </div>
                <div className="form-group row">
                
                  
                  <label className="col-lg-3 col-form-label">Department</label>
                  <div className="col-lg-9">
                    {
                    typeVal != 4?(
                    
                      <Select
                          name='department'
                           placeholder = "Department"
                           value={department}
                           onChange={DepartementHandler}
                           options={departmentList}
                       />
                       ):(
                          <Select
                          name='multidepartment'
                          isMulti
                           placeholder = "Multiselect Department"
                           value={multiSelectValue}
                           onChange={handleMultiSelectChange}
                           options={departmentList}
                       />
                       )
                  }
                  </div> 
                  
                </div>
                
              </div>
            </div>
           
            <div className="text-end">
              <button onClick={saveHandler} className="btn btn-primary">Submit</button>
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

export default UserCreation