import React from "react";
import Select from "react-select";

const InputSelect = (props) => {
  const customStyles = {
    control: base => ({
      ...base,
      height: 43,
      minHeight: 43
    })
  };

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
            getOptionLabel={props.getOptionLabel}
            getOptionValue={props.getOptionValue}
            isOptionSelected={props.isOptionSelected}
            isSearchable={props.isSearchable}
            filterOption={props.filterOption}
            onMenuOpen={props.onMenuOpen}
            onMenuClose={props.onMenuClose}
            noOptionsMessage={props.noOptionsMessage}
            autoFocus={props.autoFocus}
            menuIsOpen={props.menuIsOpen}
            defaultValue={props.defaultValue}
            value={props.value}
            onChange={props.onChange}
            options={props.options}
            required={props.required}
            isMulti={props.isMulti}
            styles={props.styles||customStyles}
          />
        </div>
      </div>
    </>
  );
};

export default InputSelect;
