import axios from "axios";

const BACKEND_URL = `${process.env.REACT_APP_BACKEND_URL}/api`

const api = axios.create({
  baseURL: BACKEND_URL,
  headers: {
    "Content-Type": "application/json",
    authorization: "Bearer " + sessionStorage.getItem("token"),
  },
});

api.interceptors.request.use(
  (request) => {
    if (token) {
      request.headers.authorization = `Bearer ${token}`;
    }
    return request;
  },
  function (error) {
    console.log("REQUEST ERROR", error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  function (error) {
    error = error.response.data;
    console.log("RESPONSE ERROR", error);
    return Promise.reject(error);
  }
);

export default api;
