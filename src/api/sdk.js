import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://wlp.howizbiz.com/",
  timeout: 6000,
});
