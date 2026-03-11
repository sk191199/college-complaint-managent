import axios from "axios";

const api = axios.create({
  // baseURL : "http://192.168.0.13:5000/api",
  baseURL: "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// interceptor --- automatically attach JWT token in Headers
api.interceptors.request.use(
  (config) => {
    // get token from local storage
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

//response intercept checking
api.interceptors.response.use(
  (response) => response, 
  (error) => {
    if (error.response && error.response.status === 401){
      localStorage.removeItem("token")
      localStorage.removeItem("user")

      window.location.replace("/  ")
    }
    return Promise.reject(error);
  }
);
export default api;
