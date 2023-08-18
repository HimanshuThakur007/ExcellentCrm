import React,{useState} from "react";
import PageHelmet from "../CustomComp/PageHelmet";
import PageHeader from "../CustomComp/PageHeader";
import PieChart from "./piechart";
import HorizontalBarChart from "./barchart/horizontalchart";
import BarChart from "./barchart";
import LineChart from "./linechart";
import SingleChart from "./linechart/singlelinechart";
import TotalRevenuechart from "./barchart/totalreveue";
import Salesstatictschart from "./barchart/salesstatistics";
import Completedtaskchart from "./barchart/completedtaks";
import useFetch from "../Hooks/useFetch";
import { BiUser,BiDetail } from "react-icons/bi";

const Dashboard = () => {
  let api = useFetch();
  const userData = sessionStorage.getItem("userData");
  if (userData !== null) {
    var dep = JSON.parse(userData).department;
    var depname = JSON.parse(userData).depName;
  }
//   console.log('depname', depname)

  const [tableData, setTableData] = useState([])
  //   console.log('ccccccccccccc',depCode)

  const getTableList = async () => {
    let Url = `/api/LoadPendingLead?Dep=${dep || 0}`;
    // console.log("uuuuuuuuuuuu", Url);
    try {
      // setLoading(true);
      let { res, got } = await api(Url, "GET", "");
      if (res.status == 200) {
        // console.log("data", got.data);
        let tableData = got.data;

        // console.log("tabledata", tableData);
		setTableData(tableData)

        //   setLoading(false);
      } else {
        //   setLoading(false);
        alert("Something Went Wrong in loading");
      }
    } catch (err) {
      // setLoading(false);
      alert(err);
    }
  };
  React.useEffect(() => {
   
      getTableList();
    
  }, []);

  return (
    <div className="page-wrapper">
      <PageHelmet
        helmetTitle="Deals Dashboard - S&S Enterprises"
        helmetName="Dashboard"
        helmetContent="Dashboard Page"
      />
      <div className="content container-fluid">
        {/* <div className="crms-title row bg-white mb-4">
          <div className="col">
            <h3 className="page-title">
              <span className="page-title-icon bg-gradient-primary text-white me-2">
                <i className="fas fa-table"></i>
              </span>{" "}
              <span>Deals Dashboard</span>
            </h3>
          </div>
          <div className="col text-end">
            <ul className="breadcrumb bg-white float-end m-0 pl-0 pr-0">
              <li className="breadcrumb-item">
                <Link to="/">Dashboard</Link>
              </li>
              <li className="breadcrumb-item active">Deals Dashboard</li>
            </ul>
          </div>
        </div> */}
        <PageHeader
          iclassName="fas fa-table"
          pageTitle="Deals Dashboard"
          disableTitle="Deals Dashboard"
        />
        <div className="row graphs">
          <div className="col-md-6">
            <div className="card h-100">
              <div className="card-body">
                <h3 className="card-title">Pending Visit</h3>
                {/* <PieChart /> */}
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card h-100">
              <div className="card-body">
                <h3 className="card-title">Pending Unassigned Leads</h3>
                {/* <HorizontalBarChart /> */}
                <div className="row">
                  <div className="col-xl-6">
                    <label className="col-form-label"><BiDetail/> Department: <span className="text-danger">{depname}</span></label>
					
                  </div>
                  <div className="col-xl-6">
                    <label className="col-form-label"><BiUser /> Leads: <span className="text-danger">{tableData.length}</span></label>
                   
					
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row graphs">
          <div className="col-md-6">
            <div className="card h-100">
              <div className="card-body">
                <h3 className="card-title">Total Lead</h3>
                <PieChart />
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card h-100">
              <div className="card-body">
                <h3 className="card-title">Products Yearly Sales</h3>
                <HorizontalBarChart />
              </div>
            </div>
          </div>
        </div>
        <div className="row graphs">
          <div className="col-md-6">
            <div className="card h-100">
              <div className="card-body">
                <h3 className="card-title">Sales Overview</h3>
                <LineChart />
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="card h-100">
              <div className="card-body">
                <h3 className="card-title">Total Sales</h3>
                <SingleChart />
              </div>
            </div>
          </div>
        </div>
        <div className="row graphs">
          <div className="col-md-6">
            <div className="card h-100">
              <div className="card-body">
                <h3 className="card-title">Yearly Projects</h3>
                <BarChart />
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="card h-100">
              <div className="card-body">
                <h3 className="card-title">Total Revenue</h3>
                <TotalRevenuechart />
              </div>
            </div>
          </div>
        </div>
        <div className="row graphs">
          <div className="col-md-6">
            <div className="card h-100">
              <div className="card-body">
                <h3 className="card-title">Sales Statistics</h3>
                <Salesstatictschart />
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card h-100">
              <div className="card-body">
                <h3 className="card-title">Completed Tasks</h3>
                <Completedtaskchart />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
