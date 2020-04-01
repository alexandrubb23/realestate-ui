import http from "./HttpService";

const apiEndpoint = "/media";

export function getImages() {
  return http.get(apiEndpoint);
}

export function saveImage(image) {
  return http.post(apiEndpoint, image, {
    headers: {
      "content-type": "multipart/form-data"
    }
  });
}
