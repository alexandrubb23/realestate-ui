import React from "react";
import _ from "lodash";

/**
 * HTML table body.
 *
 * @param {object} param0
 */
function TableBody({ data, columns, textProperty, valueProperty }) {
  /**
   * Render cell.
   *
   * @param {object} item
   * @param {object} column
   */
  const renderCell = (item, column) => {
    if (column.content) return column.content(item);

    return _.get(item, column.path);
  };

  const createKey = (item, column) => {
    return item[valueProperty] + (column.path || column.key);
  };

  return (
    <tbody>
      {data.map(item => (
        <tr key={item[valueProperty]}>
          {columns.map(column => (
            <td key={createKey(item, column)}>{renderCell(item, column)}</td>
          ))}
        </tr>
      ))}
    </tbody>
  );
}

TableBody.defaultProps = {
  textProperty: "name",
  valueProperty: "_id"
};

export default TableBody;
