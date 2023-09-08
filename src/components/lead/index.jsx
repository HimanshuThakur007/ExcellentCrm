import React, { useState, useEffect } from "react";
import useFetch from "../Hooks/useFetch";
import LeadPage from "./LeadPage";



const user_type_list = [
  { label: "HOD", value: 1 },
  { label: "Sales Person", value: 2 },
  { label: "Customer", value: 3 },
  { label: "FollowUp", value: 4 },
];

const ImportData = () => {
  const userData = sessionStorage.getItem('userData')
  const username = JSON.parse(userData).Admin;
 
  if (userData !== null) {
    var dep = JSON.parse(userData).department;
    var depname = JSON.parse(userData).depName;
  }

  const api = useFetch();

  const [departmentList, setDepartmentList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [department, setDepartment] = useState(null);
  const [tableData, setTableData] = useState([]);
  const [assignToList, setAssignToList] = useState([]);
  const [selectedTableData, setSelectedTableData] = React.useState([])
  const [depCode, setDepCode] = React.useState(0);
  const [assignCode, setAssignCode] = React.useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedValues, setSelectedValues] = useState({
    select1: null,
    select2: null,
  });
  const [Code, setCode] = React.useState(0);



 

  const DepartementHandler = (department) => {
    setDepartment(department);
    setDepCode(department.value)
  };

  const selectHandler = (selectOption) => {
    setSelectedOption(selectOption);
     setAssignCode(selectOption.value)
     
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
  const getTableList = async () => {

    let Url = `/api/LoadPendingLead?Dep=${depCode}`;
    // console.log('tableUrl',Url)
    try {
      setLoading(true);
      let { res, got } = await api(Url, "GET", "");
      if (res.status == 200) {
        // console.log('table-data',got.data)
        let tableData = got.data;
   
       setTableData(tableData)
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
          });
        });
        //  console.log('modifyData', correctData)
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
    var correctData = []
    // setLoader(true);
    let assignUrl = `/api/LoadUserMasterList`;
    try {
      setLoading(true)
      let { res, got } = await api(assignUrl, "GET", "");
      if (res.status == 200) {
        let listData = got.data;
        // if(listData.utName == 'FollowUp'){
       listData.forEach((item)=>{
        if(item.utName === 'FollowUp'){
        correctData.push({value:item.code, label:item.name})
        }
      })
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
  const assignHandler = async ()=>{

    let tableData =[];
    selectedTableData.forEach((item)=>{
      tableData.push({Code : item.code, Dep: item.depCode, AssignTo : assignCode, UserName: username})
    })

    var body = {
      LeadAssignDetails:[...tableData]
    }

    const url = "/api/LeadAssign";
    // console.log('bodyData', body)

    try {
      setLoading(true)
      let { res, got } = await api(url, "POST", body);
      if (res.status == 200) {
        // console.log("maindata",body);
        alert(got.msg);
        getTableList()
        setLoading(false)
      
      } else {
        setLoading(false)
        alert(got.msg);
      }
    } catch (error) {
      setLoading(false)
      alert(error);
    }

  }

  // -----multiple-Select-----------------------
  const handleSelectChange = (selectedOption, selectName, setSelectedValues) => {
 
    // console.log(`Selected value for ${selectName}:`, selectedOption);
    
 {
  selectName == "select1" ? setDepCode(selectedOption.value): selectName == 'select2'?setCode(selectedOption.value):null
 }

    setSelectedValues((prevSelectedValues) => ({
      ...prevSelectedValues,
      [selectName]: selectedOption,
    }));
  };
// console.log('cods of**:-',depCode,Code)
  useEffect(() => {
    getDepartementList();
    getAssignList();
  }, []);

 
  const columns = [
    {
      title: "Lead No.",
      dataIndex: "leadNo",
      
      sorter: (a, b) => a.leadNo.length - b.leadNo.length,
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
      title: "Department",
      dataIndex: "departemnt",
      render: (text, record) => <>{text}</>,
      sorter: (a, b) => a.departemnt.length - b.departemnt.length,
    },
    {
      title: "Mobile",
      dataIndex: "mobNo",
      render: (text, record) => <>{text}</>,
      sorter: (a, b) => a.mobNo.length - b.mobNo.length,
    },
    {
      title: "Email Address",
      dataIndex: "email",
      render: (text, record) => <>{text}</>,
      sorter: (a, b) => a.email.length - b.email.length,
    },
    {
      title: "Bath No",
      dataIndex: "bathNo",
      render: (text, record) => <label>{text}</label>,
      sorter: (a, b) => a.bathNo.length - b.bathNo.length,
    },
    {
      title: "Construction Area",
      dataIndex: "cArea",
      render: (text, record) => <>{text}</>,
      sorter: (a, b) => a.cArea.length - b.cArea.length,
    },
    // {
    //   title: "Lead Owner",
    //   dataIndex: "owner",
    //   render: (text, record) => <>{text}</>,
    //   sorter: (a, b) => a.owner.length - b.owner.length,
    // },
    // {
    //   title: "",
    //   dataIndex: "star",
    //   render: (text, record) => <i className="fa fa-star" aria-hidden="true" />,
    //   sorter: (a, b) => a.status.length - b.status.length,
    // },

    // {
    //   title: "Actions",
    //   dataIndex: "status",
    //   render: (text, record) => (
    //     <div className="dropdown dropdown-action">
    //       <a
    //         href="#"
    //         className="action-icon dropdown-toggle"
    //         data-bs-toggle="dropdown"
    //         aria-expanded="false"
    //       >
    //         <i className="material-icons">more_vert</i>
    //       </a>
    //       <div className="dropdown-menu dropdown-menu-right">
    //         <a className="dropdown-item" href="#">
    //           Edit This Lead
    //         </a>
    //         <a className="dropdown-item" href="#">
    //           Change Lead Image
    //         </a>
    //         <a className="dropdown-item" href="#">
    //           Delete This Lead
    //         </a>
    //         <a className="dropdown-item" href="#">
    //           Email This Lead
    //         </a>
    //         <a className="dropdown-item" href="#">
    //           Clone This Lead
    //         </a>
    //         <a className="dropdown-item" href="#">
    //           Change Record Owner
    //         </a>
    //         <a className="dropdown-item" href="#">
    //           Generate Merge Document
    //         </a>
    //         <a className="dropdown-item" href="#">
    //           Change Lead to Contact
    //         </a>
    //         <a className="dropdown-item" href="#">
    //           Convert Lead
    //         </a>
    //         <a className="dropdown-item" href="#">
    //           Print This Lead
    //         </a>
    //         <a className="dropdown-item" href="#">
    //           Merge Into Lead
    //         </a>
    //         <a className="dropdown-item" href="#">
    //           SmartMerge Lead
    //         </a>
    //         <a className="dropdown-item" href="#">
    //           Add Activity Set To Lead
    //         </a>
    //         <a className="dropdown-item" href="#">
    //           Add New Event For Lead
    //         </a>
    //       </div>
    //     </div>
    //   ),
    // },
  ];

  

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      // console.log(
      //   `selectedRowKeys: ${selectedRowKeys}`,
      //   "selectedRows: ",
      //   selectedRows
      // );
      setSelectedTableData(selectedRows)
    },
    getCheckboxProps: (record) => ({
      disabled: record.name === "Disabled User", // Column configuration not to be checked
      name: record.name,
      className: "checkbox-red",
    }),
  };

  // console.log('sssssdddddddd', selectedTableData)

  return (
    <>
    <LeadPage 
    rowSelection={rowSelection} 
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

     />
    
    </>
   
  );
};

export default ImportData;
