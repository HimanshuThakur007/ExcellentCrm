import React from "react";
import { Link } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import PageHelmet from "../CustomComp/PageHelmet";
import {
  itemRender,
  onShowSizeChange,
} from "../../components/paginationfunction";
import { Table } from "antd";
import ReactLoader from "../CommonFile/ReactLoader";
import { BiUser } from "react-icons/bi";
import InputSelect from "../CustomComp/InputSelect";
import SubmitButton from "../CustomComp/SubmitButton";

const LeadPage = (props) => {
  const userData = sessionStorage.getItem("userData");
  if (userData !== null) {
    var dep = JSON.parse(userData).department;
    var depname = JSON.parse(userData).depName;
  }

  return (
    <div>
      <div className="page-wrapper">
        <PageHelmet
          helmetTitle="Leads - S&S Enterprises"
          helmetName="description"
          helmetContent="Leads Page"
        />

        {props.loading ? (
          <ReactLoader
            loaderClass="position-absolute"
            loading={props.loading}
          />
        ) : null}
        <div className="content container-fluid">
          {/* Page Header */}
          <div className="crms-title row bg-white mb-4">
            <div className="col  p-0">
              <h3 className="page-title">
                <span className="page-title-icon bg-gradient-primary text-white me-2">
                  {/* <i className="fa fa-object-group" aria-hidden="true" /> */}
                  <i>
                    <BiUser />
                  </i>
                </span>
                Leads{" "}
              </h3>
            </div>
            <div className="col p-0 text-end">
              <ul className="breadcrumb bg-white float-end m-0 pl-0 pr-0">
                <li className="breadcrumb-item">
                  <Link to="/">Dashboard</Link>
                </li>
                <li className="breadcrumb-item active">Leads</li>
              </ul>
            </div>
          </div>
          {/* /Page Header----------2 */}
          <div className="page-header pt-0 mb-0 ">
            <div className="row">
              <div className="col">
                <h4 className="advanced-report">Total Lead</h4>
              </div>
              <div className="col text-end">
                <ul className="list-inline-item pl-0"></ul>
              </div>
            </div>
          </div>

          {/* /-------------Page Header with inputField-----*/}
          <div className="row">
            <div className="col-md-12">
              <div className="card">
                <div className="card-body">
                  <div className="row pt-2">
                    <div className="col-xl-4">
                      <InputSelect
                        labelClass="col-lg-4"
                        selectName="Department"
                        selectClass="col-lg-8"
                        name="department"
                        placeholder="Department"
                        // defaultValue={[{value: 2, label: "Tiles"}]}
                        value={props.selectedValues.select1}
                        onChange={(selectedOption) =>
                          props.handleSelectChange(selectedOption, 'select1', props.setSelectedValues)}
                        // value={props.department}
                        // onChange={props.DepartementHandler}
                        options={props.departmentList}
                       
                      />
                    </div>
                    <div className="col-xl-4">
                      <InputSelect
                        labelClass="col-lg-4"
                        selectName="Lead Type"
                        selectClass="col-lg-8"
                        name="lead"
                        placeholder="Leads"
                        value={props.selectedValues.select2}
                        onChange={(selectedOption) =>
                          props.handleSelectChange(selectedOption, 'select2', props.setSelectedValues)}
                        options={[{value:1,label:'Assigned Lead'},{value: 2, label: "UnAssigned Lead"}]}
                       
                      />
                    </div>
                    <div className="col-xl-4">
                      <InputSelect
                        labelClass="col-lg-4"
                        selectName="Lead Status"
                        selectClass="col-lg-8"
                        name="lead"
                        placeholder="Leads"
                        // value={}
                        onChange={()=>{}}
                        options={[{value:1,label:'Assigned Lead'},{value: 2, label: "UnAssigned Lead"}]}
                       
                      />
                    </div>
                    {/* <div className="col-xl-3"> */}
                      <SubmitButton
                        parentClass="text-end"
                        onClick={props.getTableList}
                        btnName="Load Data"
                      />
                    {/* </div> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* ---------------Table in Card---------------- */}
          <div className="row">
            <div className="col-md-12">
              <div className="card">
                <div className="card-header">
                  <h4 className="card-title mb-0">Leads Table</h4>
                </div>
                <div className="card-body">
                  <div className="table-responsive">
                    <Table
                      rowSelection={props.rowSelection}
                      className="table table-striped table-nowrap custom-table mb-0 datatable dataTable no-footer"
                      pagination={{
                        total: props.data.length,
                        showTotal: (total, range) =>
                          `Showing ${range[0]} to ${range[1]} of ${total} entries`,
                        showSizeChanger: true,
                        onShowSizeChange: onShowSizeChange,
                        itemRender: itemRender,
                      }}
                      style={{ overflowX: "auto" }}
                      columns={props.columns}
                      dataSource={props.data}
                      rowKey={(record) => record.code}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* --------assign to----------------- */}
          <div className="row">
            <div className="col-md-12">
              <div className="card">
                <div className="card-body">
                  <div className="row pt-2">
                    <div className="col-xl-10">
                      <InputSelect
                        labelClass="col-lg-2"
                        selectName="Assign"
                        selectClass="col-lg-10"
                        name="assign"
                        placeholder="Assign"
                        value={props.selectedOption}
                        onChange={props.selectHandler}
                        options={props.assignList}
                        required
                      />
                    </div>
                    <div className="col-xl-2">
                      <SubmitButton
                        parentClass="text-center"
                        onClick={props.assignHandler}
                        btnName="Assign Lead"
                      />
                    </div>
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

export default LeadPage;
