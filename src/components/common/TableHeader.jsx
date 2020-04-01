import React from "react";

/**
 * HTML table header.
 *
 * @param {object} param0
 */
function TableHeader({ columns, sortColumn, onSort }) {
  /**
   * Rise sorting.
   *
   * @param {string} path
   */
  const raiseSort = path => {
    const sort = { ...sortColumn };

    if (sort.path === path) {
      sort.order = sort.order === "asc" ? "desc" : "asc";
    } else {
      sort.path = path;
      sort.order = "asc";
    }

    onSort(sort);
  };

  /**
   * Render sort icon.
   *
   * @param {object} column
   */
  const renderSortIcon = column => {
    if (column.path !== sortColumn.path) return null;

    let iconClass = "fa fa-sort-";
    iconClass += sortColumn.order === "asc" ? "asc" : "desc";

    return <i className={iconClass}></i>;
  };

  return (
    <thead>
      <tr>
        {columns.map(column => (
          <th
            className="clickable"
            key={column.path || column.key}
            onClick={() => raiseSort(column.path)}
          >
            {column.label} {renderSortIcon(column)}
          </th>
        ))}
      </tr>
    </thead>
  );
}

export default TableHeader;
