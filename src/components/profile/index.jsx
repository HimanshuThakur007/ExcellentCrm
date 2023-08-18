import React from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import {avatar02,avatar16} from "../imagepath"
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const Profile =()=> {
  const userData = sessionStorage.getItem('userData')
  if(userData !== null){
  var username = JSON.parse(userData).Admin;
  }

  const [phone, setPhone] = React.useState()

    return (
      <div className="page-wrapper">
        <Helmet>
            <title>Profile - S&S Enterprises</title>
            <meta name="description" content="Reactify Blank Page" />
        </Helmet>
        {/* Page Content */}
        <div className="content container-fluid">
          <div className="crms-title row bg-white">
            <div className="col  p-0">
              <h3 className="page-title m-0">
                <span className="page-title-icon bg-gradient-primary text-white me-2">
                  <i className="feather-user" />
                </span> Employee Profile </h3>
            </div>
            <div className="col p-0 text-end">
              <ul className="breadcrumb bg-white float-end m-0 pl-0 pr-0">
                <li className="breadcrumb-item"><Link to="/">Dashboard</Link></li>
                <li className="breadcrumb-item active">Employee Profile</li>
              </ul>
            </div>
          </div>
          {/* Page Header */}
          <div className="page-header pt-3 mb-0">
            <div className="card ">
              <div className="card-body">
                <div className="row">
                  <div className="col-md-12">
                    <div className="profile-view">
                      <div className="profile-img-wrap">
                        <div className="profile-img">
                          <a href="#"><img alt="" src={avatar02} /></a>
                        </div>
                      </div>
                      <div className="profile-basic">
                        <div className="row">
                          <div className="col-md-5">
                            <div className="profile-info-left">
                              <h3 className="user-name m-t-0 mb-0">{username}</h3>
                              {/* <h6 className="text-muted">UI/UX Design Team</h6> */}
                              <small className="text-muted">CEO</small>
                              {/* <div className="staff-id">Employee ID : FT-0001</div>
                              <div className="small doj text-muted">Date of Join : 1st Jan 2013</div> */}
                              {/* <div className="staff-msg"><a className="btn btn-custom" href="#">Send Message</a></div> */}
                            </div>
                          </div>
                          <div className="col-md-7">
                            <ul className="personal-info">
                              <li>
                                <div className="title">Phone:</div>
                                <div className="text"><a>9876543210</a></div>
                              </li>
                              <li>
                                <div className="title">Email:</div>
                                <div className="text"><a>johndoe@example.com</a></div>
                              </li>
                              <li>
                                <div className="title">Birthday:</div>
                                <div className="text">24th July</div>
                              </li>
                              <li>
                                <div className="title">Address:</div>
                                <div className="text">1861 Bayonne Ave, Manchester Township, NJ, 08759</div>
                              </li>
                              <li>
                                <div className="title">Gender:</div>
                                <div className="text">Male</div>
                              </li>
                              {/* <li>
                                <div className="title">Reports to:</div>
                                <div className="text">
                                  <div className="avatar-box">
                                    <div className="avatar avatar-xs">
                                      <img src={avatar16} alt="" />
                                    </div>
                                  </div>
                                  <Link to="profile">
                                    Jeffery Lalor
                                  </Link>
                                </div>
                              </li> */}
                            </ul>
                          </div>
                        </div>
                      </div>
                      <div className="pro-edit"><a data-bs-target="#profile_info" data-bs-toggle="modal" className="edit-icon" href="#"><i className="fa fa-pencil" /></a></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
                {/*modal section starts here*/}
                <div className="modal right fade" id="profile_info" tabIndex={-1} role="dialog" aria-modal="true">
        <div className="modal-dialog" role="document">
          <button type="button" className="close md-close" data-bs-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title text-center">Profile</h4>
              <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div className="modal-body">
              <div className="row">
                <div className="col-md-12">
                  <form>
                    <h4>Profile Details</h4>
                    <div className="form-group row">
                      <div className="col-sm-6">
                        <label className="col-form-label">Phone <span className="text-danger">*</span></label>
                        <input className="form-control" type="text" name="phone" id="task-name" placeholder="Phone" />
                      </div>
                      <div className="col-sm-6">
                      <label className="col-form-label">Email<span className="text-danger">*</span></label>
                        <input className="form-control" type="email" name="email" id="task-name" placeholder="Email" />
                      </div>
                    </div>
                    <div className="form-group row">
                     
                      <div className="col-sm-6">
                        <label className="col-form-label">BirthDay <span className="text-danger">*</span></label>
                        <div className="cal-icon" style={{ width: "100%" }}>
                          {/* <input className="form-control" type="text" placeholder="MM/DD/YY" /> */}
                          <DatePicker
                            className="form-control"
                            // selected={[()]}
                            onChange={()=>{}}
                            dateFormat="dd/MM/yyyy"
                            showDayMonthYearPicker />
                        </div>
                      </div>
                      <div className="col-sm-6">
                      <label className="col-form-label">Address<span className="text-danger">*</span></label>
                        <input className="form-control" type="text" name="add" id="task-name" placeholder="Address" />
                      </div>
                    </div>
                    <div className="form-group row">
                     
                      <div className="col-sm-6">
                      <label className="col-form-label">Gender<span className="text-danger">*</span></label>
                        <input className="form-control" type="text" name="gender" id="task-name" placeholder="Gender" />
                      </div>
                    </div>
                    <h4>Personal Information</h4>
                    <div className="form-group row">
                      <div className="col-sm-6">
                      <label className="col-form-label">Passport No.<span className="text-danger">*</span></label>
                        <input className="form-control" type="text" name="passport" id="task-name" placeholder="Passport No." />
                      </div>
                      <div className="col-sm-6">
                        <label className="col-form-label">Passport Exp Date.<span className="text-danger">*</span></label>
                        <div className="cal-icon"> 
                        <DatePicker
                            className="form-control"
                            // selected={selectedDate3}
                            // onChange={handleDateChange3}
                            dateFormat="dd/MM/yyyy"
                            showDayMonthYearPicker />
                            </div>
                      </div>
                    </div>
                    <div className="form-group row">
                      <div className="col-sm-6">
                        <label className="col-form-label">Tel</label>
                        <input className="form-control" type="number" name="tel" placeholder="Tel" />
                      </div>
                      <div className="col-sm-6">
                        <label className="col-form-label">Nationality</label>
                        <input className="form-control" type="text" name="nationality" placeholder="Nationality" />
                      </div>
                    </div>
                    <div className="form-group row">
                      <div className="col-sm-6">
                      <label className="col-form-label">Religion</label>
                        <input className="form-control" type="text" name="religion" placeholder="Religion" />
                       
                      </div>
                      <div className="col-sm-6">
                      <label className="col-form-label">Marital status</label>
                        <input className="form-control" type="text" name="maritalstatus" placeholder="Marital status" />
                      </div>
                    </div>
                    <div className="form-group row">
                      <div className="col-sm-6">
                      <label className="col-form-label">Employment of spouse</label>
                        <input className="form-control" type="text" name="employment" placeholder="Employment of spouse" />
                      </div>
                      <div className="col-sm-6">
                      <label className="col-form-label">No. of children</label>
                        <input className="form-control" type="text" name="children" placeholder="No. of children" />
                      </div>
                    </div>
                    <h4>Emergency Contact</h4>
                    <div className="form-group row">
                      <div className="col-sm-6">
                      <label className="col-form-label">Primary</label>
                        <input className="form-control" type="number" name="primary" placeholder="Primary" />
                      </div>
                      <div className="col-sm-6">
                      <label className="col-form-label">Name</label>
                        <input className="form-control" type="text" name="name" placeholder="Name" />
                      </div>
                    </div>
                    <div className="form-group row">
                      <div className="col-sm-6">
                      <label className="col-form-label">Relationship</label>
                        <input className="form-control" type="text" name="relation" placeholder="Relationship" />
                      </div>
                      <div className="col-sm-6">
                      <label className="col-form-label">Phone</label>
                        <input className="form-control" type="number" name="phone" placeholder="Phone" />
                      </div>
                    </div>
                    {/* <h4>Description Information</h4>
                    <div className="form-group row">
                      <div className="col-sm-12">
                        <label className="col-form-label">Description </label>
                        <textarea className="form-control" rows={3} id="description" placeholder="Description" defaultValue={""} />
                      </div>
                    </div>
                    <h4>Permissions</h4>
                    <div className="form-group row">
                      <div className="col-sm-6">
                        <label className="col-form-label">Permission</label>
                        <select className="form-control">
                          <option>Task Visibility</option>
                          <option>Private Task</option>
                        </select>
                      </div>
                    </div> */}
                    <div className="text-center py-3">
                      <button type="button" className="border-0 btn btn-primary btn-gradient-primary btn-rounded">Save</button>&nbsp;&nbsp;
                      <button type="button" className="btn btn-secondary btn-rounded">Cancel</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>{/* modal-content */}
        </div>{/* modal-dialog */}
      </div>
        {/* Modal-end */}
            <div className="tab-content p-0">
              {/* Profile Info Tab */}
              <div id="emp_profile" className="pro-overview tab-pane fade show active">
                <div className="row">
                  <div className="col-md-6 d-flex">
                    <div className="card profile-box flex-fill">
                      <div className="card-body">
                        <h3 className="card-title">Personal Informations <a href="#" className="edit-icon" data-bs-toggle="modal" data-bs-target="#personal_info_modal"><i className="fa fa-pencil" /></a></h3>
                        <ul className="personal-info">
                          <li>
                            <div className="title">Passport No.</div>
                            <div className="text">9876543210</div>
                          </li>
                          <li>
                            <div className="title">Passport Exp Date.</div>
                            <div className="text">9876543210</div>
                          </li>
                          <li>
                            <div className="title">Tel</div>
                            <div className="text"><a>9876543210</a></div>
                          </li>
                          <li>
                            <div className="title">Nationality</div>
                            <div className="text">Indian</div>
                          </li>
                          <li>
                            <div className="title">Religion</div>
                            <div className="text">Christian</div>
                          </li>
                          <li>
                            <div className="title">Marital status</div>
                            <div className="text">Married</div>
                          </li>
                          <li>
                            <div className="title">Employment of spouse</div>
                            <div className="text">No</div>
                          </li>
                          <li>
                            <div className="title">No. of children</div>
                            <div className="text">2</div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 d-flex">
                    <div className="card profile-box flex-fill">
                      <div className="card-body">
                        <h3 className="card-title">Emergency Contact <a href="#" className="edit-icon" data-bs-toggle="modal" data-bs-target="#emergency_contact_modal"><i className="fa fa-pencil" /></a></h3>
                        <h5 className="section-title">Primary</h5>
                        <ul className="personal-info">
                          <li>
                            <div className="title">Name</div>
                            <div className="text">John Doe</div>
                          </li>
                          <li>
                            <div className="title">Relationship</div>
                            <div className="text">Father</div>
                          </li>
                          <li>
                            <div className="title">Phone </div>
                            <div className="text">9876543210, 9876543210</div>
                          </li>
                        </ul>
                        <hr />
                        <h5 className="section-title">Secondary</h5>
                        <ul className="personal-info">
                          <li>
                            <div className="title">Name</div>
                            <div className="text">Karen Wills</div>
                          </li>
                          <li>
                            <div className="title">Relationship</div>
                            <div className="text">Brother</div>
                          </li>
                          <li>
                            <div className="title">Phone </div>
                            <div className="text">9876543210, 9876543210</div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                {/* <div className="row">
                  <div className="col-md-6 d-flex">
                    <div className="card profile-box flex-fill">
                      <div className="card-body">
                        <h3 className="card-title">Bank information</h3>
                        <ul className="personal-info">
                          <li>
                            <div className="title">Bank name</div>
                            <div className="text">ICICI Bank</div>
                          </li>
                          <li>
                            <div className="title">Bank account No.</div>
                            <div className="text">159843014641</div>
                          </li>
                          <li>
                            <div className="title">IFSC Code</div>
                            <div className="text">ICI24504</div>
                          </li>
                          <li>
                            <div className="title">PAN No</div>
                            <div className="text">TC000Y56</div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 d-flex">
                    <div className="card profile-box flex-fill">
                      <div className="card-body">
                        <h3 className="card-title">Family Informations <a href="#" className="edit-icon" data-bs-toggle="modal" data-bs-target="#family_info_modal"><i className="fa fa-pencil" /></a></h3>
                        <div className="table-responsive">
                          <table className="table table-nowrap">
                            <thead>
                              <tr>
                                <th>Name</th>
                                <th>Relationship</th>
                                <th>Date of Birth</th>
                                <th>Phone</th>
                                <th />
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td>Leo</td>
                                <td>Brother</td>
                                <td>Feb 16th, 2019</td>
                                <td>9876543210</td>
                                <td className="text-end">
                                  <div className="dropdown dropdown-action">
                                    <a aria-expanded="false" data-bs-toggle="dropdown" className="action-icon dropdown-toggle" href="#"><i className="material-icons">more_vert</i></a>
                                    <div className="dropdown-menu dropdown-menu-right">
                                      <a href="#" className="dropdown-item"><i className="fa fa-pencil m-r-5" /> Edit</a>
                                      <a href="#" className="dropdown-item"><i className="fa fa-trash-o m-r-5" /> Delete</a>
                                    </div>
                                  </div>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div> */}
                {/* <div className="row">
                  <div className="col-md-6 d-flex">
                    <div className="card profile-box flex-fill mb-0">
                      <div className="card-body">
                        <h3 className="card-title">Education Informations <a href="#" className="edit-icon" data-bs-toggle="modal" data-bs-target="#education_info"><i className="fa fa-pencil" /></a></h3>
                        <div className="experience-box">
                          <ul className="experience-list">
                            <li>
                              <div className="experience-user">
                                <div className="before-circle" />
                              </div>
                              <div className="experience-content">
                                <div className="timeline-content">
                                  <a href="#/" className="name">International College of Arts and Science (UG)</a>
                                  <div>Bsc Computer Science</div>
                                  <span className="time">2000 - 2003</span>
                                </div>
                              </div>
                            </li>
                            <li>
                              <div className="experience-user">
                                <div className="before-circle" />
                              </div>
                              <div className="experience-content">
                                <div className="timeline-content">
                                  <a href="#/" className="name">International College of Arts and Science (PG)</a>
                                  <div>Msc Computer Science</div>
                                  <span className="time">2000 - 2003</span>
                                </div>
                              </div>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 d-flex">
                    <div className="card profile-box flex-fill mb-0">
                      <div className="card-body">
                        <h3 className="card-title">Experience <a href="#" className="edit-icon" data-bs-toggle="modal" data-bs-target="#experience_info"><i className="fa fa-pencil" /></a></h3>
                        <div className="experience-box">
                          <ul className="experience-list">
                            <li>
                              <div className="experience-user">
                                <div className="before-circle" />
                              </div>
                              <div className="experience-content">
                                <div className="timeline-content">
                                  <a href="#/" className="name">Web Designer at Zen Corporation</a>
                                  <span className="time">Jan 2013 - Present (5 years 2 months)</span>
                                </div>
                              </div>
                            </li>
                            <li>
                              <div className="experience-user">
                                <div className="before-circle" />
                              </div>
                              <div className="experience-content">
                                <div className="timeline-content">
                                  <a href="#/" className="name">Web Designer at Ron-tech</a>
                                  <span className="time">Jan 2013 - Present (5 years 2 months)</span>
                                </div>
                              </div>
                            </li>
                            <li>
                              <div className="experience-user">
                                <div className="before-circle" />
                              </div>
                              <div className="experience-content">
                                <div className="timeline-content">
                                  <a href="#/" className="name">Web Designer at Dalt Technology</a>
                                  <span className="time">Jan 2013 - Present (5 years 2 months)</span>
                                </div>
                              </div>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div> */}
              </div>
              {/* /Profile Info Tab */}
            </div>
          </div>
          {/* /Page Header */}
        </div>
        {/* /Page Content */}
      </div>
    );
  }
export default Profile;
