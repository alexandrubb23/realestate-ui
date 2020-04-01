import React from "react";
import TableHeader from "./TableHeader";
import TableBody from "./TableBody";

/**
 * HTML table.
 *
 * @param {object} param0
 */
function Table({ columns, sortColumn, onSort, data }) {
  return (
    <table className="table">
      <TableHeader columns={columns} sortColumn={sortColumn} onSort={onSort} />
      <TableBody data={data} columns={columns} />
    </table>
  );
}

export default Table;
