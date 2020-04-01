import jwtDecode from "jwt-decode";
import http from "./HttpService";

const apiEndpoint = "/auth";
const tokenKey = "token";

http.setJwt(getJwt());

/**
 * User login.
 *
 * @param {string} email
 * @param {string} password
 */
export async function login(email, password) {
  const { data: jwt } = await http.post(apiEndpoint, {
    email,
    password
  });

  localStorage.setItem(tokenKey, jwt);
}

/**
 * Login with jwt.
 *
 * @param {string} jwt
 */
export function loginWithJwt(jwt) {
  localStorage.setItem(tokenKey, jwt);
}

/**
 * User logout.
 *
 * @returns
 */
export function logout() {
  localStorage.removeItem(tokenKey);
}

/**
 * Get current user data.
 *
 * @returns {object} null if no user
 */
export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem(tokenKey);
    return jwtDecode(jwt);
  } catch (ex) {
    return null;
  }
}

/**
 * Get jwt.
 *
 * @returns {string}
 */
export function getJwt() {
  return localStorage.getItem(tokenKey);
}

export default {
  login,
  loginWithJwt,
  logout,
  getCurrentUser,
  getJwt
};
