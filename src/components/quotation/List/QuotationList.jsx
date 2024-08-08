import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { IMG01, IMG02, IMG03, IMG04, IMG06, IMG07, IMG08, IMG09, IMG10 } from "./img";
import { Table } from "antd";
import { itemRender, onShowSizeChange } from "../../paginationfunction"
import { FiBookOpen, FiBookmark, FiCalendar, FiGrid, FiList, FiPlusCircle, FiSettings, FiUserPlus } from "react-icons/fi";
import "../../antdstyle.css"
import InputSelect from '../../CustomComp/InputSelect';
import DateTimeInput, { convertDate } from '../../CommonFile/DateTimeInput';
import useFetch from '../../Hooks/useFetch';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
const QuotationList = () => {
  let api = useFetch()
  let history = useHistory()
  
  let pathname = window.location.pathname
  const [active, setActive] = useState(false);
  const url = pathname.split("/").slice(0, -1).join("/");

  const [selectedValues, setSelectedValues] = React.useState({
    select1: null,
    // select2: null,
    // select3: null
  });
  const [dates, setDates] = React.useState({
    date1: new Date(),
    date2: new Date()
  });
  const [customerList,setCustomerList]=useState([])
  const [customerTableData,setCustomerTableData]=useState([])
  const [customerCode,setCustomerCode]=useState(0)



  
  const columns = [

    {
      title: "Quotation ID",
      dataIndex: "qtNo",
      render: (text, record) => (
        <><a className="invoice-link">{text}</a></>
      ),
      sorter: (a, b) => a.qtNo.length - b.qtNo.length,
    },

    // {
    //   title: "Category",
    //   dataIndex: "Category",
    //   render: (text, record) => (
    //     <>{text}</>
    //   ),
    //   sorter: (a, b) => a.Category.length - b.Category.length,
    // },
    {
      title: "Created on",
      dataIndex: "date",
      render: (text, record) => (
        <>{text}</>
      ),
      sorter: (a, b) => a.date.length - b.date.length,
    },
    {
      title: "Invoice to",
      dataIndex: "customerName",
      render: (text, record) => (
        <>
          <a>
            <span
             style={{color:"blue"}}
            >{" "}
            {text}</span>
          </a></>
      ),
      sorter: (a, b) => a.customerName.length - b.customerName.length,
    },
    {
      title: "Quantity",
      dataIndex: "totQty",
      render: (text, record) => (
        <span className={record.className}>{text}</span>
      ),
      sorter: (a, b) => a.totQty.length - b.totQty.length,
    },
    {
      title: "Amount",
      dataIndex: "totVal",
      render: (text, record) => (
        <><div className="text-primary">{text}</div></>
      ),
      sorter: (a, b) => a.totVal.length - b.totVal.length,
    },
    {
      title: "Lead No",
      dataIndex: "lSubNo",
      render: (text, record) => (
        <>{text}</>
      ),
      sorter: (a, b) => a.lSubNo.length - b.lSubNo.length,
    },
   
    {
      title: "Action",
      render: (text, record) => (
        <div className="text-end">
          <div className="dropdown dropdown-action">
            <a
              href="#"
              className="action-icon dropdown-toggle"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i className="material-icons">more_vert</i>
            </a>
            <div className="dropdown-menu dropdown-menu-end">
              {/* <a
                className="dropdown-item"
                href="edit-invoice"
              >
                <i className="fa fa-edit me-2" />
                Edit
              </a> */}
              <a
                className="dropdown-item"
                
                onClick={() => onRowClick(record)}
              >
                <i className="fa fa-eye me-2" />
                View
              </a>
              {/* <a
                className="dropdown-item"
                href="#"
              >
                <i className="fa fa-trash me-2" />
                Delete
              </a> */}
              {/* <a
                className="dropdown-item"
                href="#"
              >
                <i className="fa fa-check-circle me-2" />
                Mark as sent
              </a> */}
              {/* <a
                className="dropdown-item"
                href="#"
              >
                <i className="fa fa-paper-plane me-2" />
                Send Invoice
              </a> */}
              {/* <a
                className="dropdown-item"
                href="#"
              >
                <i className="fa fa-copy me-2" />
                Clone Invoice
              </a> */}
            </div>
          </div>
        </div>
      ),
    }
  ];
  const handleDateChange = (dateFieldName, dateValue) => {
    setDates({
      ...dates,
      [dateFieldName]: dateValue,
    });
    
};
const handleSelectChange = (selectedOption, selectName, setSelectedValues) => {
 
  // console.log(`Selected value for ${selectName}:`, selectedOption);
  
{
selectName == "select1" ? setCustomerCode(selectedOption.value):
null
}

setSelectedValues((prevSelectedValues) => ({
  ...prevSelectedValues,
  [selectName]: selectedOption,
}));
}
let sdate = convertDate(dates.date1)
  let edate = convertDate(dates.date2);

  const onRowClick = (record) => {
    history.push({
      pathname: "/view-invoice",
      state: { record:record },
    });
  }

  const getCustomerList = async () => {
    var correctData = [];
    let modifyUrl = `/api/LoadCustomerMasterList`;
    try {
      // setLoading(true);
      let { res, got } = await api(modifyUrl, "GET", "");
      if (res.status == 200) {
        let listData = got.data;
        // console.log("CustomerM", listData);
        listData.forEach((item) => {
          correctData.push({ value: item.code, label: item.name});
        });
         console.log('customerlist', correctData)
        setCustomerList(correctData);
        // setLoading(false);
      } else {
        // setLoading(false);
        alert("Something Went Wrong in List loading");
      }
    } catch (err) {
      // setLoading(false);
      alert(err);
    }
  };

  // =======================display Table on data==================================
 
  
  const getTableDataList = async () => {
 let ser="";
    let modifyUrl = `/api/LoadSaleQuotationReport?QCode=0&SQCustomer=${customerCode}&FDate=${sdate}&TDate=${edate}`;
    console.log("url",modifyUrl)
    try {
      // setLoading(true);
      let { res, got } = await api(modifyUrl, "GET", "");
      if (res.status == 200) {
        let listData = got;
        // console.log("CustomerM", listData);
       
         console.log('modifyData', listData)
         setCustomerTableData(listData)
        // setCustomerList(correctData);
        // setLoading(false);
      } else {
        // setLoading(false);
        alert("Something Went Wrong in List loading");
      }
    } catch (err) {
      // setLoading(false);
      alert(err);
    }
  };


  const loadConfigList = async () => {
    let Url = `/api/Loadconfiguration`;
    try {
      // setLoading(true);
      let { res, got } = await api(Url, "GET", "");
      if (res.status == 200) {
        let listData = got.data[0];
        // console.log("loadData", listData);

        let compCode = listData.compCode;
        let pre = listData.soqSeriesPre;
        let soq = listData.soqSeries;
        let fyear = listData.fy;
        // itemListHandler(compCode);
        // setCompCode(compCode);
        // setFYear(fyear);
        // setPrefix(pre);
        // setSoqSeries(soq);
        // setBusyBaseUrl(listData.squrl);
        loadBusySeriesList(listData.squrl,compCode,fyear)
      } else {
        // setLoading(false);
        alert("Something Went Wrong in List loading");
      }
    } catch (err) {
      // setLoading(false);
      alert(err);
    }
  };
  // ======================BusySeriesLoad================================
  const loadBusySeriesList = async (url,code,fY) => {
    let Url = `${url}/api/values/GetBusyMaster?VchType=26&CompCode=${code}&FY=${fY}&MasterType=5`;
    console.log('seriesUrl',Url);
    try {
      // setLoading(true)
      const h = new Headers();
      h.append("Accept", "application/json");
      // h.append("Authorization", token);
      h.append("CompCode", "ESCRMDB");
      h.append("FYear", "0");

      const myRequest1 = new Request(Url, {
        method: "GET",
        headers: h,
        mode: "cors",
        cache: "default",
      });

      fetch(myRequest1)
        .then((response) => response.json())

        .then((json) => {
          const TableData = json;
           console.log('StateData',TableData)
          // setTemplateList(TableData);
          // setLoading(false)
        });
    } catch (err) {
      alert(err);
    }
  };


React.useEffect(()=>{
  getCustomerList()
  // loadConfigList()
},[])
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        "selectedRows: ",
        selectedRows
      );
    },
    getCheckboxProps: record => ({
      disabled: record.name === "Disabled User", // Column configuration not to be checked
      name: record.name,
      className: "checkbox-red"
    })
  };
  return (
    <>
      {/* Page Wrapper */}
      <div className="page-wrapper">
        <Helmet>
          <title>Quotation- CRMS admin Template</title>
          <meta name="description" content="Reactify Blank Page" />
        </Helmet>
        {/* Page Content */}
        <div className="content container-fluid">
          <div className="crms-title row bg-white">
            <div className="col  p-0">
              <h3 className="page-title m-0">
                <span className="page-title-icon bg-gradient-primary text-white me-2">
                  <i className="fa fa-file" aria-hidden="true" />
                </span>{" "}
                Quotation List{" "}
              </h3>
            </div>
            <div className="col p-0 text-end">
              <ul className="breadcrumb bg-white float-end m-0 ps-0 pe-0">
                <li className="breadcrumb-item">
                  <Link to="/">Dashboard</Link>
                </li>
                <li className="breadcrumb-item active">Quotation List</li>
              </ul>
            </div>
          </div>
          {/* <div className="row align-items-center">
            <div className="col"></div>
            <div className="col-auto py-3">
              <Link to="invoices" className="invoices-links active">
                <FiList />
              </Link>
              <Link to="/invoice-grid" className="invoices-links">
                <FiGrid />
              </Link>
            </div>
          </div> */}
          {/* Report Filter */}
          <div className="card report-card">
            <div className="card-body pb-0">
              <div className="row">
                <div className="col-md-12 d-flex">
                  <div className="col-xl-3">
                    <InputSelect
                      labelClass="col-lg-12"
                      selectName="Customer"
                      selectClass="col-lg-12"
                      name="customer"
                      placeholder="Customer"
                      value={selectedValues.select1}
                      onChange={(selectedOption) =>
                        handleSelectChange(
                          selectedOption,
                          "select1",
                          setSelectedValues
                        )
                      }
                      options={customerList}
                      required
                    />
                  </div>
                  <div className="col-xl-3">
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
                  <div className="col-xl-3">
                    <DateTimeInput
                      datelblClass=""
                      dateinpClass="col-lg-12"
                      datelabel="Start Date"
                      // datestar="*"
                      dateFormat="dd/MM/yyyy"
                      selected={dates.date2}
                      onChange={(date) => handleDateChange("date2", date)}
                    />
                  </div>
                  <div className="col-xl-3">
                    <div className="report-btn" style={{ marginTop: "27px" }}>
                      <a href="#" className="btn" onClick={getTableDataList}>
                        Generate report
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* /Report Filter */}
          <div className="card invoices-tabs-card">
            <div className="card-body card-body pt-0 pb-0">
              <div className="invoices-main-tabs">
                <div className="row align-items-center">
                  <div className="col-lg-8 col-md-8">
                    <div className="invoices-tabs">
                      <ul>
                        <li>
                          <Link to="/invoices" className='active'>
                            All Quotation
                          </Link>
                        </li>
                       
                      </ul>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-4">
                    <div className="invoices-settings-btn">
                      {/* <a
                        href="invoices-settings"
                        className="invoices-settings-icon"
                      >
                        <FiSettings />
                      </a> */}
                      <Link to="/quotation" className="btn">
                        <FiPlusCircle/> 
                        <span className="ml-2">
                        New Quotation
                        </span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <div className="row">
            <div className="col-xl-3 col-sm-6 col-12">
              <div className="card inovices-card">
                <div className="card-body">
                  <div className="inovices-widget-header">
                    <span className="inovices-widget-icon">
                      <img src={IMG01} alt="" />
                    </span>
                    <div className="inovices-dash-count">
                      <div className="inovices-amount">$8,78,797</div>
                    </div>
                  </div>
                  <p className="inovices-all">
                    All Invoices <span>50</span>
                  </p>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-sm-6 col-12">
              <div className="card inovices-card">
                <div className="card-body">
                  <div className="inovices-widget-header">
                    <span className="inovices-widget-icon">
                      <img src={IMG02} alt="" />
                    </span>
                    <div className="inovices-dash-count">
                      <div className="inovices-amount">$4,5884</div>
                    </div>
                  </div>
                  <p className="inovices-all">
                    Paid Invoices <span>60</span>
                  </p>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-sm-6 col-12">
              <div className="card inovices-card">
                <div className="card-body">
                  <div className="inovices-widget-header">
                    <span className="inovices-widget-icon">
                      <img src={IMG03} alt="" />
                    </span>
                    <div className="inovices-dash-count">
                      <div className="inovices-amount">$2,05,545</div>
                    </div>
                  </div>
                  <p className="inovices-all">
                    Unpaid Invoices <span>70</span>
                  </p>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-sm-6 col-12">
              <div className="card inovices-card">
                <div className="card-body">
                  <div className="inovices-widget-header">
                    <span className="inovices-widget-icon">
                      <img src={IMG04} alt="" />
                    </span>
                    <div className="inovices-dash-count">
                      <div className="inovices-amount">$8,8,797</div>
                    </div>
                  </div>
                  <p className="inovices-all">
                    Cancelled Invoices <span>80</span>
                  </p>
                </div>
              </div>
            </div>
          </div> */}
          <div className="row">
            <div className="col-sm-12">
              <div className="card card-table">
                <div className="card-body p-4">
                  <div className="table-responsive">
                    <Table
                      rowSelection={rowSelection}
                      pagination={{
                        total: customerTableData.length,
                        showTotal: (total, range) =>
                          `Showing ${range[0]} to ${range[1]} of ${total} entries`,
                        showSizeChanger: true,
                        onShowSizeChange: onShowSizeChange,
                        itemRender: itemRender,
                      }}
                      className="table table-striped table-nowrap custom-table mb-0 datatable dataTable no-footer"
                      style={{ overflowX: "auto" }}
                      columns={columns}
                      dataSource={customerTableData}
                      rowKey={(record) => record.code}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* /Page Content */}
      </div>
      {/* /Page Wrapper */}
    </>
  );
};
export default QuotationList;