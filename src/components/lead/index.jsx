import React, { useState, useEffect } from "react";
import useFetch from "../Hooks/useFetch";
import LeadPage from "./LeadPage";
import {
  useHistory,
  useLocation,
} from "react-router-dom/cjs/react-router-dom.min";
import ReactToast, {
  showToastMessage,
  showToastError,
} from "../CustomComp/ReactToast";
import { convert, convertDate } from "../CommonFile/DateTimeInput";
import { Excel } from "antd-table-saveas-excel";
import LostReasonModal from "./LostReasonModal";

// const user_type_list = [
//   { label: "HOD", value: 1 },
//   { label: "Sales Person", value: 2 },
//   { label: "Customer", value: 3 },
//   { label: "FollowUp", value: 4 },
// ];
const Call_Status = [
  { value: 0, label: "Not Done" },
  { value: 1, label: "Done" },
  { value: 2, label: "ToDo" },
  { value: 3, label: "Call" },
  { value: 4, label: "Email" },
  { value: 5, label: "Reminder" },
];
const Lead_status = [
  {
    value: 1,
    label: "Won",
  },
  {
    value: 2,
    label: "Reschedule",
  },
  {
    value: 3,
    label: "Close",
  },
  {
    value: 4,
    label: "Lost",
  },
];

const ImportData = () => {
  const userData = sessionStorage.getItem("userData");
  const username = JSON.parse(userData).Admin;
  const [checkedItems, setCheckedItems] = useState({});
  const [searchText, setSearchText] = React.useState("");

  if (userData !== null) {
    var dep = JSON.parse(userData).department;
    var depname = JSON.parse(userData).depName;
    var userId = JSON.parse(userData).UserId;
  }
  const { state } = useLocation();
  //  const history = useHistory();

  const api = useFetch();

  const [departmentList, setDepartmentList] = useState([]);
  const [purposeData, setPurposeData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [department, setDepartment] = useState(null);
  const [tableData, setTableData] = useState([]);
  const [assignToList, setAssignToList] = useState([]);
  const [selectedTableData, setSelectedTableData] = React.useState([]);
  const [displayCustomerData, setDisplayCustomerData] = React.useState([]);
  const [customerList, setCustomerList] = React.useState([]);
  const [sourceData, setSourceData] = React.useState([]);
  const [depCode, setDepCode] = React.useState(0);
  const [assignCode, setAssignCode] = React.useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [multiSelectValue, setMultiSelectValue] = useState([]);
  const [assignUserList, setAssignUserList] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(0);
  const [selectedValues, setSelectedValues] = useState({
    select1: null,
    select2: null,
    select4:null,
    purpose: null,
    source: null,
    customer: null,
  });
  const [Code, setCode] = React.useState(0);
  const [rowCode, setRowCode] = useState(0);
  const [RecordCode, setRecordCode] = React.useState(0);
  const history = useHistory();
  const [defaultCheckDept, setDefaultCheckDept] = React.useState("");
  const [inputValue, setInputValue] = useState({
    BathNo: "",
    cArea: "",
    Remark: "",
  });
  const [feedbackInput, setFeedBackInput] = useState("");
  const [lostReason, setLostReason] = useState("");
  const [leadStatusCode, setLeadStatusCode] = useState(0);
  const [leadStatus, setLeadStatus] = useState(0);
  const [callStatusCode, setCallStatusCode] = useState(0);
  const [purposeCode, setPurposeCode] = React.useState(0);
  const [sourceCode, setSourceCode] = React.useState(0);
  var date = new Date(),
    mnth = ("0" + date.getMonth()).slice(-2),
    day = ("0" + date.getDate()).slice(-2);
  let updatedData = [date.getFullYear(), mnth, day].join("/");

  // console.log(new Date(updatedData),'date')

  const [dates, setDates] = React.useState({
    from: new Date(updatedData),
    to: new Date(),
    startDate: new Date(),
    dateandtime: new Date(),
    // Add more date fields as needed
  });
  // let custdisplay = AllData.customerMasterData
  // console.log("defaultCheckDept", defaultCheckDept);

  const handleDateChange = (dateFieldName, dateValue) => {
    setDates({
      ...dates,
      [dateFieldName]: dateValue,
    });
  };

  React.useEffect(() => {
    if (userData !== null) {
      var temp = JSON.parse(userData).department;
      // console.log('defaultCheckDept 8888888888888888888',temp)

      setDefaultCheckDept(temp);
    }
  }, [userData]);

  const feedBackHandler = (e) => {
    let fback = e.target.value;
    setFeedBackInput(fback);
  };
  const lostReasonHandler = (e) => {
    let fback = e.target.value;
    setLostReason(fback);
  };

  const handleInputField = (e) => {
    const { name, value } = e.target;
    setInputValue((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const { BathNo, cArea, Remark } = inputValue;
  // const [customerSelect, setCustomerSelect]=React.useState(null)
  // const customerSelectHandler = (customerSelect)=>{

  //   setCustomerSelect(customerSelect)
  //   console.log(customerSelect,'ccccccccccc')
  //   let select = customerSelect.value
  //   let mobileCode = customerSelect.mobile
  //   // if()
  //   setSelectedCustomer(select)
  //   getCustomerDetails(mobileCode)

  // }
  const navigteHandler = (e) => {
    e.preventDefault();
    $("#add_lead").modal("hide");
    history.push("/customer");
  };

  const DepartementHandler = (department) => {
    setDepartment(department);
    setDepCode(department.value);
  };

  const selectHandler = (selectOption) => {
    setSelectedOption(selectOption);
    setAssignCode(selectOption.value);
  };

  // React.useEffect(()=>{
  //   if(department == null){
  //     setDepartment([{value: dep, label:depname}])

  //       getTableList()
  //   }
  // },[])
  // console.log('assignCode:---------',assignCode)

  // const handleMultiSelectChange = (selectOptions) => {
  //   console.log(selectOptions);
  //   setMultiSelectValue(selectOptions);
  // };
  // -----------------------tableListData--------------------------------
  let fdate = convertDate(dates.from);
  let tdate = convertDate(dates.to);

  const getTableList = async () => {
    let Url = `/api/LoadLeadList?FDate=${fdate || d}&TDate=${tdate}`;
    console.log("tableUrl", Url);
    try {
      setLoading(true);
      let { res, got } = await api(Url, "GET", "");
      if (res.status == 200) {
        console.log('table-data',got.data)
        let tableData = got.data;

        setTableData(tableData);
        setLoading(false);
      } else {
        setLoading(false);
        alert("First Select Department");
      }
    } catch (err) {
      setLoading(false);
      alert(err);
    }
  };

  React.useEffect(() => {
    getTableList();
  }, [fdate, tdate]);

  // --------------------DepartmentList-----------------------------

  const getDepartementList = async () => {
    var correctData = [];
    let Url = `/api/LoadDepMasterList`;
    try {
      setLoading(true);
      let { res, got } = await api(Url, "GET", "");
      if (res.status == 200) {
        // console.log('data',got.data)
        let listData = got.data;

        listData.forEach((item) => {
          correctData.push({
            value: item.code,
            label: item.name,
            comp: item.compCode,
            // checked: false,
          });
        });
        console.log("dapartmentData", JSON.stringify(correctData));
        if (userData !== null) {
          var temp = JSON.parse(userData).department;
          // console.log('defaultCheckDept 8888888888888888888',temp)

          setDefaultCheckDept(temp);
        }
        var defCheck = correctData.find((obj) => {
          return obj.value == temp;
        });
        //  console.log("@@@@@@@@@@@@@@@@*********@@",correctData)
        setCheckedItems({
          ...checkedItems,
          [defCheck.label]: defCheck.value,
        });
        setDepartmentList(correctData);
        // setCompcode(correctData[0].comp)
        setLoading(false);
      } else {
        setLoading(false);
        alert("Select Department First");
      }
    } catch (err) {
      setLoading(false);
      alert(err);
    }
  };

  // ===================assignto List=================================
  const getAssignList = async () => {
    var correctData = [];
    // setLoader(true);
    let assignUrl = `/api/LoadUserMasterList`;
    try {
      setLoading(true);
      let { res, got } = await api(assignUrl, "GET", "");
      if (res.status == 200) {
        let listData = got.data;
        // if(listData.utName == 'FollowUp'){
        listData.forEach((item) => {
          if (item.utName === "FollowUp") {
            correctData.push({ value: item.code, label: item.name });
          }
        });
        // }
        //  console.log('Assignto user', correctData)
        setAssignToList(correctData);
        setLoading(false);
      } else {
        setLoading(false);
        alert("Something Went Wrong in loading");
      }
    } catch (err) {
      setLoading(false);
      alert(err);
    }
  };

  // --------------Lead-assignHandler--------------
  const assignHandler = async () => {
    let tableData = [];
    selectedTableData.forEach((item) => {
      tableData.push({
        Code: item.code,
        Dep: item.depCode,
        AssignTo: assignCode,
        UserName: username,
      });
    });

    var body = {
      LeadAssignDetails: [...tableData],
    };

    const url = "/api/LeadAssign";
    // console.log('bodyData', body)

    try {
      setLoading(true);
      let { res, got } = await api(url, "POST", body);
      if (res.status == 200) {
        // console.log("maindata",body);
        alert(got.msg);
        getTableList();
        setLoading(false);
      } else {
        setLoading(false);
        alert(got.msg);
      }
    } catch (error) {
      setLoading(false);
      alert(error);
    }
  };
  const [mobileNo, setMobileNo] = React.useState("");

  // -----multiple-Select-----------------------
  const handleSelectChange = (
    selectedOption,
    selectName,
    setSelectedValues
  ) => {
    // console.log(`Selected value for ${selectName}:`, selectedOption);

    {
      selectName == "select1"
        ? setDepCode(selectedOption.value)
        : selectName == "select2"
        ? setCode(selectedOption.value)
        : selectName == "select3"
        ? setCallStatusCode(selectedOption.value)
        : selectName == "select4"
        ? setLeadStatusCode(selectedOption.value)
        : selectName == "leadStatus"
        ? setLeadStatus(selectedOption.value)
        : selectName == "purpose"
        ? setPurposeCode(selectedOption.value)
        : selectName == "customer"
        ? (setSelectedCustomer(selectedOption.value),
          setMobileNo(selectedOption.mobile),
          getCustomerDetails(selectedOption.mobile))
        : // console.log(selectedOption.mobile, "mmmmmmmmm")
        selectName == "source"
        ? setSourceCode(selectedOption.value)
        : null;
    }

    setSelectedValues((prevSelectedValues) => ({
      ...prevSelectedValues,
      [selectName]: selectedOption,
    }));
  };
  // console.log('cods of**:-',depCode,Code)

  // =========================Purpose field======================
  const getPurposeList = async () => {
    let currData = [];
    let Url = `/api/LoadMasterData?MasterType=6`;
    try {
      setLoading(true);
      let { res, got } = await api(Url, "GET", "");
      if (res.status == 200) {
        //  console.log('depdata',got.data)
        let list = got.data;
        list.forEach((item) => {
          currData.push({ value: item.code, label: item.name });
        });
        setPurposeData(currData);
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
  // =============================SourceMaster==========================

  const getSourceMasterList = async () => {
    let currData = [];
    let Url = `/api/LoadMasterData?MasterType=16`;
    try {
      setLoading(true);
      let { res, got } = await api(Url, "GET", "");
      if (res.status == 200) {
        //  console.log('depdata',got.data)
        let list = got.data;
        list.forEach((item) => {
          currData.push({ value: item.code, label: item.name });
        });
        setSourceData(currData);

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
  function getRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  // ======================getCode===========================

  // console.log("recCode", rowCode);

  // const onRowClick = (record) => Get
  //   $("#add_task").modal("show");
  //   code = record.code;
  //   // console.log(code);
  //   getModifyHandler(code);
  //   // history.push({
  //   //   pathname: "/tasks",
  //   //   state: { code: record.code },
  //   // });
  // };

  const columns = [
    {
      title: "Lead No.",
      dataIndex: "leadNo",
      filteredValue: [searchText],
      onFilter: (value, record) => {
        return (
          String(record.leadNo).toLowerCase().includes(value.toLowerCase()) ||
          String(record.leadDate).toLowerCase().includes(value.toLowerCase()) ||
          String(record.customer).toLowerCase().includes(value.toLowerCase()) ||
          String(record.mobNo).toLowerCase().includes(value.toLowerCase()) ||
          String(record.email).toLowerCase().includes(value.toLowerCase())
        );
      },
      render: (text, record) => (
        <>
          <a href="#" onClick={() => onRowClick(record)}>
            {text}
          </a>
        </>
      ),

      // sorter: (a, b) => a.leadNo.length - b.leadNo.length,
    },
    {
      title: "Lead Date",
      dataIndex: "leadDate",
      sorter: (a, b) => a.leadDate.length - b.leadDate.length,
    },
    {
      title: "Customer",
      dataIndex: "customer",
      render: (text, record) => <>{text}</>,
      sorter: (a, b) => a.customer.length - b.customer.length,
    },

    {
      title: "Mobile",
      dataIndex: "mobNo",
      render: (text, record) => (
        <span className="badge" style={{ background: getRandomColor() }}>
          {text}
        </span>
      ),
      sorter: (a, b) => a.mobNo.length - b.mobNo.length,
    },
    {
      title: "Email Address",
      dataIndex: "email",
      render: (text, record) => <>{text}</>,
      sorter: (a, b) => a.email.length - b.email.length,
    },
    {
      title: "No. Of Bath",
      dataIndex: "noOfBathroom",
      render: (text, record) => <label style={{ color: "blue" }}>{text}</label>,
      sorter: (a, b) => a.noOfBathroom.length - b.noOfBathroom.length,
    },
    {
      title: "Construction Area",
      dataIndex: "cunstructionArea",
      render: (text, record) => <span>{text}</span>,
      sorter: (a, b) => a.cunstructionArea.length - b.cunstructionArea.length,
    },
    {
      title: "Purpose",
      dataIndex: "purpose",
      render: (text, record) => <>{text}</>,
      sorter: (a, b) => a.purpose.length - b.purpose.length,
    },
    {
      title: "Source",
      dataIndex: "source",
      render: (text, record) => <>{text}</>,
      sorter: (a, b) => a.source.length - b.source.length,
    },
    {
      title: "Remark",
      dataIndex: "remark",
      render: (text, record) => <>{text}</>,
      sorter: (a, b) => a.remark.length - b.remark.length,
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (text, record) => (
        <div className="dropdown dropdown-action">
          <a
            href="#"
            className="action-icon dropdown-toggle"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <i className="material-icons">more_vert</i>
          </a>
          <div className="dropdown-menu dropdown-menu-right">
            <a className="dropdown-item" onClick={() => onModifyClick(record)}>
              Edit
            </a>
            <a className="dropdown-item" onClick={() => deleteHandler(record)}>
              Delete
            </a>
          </div>
        </div>
      ),
      // sorter: (a, b) => a.action.length - b.action.length,
    },
  ];

  // -------------------customerList------------------
  const getList = async () => {
    let currData = [];
    setLoading(true);
    let listUrl = `/api/LoadCustomerMasterList`;
    try {
      let { res, got } = await api(listUrl, "GET", "");
      if (res.status == 200) {
        // console.log("dataCustomer=====", got.data);
        let list = got.data;
        list.forEach((item) => {
          currData.push({
            value: item.code,
            label: item.name,
            mobile: item.mobNo,
          });
        });
        setCustomerList(currData);

        // setListData(list);
        // setRowData(columnCustomerList);
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
  // =============customerDetails=============================
  if (displayCustomerData[0] !== undefined && displayCustomerData[0] !== null) {
    var custCode = displayCustomerData[0].code;
    var mobile = displayCustomerData[0].mobile;
  }

  const getCustomerDetails = async (mobile) => {
    // let currData=[]
    setLoading(true);
    let listUrl = `/api/LoadCustomerMasterDetails?Code=0&MobNo=${mobile}`;
    try {
      let { res, got } = await api(listUrl, "GET", "");
      if (res.status == 200) {
        // console.log("dataCustomer=====", got.data);
        let list = got.data;
        var listData = list[0] != undefined ? list[0].customerMasterData : "";

        // console.log(listData, "+++++");
        // console.log(listData.mobNo,'mobile')
        // setMobileNo(listData.mobNo)

        setDisplayCustomerData(listData);

        // setListData(list);
        // setRowData(columnCustomerList);
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
  // =======================UserCreation=============================
  const getuserCreationList = async () => {
    let currData = [];
    let modifyUrl = `/api/LoadUserMasterList?ProjType=1`;
    try {
      setLoading(true);
      let { res, got } = await api(modifyUrl, "GET", "");
      if (res.status == 200) {
        let list = got.data;
        list.forEach((item) => {
          currData.push({ value: item.code, label: item.name });
        });
        setAssignUserList(currData);
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

  // console.log("RRRRRRRR=>",customerSelect)

  useEffect(() => {
    getDepartementList();
    getAssignList();
    getList();
    getPurposeList();
    getSourceMasterList();
    getuserCreationList();
  }, []);
  const onRowClick = (record) => {
    $("#followup-modal").modal("show");
    setSelectedTableData(record);

    // console.log(record)
  };
  const onModifyClick = (record) => {
    $("#add_lead").modal("show");
    // setSelectedTableData(record)
    let code = record.code;
    getModifyHandler(code);
    setRecordCode(code);
    // console.log(record, "modify");
  };

  // const rowSelection = {
  //   onChange: (selectedRowKeys, selectedRows) => {
  //     // console.log(
  //     //   `selectedRowKeys: ${selectedRowKeys}`,
  //     //   "selectedRows: ",
  //     //   selectedRows
  //     // );
  //     setSelectedTableData(selectedRows)
  //   },
  //   getCheckboxProps: (record) => ({
  //     disabled: record.name === "Disabled User", // Column configuration not to be checked
  //     name: record.name,
  //     className: "checkbox-red",
  //   }),
  // };

  const handleCheckboxChange = (event) => {
    var { name, checked, value } = event.target;
    if (checked) {
      setCheckedItems({
        ...checkedItems,
        [name]: value,
      });
    } else {
      var ob = checkedItems;
      delete ob[name], setCheckedItems(ob);
    }
  };
  console.log("checkedItem", checkedItems);

  // React.useEffect(()=>{
  //   console.log('checkedItemsss',checkedItems)
  //   if(checkedItems!==undefined){
  //     for(var o in checkedItems){
  //       console.log("############",checkedItems[o])
  //     }
  //   }

  // },[checkedItems])

  const handleMultiSelectChange = (selectOptions) => {
    // console.log(selectOptions);
    setMultiSelectValue(selectOptions);
  };
  // ==================================followup handler============================
  var leadCode = selectedTableData.code;
  // console.log('cc#####3',c)
  const savefollowUpHandler = async (e) => {
    e.preventDefault();
    const urlfollow = "/api/LeadFollowUp";
    // console.log('codeUsers', code)
    var body = {
      Lcode: leadCode,
      CallStatus: callStatusCode,
      Feedback: feedbackInput,
      FDate: convertDate(dates.startDate),
      lostReason : lostReason,
      RecheduleDT: convertDate(dates.dateandtime),
      LStatus: leadStatusCode,
    };
    console.log("bodyjson", JSON.stringify(body));
    // try {
    //   setLoading(true);
    //   let { res, got } = await api(urlfollow, "POST", body);
    //   if (res.status == 200) {
    //     // console.log("maindata", body);
    //     alert(got.msg);
    //     setFeedBackInput("");
    //     setSelectedValues({
    //       select4: null,
    //       select3: null,
    //     });
    //     setDates({
    //       startDate: new Date(),
    //       dateandtime: new Date(),
    //     });
    //     $("#followup-modal").modal("hide");
    //     // getFollowupList();
    //     setLoading(false);
    //   } else {
    //     setLoading(false);
    //     alert(got.msg);
    //   }
    // } catch (error) {
    //   setLoading(false);
    //   alert(error);
    // }
  };

  // console.log("mob", mobileNo);
  // ===================save Data=======================
  const saveHandler = async (e) => {
    e.preventDefault();
    // if (state && state.code) {
    //   var code = state.code;
    // }
    let checked = [];
    let assignData = [];

    const urlCustomer = "/api/LeadSaving";
    if (checkedItems !== undefined) {
      for (var o in checkedItems) {
        checked.push({
          Code: RecordCode || 0,
          VStatus: 0,
          Conv: 0,
          Dep: parseInt(checkedItems[o]),
        });
        // console.log("############",checkedItems[o])
      }
    }
    multiSelectValue.map((item, index) => {
      assignData.push({
        Code: RecordCode || 0,
        UserCode: item.value,
        Srno: index + 1,
      });
    });

    var body = {
      EsLeadHeader: [
        {
          Code: RecordCode || 0,
          VchNo: "0",
          VchDate: new Date(),
          Customer: custCode,
          LStatus: 0,
          CreatedBy: username,
          Dep: parseInt(dep),
          BathNo: parseInt(BathNo),
          cArea: parseInt(cArea),
          Remark: Remark,
          SName: 0,
          sMobile: mobileNo,
          Purpose: purposeCode,
          Source: sourceCode,
        },
      ],
      EsLeadDetails: [
        {
          Code: RecordCode || 0,
          SrNo: 0,
          Item: 0,
          Qty: 0,
          UOM: 0,
          Price: 0,
          Val: 0,
          Dep: 0,
        },
      ],
      EsLeadDepDetails: [...checked],
      EsLeadAssignToDetails: [...assignData],
      // CustContactList:[...currData],
    };
    console.log("bodyjson", JSON.stringify(body));
    try {
      setLoading(true);
      let { res, got } = await api(urlCustomer, "POST", body);
      if (res.status == 200) {
        $("#add_lead").modal("hide");
        getTableList();
        showToastMessage(got.msg);
        setInputValue({
          BathNo: "",
          cArea: "",
          Remark: "",
        });
        setMultiSelectValue([]);
        setSelectedCustomer([]);
        setLoading(false);
        setCheckedItems({});
      } else {
        setLoading(false);
        showToastError(got.msg);
      }
    } catch (error) {
      setLoading(false);
      showToastError(error);
    }
  };
  const clearHandler = () => {
    setCheckedItems({});
    setInputValue({
      BathNo: "",
      cArea: "",
      Remark: "",
    });

    setSelectedCustomer(0);

    setSelectedValues({
      purpose: null,
      source: null,
      customer: null,
    });
    setPurposeCode(0);
    setSourceCode(0);
    setSelectedCustomer(0);

    getCustomerDetails(0);

    setMultiSelectValue([]);
  };

  const getModifyHandler = async (code) => {
    setCheckedItems({});
    setInputValue({
      BathNo: "",
      cArea: "",
      Remark: "",
    });

    setSelectedCustomer(0);
    setSelectedValues({
      purpose: null,
      source: null,
      customer: null,
    });
    setPurposeCode(0);
    setSourceCode(0);
    setSelectedCustomer(0);
    getCustomerDetails(0);
    setMultiSelectValue([]);
    // var code = state.code;
    let assign = [];
    let checked = [];

    // setLoader(true);
    let modifyUrl = `/api/LeadModify?Code=${code}`;
    try {
      setLoading(true);
      let { res, got } = await api(modifyUrl, "GET", "");
      if (res.status == 200) {
        console.log("data", got.data);
        let listData = got.data[0];
        console.log("listData", listData);
        let checkedData = listData.leadDepDetails;
        let leadassign = listData.leadAssignToDetails;
        leadassign.map((item) => {
          assign.push({
            Code: code || 0,
            value: item.userCode,
            Srno: item.srno,
            label: item.userName,
          });
        });
        checkedData.map((items) => {
          checked.push({ Depname: items.depName, dep: items.dep });
        });
        var object = checked.reduce(
          (obj, item) => ((obj[item.Depname] = item.dep), obj),
          {}
        );
        console.log(checked, "oo78");
        console.log(object, "oo79");

        setCheckedItems({ ...object });
        setInputValue({
          BathNo: listData.bathNo,
          cArea: listData.cArea,
          Remark: listData.remark,
        });

        setSelectedCustomer(listData.customer);

        setSelectedValues({
          purpose: { label: listData.purposeName },
          source: { label: listData.sourceName },
          customer: { label: listData.customerName },
        });
        setPurposeCode(listData.purpose);
        setSourceCode(listData.source);
        setSelectedCustomer(listData.customer);
        let mobileCode = listData.sMobile;
        getCustomerDetails(mobileCode);

        setMultiSelectValue([...assign]);

        setLoading(false);
      } else {
        setLoading(false);
        showToastError("Something Went Wrong in List loading");
      }
    } catch (err) {
      setLoading(false);
      showToastError(err);
    }
  };

  const handleExportClick = () => {
    setLoading(true);
    const excel = new Excel();
    excel
      .addSheet("test")
      .addColumns(columns)
      .addDataSource(tableData, {
        str2Percent: true,
      })
      .saveAs("lead.xlsx");
    setLoading(false);
  };

  // ===================================Delete-Handler=============================================
  const deleteHandler = async (record) => {
    // e.preventDefault();
    let dataCode = record.code;
    const urlfollow = `/api/DeleteMasterTransaction?UCode=${userId}&MT=71001&Code=${dataCode}`;
    console.log("deleteUrl", urlfollow);
    var body = {};
    // console.log("bodyjson", JSON.stringify(body));
    try {
      setLoading(true);
      let { res, got } = await api(urlfollow, "POST", body);
      if (res.status == 200) {
        // console.log("maindata", body);
        alert(got.msg);
        getTableList();

        setLoading(false);
      } else {
        setLoading(false);
        alert(got.msg);
      }
    } catch (error) {
      setLoading(false);
      alert(error);
    }
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

  const showLostReason = ()=>{
    if(leadStatusCode == 4){
    $("#lost_reason").modal("show")
    $("#followup-modal").modal("hide");
    }else{
      $("#lost_reason").modal("hide")
      $("#followup-modal").modal("show");
    }
  }
console.log('checkcode', leadStatusCode)
  return (
    <>
      <ReactToast />
      {leadStatusCode == 4 ?(showLostReason()):''}
      <LostReasonModal lostReasonHandler={lostReasonHandler} lostReason={lostReason}/>
      <LeadPage
      toggleMenu={toggleMenu}
      customFilter={customFilter}
      menuOpen={menuOpen}
        // customerSelect={customerSelect}
        selectedTableData={selectedTableData}
        feedBackHandler={feedBackHandler}
        feedbackInput={feedbackInput}
        columns={columns}
        data={tableData}
        DepartementHandler={DepartementHandler}
        loading={loading}
        department={department}
        departmentList={departmentList}
        assignHandler={assignHandler}
        getTableList={getTableList}
        assignList={assignToList}
        selectHandler={selectHandler}
        selectedOption={selectedOption}
        selectedValues={selectedValues}
        setSelectedValues={setSelectedValues}
        handleSelectChange={handleSelectChange}
        customerList={customerList}
        // selectedCustomer={selectedCustomer}
        // customerSelectHandler={customerSelectHandler}
        displayCustomerData={displayCustomerData}
        navigteHandler={navigteHandler}
        handleCheckboxChange={handleCheckboxChange}
        checkedItems={checkedItems}
        defaultCheckDept={defaultCheckDept}
        purposeData={purposeData}
        sourceData={sourceData}
        multiSelectValue={multiSelectValue}
        handleMultiSelectChange={handleMultiSelectChange}
        assignUserList={assignUserList}
        inputValue={inputValue}
        handleInputField={handleInputField}
        saveHandler={saveHandler}
        handleDateChange={handleDateChange}
        dates={dates}
        savefollowUpHandler={savefollowUpHandler}
        leadStatus={Lead_status}
        CallStatus={Call_Status}
        leadStatusCode={leadStatusCode}
        clearHandler={clearHandler}
        setSearchText={setSearchText}
        handleExportClick={handleExportClick}
      />
    </>
  );
};

export default ImportData;
