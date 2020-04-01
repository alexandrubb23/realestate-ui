import _ from "lodash";

/**
 * Paginate.
 *
 * @param {object} items
 * @param {number} pageNumber
 * @param {number} pageSize
 */
function paginate(items, pageNumber, pageSize) {
  const startIndex = (pageNumber - 1) * pageSize;
  return _(items)
    .slice(startIndex)
    .take(pageSize)
    .value();
}

export default paginate;
