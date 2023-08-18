import React from "react";
import Select from "react-select";

const InputSelect = (props) => {

  return (
    <>
      {/* col-form-label */}
      <div className="form-group row">
        <label className={`${props.labelClass} col-form-label`}>
          {props.selectName}
        </label>
        <div className={props.selectClass}>
          <Select
            name={props.name}
            placeholder={props.placeholder}
            defaultValue={props.defaultValue}
            value={props.value}
            onChange={props.onChange}
            options={props.options}
            required={props.required}
            isMulti={props.isMulti}
      
          />
        </div>
      </div>
    </>
  );
};

export default InputSelect;
