import React from "react";

/**
 * HTML select.
 *
 * @param {object} param0
 */
function Select({
  name,
  label,
  options,
  error,
  textProperty,
  valueProperty,
  ...rest
}) {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <select name={name} id={name} {...rest} className="form-control">
        <option value=""></option>
        {options.map(option => (
          <option key={option[valueProperty]} value={option[valueProperty]}>
            {option[textProperty]}
          </option>
        ))}
      </select>
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
}

Select.defaultProps = {
  textProperty: "name",
  valueProperty: "_id"
};

export default Select;
