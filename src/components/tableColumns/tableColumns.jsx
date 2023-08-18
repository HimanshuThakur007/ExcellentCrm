import React from "react";
import { FiEdit, FiPlusCircle, FiTrash2, FiXCircle } from "react-icons/fi";
//  -------------------create userList rowdata-------------------------------
export const columnss = [
  {
    title: "Name",
    dataIndex: "name",
    sorter: (a, b) => a.name.length - b.name.length,
  },
  {
    title: "Password",
    dataIndex: "pwd",
    sorter: (a, b) => a.pwd.length - b.pwd.length,
  },

  {
    title: "Email",
    dataIndex: "email",
    sorter: (a, b) => a.email.length - b.email.length,
  },
  {
    title: "MobileNo",
    dataIndex: "mobNo",
    sorter: (a, b) => a.mobNo.length - b.mobNo.length,
  },

  {
    title: "Department",
    dataIndex: "departmentName",
    sorter: (a, b) => a.departmentName.length - b.departmentName.length,
  },
  {
    title: "Type",
    dataIndex: "utName",
    sorter: (a, b) => a.utName.length - b.utName.length,
  },
  {
    title: "Active",
    dataIndex: "activeName",
    sorter: (a, b) => a.activeName.length - b.activeName.length,
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
          <FiEdit className="feather-edit-3 me-1" /> Edit
        </a>
      </div>
    ),
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
];

//  -------------------create DepartmentList rowdata-------------------------------
export const department = [
  {
    title: "Name",
    dataIndex: "name",
    sorter: (a, b) => a.name.length - b.name.length,
  },

  {
    title: "Email",
    dataIndex: "email",
    sorter: (a, b) => a.email.length - b.email.length,
  },

  {
    title: "UserName",
    dataIndex: "username",
    sorter: (a, b) => a.username.length - b.username.length,
  },
  {
    title: "Mobile No",
    dataIndex: "monNo",
    sorter: (a, b) => a.monNo.length - b.monNo.length,
  },
  {
    title: "Company Code",
    dataIndex: "compCode",
    sorter: (a, b) => a.compCode.length - b.compCode.length,
  },
  {
    title: "Segment",
    dataIndex: "segment",
    sorter: (a, b) => a.compCode.length - b.compCode.length,
  },
  {
    title: "Address",
    dataIndex: "address",
    sorter: (a, b) => a.address.length - b.address.length,
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
          <FiEdit className="feather-edit-3 me-1" /> Edit
        </a>
      </div>
    ),
  },
];
// --------------purposeList-------------------------
export const Purpose = [
  {
    title: "Name",
    dataIndex: "name",
    sorter: (a, b) => a.name.length - b.name.length,
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
          <FiEdit className="feather-edit-3 me-1" /> Edit
        </a>
      </div>
    ),
  },
];

// -----------------BusinessNature---------------------------
export const BusinessNature = [
  {
    title: "Name",
    dataIndex: "name",
    sorter: (a, b) => a.name.length - b.name.length,
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
          <FiEdit className="feather-edit-3 me-1" /> Edit
        </a>
      </div>
    ),
  },
];
// -----------------Contractor---------------------------
export const contractor = [
  {
    title: "Name",
    dataIndex: "name",
    sorter: (a, b) => a.name.length - b.name.length,
  },
  {
    title: "Mobile No",
    dataIndex: "perMobNo",
    sorter: (a, b) => a.perMobNo.length - b.perMobNo.length,
  },
  {
    title: "Alternate No",
    dataIndex: "ofcMobNo",
    sorter: (a, b) => a.ofcMobNo.length - b.ofcMobNo.length,
  },
  {
    title: "Email",
    dataIndex: "email",
    sorter: (a, b) => a.email.length - b.email.length,
  },
  {
    title: "Type",
    dataIndex: "type",
    sorter: (a, b) => a.type.length - b.type.length,
  },
  {
    title: "Business Nature",
    dataIndex: "bnName",
    sorter: (a, b) => a.bnName.length - b.bnName.length,
  },
  {
    title: "DOB",
    dataIndex: "dob",
    sorter: (a, b) => a.dob.length - b.dob.length,
  },
  {
    title: "Organisation",
    dataIndex: "orgName",
    sorter: (a, b) => a.orgName.length - b.orgName.length,
  },
  {
    title: "Res. Address",
    dataIndex: "resAdd",
    sorter: (a, b) => a.resAdd.length - b.resAdd.length,
  },
  {
    title: "Office Address",
    dataIndex: "ofcAdd",
    sorter: (a, b) => a.ofcAdd.length - b.ofcAdd.length,
  },
  {
    title: "Pincode",
    dataIndex: "pinCode",
    sorter: (a, b) => a.pinCode.length - b.pinCode.length,
  },
  {
    title: "Location",
    dataIndex: "location",
    sorter: (a, b) => a.location.length - b.location.length,
  },
  {
    title: "DOA",
    dataIndex: "doa",
    sorter: (a, b) => a.doa.length - b.doa.length,
  },
  {
    title: "Action",
    dataIndex: "action",
    fixed: "right",
    width: 100,
    className: "text-end",
    render: (text, record) => (
      <div className="text-end">
        <a
          className="me-1 btn btn-sm bg-success-light"
          onClick={() => onRowClick(record)}
        >
          <FiEdit className="feather-edit-3 me-1" /> Edit
        </a>
      </div>
    ),
  },
];

export const columnCustomerList = [
  {
    title: "Name",
    dataIndex: "name",
    sorter: (a, b) => a.name.length - b.name.length,
  },
  {
    title: "User Name",
    dataIndex: "userName",
    sorter: (a, b) => a.userName.length - b.userName.length,
  },
  {
    title: "Mobile No.",
    dataIndex: "mobNo",
    sorter: (a, b) => a.mobNo.length - b.mobNo.length,
  },

  {
    title: "Email",
    dataIndex: "email",
    sorter: (a, b) => a.email.length - b.email.length,
  },

  {
    title: "Reference",
    dataIndex: "ref",
    sorter: (a, b) => a.ref.length - b.ref.length,
  },
  {
    title: "Architect Name",
    dataIndex: "archName",
    sorter: (a, b) => a.archName.length - b.archName.length,
  },
  {
    title: "Architect MobileNo",
    dataIndex: "archMobNo",
    sorter: (a, b) => a.archMobNo.length - b.archMobNo.length,
  },
  {
    title: "GST No",
    dataIndex: "gstNo",
    sorter: (a, b) => a.gstNo.length - b.gstNo.length,
  },
  {
    title: "Location",
    dataIndex: "location",
    sorter: (a, b) => a.location.length - b.location.length,
  },
  {
    title: "Action",
    dataIndex: "action",
    fixed: "right",
    width: 100,
    className: "text-end",
    render: (text, record) => (
      <div className="text-end">
        <a
          className="me-1 btn btn-sm bg-success-light"
          onClick={() => onRowClick(record)}
        >
          <FiEdit className="feather-edit-3 me-1" /> Edit
        </a>
      </div>
    ),
  },
];
