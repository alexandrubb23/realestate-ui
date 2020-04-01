import React from "react";

/**
 * Search box.
 *
 * @param {object}
 * @returns {string}
 */
function SearchBox({ value, onChange }) {
  return (
    <input
      type="text"
      name="query"
      className="form-control my-3"
      placeholder="Search..."
      onChange={e => onChange(e.currentTarget.value)}
    ></input>
  );
}

export default SearchBox;
