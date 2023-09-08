import React,{useState, useEffect} from 'react'
import ListPage from './ListPage'
import useFetch from '../Hooks/useFetch'
import { useHistory, useParams } from 'react-router-dom/cjs/react-router-dom.min'
import { Button } from 'antd'
import { FiEdit, FiPlusCircle, FiTrash2, FiXCircle } from 'react-icons/fi';

const ListComp = () => {
  var api = useFetch()
  const routeParams = useParams()
  // console.log(routeParams,':--------')
  var history = useHistory();
  const [listData,setListData]=useState([])
  const [rowData, setRowData] = useState([]);
  const [loading, setLoading] = useState(false)


  // -------------------customerList------------------
  const getList = async () => {
  
    setLoading(true);
    let listUrl = `/api/LoadCustomerMasterList`;
    try {
      let { res, got } = await api(listUrl, "GET", "");
      if (res.status == 200) {
        // console.log('dataCustomer',got.data)
        let list = got.data;
       
        setListData(list);
        setRowData(columnCustomerList)
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
  // -------------------------userCreationList--------------------------------
  const getuserCreationList = async () => {

    let modifyUrl = `/api/LoadUserMasterList`;
    try {
      setLoading(true);
      let { res, got } = await api(modifyUrl, "GET", "");
      if (res.status == 200) {
        // console.log('dataUserCreation',got.data)
        let list = got.data;
       
        setListData(list);
        setRowData(columnss)
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

   // -------------------------userDepartementList--------------------------------
   const getDepartmentList = async () => {

     let Url = `/api/LoadDepMasterList`;
     try {
      setLoading(true);
      let { res, got } = await api(Url, "GET", "");
      if (res.status == 200) {
        // console.log('depdata',got.data)
        let list = got.data;
       
        setListData(list);
        setRowData(department)
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

  // ---------------------purpose---------------------------------------
  const getPurposeList = async () => {

    let Url = `/api/LoadMasterData?MasterType=6`;
    try {
     setLoading(true);
     let { res, got } = await api(Url, "GET", "");
     if (res.status == 200) {
      //  console.log('depdata',got.data)
       let list = got.data;
      
       setListData(list);
       setRowData(Purpose)
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
  // ---------------------business nature---------------------------------------
  const getBusinessNatureList = async () => {

    let Url = `/api/LoadMasterData?MasterType=7`;
    try {
     setLoading(true);
     let { res, got } = await api(Url, "GET", "");
     if (res.status == 200) {
      //  console.log('depdata',got.data)
       let list = got.data;
      
       setListData(list);
       setRowData(BusinessNature)
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
  // ---------------------Contractor---------------------------------------

  const getContractorList = async () => {
 let DataFormat =[]
    let Url = `/api/ArchMasterList`;
    try {
     setLoading(true);
     let { res, got } = await api(Url, "GET", "");
     if (res.status == 200) {
      //  console.log('depdata',got.data)
       let list = got.data;
      
       list.forEach((item)=>{
        
        DataFormat.push(
          {
            code:item.code,
            name:item.name,
            type:`${item.type == 1 ? "Premium" :item.type==2 ? "Normal" : item.type ==3 ? "Special": item.type == 4 ? "Vip": item.type == 5 ? "Vvip" : null}`,
            orgName:item.orgName,
            perMobNo:item.perMobNo,
            ofcMobNo:item.ofcMobNo,
            email:item.email,
            resAdd:item.resAdd,
            ofcAdd:item.ofcAdd,
            location:item.location,
            pinCode:item.pinCode,
            dob:item.dob,
            doa:item.doa,
            bnName:item.bnName,
            bn:item.bn,
            userName:item.userName
          }
            )
       })
       setListData(DataFormat);
      //  console.log('tttt', DataFormat)
       setRowData(contractor)
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

//  ------------bill Sundery List----------
const getBillSundryList = async () => {

  let Url = `/api/BillSundaryDetails?Code=0`;
  try {
   setLoading(true);
   let { res, got } = await api(Url, "GET", "");
   if (res.status == 200) {
     console.log('depdata',got.data)
     let list = got.data;
    
     setListData(list);
     setRowData(billsundry)
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

  // const handleDelete = (code) => {
  //   console.log('delete--', code)
  //   const updatedData = listData.filter((item) =>item.code !== code);
  //   console.log('updatedData', updatedData)
  //   setListData(updatedData);
  // };

  const onRowClick =(record)=>{
    switch(routeParams.id){
      case '1':
        history.push({ pathname: "/ursecreation", state: {code : record.code }})
        break;
      case '3':
        history.push({ pathname: "/department", state: {code : record.code }})
        break;
      case '2':
        history.push({ pathname: "/customer", state: {code : record.code }})
        break;
      case '4':
        history.push({ pathname: "/purpose", state: {code : record.code }})
        break;
      case '5':
        history.push({ pathname: "/architect", state: {code : record.code }})
        break;
      case '6':
        history.push({ pathname: "/businessnature", state: {code : record.code }})
        break;
      case '7':
        history.push({ pathname: "/billsundry", state: {code : record.code }})
        break;
        default:

    }
  }

  
  
   const columnCustomerList = [
    {
      title: 'SrNo',
      key: 'index',
      render : (text, record, index) => index +1,
    },
             {
               title: 'Name',
               dataIndex: 'name',
                 sorter: (a, b) => a.name.length - b.name.length,
             },
             {
              title: 'User Name',
              dataIndex: 'userName',
              sorter: (a, b) => a.userName.length - b.userName.length,
            },
             {
               title: 'Mobile No.',
               dataIndex: 'mobNo',
               sorter: (a, b) => a.mobNo.length - b.mobNo.length,
             },
           
             {
               title: 'Email',
               dataIndex: 'email',
               sorter: (a, b) => a.email.length - b.email.length,
             },
 
             {
               title: 'Reference',
               dataIndex: 'ref',
               sorter: (a, b) => a.ref.length - b.ref.length,
             },
             {
               title: 'Architect Name',
               dataIndex: 'archName',
               sorter: (a, b) => a.archName.length - b.archName.length,
             },
             {
               title: 'Architect MobileNo',
               dataIndex: 'archMobNo',
               sorter: (a, b) => a.archMobNo.length - b.archMobNo.length,
             },
             {
               title: 'GST No',
               dataIndex: 'gstNo',
               sorter: (a, b) => a.gstNo.length - b.gstNo.length,
             },
             {
               title: 'Location',
               dataIndex: 'location',
               sorter: (a, b) => a.location.length - b.location.length,
             },
             {
              title:'Action',
              dataIndex:'action',
              fixed: 'right',
              width: 100,
              className: "text-end",
              render: (text, record) => (
                <div className="text-end">
                 <a className="me-1 btn btn-sm bg-success-light" onClick={()=>onRowClick(record)}>
                    <FiEdit className="feather-edit-3 me-1" /> Edit
                    </a>
                </div>
              ),
            }
            
           ]
          //  -------------------create userList rowdata-------------------------------
           const columnss = [
            {
              title: 'SrNo',
              key: 'index',
              render : (text, record, index) => index +1,
            },
            {
              title: 'Name',
              dataIndex: 'name',
                sorter: (a, b) => a.name.length - b.name.length,
            },
            // {
            //   title: 'Password',
            //   dataIndex: 'pwd',
            //   sorter: (a, b) => a.pwd.length - b.pwd.length,
            // },
          
            {
              title: 'Email',
              dataIndex: 'email',
              sorter: (a, b) => a.email.length - b.email.length,
            },
            {
              title: 'MobileNo',
              dataIndex: 'mobNo',
              sorter: (a, b) => a.mobNo.length - b.mobNo.length,
            },

            {
              title: 'Department',
              dataIndex: 'departmentName',
              sorter: (a, b) => a.departmentName.length - b.departmentName.length,
            },
            {
              title: 'Type',
              dataIndex: 'utName',
              sorter: (a, b) => a.utName.length - b.utName.length,
            },
            {
              title: 'Active',
              dataIndex: 'activeName',
              sorter: (a, b) => a.activeName.length - b.activeName.length,
            },
            {
              title:'Action',
              dataIndex:'action',
              className: "text-end",
              render: (text, record) => (
                <div className="text-end">
                 <a className="me-1 btn btn-sm bg-success-light" onClick={()=>onRowClick(record)}>
                    <FiEdit className="feather-edit-3 me-1" /> Edit
                    </a>
                </div>
              ),
            }
            // {
            //   title: "Actions",
            //   dataIndex: "status",
            //   render: (text, record) => (
            //     <div className="dropdown dropdown-action">
            //       <a href="#" className="action-icon dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false"><i className="material-icons">more_vert</i></a>
            //       <div className="dropdown-menu dropdown-menu-right">
            //         <a className="dropdown-item" onClick={()=>onRowClick(record)}>Edit</a>
            //         <a className="dropdown-item" onClick={()=>handleDelete(record.code)}>Delete</a>
                    
            //       </div>
            //     </div>
            //   ),
            
            // },
            // {
            //   title: 'Actions',
            //   dataIndex: 'actions',
            //   key: 'actions',
            //   render: (_, record) => (
            //     <Button onClick={() => onRowClick(record)}>Edit</Button>
            //   ),
       
            
            // },
          
          ]
          //  -------------------create DepartmentList rowdata-------------------------------
           const department = [
            {
              title: 'SrNo',
              key: 'index',
              render : (text, record, index) => index +1,
            },
            {
              title: 'Name',
              dataIndex: 'name',
                sorter: (a, b) => a.name.length - b.name.length,
            },
          
            {
              title: 'Email',
              dataIndex: 'email',
              sorter: (a, b) => a.email.length - b.email.length,
            },

            // {
            //   title: 'UserName',
            //   dataIndex: 'username',
            //   sorter: (a, b) => a.username.length - b.username.length,
            // },
            {
              title: 'Mobile No',
              dataIndex: 'monNo',
              sorter: (a, b) => a.monNo.length - b.monNo.length,
            },
            {
              title: 'Company Code',
              dataIndex: 'compCode',
              sorter: (a, b) => a.compCode.length - b.compCode.length,
            },
            // {
            //   title: 'Segment',
            //   dataIndex: 'segment',
            //   sorter: (a, b) => a.compCode.length - b.compCode.length,
            // },
            {
              title: 'Address',
              dataIndex: 'address',
              sorter: (a, b) => a.address.length - b.address.length,
            },
            {
              title:'Action',
              dataIndex:'action',
              className: "text-end",
              render: (text, record) => (
                <div className="text-end">
                 <a className="me-1 btn btn-sm bg-success-light" onClick={()=>onRowClick(record)}>
                    <FiEdit className="feather-edit-3 me-1" /> Edit
                    </a>
                </div>
              ),
            }

          
          ]
          // --------------purposeList-------------------------
          const Purpose =[
            {
              title: 'SrNo',
              key: 'index',
              render : (text, record, index) => index +1,
            },
            {
              title: 'Name',
              dataIndex: 'name',
                sorter: (a, b) => a.name.length - b.name.length,
            },
             {
              title:'Action',
              dataIndex:'action',
              className: "text-end",
              render: (text, record) => (
                <div className="text-end">
                 <a className="me-1 btn btn-sm bg-success-light" onClick={()=>onRowClick(record)}>
                    <FiEdit className="feather-edit-3 me-1" /> Edit
                    </a>
                </div>
              ),
            }
          ]

          // -----------------BusinessNature---------------------------
          const BusinessNature =[
            {
              title: 'SrNo',
              key: 'index',
              render : (text, record, index) => index +1,
            },
            {
              title: 'Name',
              dataIndex: 'name',
                sorter: (a, b) => a.name.length - b.name.length,
            },
             {
              title:'Action',
              dataIndex:'action',
              className: "text-end",
              render: (text, record) => (
                <div className="text-end">
                 <a className="me-1 btn btn-sm bg-success-light" onClick={()=>onRowClick(record)}>
                    <FiEdit className="feather-edit-3 me-1" /> Edit
                    </a>
                </div>
              ),
            }
          ]
          // -----------------Contractor---------------------------
          const contractor =[
            {
              title: 'SrNo',
              key: 'index',
              render : (text, record, index) => index +1,
            },
            {
              title: 'Name',
              dataIndex: 'name',
                sorter: (a, b) => a.name.length - b.name.length,
            },
            {
              title: 'Mobile No',
              dataIndex: "perMobNo",
                sorter: (a, b) => a.perMobNo.length - b.perMobNo.length,
            },
            {
              title: 'Alternate No',
              dataIndex: "ofcMobNo",
                sorter: (a, b) => a.ofcMobNo.length - b.ofcMobNo.length,
            },
            {
              title: 'Email',
              dataIndex: "email",
                sorter: (a, b) => a.email.length - b.email.length,
            },
            {
              title: 'Type',
              dataIndex: "type",
                sorter: (a, b) => a.type.length - b.type.length,
            },
            {
              title: 'Business Nature',
              dataIndex: "bnName",
                sorter: (a, b) => a.bnName.length - b.bnName.length,
            },
            {
              title: 'DOB',
              dataIndex: "dob",
                sorter: (a, b) => a.dob.length - b.dob.length,
            },
            {
              title: 'Organisation',
              dataIndex: "orgName",
                sorter: (a, b) => a.orgName.length - b.orgName.length,
            },
            {
              title: 'Res. Address',
              dataIndex: "resAdd",
                sorter: (a, b) => a.resAdd.length - b.resAdd.length,
            },
            {
              title: 'Office Address',
              dataIndex: "ofcAdd",
                sorter: (a, b) => a.ofcAdd.length - b.ofcAdd.length,
            },
            {
              title: 'Pincode',
              dataIndex: "pinCode",
                sorter: (a, b) => a.pinCode.length - b.pinCode.length,
            },
            {
              title: 'Location',
              dataIndex: "location",
                sorter: (a, b) => a.location.length - b.location.length,
            },
            {
              title: 'DOA',
              dataIndex: "doa",
                sorter: (a, b) => a.doa.length - b.doa.length,
            },
             {
              title:'Action',
              dataIndex:'action',
              fixed: 'right',
              width: 100,
              className: "text-end",
              render: (text, record) => (
                <div className="text-end">
                 <a className="me-1 btn btn-sm bg-success-light" onClick={()=>onRowClick(record)}>
                    <FiEdit className="feather-edit-3 me-1" /> Edit
                    </a>
                </div>
              ),
            }
          ]
          // -----------------Bill Sundry---------------------------
          const billsundry =[
            {
              title: 'SrNo',
              key: 'index',
              render : (text, record, index) => index +1,
            },
            {
              title: 'Name',
              dataIndex: 'name',
                sorter: (a, b) => a.name.length - b.name.length,
            },
            {
              title: 'User Name',
              dataIndex: 'userName',
                sorter: (a, b) => a.userName.length - b.userName.length,
            },
            {
              title: 'BillSundry Type',
              dataIndex: "bsTypeName",
                sorter: (a, b) => a.bsTypeName.length - b.bsTypeName.length,
            },
            {
              title: 'Value',
              dataIndex: "value",
                sorter: (a, b) => a.value.length - b.value.length,
            },
            {
              title: 'Feed As',
              dataIndex: "feedAsName",
                sorter: (a, b) => a.feedAsName.length - b.feedAsName.length,
            },
            
             {
              title:'Action',
              dataIndex:'action',
              fixed: 'right',
              width: 100,
              className: "text-end",
              render: (text, record) => (
                <div className="text-end">
                 <a className="me-1 btn btn-sm bg-success-light" onClick={()=>onRowClick(record)}>
                    <FiEdit className="feather-edit-3 me-1" /> Edit
                    </a>
                </div>
              ),
            }
          ]

          useEffect(()=>{
            switch(routeParams.id){
              case "1":
                // console.log('call')
                getuserCreationList();
                break;
                case "2":
                  getList()
                  break;
                case "3":
                  getDepartmentList()
                  break;
                case "4":
                  getPurposeList()
                  break;
                case "5":
                  getContractorList()
                  break;
                case "6":
                  getBusinessNatureList()
                  break;
                case "7":
                  getBillSundryList()
                  break;
                  default:
        
            }
          },[routeParams.id])
  return (
    <div>
        <ListPage 
        loading={loading}
        columns={rowData} 
        data={listData} 
        HelmetTitle='List- CRM' 
        subHeader='List' 
        disableHeader='List' 
        defaultHead='List DataTable' 
        rowKey="code"
        onRowClick={onRowClick}
        routeParams={routeParams}
      //   onRow={(record) => ({
      //   onClick: () => onRowClick(record),
      // })}
      />
    </div>
  )
}

export default ListComp