import React,{useState, useEffect} from 'react'
import ListPage from './ListPage'
import useFetch from '../Hooks/useFetch'
import { useHistory, useParams } from 'react-router-dom/cjs/react-router-dom.min'
import { Button } from 'antd'

const ListComp = () => {
  var api = useFetch()
  const routeParams = useParams()
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
        console.log('dataCustomer',got.data)
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
        console.log('dataUserCreation',got.data)
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
        console.log('depdata',got.data)
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
        default:

    }
  }
  
  
   const columnCustomerList = [
             
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
            
           ]
          //  -------------------create userList rowdata-------------------------------
           const columnss = [
             
            {
              title: 'Name',
              dataIndex: 'name',
                sorter: (a, b) => a.name.length - b.name.length,
            },
            {
              title: 'Password',
              dataIndex: 'pwd',
              sorter: (a, b) => a.pwd.length - b.pwd.length,
            },
          
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
              title: 'Name',
              dataIndex: 'name',
                sorter: (a, b) => a.name.length - b.name.length,
            },
          
            {
              title: 'Email',
              dataIndex: 'email',
              sorter: (a, b) => a.email.length - b.email.length,
            },

            {
              title: 'UserName',
              dataIndex: 'username',
              sorter: (a, b) => a.username.length - b.username.length,
            },
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
            {
              title: 'Segment',
              dataIndex: 'segment',
              sorter: (a, b) => a.compCode.length - b.compCode.length,
            },
            {
              title: 'Address',
              dataIndex: 'address',
              sorter: (a, b) => a.address.length - b.address.length,
            },

          
          ]

          useEffect(()=>{
            switch(routeParams.id){
              case "1":
                console.log('call')
                getuserCreationList();
                break;
                case "2":
                  getList()
                  break;
                case "3":
                  getDepartmentList()
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
        onRow={(record) => ({
        onClick: () => onRowClick(record),
      })}
      />
    </div>
  )
}

export default ListComp