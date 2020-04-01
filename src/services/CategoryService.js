import http from "./HttpService";

const apiEndpoint = "/categories";

export function getCategories() {
  return http.get(apiEndpoint);
}
