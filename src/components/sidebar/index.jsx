
import React from "react";
import { Link, withRouter,useParams } from "react-router-dom";
import { Scrollbars } from "react-custom-scrollbars";
import { avatar17 } from '../imagepath';
import { BiAward, BiBarChartAlt2, BiCalendarAlt, BiClipboard, BiCog, BiCoinStack, BiCommand, BiCube, BiData, BiDockLeft, BiDockTop, BiEnvelope, BiError, BiGridAlt, BiHomeAlt, BiMenu, BiMobileAlt, BiPodcast, BiSearchAlt2, BiStation, BiTask, BiUser } from "react-icons/bi";
import {SiMastercomfig} from 'react-icons/si'
import {FcDataConfiguration} from 'react-icons/fc'
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import {RiChatFollowUpLine} from 'react-icons/ri'


const SidebarNav = (props) => {
  const param = useParams();
  console.log('paramssssssss', param)
  const exclusionArray = ["login", "register", "forgot-password", "error-404", "error-500", "email", "mail-view", "components"];
  if (
    exclusionArray.indexOf(props.location.pathname.split("/")[1]) >= 0
  ) {
    return "";
  }
  const { location } = props
  let pathname = location.pathname
  let history = useHistory()
  const userData = sessionStorage.getItem('userData')
  if(userData !== null){
  var username = JSON.parse(userData).Admin;
  }
  console.log('pathname', pathname)

  // --------sidebar jQUERRY-------------
  var Sidemenu = function() {
    this.$menuItem = $('#sidebar-menu a');
};

function init() {
    var $this = Sidemenu;
    $('#sidebar-menu a').on('click', function(e) {
        if ($(this).parent().hasClass('submenu')) {
            e.preventDefault();
        }
        if (!$(this).hasClass('subdrop')) {
            $('.sub-menus', $(this).parents('.sub-menus:first')).slideUp(350);
            $('a', $(this).parents('.sub-menus:first')).removeClass('subdrop');
            $(this).next('.sub-menus').slideDown(350);
            $(this).addClass('subdrop');
        } else if ($(this).hasClass('subdrop')) {
            $(this).removeClass('subdrop');
            $(this).next('.sub-menus').slideUp(350);
        }
    });
    $('#sidebar-menu ul li.submenu a.active').parents('li:last').children('a:first').addClass('active').trigger('click');
}

// Sidebar Initiate
React.useEffect(()=>{
  init();
},[])
// -------------------------------------------------------------------------------------------------------------------------------
  return (
    <div className="sidebar" id="sidebar">
      <Scrollbars>
        <div className="sidebar-inner slimscroll">
          <form action="search.html" className="mobile-view">
            <input
              className="form-control"
              type="text"
              placeholder="Search here"
            />
            <button className="btn" type="button">
              <BiSearchAlt2 />
            </button>
          </form>
          <div id="sidebar-menu" className="sidebar-menu">
            <ul>
              <li className="nav-item nav-profile">
                <Link to="/" className="nav-link">
                  <div className="nav-profile-image">
                    <img src={avatar17} alt="profile" />
                  </div>
                  <div className="nav-profile-text d-flex flex-column">
                    <span className="font-weight-bold mb-2">
                      {username || ""}
                    </span>
                    <span className="text-white text-small">
                      S&S Enterprises
                    </span>
                  </div>
                  <i className="mdi mdi-bookmark-check text-success nav-profile-badge" />
                </Link>
              </li>
              <li className="menu-title">
                <span>Main</span>
              </li>
              <li>
                <Link className={`${pathname === "/" ? "active" : ""}`} to="/">
                  <BiHomeAlt />
                  <span>Dashboard</span>
                </Link>
              </li>
              <li>
                <Link className={`${pathname === "/userdashboard" ? "active" : ""}`} to="/userdashboard">
                  <BiHomeAlt />
                  <span>User Dashboard</span>
                </Link>
              </li>
              <li>
                <Link
                  className={`${pathname === "/configuration" ? "active" : ""}`}
                  to="/configuration"
                >
                  <FcDataConfiguration />
                  <span>Configuration</span>
                </Link>
              </li>

              <li className="submenu">
                <Link
                  to="#"
                  className={`${
                    pathname === "/ursecreation" ||
                    pathname === "/department" ||
                    pathname === "/customer" ||
                    pathname === "/modify/1" ||
                    pathname === "/list/1" ||
                    pathname === "/modify/3" ||
                    pathname === "/list/3" ||
                    pathname === "/modify/2" ||
                    pathname === "/list/2" ||
                    pathname === "/importcustomer" ||
                    pathname === "/importitem" ||
                    pathname === "/itemlist"||
                    pathname === "/purpose"||
                    pathname === "/architect"
                      ? "active subdrop"
                      : ""
                  }`}
                >
                  <SiMastercomfig /> <span>Master</span>{" "}
                  <span className="menu-arrow" />
                </Link>
                <ul className="sub-menus">
                  <li className="submenu">
                    <Link to="#">
                      {" "}
                      <span>Department</span> <span className="menu-arrow" />
                    </Link>
                    <ul className="sub-menus">
                      <li>
                        <Link
                          to="/department"
                          className={`${
                            pathname === "/department" ? "active" : ""
                          }`}
                        >
                          Add
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/modify/3"
                          className={`${
                            pathname === "/modify/3" ? "active" : ""
                          }`}
                        >
                          <span>Modify</span>
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/list/3"
                          className={`${
                            pathname === "/list/3" ? "active" : ""
                          }`}
                        >
                          <span>List</span>
                        </Link>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <li className="submenu">
                      <Link to="#">
                        {" "}
                        <span>User</span> <span className="menu-arrow" />
                      </Link>
                      <ul className="sub-menus">
                        <li>
                          <Link
                            to="/ursecreation"
                            className={`${
                              pathname === "/ursecreation" ? "active" : ""
                            }`}
                          >
                            Add
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/modify/1"
                            className={`${
                              pathname === "/modify/1" ? "active" : ""
                            }`}
                            key={"/ursecreation"}
                          >
                            <span>Modify</span>
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/list/1"
                            className={`${
                              pathname === "/list/1" ? "active" : ""
                            }`}
                          >
                            <span>List</span>
                          </Link>
                        </li>
                      </ul>
                    </li>
                    <li className="submenu">
                      <Link to="#">
                        {" "}
                        <span>Customer</span> <span className="menu-arrow" />
                      </Link>
                      <ul className="sub-menus">
                        <li>
                          <Link
                            to="/customer"
                            className={`${
                              pathname === "/customer" ? "active" : ""
                            }`}
                          >
                            Add
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/modify/2"
                            className={`${
                              pathname === "/modify/2" ? "active" : ""
                            }`}
                          >
                            <span>Modify</span>
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/list/2"
                            className={`${
                              pathname === "/list/2" ? "active" : ""
                            }`}
                          >
                            <span>List</span>
                          </Link>
                        </li>

                        <li>
                          <Link
                            to="/importcustomer"
                            className={`${
                              pathname === "/importcustomer" ? "active" : ""
                            }`}
                          >
                            Import
                          </Link>
                        </li>
                      </ul>
                    </li>
                    <li className="submenu">
                      <Link to="#">
                        {" "}
                        <span>Purpose</span> <span className="menu-arrow" />
                      </Link>
                      <ul className="sub-menus">
                        <li>
                          <Link
                            to="/purpose"
                            className={`${
                              pathname === "/purpose" ? "active" : ""
                            }`}
                          >
                            Add
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/modify/4"
                            className={`${
                              pathname === "/modify/4" ? "active" : ""
                            }`}
                          >
                            <span>Modify</span>
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/list/4"
                            className={`${
                              pathname === "/list/4" ? "active" : ""
                            }`}
                          >
                            <span>List</span>
                          </Link>
                        </li>
                      </ul>
                    </li>

{/* -----------business-nature----------- */}

<li className="submenu">
                      <Link to="#">
                        {" "}
                        <span>Business Nature</span> <span className="menu-arrow" />
                      </Link>
                      <ul className="sub-menus">
                        <li>
                          <Link
                            to="/businessnature"
                            className={`${
                              pathname === "/businessnature" ? "active" : ""
                            }`}
                          >
                            Add
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/modify/6"
                            className={`${
                              pathname === "/modify/6" ? "active" : ""
                            }`}
                          >
                            <span>Modify</span>
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/list/6"
                            className={`${
                              pathname === "/list/6" ? "active" : ""
                            }`}
                          > 
                            <span>List</span>
                          </Link>
                        </li>
                      </ul>
                    </li>


                    <li className="submenu">
                      <Link to="#">
                        {" "}
                        <span>Contractor</span> <span className="menu-arrow" />
                      </Link>
                      <ul className="sub-menus">
                        <li>
                          <Link
                            to="/architect"
                            className={`${
                              pathname === "/architect" ? "active" : ""
                            }`}
                          >
                            Add
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/modify/5"
                            className={`${
                              pathname === "/modify/5" ? "active" : ""
                            }`}
                          >
                            <span>Modify</span>
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/list/5"
                            className={`${
                              pathname === "/list/5" ? "active" : ""
                            }`}
                          >
                            <span>List</span>
                          </Link>
                        </li>
                      </ul>
                    </li>

                    

                    <li className="submenu">
                      <Link to="#">
                        {" "}
                        <span>Item</span> <span className="menu-arrow" />
                      </Link>
                      <ul className="sub-menus">
                        <li>
                          <Link
                            to="/importitem"
                            className={`${
                              pathname === "/importitem" ? "active" : ""
                            }`}
                          >
                            <span>Import</span>
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/itemlist"
                            className={`${
                              pathname === "/itemlist" ? "active" : ""
                            }`}
                          >
                            <span>List</span>
                          </Link>
                        </li>
                        {/* <li><Link to= '/list/2' className={`${pathname === "/list/2" ? "active" : ""}`}><span>List</span></Link></li> */}
                      </ul>
                    </li>
                    {/* <li>
              <Link className={`${pathname.includes("importdata") ? "active" : ""}`} to="/importcustomer"><span>Import</span></Link>
            </li> */}
                  </li>
                </ul>
              </li>
              <li>
                <Link
                  className={`${pathname === "/leads" ? "active" : ""}`}
                  to="/leads"
                >
                  <BiUser />
                  <span>Leads</span>
                </Link>
              </li>
              <li>
                <Link
                  className={`${pathname === "/followup" ? "active" : ""}`}
                  to="/followup"
                >
                  <RiChatFollowUpLine />
                  <span>FollowUp</span>
                </Link>
              </li>
{/* --------------------Task------------------- */}
              {/* <li>
                <Link
                  className={`${pathname.includes("tasks") ? "active" : ""}`}
                  to="/tasks"
                >
                  <BiTask />
                  <span>Tasks</span>
                </Link>
              </li> */}
              <li>
                <Link
                  className={`${pathname.includes("contacts") ? "active" : ""}`}
                  to="/contacts"
                >
                  <BiMobileAlt /> <span>Contacts</span>
                </Link>
              </li>
              <li>
                <Link
                  className={`${
                    pathname.includes("companies") ? "active" : ""
                  }`}
                  to="/companies"
                >
                  <BiData /> <span>Companies</span>
                </Link>
              </li>
              {/* -----Deals----------- */}

              {/* <li>
                <Link
                  className={`${pathname.includes("deals") ? "active" : ""}`}
                  to="/deals"
                >
                  <BiStation /> <span>Deals</span>
                </Link>
              </li> */}
              <li>
                <Link
                  className={`${pathname === "/projects" ? "active" : ""}`}
                  to="/projects"
                >
                  <BiGridAlt /> <span>Projects</span>
                </Link>
              </li>
              <li>
                <Link
                  className={`${pathname.includes("reports") ? "active" : ""}`}
                  to="/reports"
                >
                  <BiBarChartAlt2 /> <span>Reports</span>
                </Link>
              </li>
              {/* --------------Activities------------------ */}
              {/* <li>
                <Link
                  className={`${
                    pathname.includes("activities") ? "active" : ""
                  }`}
                  to="/activities"
                >
                  <BiClipboard /> <span>Activities</span>
                </Link>
              </li> */}
              {/* -----------------Bloag-------------------- */}
              {/* <li className="submenu">
                <Link
                  to="#"
                  className={`${
                    pathname === "/blog" ||
                    pathname === "/add-blog" ||
                    pathname === "/edit-blog" ||
                    pathname === "categories"
                      ? "active subdrop"
                      : ""
                  }`}
                >
                  <BiGridAlt /> <span>Blogs</span>{" "}
                  <span className="menu-arrow" />
                </Link>
                <ul className="sub-menus">
                  <li>
                    <Link
                      to="/blog"
                      className={`${
                        pathname === "/blog" || pathname === "/pending-blog"
                          ? "active"
                          : ""
                      }`}
                    >
                      All Blogs
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/add-blog"
                      className={`${pathname === "/add-blog" ? "active" : ""}`}
                    >
                      Add Blog
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/edit-blog"
                      className={`${pathname === "/edit-blog" ? "active" : ""}`}
                    >
                      Edit Blog
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/categories"
                      className={`${
                        pathname === "/categories" ? "active" : ""
                      }`}
                    >
                      Categories
                    </Link>
                  </li>
                </ul>
              </li> */}
              <li className="submenu">
                <Link
                  to="#"
                  className={`${
                    pathname === "/invoices" ||
                    pathname === "/invoice-grid" ||
                    pathname === "/add-invoice" ||
                    pathname === "edit-invoice" ||
                    pathname === "view-invoice" ||
                    pathname === "invoices-settings"
                      ? "active subdrop"
                      : ""
                  }`}
                >
                  <BiCalendarAlt /> <span>Invoices </span>{" "}
                  <span className="menu-arrow" />
                </Link>
                <ul className="sub-menus">
                  <li>
                    <Link
                      to="/invoices"
                      className={`${
                        pathname === "/invoices" ||
                        pathname === "/invoices-paid" ||
                        pathname === "/invoices-overdue" ||
                        pathname === "/invoices-draft" ||
                        pathname === "/invoices-recurring" ||
                        pathname === "/invoices-cancelled"
                          ? "active"
                          : ""
                      }`}
                    >
                      Invoices List
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/invoice-grid"
                      className={`${
                        pathname === "/invoice-grid" ? "active" : ""
                      }`}
                    >
                      Invoices Grid
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/add-invoice"
                      className={`${
                        pathname === "/add-invoice" ? "active" : ""
                      }`}
                    >
                      Add Invoices
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/edit-invoice"
                      className={`${
                        pathname === "/edit-invoice" ? "active" : ""
                      }`}
                    >
                      Edit Invoices
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/view-invoice"
                      className={`${
                        pathname === "/view-invoice" ? "active" : ""
                      }`}
                    >
                      Invoices Details
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/invoices-settings"
                      className={`${
                        pathname === "/invoices-settings" ||
                        pathname === "/tax-settings" ||
                        pathname === "/bank-settings"
                          ? "active"
                          : ""
                      }`}
                    >
                      Invoices Settings
                    </Link>
                  </li>
                </ul>
              </li>
              {/* <li>
                <Link
                  className={`${pathname.includes("email") ? "active" : ""}`}
                  to="/email"
                >
                  <BiEnvelope /> <span>Email</span>
                </Link>
              </li> */}
              {/* <li>
                <Link
                  className={`${pathname.includes("settings") ? "active" : ""}`}
                  to="/settings"
                >
                  <BiCog /> <span>Settings</span>
                </Link>
              </li> */}
              {/* <li className="menu-title">
              <span>Pages</span>
            </li> */}
              {/* <li className="submenu">
              <Link to="#" className={`${pathname.includes("error-404") || pathname.includes("error-500") ? "active subdrop" : ""}`}><BiError /> <span> Error Pages </span> <span className="menu-arrow" /></Link>
              <ul className="sub-menus">
                <li><Link className={`${pathname.includes("error-404") ? "active" : ""}`} to="/error-404">404 Error </Link></li>
                <li><Link className={`${pathname.includes("error-500") ? "active" : ""}`} to="/error-500">500 Error </Link></li>
              </ul>
            </li>
            <li className="submenu">
              <Link to="#" className={`${pathname.includes("faq") || pathname.includes("terms")
                || pathname.includes("privacy-policy") || pathname.includes("blank-page") ? "active subdrop" : ""}`}><BiMenu /> <span> Pages </span> <span className="menu-arrow" /></Link>
              <ul className="sub-menus">
                <li><Link className={`${pathname.includes("faq") ? "active" : ""}`} to="/faq"> FAQ </Link></li>
                <li><Link className={`${pathname.includes("terms") ? "active" : ""}`} to="/terms"> Terms </Link></li>
                <li><Link className={`${pathname.includes("privacy-policy") ? "active" : ""}`} to="/privacy-policy"> Privacy Policy </Link></li>
                <li><Link className={`${pathname.includes("blank-page") ? "active" : ""}`} to="/blank-page"> Blank Page </Link></li>
              </ul>
            </li> */}
              {/* <li className="menu-title">
              <span>UI Interface</span>
            </li> */}
              {/* <li>
              <Link className={`${pathname.includes("components") ? "active" : ""}`} to="/components"><BiDockLeft /> <span>Components</span></Link>
            </li> */}
              {/* <li className="submenu">
              <Link to="#" className={`${pathname.includes("sweetalerts") || pathname.includes("tooltip") || pathname.includes("popover")
                || pathname.includes("ribbon") || pathname.includes("clipboard") || pathname.includes("drag-drop") || pathname.includes("rangeslider")
                || pathname.includes("rating") || pathname.includes("toastr") || pathname.includes("text-editor") || pathname.includes("counter")
                || pathname.includes("scrollbar") || pathname.includes("spinner") || pathname.includes("notification") || pathname.includes("lightbox")
                || pathname.includes("stickynote") || pathname.includes("timeline") || pathname.includes("horizontal-timeline") || pathname.includes("form-wizard") ? "active subdrop" : ""}`}>
                <BiCube /> <span> Elements </span> <span className="menu-arrow" /></Link>
              <ul className="sub-menus">
                <li><Link className={`${pathname.includes("sweetalerts") ? "active" : ""}`} to="/sweetalerts">Sweet Alerts</Link></li>
                <li><Link className={`${pathname.includes("tooltip") ? "active" : ""}`} to="/tooltip">Tooltip</Link></li>
                <li><Link className={`${pathname.includes("popover") ? "active" : ""}`} to="/popover">Popover</Link></li>
                <li><Link className={`${pathname.includes("ribbon") ? "active" : ""}`} to="/ribbon">Ribbon</Link></li>
                <li><Link className={`${pathname.includes("clipboard") ? "active" : ""}`} to="/clipboard">Clipboard</Link></li>
                <li><Link className={`${pathname.includes("drag-drop") ? "active" : ""}`} to="/drag-drop">Drag & Drop</Link></li>
                <li><Link className={`${pathname.includes("rangeslider") ? "active" : ""}`} to="/rangeslider">Range Slider</Link></li>
                <li><Link className={`${pathname.includes("rating") ? "active" : ""}`} to="/rating">Rating</Link></li>
                <li><Link className={`${pathname.includes("toastr") ? "active" : ""}`} to="/toastr">Toastr</Link></li>
                <li><Link className={`${pathname.includes("text-editor") ? "active" : ""}`} to="/text-editor">Text Editor</Link></li>
                <li><Link className={`${pathname.includes("counter") ? "active" : ""}`} to="/counter">Counter</Link></li>
                <li><Link className={`${pathname.includes("scrollbar") ? "active" : ""}`} to="/scrollbar">Scrollbar</Link></li>
                <li><Link className={`${pathname.includes("spinner") ? "active" : ""}`} to="/spinner">Spinner</Link></li>
                <li><Link className={`${pathname.includes("notification") ? "active" : ""}`} to="/notification">Notification</Link></li>
                <li><Link className={`${pathname.includes("lightbox") ? "active" : ""}`} to="/lightbox">Lightbox</Link></li>
                <li><Link className={`${pathname.includes("stickynote") ? "active" : ""}`} to="/stickynote">Sticky Note</Link></li>
                <li><Link className={`${pathname === "/timeline" ? "active" : ""}`} to="/timeline">Timeline</Link></li>
                <li><Link className={`${pathname === "/horizontal-timeline" ? "active" : ""}`} to="/horizontal-timeline">Horizontal Timeline</Link></li>
                <li><Link className={`${pathname.includes("form-wizard") ? "active" : ""}`} to="/form-wizard">Form Wizard</Link></li>
              </ul>
            </li> */}
              {/* <li className="submenu">
              <Link to="#" className={`${pathname.includes("chart-apex") || pathname.includes("chart-js")
                || pathname.includes("chart-morris") || pathname.includes("chart-flot")
                || pathname.includes("chart-peity") || pathname.includes("chart-c3") ? "active subdrop" : ""}`}><BiBarChartAlt2 /> <span>Charts</span> <span className="menu-arrow" /></Link>
              <ul className="sub-menus">
                <li><Link className={`${pathname.includes("chart-apex") ? "active" : ""}`} to="/chart-apex">Apex Charts</Link></li>
                <li><Link className={`${pathname.includes("chart-js") ? "active" : ""}`} to="/chart-js">Chart Js</Link></li>
                <li><Link className={`${pathname.includes("chart-morris") ? "active" : ""}`} to="/chart-morris">Morris Charts</Link></li>
                <li><Link className={`${pathname.includes("chart-flot") ? "active" : ""}`} to="/chart-flot">Flot Charts</Link></li>
                <li><Link className={`${pathname.includes("chart-peity") ? "active" : ""}`} to="/chart-peity">Peity Charts</Link></li>
                <li><Link className={`${pathname.includes("chart-c3") ? "active" : ""}`} to="/chart-c3">C3 Charts</Link></li>
              </ul>
            </li> */}
              {/* <li className="submenu">
              <Link to="#" className={`${pathname.includes("icon-fontawesome") || pathname.includes("icon-feather")
                || pathname.includes("icon-ionic") || pathname.includes("icon-material")
                || pathname.includes("icon-pe7") || pathname.includes("icon-simpleline") || pathname.includes("icon-themify") || pathname.includes("icon-weather")
                || pathname.includes("icon-typicon") || pathname.includes("icon-flag") ? "active subdrop" : ""}`}><BiAward /> <span>Icons</span> <span className="menu-arrow" /></Link>
              <ul className="sub-menus">
                <li><Link className={`${pathname.includes("icon-fontawesome") ? "active" : ""}`} to="/icon-fontawesome">Fontawesome Icons</Link></li>
                <li><Link className={`${pathname.includes("icon-feather") ? "active" : ""}`} to="/icon-feather">Feather Icons</Link></li>
                <li><Link className={`${pathname.includes("icon-ionic") ? "active" : ""}`} to="/icon-ionic">Ionic Icons</Link></li>
                <li><Link className={`${pathname.includes("icon-material") ? "active" : ""}`} to="/icon-material">Material Icons</Link></li>
                <li><Link className={`${pathname.includes("icon-pe7") ? "active" : ""}`} to="/icon-pe7">Pe7 Icons</Link></li>
                <li><Link className={`${pathname.includes("icon-simpleline") ? "active" : ""}`} to="/icon-simpleline">Simpleline Icons</Link></li>
                <li><Link className={`${pathname.includes("icon-themify") ? "active" : ""}`} to="/icon-themify">Themify Icons</Link></li>
                <li><Link className={`${pathname.includes("icon-weather") ? "active" : ""}`} to="/icon-weather">Weather Icons</Link></li>
                <li><Link className={`${pathname.includes("icon-typicon") ? "active" : ""}`} to="/icon-typicon">Typicon Icons</Link></li>
                <li><Link className={`${pathname.includes("icon-flag") ? "active" : ""}`} to="/icon-flag">Flag Icons</Link></li>
              </ul>
            </li> */}
              {/* <li className="submenu">
              <Link to="#" className={`${pathname.includes("form-basic-inputs") || pathname.includes("form-input-groups")
                || pathname.includes("form-horizontal") || pathname.includes("form-vertical")
                || pathname.includes("form-mask") || pathname.includes("form-validation") ? "active subdrop" : ""}`}><BiDockTop /> <span> Forms </span> <span className="menu-arrow" /></Link>
              <ul className="sub-menus">
                <li><Link className={`${pathname.includes("form-basic-inputs") ? "active" : ""}`} to="/form-basic-inputs">Basic Inputs </Link></li>
                <li><Link className={`${pathname.includes("form-input-groups") ? "active" : ""}`} to="/form-input-groups">Input Groups </Link></li>
                <li><Link className={`${pathname.includes("form-horizontal") ? "active" : ""}`} to="/form-horizontal">Horizontal Form </Link></li>
                <li><Link className={`${pathname.includes("form-vertical") ? "active" : ""}`} to="/form-vertical"> Vertical Form </Link></li>
                <li><Link className={`${pathname.includes("form-mask") ? "active" : ""}`} to="/form-mask"> Form Mask </Link></li>
                <li><Link className={`${pathname.includes("form-validation") ? "active" : ""}`} to="/form-validation"> Form Validation </Link></li>
              </ul>
            </li> */}
              {/* <li className="submenu">
              <Link to="#" className={`${pathname.includes("tables-basic") || pathname.includes("data-tables") ? "active subdrop" : ""}`}><BiCube/> <span> Tables </span> <span className="menu-arrow" /></Link>
              <ul className="sub-menus">
                <li><Link className={`${pathname.includes("tables-basic") ? "active" : ""}`} to="/tables-basic">Basic Tables </Link></li>
                <li><Link className={`${pathname.includes("data-tables") ? "active" : ""}`} to="/data-tables">Data Table </Link></li>
              </ul>
            </li> */}
              {/* <li className="menu-title">
              <span>Extras</span>
            </li> */}
              {/* <li className="submenu">
              <Link><BiCommand /> <span>Multi Level</span> <span className="menu-arrow" /></Link>
              <ul className="sub-menus">
                <li className="submenu">
                  <Link> <span>Level 1</span> <span className="menu-arrow" /></Link>
                  <ul className="sub-menus">
                    <li><Link><span>Level 2</span></Link></li>
                    <li className="submenu">
                      <Link> <span> Level 2</span> <span className="menu-arrow" /></Link>
                      <ul className="sub-menus">
                        <li><Link>Level 3</Link></li>
                        <li><Link>Level 3</Link></li>
                      </ul>
                    </li>
                    <li><Link> <span>Level 2</span></Link></li>
                  </ul>
                </li>
                <li>
                  <Link> <span>Level 1</span></Link>
                </li>
              </ul>
            </li> */}
            </ul>
          </div>
        </div>
      </Scrollbars>
    </div>
  );
}
export default withRouter(SidebarNav);