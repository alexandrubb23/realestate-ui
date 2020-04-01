import http from "./HttpService";

const apiEndpoint = "/properties";

/**
 * Property end point.
 *
 * @param {string} id
 * @return {string}
 */
function propertyUrl(id) {
  return `${apiEndpoint}/${id}`;
}

/**
 * Get all properties.
 *
 * @returns {object}
 */
export function getProperties() {
  return http.get(apiEndpoint);
}

/**
 * Get property.
 *
 * @param {string} id
 * @returns {object}
 */
export function getProperty(id) {
  return http.get(propertyUrl(id));
}

/**
 * Save property/
 *
 * @param {object} property
 * @returns {object}
 */
export function saveProperty(property) {
  if (property._id) {
    const body = { ...property };

    delete body._id;
    return http.put(propertyUrl(property._id), body);
  }

  return http.post(apiEndpoint, property);
}

/**
 * Delete property.
 *
 * @param {string} id
 * @return {object}
 */
export function deleteProperty(id) {
  return http.delete(propertyUrl(id));
}
