import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { SystemUser, CircleImg, C_logo, C_logo2 } from "../imagepath";
import { Table,Tag  } from "antd";
import "antd/dist/antd.css";
import { itemRender, onShowSizeChange } from "../paginationfunction";
import "../antdstyle.css";
import "react-datepicker/dist/react-datepicker.css";
import { BiClipboard } from "react-icons/bi";
import { SiMicrosoftexcel } from 'react-icons/si';
import SubmitButton from "../CustomComp/SubmitButton";
import { Excel } from "antd-table-saveas-excel";
import DateTimeInput, {
  convert,
  convertDate,
} from "../CommonFile/DateTimeInput";
import InputSelect from "../CustomComp/InputSelect";
import useFetch from "../Hooks/useFetch";
import InputSearch from "../CustomComp/InputSearch";
const LeadTrailReport = () => {
  let iconStyles = { color: "#10793F", cursor:'pointer'};
  let api = useFetch();
  var date = new Date(),
    mnth = ("0" + date.getMonth()).slice(-2),
    day = ("0" + date.getDate()).slice(-2);
  let updatedData = [date.getFullYear(), mnth, day].join("/");
  const [searchText, setSearchText] = React.useState("");
  const [selectedValues, setSelectedValues] = React.useState({
    select1: null,
    select2: null,
  });

  const [dates, setDates] = React.useState({
    date1: new Date(updatedData),
    date2: new Date(),
  });
  const [userCode, setUserCode] = React.useState(0);
  const [departmentCode, setDepartmentCode] = React.useState(0);
  const [userList, setUserList] = React.useState([]);
  const [departmentList, setDepartmentList] = React.useState([]);
  const [tableDataList, setTableDataList] = React.useState([]);
  const handleDateChange = (dateFieldName, dateValue) => {
    setDates({
      ...dates,
      [dateFieldName]: dateValue,
    });
  };

  // -----multiple-Select-----------------------
  const handleSelectChange = (
    selectedOption,
    selectName,
    setSelectedValues
  ) => {
    // console.log(`Selected value for ${selectName}:`, selectedOption);

    {
      selectName == "select1"
        ? setUserCode(selectedOption.value)
        : selectName == "select2"
        ? setDepartmentCode(selectedOption.value)
        : null;
    }

    setSelectedValues((prevSelectedValues) => ({
      ...prevSelectedValues,
      [selectName]: selectedOption,
    }));
  };

  const getuserCreationList = async () => {
    let currData = [];
    let userUrl = `/api/LoadUserMasterList?ProjType=1`;
    try {
      //   setLoading(true);
      let { res, got } = await api(userUrl, "GET", "");
      if (res.status == 200) {
        console.log("user", got.data);
        let list = got.data;
        list.forEach((element) => {
          currData.push({ value: element.code, label: element.name });
        });
        setUserList(currData);

        // setLoading(false);
      } else {
        // setLoading(false);
        alert("Something Went Wrong in List loading");
      }
    } catch (err) {
      //   setLoading(false);
      alert(err);
    }
  };
  //   ================Department===========================
  const getDepartmentList = async () => {
    let depData = [];
    let Url = `/api/LoadDepMasterList`;
    try {
      //   setLoading(true);
      let { res, got } = await api(Url, "GET", "");
      if (res.status == 200) {
        // console.log('depdata',got.data)
        let list = got.data;
        list.forEach((element) => {
          depData.push({ value: element.code, label: element.name });
        });
        setDepartmentList(depData);

        // setLoading(false);
      } else {
        // setLoading(false);
        alert("Something Went Wrong in List loading");
      }
    } catch (err) {
      //   setLoading(false);
      alert(err);
    }
  };
  let sdate = convertDate(dates.date1);
  let edate = convert(dates.date2);

  //   ================================table Data=====================================
  const getTableDataList = async () => {
    let eventUrl = `/api/LeadTrailreport?User=${userCode || 0}&DepCode=${
      departmentCode || 0
    }&FDate=${sdate}&TDate=${edate}`;
    // console.log("url", eventUrl)
    try {
      //   setLoading(true);
      let { res, got } = await api(eventUrl, "GET", "");
      if (res.status == 200) {
        let list = got;

        console.log("tableData", list);
        setTableDataList(list);

        // setTemplateList(currData);
        // setLoading(false);
      } else {
        // setLoading(false);
        alert("Something Went Wrong in List loading");
      }
    } catch (err) {
      //   setLoading(false);
      alert(err);
    }
  };

  function getRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  React.useEffect(() => {
    getuserCreationList();
    getDepartmentList();
    getTableDataList();
  }, []);

  const columns = [
    {
      title: "Lead No",
      dataIndex: "leadNo",
      render: (text, record) => <span className="text-primary">{text}</span>,
      sorter: (a, b) => a.leadNo.length - b.leadNo.length,
      filteredValue: [searchText],
      onFilter: (value, record) => {
        return (
          String(record.leadNo).toLowerCase().includes(value.toLowerCase()) ||
          String(record.subLead).toLowerCase().includes(value.toLowerCase())||
          String(record.leadDate).toLowerCase().includes(value.toLowerCase())||
          String(record.mobNo).toLowerCase().includes(value.toLowerCase())||
          String(record.customer).toLowerCase().includes(value.toLowerCase())
        );
      },
    },

    {
      title: "Sub Lead",
      dataIndex: "subLead",
      sorter: (a, b) => a.subLead.length - b.subLead.length,
    },
    {
      title: "Lead Date",
      dataIndex: "leadDate",

      sorter: (a, b) => a.leadDate.length - b.leadDate.length,
    },
    {
      title: "Customer Name",
      dataIndex: "customer",

      sorter: (a, b) => a.customer.length - b.customer.length,
    },
    {
      title: "MobileNo.",
      dataIndex: "mobNo",
      render: (text, record) => (
        <span style={{color:"#096dd9"}}>{text}</span>
      ),
      sorter: (a, b) => a.mobNo.length - b.mobNo.length,
    },
    {
      title: "Email",
      dataIndex: "email",

      sorter: (a, b) => a.email.length - b.email.length,
    },
    {
      title: "User Name",
      dataIndex: "username",
      render: (text, record) => <>{text}</>,
      sorter: (a, b) => a.username.length - b.username.length,
    },
    {
      title: "User Mobile No",
      dataIndex: "userMobNo",
      render: (text, record) => <>{text}</>,
      sorter: (a, b) => a.userMobNo.length - b.userMobNo.length,
    },
    {
      title: "Department",
      dataIndex: "department",
      render: (text, record) => <span style={{color:'darkblue'}}>{text}</span>,
      sorter: (a, b) => a.department.length - b.department.length,
    },
    {
      title: "Lead Status",
      dataIndex: "leadStatus",
      render: (text, record) => (
        <span className="badge" style={{ background: getRandomColor() }}>
          {text}
        </span>
      ),
      sorter: (a, b) => a.leadStatus.length - b.leadStatus.length,
    },
  
    {
      title: 'Lead Follow-Up Details',
      dataIndex: 'leadFollowUpDetails',
      key: 'leadFollowUpDetails',
      render: (followUpDetails) => (
        <ul>
          {followUpDetails.map((followUp, index) => (
            <li key={index}>
              <Tag color={followUp.lStatus === 'Close' ? 'green' : 'red'}>
                {followUp.fDate} - {followUp.feedback}
              </Tag>
            </li>
          ))}
        </ul>
      ),
    },
    {
      title: "Quotation Status",
      dataIndex: "quotationStatus",
      render: (text, record) => (
        <span className="badge" style={{ background: getRandomColor() }}>
          {text}
        </span>
      ),
      sorter: (a, b) => a.quotationStatus.length - b.quotationStatus.length,
    },
  ];
  const handleExportClick = () => {
    const excel = new Excel();
    excel
      .addSheet("test")
      .addColumns(columns)
      .addDataSource(tableDataList, {
        str2Percent: true
      })
      .saveAs("leadTrailReport.xlsx");
  };
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        "selectedRows: ",
        selectedRows
      );
    },
    getCheckboxProps: (record) => ({
      disabled: record.name === "Disabled User", // Column configuration not to be checked
      name: record.name,
      className: "checkbox-red",
    }),
  };
  return (
    <div className="page-wrapper">
      <Helmet>
        <title>Reports -S&SEnterprises</title>
        <meta name="description" content="Reactify Blank Page" />
      </Helmet>
      {/* Page Content */}
      <div className="content container-fluid">
        <div className="crms-title row bg-white">
          <div className="col  p-0">
            <h3 className="page-title m-0">
              <span className="page-title-icon bg-gradient-primary text-white me-2">
                {/* <i className="feather-calendar" /> */}
                <i>
                  <BiClipboard />
                </i>
              </span>{" "}
              Lead Trail{" "}
            </h3>
          </div>
          <div className="col p-0 text-end">
            <ul className="breadcrumb bg-white float-end m-0 pl-0 pr-0">
              <li className="breadcrumb-item">
                <Link to="/">Dashboard</Link>
              </li>
              <li className="breadcrumb-item active">Lead Trail</li>
            </ul>
          </div>
        </div>

        <div className="row pt-4">
          <div className="col-md-12">
            <div className="card">
              <div className="card-body">
                <div className="row pt-2">
                  <div className="col-xl-3">
                    <InputSelect
                      labelClass=""
                      selectName="User"
                      selectClass="col-lg-12"
                      placeholder="Select User"
                      value={selectedValues.select1}
                      onChange={(selectedOption) =>
                        handleSelectChange(
                          selectedOption,
                          "select1",
                          setSelectedValues
                        )
                      }
                      options={userList}
                    />
                  </div>
                  <div className="col-xl-3">
                    <InputSelect
                      labelClass=""
                      selectName="Department"
                      selectClass="col-lg-12"
                      placeholder="Department"
                      value={selectedValues.select2}
                      onChange={(selectedOption) =>
                        handleSelectChange(
                          selectedOption,
                          "select2",
                          setSelectedValues
                        )
                      }
                      options={departmentList}
                    />
                  </div>
                  <div className="col-xl-2">
                    <DateTimeInput
                      datelblClass=""
                      dateinpClass="col-lg-12"
                      datelabel="Start Date"
                      // datestar="*"
                      dateFormat="dd/MM/yyyy"
                      selected={dates.date1}
                      onChange={(date) => handleDateChange("date1", date)}
                    />
                  </div>
                  <div className="col-xl-2">
                    <DateTimeInput
                      datelblClass=""
                      dateinpClass="col-lg-12"
                      datelabel="End Date"
                      // datestar="*"
                      dateFormat="dd/MM/yyyy"
                      selected={dates.date2}
                      onChange={(date) => handleDateChange("date2", date)}
                    />
                  </div>
                  <div className="col-xl-2">
                    <div className="report-btn" style={{ marginTop: "27px" }}>
                      <a href="#" className="btn" onClick={getTableDataList}>
                        Generate report
                      </a>
                    </div>
                  </div>
                </div>
                {/* <SubmitButton
                        parentClass="text-center"
                        onClick={getTableDataList}
                        btnName="Load Data"
                      /> */}
              </div>
            </div>
          </div>
        </div>

        {/* Content Starts */}
        <div className="row">
          <div className="col-md-12">
            <div className="card mb-0">
            <div className="card-header">
            <div className="col-xl-12 d-flex justify-content-between">
                <h4 className="card-title d-flex mb-0">
                  <span className="mt-1">
                  Lead Trail

                  </span>
                  <span className="ml-2">
                  <InputSearch
                        search1={setSearchText}
                        search2={setSearchText}
                      />
                  </span>
                  </h4>
                <span onClick={tableDataList.length > 0 ? handleExportClick:null}><SiMicrosoftexcel size={25} style={iconStyles}/></span>
                </div>
              </div>
              <div className="card-body">
                
                <div className="table-responsive activity-tables">
                  <Table
                    rowSelection={{
                      ...rowSelection,
                    }}
                    pagination={{
                      total: tableDataList.length,
                      showTotal: (total, range) =>
                        `Showing ${range[0]} to ${range[1]} of ${total} entries`,
                      showSizeChanger: true,
                      onShowSizeChange: onShowSizeChange,
                      itemRender: itemRender,
                    }}
                    className="table table-striped table-nowrap custom-table mb-0 datatable dataTable no-footer"
                    style={{ overflowX: "auto" }}
                    columns={columns}
                    bordered
                    dataSource={tableDataList}
                    rowKey={(record) => record.code}
                    // onChange={handleTableChange}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeadTrailReport;
