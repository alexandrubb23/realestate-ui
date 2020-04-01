import axios from "axios";
import logger from "./LogService";
import { toast } from "react-toastify";

/**
 * Set axios default url.
 */
axios.defaults.baseURL = process.env.REACT_APP_API_URL;

/**
 * Axios intercept any unexpected error.
 */
axios.interceptors.response.use(null, error => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;

  if (!expectedError) {
    logger.log(error);
    toast.error("An unexpected error occurred");
  }

  return Promise.reject(error);
});

/**
 * Add jwt into the header requests.
 *
 * @param {string} jwt
 * @returns
 */
function setJwt(jwt) {
  axios.defaults.headers.common["x-auth-token"] = jwt;
}

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  setJwt
};
