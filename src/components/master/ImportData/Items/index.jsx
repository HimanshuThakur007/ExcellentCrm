import React, { useState, useEffect } from "react";
import "react-datepicker/dist/react-datepicker.css";
import useFetch from "../../../Hooks/useFetch";
import ItemPage from "./ItemPage";

const ImportItem = () => {
    const api = useFetch()
    
    const [departmentList, setDepartmentList]= useState([]);
    const [tableData, setTableData] = useState([]);
    const [loading, setLoading]= useState(false);
    const [department, setDepartment] = useState(null)
    const [compCode, setCompcode] = useState([]);
    const [departmentCode, setDepartmentCode] = useState(0);


    const DepartementHandler = (department)=>{
      setDepartment(department);
      setDepartmentCode(department.value)
      setCompcode(department.comp)
     }


    const getDepartementList = async () => {
        var correctData = []
        let Url = `/api/LoadDepMasterList`;
        try {
          setLoading(true);
          let { res, got } = await api(Url, "GET", "");
          if (res.status == 200) {
            // console.log('data',got.data)
            let listData = got.data;
           listData.forEach((item)=>{
            correctData.push({value:item.code, label:item.name, comp:item.compCode})
           })
          //  console.log('modifyData', correctData)
            setDepartmentList(correctData);
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


      const tableDataHandler = async (e)=>{
        e.preventDefault();

        let Url = `/api/LoadBusyItemMasterList?CompCode=${compCode}`;
        // console.log('urlData', Url)
        try {
          setLoading(true);
          let { res, got } = await api(Url, "GET", "");
          if (res.status == 200) {
            // console.log('data',got.data)
            let tableData = got.data;
            setTableData(tableData)
           
          // console.log('tabledata', tableData)
           
            setLoading(false);
          } else {
            setLoading(false);
            alert("Something Went Wrong in List loading");
          }
        } catch (err) {
          setLoading(false);
          alert(err);
        }

      }

      // ----------------------save Data---------------------------

      const saveTableDataHandler = async ()=>{
        var collectedData=[]
        tableData.forEach((item)=>{
          // console.log('itemName',item.name)
          var tableBody = {
            Code: 0,
            BCode:item.bCode,
            SegCode : departmentCode,
            Alias :item.alias,
            Name :item.name,
            ItemGRP :item.itemGRP,
            HSNCode :item.hsnCode,
            SalePrice :item.salePrice,
            MRP :item.mrp,
            PurchasePrice: item.purchasePrice,
            Unit : item.unit,
            UserName :''

          };
          collectedData.push(tableBody)
          
          // setTableBodyData(tableBody)
        })
        
        var body = {ItemMasterDetails : collectedData}
        // console.log('tableDataBody',body)
    
        const urlCustomer = "/api/SaveItemMaster"
        
        try {
          setLoading(true)
          let { res, got } = await api(urlCustomer, "POST", body);
          if (res.status == 200) {
            // console.log("response");
            alert(got.msg);
           
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
    
      useEffect(()=>{
        getDepartementList()
      },[])

            
      const columns = [
            
             {
               title: 'Alias',
               dataIndex: 'alias',
               sorter: (a, b) => a.alias.length - b.alias.length,
             },
           
            
             {
               title: 'Name',
               dataIndex: 'name',
               sorter: (a, b) => a.name.length - b.name.length,
             },
             {
               title: 'Item Group',
               dataIndex: 'itemGRP',
               sorter: (a, b) => a.itemGRP.length - b.itemGRP.length,
             },
             {
               title: 'HSN',
               dataIndex: 'hsnCode',
               sorter: (a, b) => a.hsnCode.length - b.hsnCode.length,
             },
             {
               title: 'Sale Price',
               dataIndex: 'salePrice',
               sorter: (a, b) => a.salePrice.length - b.salePrice.length,
             },
             {
               title: 'Purchase Price',
               dataIndex: 'purchasePrice',
               sorter: (a, b) => a.purchasePrice.length - b.purchasePrice.length,
             },
             {
               title: 'MRP',
               dataIndex: 'mrp',
               sorter: (a, b) => a.mrp.length - b.mrp.length,
             },
           
           
           ]

  return (
  <>
  <ItemPage
  saveTableDataHandler={saveTableDataHandler}
  tableDataHandler={tableDataHandler}
  DepartementHandler={DepartementHandler}
  departmentList={departmentList}
  loading={loading}
  department={department}
  columns={columns}
  tableData={tableData}
  />
  </>
  );
};

export default ImportItem;
