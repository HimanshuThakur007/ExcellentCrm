import React,{useState} from "react";
import PageHelmet from "../CustomComp/PageHelmet";
import PageHeader from "../CustomComp/PageHeader";
import PieChart from "./piechart";
import HorizontalBarChart from "./barchart/horizontalchart";
import { BiUser,BiDetail } from "react-icons/bi";
import { Table } from 'antd';
import 'antd/dist/antd.css';
import "../antdstyle.css";
import { itemRender, onShowSizeChange } from "../paginationfunction";
import useFetch from '../Hooks/useFetch';
import LeadHistoryModal from "./LeadHistoryModal";
import DoughnutChart from "./piechart/piechart2";
import DoughnutChart1 from "./piechart/piechart3";
// import Customer from "../../assets/images/Customer.png";
import { BiHomeAlt } from 'react-icons/bi'
import { Customer,Contact,Lead,ConvertedLead } from "../imagepath";
import { convertDate } from "../CommonFile/DateTimeInput";
import ReactLoader from "../CommonFile/ReactLoader";

var opportunityData;
var quotationData;
var ActiveLead;
var ActiveOpportunity;
var customerLength;
var contactLength;
var leadCount;
const Dashboard = () => {
  let api = useFetch();
  const userDatas = JSON.parse(sessionStorage.getItem('userData'))
  if (userDatas !== null) {
    var userCode = userDatas.UserId;
  }



  const [followupList,setfollowupList] = React.useState([])
  const [convertedLeadHistory,setConvertedLeadHistory] = React.useState([])
  const [leadHistory,setleadHistory] = React.useState([])
  const [convertedList,setConvertedList] = React.useState([])
  const [pendingFollowup, setPendingFollowUp] = React.useState(true)
  const [convertedShowHide, setConvertedShowHide] = React.useState(false)
  const [loading, setLoading] = React.useState(false)

  const followupShowHide = ()=>{
    setConvertedShowHide(false)
    setPendingFollowUp(!pendingFollowup)
    
  }
  const convertLeadShowHide = ()=>{
    setPendingFollowUp(false)
    setConvertedShowHide(!convertedShowHide)
    
  }
  
  const onRowClick =(record)=>{
    // $("#followup-modal").modal("show");
    // setSelectedTableData(record)
//  setfollowupData(record)
 let v = record.vchNo
 getLeadHistory(v)
 getConvertedLeadHistory(v)
    // console.log(record)
  }
  const columns = [
    {
      title: "Lead No.",
      dataIndex: "vchNo",
      render: (text, record) => (
        <>
          <a href="#" data-bs-toggle="modal" data-bs-target="#lead-details-modal" onClick={()=>onRowClick(record)}>{text}</a></>
      ),
      sorter: (a, b) => a.vchNo.length - b.vchNo.length,
    },
    {
      title: "Name",
      dataIndex: "customerName",
      // render: (text, record) => (
      //   <><a href="#" className="text-decoration-none"
      //      data-bs-toggle="modal" data-bs-target="#followup-modal">{text}</a></>
      //   ),
      sorter: (a, b) => a.customerName.length - b.customerName.length,
    },
    {
      title: "Mobile No.",
      dataIndex: "mobNo",
      sorter: (a, b) => a.mobNo.length - b.mobNo.length,
    },
    {
      title: "E-Mail",
      dataIndex: "email",
      render: (text, record) => <>{text}</>,
      sorter: (a, b) => a.email.length - b.email.length,
    },
    
    {
      title: "Lead Assign",
      dataIndex: "assignDate",
      render: (text, record) => <>{text}</>,
      sorter: (a, b) => a.assignDate.length - b.assignDate.length,
    },
    {
      title: "Lead Created",
      dataIndex: "vchDate",
      render: (text, record) => <>{text}</>,
      sorter: (a, b) => a.vchDate.length - b.vchDate.length,
    },
    // {
    //   title: "Status",
    //   dataIndex: "status",
    //   render: (text, record) => (
    //     <label className={record.className}>{text}</label>
    //     ),
    //   sorter: (a, b) => a.status.length - b.status.length,
    // },
    
   
  ];

  // =====================api for all========================
  const getDashBoardCount = async () => {
    // console.log('calling from getfollowup list')
    let Url = `/api/AdminDashboard`;
    console.log('dashboard', Url)
    try {
      setLoading(true);
      let { res, got } = await api(Url, "GET", "");
      if (res.status == 200) {
        // console.log("data", got.data);
        let listData = got.data[0];
        customerLength = listData.totalCustomer
        contactLength = listData.totalContacts
        leadCount = listData.totalLeads
         opportunityData = listData.totalOpportunity;
         quotationData = listData.totalQuotation;
         ActiveLead = listData.activeLeads;
         ActiveOpportunity = listData.activeOpportunity;
        // setContactLength(contact)
        // setLeadCount(leads)
        // opportunityData=opportunity
        // quotationData=quotation
       
      } else {
        setLoading(false);
        alert("Something Went Wrong in List loading");
      }
    } catch (err) {
      setLoading(false);
      alert(err);
    }
  };

  // ===========================================================
  // ----------------getFollow-up List-----------

  const getFollowupList = async () => {
    // console.log('calling from getfollowup list')
    let Url = `/api/LoadFollowUpList?UCode=${userCode}&LStatus=0`;
    console.log('followupUrl', Url)
    try {
      setLoading(true);
      let { res, got } = await api(Url, "GET", "");
      if (res.status == 200) {
        // console.log("data", got.data);
        let listData = got.data;
         
        console.log("foadfollowUp", listData);
        setfollowupList(listData);
        setLoading(false);
      } else {
        setLoading(false);
        alert("Something Went Wrong in List loading");
      }
    } catch (err) {
      setLoading(false);
      alert(err);
    }
  };
  // -------------------get Converted Lead-list---------------------
  const getConvertedLeadList = async () => {
    // console.log('calling from getfollowup list')
    let Url = `/api/LoadFollowUpList?UCode=${userCode}&LStatus=1`;
    try {
      setLoading(true);
      let { res, got } = await api(Url, "GET", "");
      if (res.status == 200) {
        // console.log("data", got.data);
        let listData = got.data;
         
        // console.log("modifyData", listData);
        setConvertedList(listData);
        setLoading(false);
      } else {
        setLoading(false);
        alert("Something Went Wrong in List loading");
      }
    } catch (err) {
      setLoading(false);
      alert(err);
    }
  };
// console.log('ffffffff', followupList)
const getLeadHistory = async (vch) => {
    
    
    let Url = `/api/LeadFollowUpHistory?VchNo=${vch}&lStatus=0`;
    // console.log('uuurrr', Url)
    try {
      setLoading(true);
      let { res, got } = await api(Url, "GET", "");
      if (res.status == 200) {
        console.log("leaddata", got.data);
        let listData = got.data;
         
        //  console.log("leadHistory", listData);
        setleadHistory(listData);
        setLoading(false);
      } else {
        setLoading(false);
        alert("Something Went Wrong in List loading");
      }
    } catch (err) {
      setLoading(false);
      alert(err);
    }
  };
const getConvertedLeadHistory = async (vch) => {
    
    
    let Url = `/api/LeadFollowUpHistory?VchNo=${vch}&lStatus=1`;
    console.log('uuurrr', Url)
    try {
      setLoading(true);
      let { res, got } = await api(Url, "GET", "");
      if (res.status == 200) {
        // console.log("leaddata", got.data);
        let listData = got.data;
         
         console.log("modifyData", listData);
        setConvertedLeadHistory(listData);
        setLoading(false);
      } else {
        setLoading(false);
        alert("Something Went Wrong in List loading");
      }
    } catch (err) {
      setLoading(false);
      alert(err);
    }
  };
 

  let tdate = new Date ()
  var todayDate=convertDate(tdate)


  React.useEffect(()=>{
    if(userDatas != null){
      getDashBoardCount()
    getFollowupList();
    getConvertedLeadList();
    }
    
  },[])
var followup = followupList.length
var converted = convertedList.length
var total = followup + converted
  const state = {
    labels: ['FollowUp', "LeadConverted"],
    datasets: [
      {
        label: 'Pending Followup',
        backgroundColor: [
          '#9a55ff',
          '#ff4d7c',
          'blue'
        
        ],
        // hoverBackgroundColor: [
        // '#9a55ff',
        // '#fe7096'
        // ],
        data: [followup,converted]
      }
    ]
  }
 
  return (
    <div className="page-wrapper">
      <PageHelmet
        helmetTitle="CRM Dashboard - S&S Enterprises Jaipur"
        helmetName="Dashboard"
        helmetContent="Dashboard Page"
      />
      <div className="content container-fluid">
{/*       
        <PageHeader
          iclassName="fas fa-table"
          pageTitle="Dashboard"
          disableTitle="Dashboard"
        /> */}
         {loading ? (
          <ReactLoader
            loaderClass="position-absolute"
            loading={loading}
          />
        ) : null}
       
       <div className="row g-20">
            <div className="col-xxl-3 col-xl-6 col-lg-6 col-md-6">
               <div className="expovent__count-item mb-20">
                  <div className="expovent__count-thumb include__bg transition-3" data-background="assets/imges/Customer.png"></div>
                  <div className="expovent__count-content">
                     <h3 className="expovent__count-number">{customerLength}+</h3>
                     <span className="expovent__count-text">Customer</span>
                  </div>
                  <div className="expovent__count-icon">
                    {/* <img className="flaticon-group" src={Customer}/> */}
                     {/* <i className="flaticon-group"></i> */}
                     <img className="" src={Customer} style={{height:"6vh"}}/>
                  </div>
               </div>
            </div>
            <div className="col-xxl-3 col-xl-6 col-lg-6 col-md-6">
               <div className="expovent__count-item mb-20">
                  <div className="expovent__count-thumb include__bg transition-3" data-background="assets/img/bg/count-bg.png"></div>
                  <div className="expovent__count-content">
                     <h3 className="expovent__count-number">{contactLength}+</h3>
                     <span className="expovent__count-text">Contact</span>
                  </div>
                  <div className="expovent__count-icon">
                     {/* <i className="flaticon-speaker"></i> */}
                     <img className="" src={Contact} style={{height:"6vh"}}/>
                  </div>
               </div>
            </div>
            <div className="col-xxl-3 col-xl-6 col-lg-6 col-md-6">
               <div className="expovent__count-item mb-20">
                  <div className="expovent__count-thumb include__bg transition-3" data-background="assets/img/bg/count-bg.png" ></div>
                  <div className="expovent__count-content">
                     <h3 className="expovent__count-number">{leadCount}+</h3>
                     <span className="expovent__count-text">Leads</span>
                  </div>
                  <div className="expovent__count-icon">
                     {/* <i className="flaticon-reminder"></i> */}
                     <img className="" src={Lead} style={{height:"6vh"}}/>
                  </div>
               </div>
            </div>
            <div className="col-xxl-3 col-xl-6 col-lg-6 col-md-6">
               <div className="expovent__count-item mb-20">
                  <div className="expovent__count-thumb include__bg transition-3" data-background="assets/img/bg/count-bg.png" ></div>
                  <div className="expovent__count-content">
                     <h3 className="expovent__count-number">{opportunityData}+</h3>
                     <span className="expovent__count-text">Opportunity</span>
                  </div>
                  <div className="expovent__count-icon">
                     {/* <i className="flaticon-ticket-1"></i> */}
                     <img className="" src={ConvertedLead} style={{height:"6vh"}}/>
                  </div>
               </div>
            </div>
         </div>
       <div className="row g-20">
            <div className="col-xxl-3 col-xl-6 col-lg-6 col-md-6">
               <div className="expovent__count-item mb-20" style={{backgroundColor:"#ff9f43"}}>
                  <div className="expovent__count-thumb include__bg transition-3" data-background="assets/imges/Customer.png"></div>
                  <div className="expovent__count-content">
                     <h3 className="expovent__count-number" style={{color:'#fff'}}>{length}+</h3>
                     <span className="expovent__count-text" style={{color:'#fff'}}>Engage Percentage</span>
                  </div>
                  <div className="expovent__count-icon">
                    {/* <img className="flaticon-group" src={Customer}/> */}
                     {/* <i className="flaticon-group"></i> */}
                     <img className="" src={Customer} style={{height:"6vh"}}/>
                  </div>
               </div>
            </div>
            <div className="col-xxl-3 col-xl-6 col-lg-6 col-md-6">
               <div className="expovent__count-item mb-20" style={{backgroundColor:"#00cfe8"}}>
                  <div className="expovent__count-thumb include__bg transition-3" data-background="assets/img/bg/count-bg.png"></div>
                  <div className="expovent__count-content">
                     <h3 className="expovent__count-number" style={{color:'#fff'}}>{ActiveLead}+</h3>
                     <span className="expovent__count-text" style={{color:'#fff'}}>Active Leads</span>
                  </div>
                  <div className="expovent__count-icon">
                     {/* <i className="flaticon-speaker"></i> */}
                     <img className="" src={Contact} style={{height:"6vh"}}/>
                  </div>
               </div>
            </div>
            <div className="col-xxl-3 col-xl-6 col-lg-6 col-md-6">
               <div className="expovent__count-item mb-20" style={{backgroundColor:"#1b2850"}}>
                  <div className="expovent__count-thumb include__bg transition-3" data-background="assets/img/bg/count-bg.png" ></div>
                  <div className="expovent__count-content">
                     <h3 className="expovent__count-number" style={{color:'#fff'}}>{ActiveOpportunity}+</h3>
                     <span className="expovent__count-text" style={{color:'#fff'}}>Active Opportunity</span>
                  </div>
                  <div className="expovent__count-icon">
                     {/* <i className="flaticon-reminder"></i> */}
                     <img className="" src={Lead} style={{height:"6vh"}}/>
                  </div>
               </div>
            </div>
            <div className="col-xxl-3 col-xl-6 col-lg-6 col-md-6" >
               <div className="expovent__count-item mb-20" style={{backgroundColor:"#28c76f"}}>
                  <div className="expovent__count-thumb include__bg transition-3" data-background="assets/img/bg/count-bg.png" ></div>
                  <div className="expovent__count-content">
                     <h3 className="expovent__count-number" style={{color:'#fff'}}>{quotationData}+</h3>
                     <span className="expovent__count-text" style={{color:'#fff'}}>Quotation</span>
                  </div>
                  <div className="expovent__count-icon">
                     {/* <i className="flaticon-ticket-1"></i> */}
                     <img className="" src={ConvertedLead} style={{height:"6vh"}}/>
                  </div>
               </div>
            </div>
         </div>


        <div className="row graphs">
          <div className="col-md-6">
            <div className="card h-100">
              <div className="card-body">
                <h3 className="card-title">Leads</h3>
                <PieChart pending={followup} leadConverted={converted}/>
              </div>
            </div>
          </div>
          <div className="col-md-6">
          <div className="card h-100">
              <div className="card-body">
                <h3 className="card-title">Opportunity</h3>
                <PieChart pending={20} leadConverted={40}/>
                {/* <PieChart pending={followup} leadConverted={converted}/> */}
              </div>
            </div>
            {/* <div className="card h-100">
              <div className="card-body">
                <h3 className="card-title">Products Yearly Sales</h3>
                <HorizontalBarChart />
              </div>
            </div> */}
          </div>
        </div>
 {/* ---------------------piechart2----------------- */}
 <div className="row graphs">
          <div className="col-md-6">
            <div className="card h-100">
              <div className="card-body">
                <h3 className="card-title">Converted Leads</h3>
                <DoughnutChart />
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card h-100">
              <div className="card-body">
                <h3 className="card-title">Quotation</h3>
                <DoughnutChart1 />
              </div>
            </div>
          </div>
        </div>


 <div className="row graphs">
          <div className="col-md-6">
            <div className="card h-100">
              <div className="card-body">
                <h3 className="card-title">Converted Opportunity</h3>
                <DoughnutChart />
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card h-100">
              <div className="card-body">
                <h3 className="card-title">Yearly Sales</h3>
                <DoughnutChart1 />
              </div>
            </div>
          </div>
        </div>


        {/* <div className="row graphs">
         
          <div className="col-md-6">
            <div className="card h-100" onClick={followupShowHide} style={{cursor:'pointer'}}>
              <div className="card-body">
                <h3 className="card-title">Pending Leads (Followup)</h3>
               
                <div className="row">
                 
                  <div className="col-xl-6">
                    <label className="col-form-label"><BiUser /> Leads: <span className="text-danger">{followupList.length}</span></label>
                   
					
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card h-100" onClick={convertLeadShowHide} style={{cursor:'pointer'}}>
              <div className="card-body">
                <h3 className="card-title">Converted Leads</h3>
                <div className="row">
                <div className="col-xl-6">
                    <label className="col-form-label"><BiUser /> Leads: <span className="text-danger">{convertedList.length}</span></label>
                  </div>
                </div>
             
              </div>
            </div>
          </div>
        </div> */}
        {/* {pendingFollowup == true && followupList.length > 0?(
            <div className="table-responsive">
            <div className="card">
              <div className="card-body">
                <h4 className="pb-3">Pending Lead(FollowUp)</h4>
                <Table                        
                  className="table table-striped table-nowrap custom-table mb-0 datatable dataTable no-footer"
                  pagination={{
                    total: followupList.length,
                    showTotal: (total, range) => `Showing ${range[0]} to ${range[1]} of ${total} entries`,
                    showSizeChanger: true, onShowSizeChange: onShowSizeChange, itemRender: itemRender
                  }}
                  style={{ overflowX: "auto" }}
                  columns={columns}
                  dataSource={followupList}
                  rowKey={(record) => record.code}
                />
              </div>
            </div>
          </div>
        ):null} */}
        {convertedList.length > 0? (
          <div className="table-responsive">
          <div className="card">
            <div className="card-body">
              <h4 className="pb-3">Converted Leads</h4>
              <Table                        
                className="table table-striped table-nowrap custom-table mb-0 datatable dataTable no-footer"
                pagination={{
                  total: convertedList.length,
                  showTotal: (total, range) => `Showing ${range[0]} to ${range[1]} of ${total} entries`,
                  showSizeChanger: true, onShowSizeChange: onShowSizeChange, itemRender: itemRender
                }}
                style={{ overflowX: "auto" }}
                columns={columns}
                dataSource={convertedList}
                rowKey={(record) => record.code}
              />
            </div>
          </div>
        </div>
        ):null}

       


        {/* <div className="row all-reports m-0">
          <div className="col-md-4 p-0">
            <ul
              className="nav nav-tabs card p-0 mb-0"
              id="reports"
              role="tablist"
            >
              <li className="nav-item w-100">
                <a
                  className="nav-link active"
                  data-bs-toggle="tab"
                  href="#personal-reports"
                  role="tab"
                  aria-controls="personal-reports"
                >
                  Pending Lead (Followup):- <span className="text-danger">{followupList.length}</span>
                </a>
              </li>
              <li className="nav-item w-100">
                <a
                  className="nav-link"
                  data-bs-toggle="tab"
                  href="#shared-reports"
                  role="tab"
                  aria-controls="shared-reports"
                >
                  Converted Leads
                </a>
              </li>
            </ul>
          </div>

          <div className="col-md-8 pr-0 Reports">
            <div className="tab-content pt-0">
              <div
                className="tab-pane active"
                id="personal-reports"
                role="tabpanel"
              >
                <div className="table-responsive">
                  <div className="card">
                    <div className="card-body">
                      <h4 className="pb-3">Pending Lead(FollowUp)</h4>
                      <Table                        
                        className="table table-striped table-nowrap custom-table mb-0 datatable dataTable no-footer"
                        pagination={{
                          total: data.length,
                          showTotal: (total, range) => `Showing ${range[0]} to ${range[1]} of ${total} entries`,
                          showSizeChanger: true, onShowSizeChange: onShowSizeChange, itemRender: itemRender
                        }}
                        style={{ overflowX: "auto" }}
                        columns={columns}
                        dataSource={followupList}
                        rowKey={(record) => record.id}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="tab-pane" id="shared-reports" role="tabpanel">
                <div className="table-responsive card">
                  <div className="card-body">
                    <h4 className="pb-3">Shared Reports</h4>
                    <table className="table table-striped custom-table">
                      <thead>
                        <tr>
                          <th>Report Name</th>
                          <th>Date Created</th>
                          <th>Created By</th>
                          <th>Scheduled</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>
                            <a href="#">Shared Report</a>
                          </td>
                          <td>07, Aug 2020</td>
                          <td>John Doe</td>
                          <td>-</td>
                        </tr>
                        <tr>
                          <td>Project Management</td>
                          <td>02, April 2020</td>
                          <td>John Doe</td>
                          <td>-</td>
                        </tr>
                        <tr>
                          <td>Evaluation</td>
                          <td>02, june 2020</td>
                          <td>John Doe</td>
                          <td>-</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
             
            </div>
          </div>
        </div> */}
     
        <LeadHistoryModal leadHistory={leadHistory} convertedLeadHistory={convertedLeadHistory}/>
      </div>
    </div>
  );
};
export default Dashboard;
