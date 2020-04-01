import React from "react";

/**
 * HTML textarea.
 *
 * @param {object} param0
 */
function Textarea({ name, label, error, ...rest }) {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <textarea
        {...rest}
        name={name}
        className="form-control"
        id={name}
        rows="3"
      ></textarea>
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
}

export default Textarea;
