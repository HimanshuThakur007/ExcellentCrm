import React from 'react';
import SubmitButton from '../../CustomComp/SubmitButton';
import PageHelmet from '../../CustomComp/PageHelmet';
import PageHeader from '../../CustomComp/PageHeader';
import CardComp from '../../CustomComp/CardComp';
import InputField from '../../CustomComp/InputField';
import ReactLoader from '../../CommonFile/ReactLoader';

const SourceMaster = (props) => {
  const {name} = props.inputValue;
  return (
    <>
       <div className="page-wrapper">
        <PageHelmet
          helmetTitle="Source - S&S Enterprises"
          helmetName="Source"
          helmetContent="Source Page"
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
            pageTitle="Source"
            disableTitle="Source"
          />
          {/* /Page Header */}

          <CardComp cardTitle="Location Form" cardBodyTitle="">
            <form onSubmit={props.saveHandler}>
              <div className="row">
                <div className="col-xl-8">
                  <InputField
                    type="text"
                    name="name"
                    labelName="Source"
                    value={name}
                    onChange={props.handleInputField}
                    required
                  />
                </div>
                {/* --------other side Input------ */}
                <div className="col-xl-4">
                  <SubmitButton
                    parentClass="text-lg-start text-center"
                    btnName="Submit"
                  />
                </div>
              </div>
            </form>
          </CardComp>
        </div>
      </div>
    </>
  )
}

export default SourceMaster;