import React, { useState, useEffect } from "react";
import InputSelect from "../../../CustomComp/InputSelect";
import "react-datepicker/dist/react-datepicker.css";
import PageHelmet from "../../../CustomComp/PageHelmet";
import PageHeader from "../../../CustomComp/PageHeader";
import Select from "react-select";
import { itemRender, onShowSizeChange } from "../../../paginationfunction";
import { Table } from "antd";
import useFetch from "../../../Hooks/useFetch";
import ReactLoader from "../../../CommonFile/ReactLoader";

const ItemList = () => {
  const api = useFetch();

  const [departmentList, setDepartmentList] = useState([]);
  const [groupList, setGroupList] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [department, setDepartment] = useState(null);
  const [itemListGroup, setItemListGroup] = useState(null);
  const [departmentCode, setDepartmentCode] = useState(0);
  const [itemGroupCode, setItemGroupCode] = useState(0);

  const DepartementHandler = (department) => {
    setDepartment(department);
    setDepartmentCode(department.value);
    // console.log("depValue", department.value);
  };
  const groupHandler = (itemListGroup) => {
    setItemListGroup(itemListGroup);
    setItemGroupCode(itemListGroup.value);
  };

// -------departmentList Api-------------------
  const getDepartementList = async () => {
    var correctData = [];
    let Url = `/api/LoadDepMasterList`;
    try {
      setLoading(true);
      let { res, got } = await api(Url, "GET", "");
      if (res.status == 200) {
        // console.log("data", got.data);
        let listData = got.data;
        listData.forEach((item) => {
          correctData.push({
            value: item.code,
            label: item.name,
            comp: item.compCode,
          });
        });
        // console.log("modifyData", correctData);
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

  //   ----------------------itemGroup-----------------------------

  const itemGroupHandler = async () => {
    var groupData = [];
    let Url = `/api/LoadMasterData?MasterType=4`;
    try {
      setLoading(true);
      let { res, got } = await api(Url, "GET", "");
      if (res.status == 200) {
        // console.log("data", got.data);
        let listData = got.data;
        listData.forEach((item) => {
          groupData.push({ value: item.code, label: item.name });
        });
        // console.log("modifyData", groupData);
        setGroupList(groupData);
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

  // ---------load Table api-------------

  const tableDataHandler = async (e) => {
    e.preventDefault();

    let Url = `/api/LoadItemMasterList?CompCode=${departmentCode}&ItemGrp=${itemGroupCode}`;
    // console.log("urlData", Url);
    try {
      setLoading(true);
      let { res, got } = await api(Url, "GET", "");
      if (res.status == 200) {
        // console.log("tableData", got.data);
        let tableData = got.data;
        setTableData(tableData);

        // console.log("tabledata", tableData);

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

  useEffect(() => {
    getDepartementList();
    itemGroupHandler();
  }, []);

  const columns = [
    {
      title: "Alias",
      dataIndex: "alias",
      sorter: (a, b) => a.alias.length - b.alias.length,
    },

    {
      title: "Name",
      dataIndex: "name",
      sorter: (a, b) => a.name.length - b.name.length,
    },
    {
      title: "Item Group",
      dataIndex: "itemGRP",
      sorter: (a, b) => a.itemGRP.length - b.itemGRP.length,
    },
    {
      title: "HSN",
      dataIndex: "hsnCode",
      sorter: (a, b) => a.hsnCode.length - b.hsnCode.length,
    },
    {
      title: "Sale Price",
      dataIndex: "salePrice",
      sorter: (a, b) => a.salePrice.length - b.salePrice.length,
    },
    {
      title: "Purchase Price",
      dataIndex: "purchasePrice",
      sorter: (a, b) => a.purchasePrice.length - b.purchasePrice.length,
    },
    {
      title: "MRP",
      dataIndex: "mrp",
      sorter: (a, b) => a.mrp.length - b.mrp.length,
    },
  ];

  return (
    <div>
      <div className="page-wrapper">
        <PageHelmet
          helmetTitle="ItemList - S&S Enterprises"
          helmetName="description"
          helmetContent="ItemList Page"
        />
        {loading ? (
          <ReactLoader loaderClass="position-absolute" loading={loading} />
        ) : null}
        <div className="content container-fluid">
          {/* Page Header */}
          <PageHeader
            iclassName="fa fa-object-group"
            pageTitle="List"
            disableTitle="List"
          />
          {/* /Page Header */}

          <div className="row">
            <div className="col-md-12">
              <div className="card">
                <div className="card-header">
                  <h4 className="card-title mb-0">Item List</h4>
                </div>
                <div className="card-body">
                  <h4 className="card-title">Item List Data</h4>
                  <form onSubmit={tableDataHandler}>
                    <div className="row">
                      <div className="col-xl-5">
                        <InputSelect
                          labelClass="col-lg-3"
                          selectName="Department"
                          selectClass="col-lg-8"
                          name="department"
                          placeholder="Department List"
                          value={department}
                          onChange={DepartementHandler}
                          options={departmentList}
                          required
                        />
                      </div>
                      <div className="col-xl-5">
                        <InputSelect
                          labelClass="col-lg-3"
                          selectName="Item Group"
                          selectClass="col-lg-8"
                          name="itemgrp"
                          placeholder="Item Group"
                          value={itemListGroup}
                          onChange={groupHandler}
                          options={groupList}
                          required
                        />
                      </div>
                      <div className="col-xl-2">
                        <div className="text-center">
                          <button type="submit" className="btn btn-primary">
                            Load Data
                          </button>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
                {tableData.length !== 0 ? (
                  <div className="card-body">
                    <div className="table-responsive">
                      <Table
                        pagination={{
                          total: tableData.length,
                          showTotal: (total, range) =>
                            `Showing ${range[0]} to ${range[1]} of ${total} entries`,
                          showSizeChanger: true,
                          onShowSizeChange: onShowSizeChange,
                          itemRender: itemRender,
                        }}
                        style={{ overflowX: "auto" }}
                        columns={columns}
                        bordered
                        dataSource={tableData}
                        rowKey={(record) => record.id}
                      />
                    </div>
                  </div>
                ) : (''
                  // <div className="text-center">
                  //   <h6>No Data found</h6>
                  // </div>
                )
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemList;
