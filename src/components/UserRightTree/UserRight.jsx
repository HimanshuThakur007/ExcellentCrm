import React, { useState } from "react";
import CheckboxTree from "react-checkbox-tree";
import "react-checkbox-tree/lib/react-checkbox-tree.css";
import PageHelmet from "../CustomComp/PageHelmet";
import PageHeader from "../CustomComp/PageHeader";
import CardComp from "../CustomComp/CardComp";
import SubmitButton from "../CustomComp/SubmitButton";

const UserRight = () => {
  const [checked, setChecked] = useState([]);
  const [expanded, setExpanded] = useState([]);


  const nodes = [
    {
      value: "1",
      label: "MasterManagement",
      children: [
        {
          value: "usertype",
          label: "UserType",
          children: [
            {
              value: "/user_type",
              label: "Add",
            },
            {
              value: "/list/10",
              label: "List",
            },
          ],
        },
        {
          Value: "department",
          label: "Department",
          children: [
            {
              value: "/department",
              label: "Add",
            },
            {
              value: "/list/3",
              label: "List",
            },
          ],
        },
        {
          value: "purpose",
          label: "Purpose",
          children: [
            {
              value: "/purpose",
              label: "Add",
            },
            {
              value: "/list/4",
              label: "List",
            },
          ],
        },
        {
          value: "source1",
          label: "Source",
          children: [
            {
              value: "/source",
              label: "Add",
            },
            {
              value: "/list/9",
              label: "List",
            },
          ],
        },
        {
          value: "trade1",
          label: "Type Of Trade",
          children: [
            {
              value: "/businessnature",
              label: "Add",
            },
            {
              value: "/list/6",
              label: "List",
            },
          ],
        },
        {
          value: "item1",
          label: "Item",
          children: [
            {
              value: "/importitem",
              label: "Import",
            },
            {
              value: "/itemlist",
              label: "List",
            },
          ],
        },
        {
          value: "bill1",
          label: "BillSundry",
          children: [
            {
              value: "/billsundry",
              label: "Add",
            },
            {
              value: "/list/7",
              label: "List",
            },
          ],
        },
       
      ],
    },
     {
       value: "user",
       label: "User",
       children: [
        { value: "/ursecreation", label: "Add" },
        { value: "/list/1", label: "List" },
    ],
     },
     {
       value: "customer",
       label: "Customer",
       children: [
        { value: "/customer", label: "Add" },
        { value: "/list/2", label: "List" },
        { value: "/importcustomer", label: "Import" },
    ],
     },
     {
       value: "contact",
       label: "Contact Master",
       children: [
        { value: "/architect", label: "Add" },
        { value: "/list/5", label: "List" },
    ],
     },
     {
       value: "lead1",
       label: "Lead",
       children: [{ value: "/leads", label: "Leads" }],
     },
     {
       value: "quot1",
       label: "Quotation",
       children: [
        { value: "/quotation", label: "Add" },
        { value: "/quotationlist", label: "List" },
    ],
     },
  ];
  React.useEffect(()=>{
      console.log('json',JSON.stringify(nodes))
    console.log("checked",checked)
  },[checked])

  return (
    <div className="page-wrapper">
      <PageHelmet
        helmetTitle="UserRight - S&S Enterprises"
        helmetName="description"
        helmetContent="ContactMaster Page"
      />
      {/* 
      {props.loading ? (
        <ReactLoader loaderClass="position-absolute" loading={props.loading} />
      ) : null} */}

      <div className="content container-fluid">
        {/* Page Header */}
        <PageHeader
          iclassName="fa fa-object-group"
          pageTitle="User Right"
          disableTitle="User Right"
        />
        {/* /Page Header */}

        <CardComp cardTitle="User Right Form" cardBodyTitle="Rights">
          <div className="row">
            <div className="col-lg-12">

              {/* <h4> Expanded : {JSON.stringify(expanded)} </h4>
              <h4> Selected : {JSON.stringify(checked)} </h4> */}

              <CheckboxTree
                nodes={nodes}
                checked={checked}
                expanded={expanded}
                onCheck={(checkedData) => {
                  setChecked(checkedData);
                }}
                onExpand={(expandedData) => {
                  setExpanded(expandedData);
                }}
              />
            </div>
          </div>
          <SubmitButton parentClass="text-end" btnName="Submit" />
        </CardComp>
      </div>
    </div>
  );
};

export default UserRight;
