import React from "react";
import AddQuotation from "./AddQuotation";
import { FiEdit, FiPlusCircle, FiTrash2, FiXCircle } from "react-icons/fi";
import useFetch from "../Hooks/useFetch";
import {convertDate } from "../CommonFile/DateTimeInput";

const QuotationComp = () => {
  let api = useFetch();
  const [dates, setDates] = React.useState({
    fdate: new Date(),
    tdate: new Date(),
    // Add more date fields as needed
  });
  const [allPending, setAllPending] = React.useState(false);
  const [quotationShowHide, setQuotationShowHide] = React.useState(false);
  const [customerList, setCustomerList] = React.useState([]);
  const [quotationList, setQuotationList] = React.useState([]);
  const [selectCustomer, setSelectCustomer] = React.useState(null);

  const [customerCode, setCustomerCode] = React.useState(0);

  const [record, setRecord] = React.useState({});
  const [loading, setLoading] = React.useState(false);
  // console.log('record', record)
  let bool = allPending;
  let generateNumber = Number(bool);
  let fromDate = convertDate(dates.fdate);
  let toDate = convertDate(dates.tdate);

  //  console.log('dateConvert', convertDate(dates.fdate))

  const handleDateChange = (dateFieldName, dateValue) => {
    setDates({
      ...dates,
      [dateFieldName]: dateValue,
    });
  };

  const customerListHandler = (select) => {
    setSelectCustomer(select);
    setCustomerCode(select.value);
    //  console.log('se3', selectCustomer)
  };
  

  const checkHandler = (e) => {
    setAllPending(e.target.checked);
  };

  const getCustomerList = async () => {
    var correctData = [];
    let modifyUrl = `/api/LoadCustomerMasterList`;
    try {
      setLoading(true);
      let { res, got } = await api(modifyUrl, "GET", "");
      if (res.status == 200) {
        let listData = got.data;
        console.log("CustomerM", listData);
        listData.forEach((item) => {
          correctData.push({ value: item.code, label: item.name, mobile: item.mobNo });
        });
         console.log('correct', correctData)
        setCustomerList(correctData);
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

  const getQuotationList = async (e) => {
    e.preventDefault();
    // var correctData = [];
    let quotationUrl = `/api/LoadLeadForQuotation?Customer=${
      customerCode || 0
    }&FDate=${fromDate || ""}&TDate=${
      toDate || ""
    }&NotFilter=${generateNumber}`;

    // console.log("quotationUrl", quotationUrl);
    try {
      setLoading(true);
      let { res, got } = await api(quotationUrl, "GET", "");
      if (res.status == 200) {
        let listData = got.data;
        console.log("quotationList", listData);

        setQuotationList(listData);
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
  // ----------------------------------------------------------------------------

  React.useEffect(() => {
    getCustomerList();
    // loadConfigList();
    // loadQuotationNo();
  }, []);

  const columns = [
    {
      title: "Lead No.",
      dataIndex: "vchNo",

      sorter: (a, b) => a.vchNo.length - b.vchNo.length,
    },
    {
      title: "Lead Date",
      dataIndex: "vchDate",
      sorter: (a, b) => a.vchDate.length - b.vchDate.length,
    },
    {
      title: "Customer",
      dataIndex: "customer",
      render: (text, record) => <>{text}</>,
      sorter: (a, b) => a.customer.length - b.customer.length,
    },
    {
      title: "Mobile",
      dataIndex: "mobileNo",
      render: (text, record) => <>{text}</>,
      sorter: (a, b) => a.mobileNo.length - b.mobileNo.length,
    },
    {
      title: "No of Bath",
      dataIndex: "bathNo",
      render: (text, record) => <>{text}</>,
      sorter: (a, b) => a.bathNo.length - b.bathNo.length,
    },

    {
      title: "Construction Area",
      dataIndex: "cArea",
      render: (text, record) => <>{text}</>,
      sorter: (a, b) => a.cArea.length - b.cArea.length,
    },
    {
      title: "Action",
      dataIndex: "action",
      className: "text-end",
      render: (text, record) => (
        <div className="text-end">
          <a
            className="me-1 btn btn-sm bg-success-light"
            onClick={() => onRowClick(record)}
          >
            <FiEdit className="feather-edit-3 me-1" /> Quotation
          </a>
        </div>
      ),
    },
  ];

  const onRowClick = (record) => {
    console.log("rr#3", record);
    setRecord(record);
    setQuotationShowHide(true);
  };

  const [menuOpen, setMenuOpen] = React.useState(false)

  const customFilter = (option, searchText) => {
    // console.log(option.data.value,'vvvvv')
    return (
      // option.data.value.toLowerCase().includes(searchText.toLowerCase()) ||
      option.data.label.toLowerCase().includes(searchText.toLowerCase()) ||
      option.data.mobile.toLowerCase().includes(searchText.toLowerCase())
    )
  }

  const toggleMenu = (isOpen) => {
    setMenuOpen(isOpen)
  }

  return (
    <>
      <AddQuotation
      customerCode={customerCode}
      customFilter={customFilter}
      menuOpen={menuOpen}
      toggleMenu={toggleMenu}
        handleDateChange={handleDateChange}
        dates={dates}
        allPending={allPending}
        checkHandler={checkHandler}
        quotationShowHide={quotationShowHide}
        //  rowSelection={rowSelection}
        setQuotationShowHide={setQuotationShowHide}
        customerListHandler={customerListHandler}
        customerList={customerList}
        selectCustomer={selectCustomer}
        loading={loading}
        columns={columns}
        data={quotationList}
        record={record}
        setRecord={setRecord}
        getQuotationList={getQuotationList}
      />
    </>
  );
};

export default QuotationComp;
