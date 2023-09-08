import React from "react";
import CardComp from "../../CustomComp/CardComp";
import PageHeader from "../../CustomComp/PageHeader";
import PageHelmet from "../../CustomComp/PageHelmet";
import InputField from "../../CustomComp/InputField";
import InputSelect from "../../CustomComp/InputSelect";
import ReactLoader from "../../CommonFile/ReactLoader";
import SubmitButton from "../../CustomComp/SubmitButton";

const AddBillSundry = (props) => {
  const { name, value } = props.inputValues;
  return (
    <>
      <div className="page-wrapper">
        <PageHelmet
          helmetTitle="Billsundry - S&S Enterprises"
          helmetName="Customer"
          helmetContent="Customer Page"
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
            pageTitle="BillSundry"
            disableTitle="BillSundry"
          />
          {/* /Page Header */}

          <CardComp cardTitle="BillSundry Form" cardBodyTitle="Information">
            <form onSubmit={props.saveHandler}>
              <div className="row">
                <div className="col-xl-6">
                  <InputField
                    type="text"
                    name="name"
                    labelName="Name"
                    value={name}
                    onChange={props.handleInputField}
                    required
                  />
                  <InputSelect
                    labelClass="col-lg-3"
                    selectName="BillSundry Type"
                    selectClass="col-lg-9"
                    name="typelist"
                    placeholder="Type"
                    value={props.selectedValues.select1}
                    onChange={(selectedOption) =>
                      props.handleSelectChange(
                        selectedOption,
                        "select1",
                        props.setSelectedValues
                      )
                    }
                    options={props.sundryType}
                    required
                  />
                </div>
                <div className="col-xl-6">
                  <InputField
                    type="number"
                    name="value"
                    labelName="Value"
                    value={value}
                    onChange={props.handleInputField}
                    required
                  />
                  <InputSelect
                    labelClass="col-lg-3"
                    selectName="Feed As"
                    selectClass="col-lg-9"
                    name="feedas"
                    placeholder="Feed as"
                    value={props.selectedValues.select2}
                    onChange={(selectedOption) =>
                      props.handleSelectChange(
                        selectedOption,
                        "select2",
                        props.setSelectedValues
                      )
                    }
                    options={props.Feed}
                    required
                  />
                </div>
              </div>
              <SubmitButton parentClass="text-end" btnName="Submit" />
            </form>
          </CardComp>
        </div>
      </div>
    </>
  );
};

export default AddBillSundry;
