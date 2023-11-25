import React, { useEffect } from "react";
import "react-checkbox-tree/lib/react-checkbox-tree.css";
import PageHelmet from "../CustomComp/PageHelmet";
import CardComp from "../CustomComp/CardComp";
import InputField from "../CustomComp/InputField";
import SubmitButton from "../CustomComp/SubmitButton";
import PageHeader from "../CustomComp/PageHeader";
import InputSelect from "../CustomComp/InputSelect";

const WhatsAppConfigPage = (props) => {
const Ratingdata =[
    {
    value:1,label:"1-Star"
},
    {
    value:2,label:"2-Star"
},
    {
    value:3,label:"3-Star"
},
    {
    value:4,label:"4-Star"
},
    {
    value:5,label:"5-Star"
},
]

  let iconStyles = { color: "grey" };

  return (
    <>
    <div className="page-wrapper">
      <PageHelmet
        helmetTitle="WhatsApp Config"
        helmetName="description"
        helmetContent="WhatsApp Config"
      />
      {/* {props.loading ? (
        <ReactLoader
          loaderClass="position-absolute"
          loading={props.loading}
        />
      ) : null} */}
      <div className="content container-fluid">
        {/* Page Header */}
        <PageHeader
          iclassName="fa fa-object-group"
          pageTitle="WhatsApp Configuration"
          disableTitle="WhatsApp Configuration"
        />

        {/* /Page Header */}

        <CardComp
        cardTitle="WhatsApp Configuration"
        cardBodyTitle="Configuration"
      >
        <form onSubmit={()=>{}}>
          <div className="row">
            <div className="col-xl-6">
              <InputField
                type="text"
                name="Url"
                labelName="Url"
                // value={username}
                // onChange={props.handleInputField}
                required
              />
              <InputField
                type="text"
                name="UserId"
                labelName="UserId"
                // value={email}
                // onChange={props.handleInputField}
                required
              />
              <InputField
                type="text"
                name="Password"
                labelName="Password"
                // value={email}
                // onChange={props.handleInputField}
                required
              />
              <InputField
                type="text"
                name="ap1"
                labelName="Additional Parameter1"
                // value={email}
                // onChange={props.handleInputField}
                required
              />
              <InputField
                type="text"
                name="AP2"
                labelName="Additional Parameter2"
                // value={email}
                // onChange={props.handleInputField}
                required
              />
              {/* <InputField
                type="text"
                name="Body"
                labelName="Body"
                // value={email}
                // onChange={props.handleInputField}
                required
              /> */}
              <InputSelect
                  labelClass="col-lg-3"
                  selectName="Rating"
                  selectClass="col-lg-9"
                  name="selectRating"
                  placeholder="Select Rating"
                //   value={props.department}
                //   onChange={props.DepartementHandler}
                  options={Ratingdata}
                  required
                />

              

            </div>
            <div className="col-xl-6">
              <InputField
                type="text"
                min="0"
                name="Value"
                labelName="Value"
                // value={mobile}
                // onChange={props.handleInputField}
                required
              />

              <InputField
                type="number"
                min="0"
                name="Value"
                labelName="Value"
                // value={whtsap}
                // onChange={props.handleInputField}
              />

              <InputField
                type="number"
                min="0"
                name="Value"
                labelName="Value"
                // value={whtsap}
                // onChange={props.handleInputField}
              />
              <InputField
                type="number"
                min="0"
                name="Value"
                labelName="Value"
                // value={whtsap}
                // onChange={props.handleInputField}
              />
              <InputField
                type="text"
                min="0"
                name="message"
                labelName="Message(P)"
                // value={whtsap}
                // onChange={props.handleInputField}
              />
              {/* <InputField
                type="text"
                min="0"
                name="message"
                labelName="Body"
                // value={whtsap}
                // onChange={props.handleInputField}
              /> */}
              <div className="form-group row">
                  <label className="col-lg-3 col-form-label">Body</label>
                  <div className="col-lg-9">
                    <textarea
                      type="text"
                      name="address"
                      rows="2"
                      className="form-control"
                      placeholder="body"
                    //   value={address}
                    //   onChange={props.handleInputField}
                    />
                  </div>
                </div>

              
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

export default WhatsAppConfigPage;
