import axios from "axios";

const apiClient = axios.create({
    baseURL: "http://localhost:4040/",
  // baseURL: "https://58b3-103-175-8-35.ngrok-free.app",
  // headers: {
  //   "ngrok-skip-browser-warning": "skip-browser-warning",
  // },
});

export default apiClient;
