import http from "./HttpService";

const apiEndpoint = "/users";

/**
 * User registration.
 *
 * @param {object} user
 */
export function register(user) {
  return http.post(apiEndpoint, {
    email: user.username,
    password: user.password,
    name: user.name
  });
}
