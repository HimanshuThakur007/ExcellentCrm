import React from "react";
import PageHelmet from "../../../CustomComp/PageHelmet";
import PageHeader from "../../../CustomComp/PageHeader";
import InputSelect from "../../../CustomComp/InputSelect";
import {itemRender,onShowSizeChange} from '../../../paginationfunction'
import { Table } from 'antd';
import ReactLoader from "../../../CommonFile/ReactLoader";
import SubmitButton from "../../../CustomComp/SubmitButton";

const ItemPage = (props) => {
  return (
    <div>
      <div className="page-wrapper">
        <PageHelmet
          helmetTitle="ImportData - S&S Enterprises"
          helmetName="description"
          helmetContent="Import Page"
        />
        {props.loading ? (
          <ReactLoader
            loaderClass="position-absolute"
            loading={props.loading}
          />
        ) : null}
        <div className="content container-fluid">
          {/* Page Header */}
          <PageHeader
            iclassName="fa fa-object-group"
            pageTitle="Import"
            disableTitle="Import"
          />

          {/* /Page Header */}

          <div className="row">
            <div className="col-md-12">
              <div className="card">
                <div className="card-header">
                  <h4 className="card-title mb-0">Import Item</h4>
                </div>
                <div className="card-body">
                  <h4 className="card-title">Import Item Data</h4>
                  <form onSubmit={props.tableDataHandler}>
                    <div className="row">
                      <div className="col-xl-10">
                        <InputSelect
                          labelClass="col-lg-2"
                          selectName="Department"
                          selectClass="col-lg-10"
                          name="department"
                          placeholder="Department List"
                          value={props.department}
                          onChange={props.DepartementHandler}
                          options={props.departmentList}
                          required
                        />
                      </div>
                      <div className="col-xl-2">
                        {/* <div className="text-center">
                          <button type="submit" className="btn btn-primary">
                            Load Data
                          </button>
                        </div> */}
                        <SubmitButton parentClass="text-center" btnName="Load Data" />
                      </div>
                    </div>
                  </form>
                </div>

                <div className="card-body">
                  <div className="table-responsive">
                    <Table
                      pagination={{
                        total: props.tableData.length,
                        showTotal: (total, range) =>
                          `Showing ${range[0]} to ${range[1]} of ${total} entries`,
                        showSizeChanger: true,
                        onShowSizeChange: onShowSizeChange,
                        itemRender: itemRender,
                      }}
                      style={{ overflowX: "auto" }}
                      columns={props.columns}
                      bordered
                      dataSource={props.tableData}
                      rowKey={(record) => record.bCode}
                    />
                  </div>
                  <div className="text-end">
                    <button
                      type="submit"
                      className="btn btn-primary"
                      onClick={props.saveTableDataHandler}
                    >
                      Save Data
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemPage;
