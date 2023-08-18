import React from "react";

const SubmitButton = (props) => {
  return (
    <>
      <div className={props.parentClass}>
        <button type="submit" className="btn btn-primary" onClick={props.onClick}>
          {props.btnName}
        </button>
      </div>
    </>
  );
};

export default SubmitButton;
