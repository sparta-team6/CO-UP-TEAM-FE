import axios from "axios";

const instance = axios.create({
  withCredentials: true,
  baseURL: "http://formsg.shop:8080/",
  headers: {
    "content-type": "application/json;charset=UTF-8",
    accept: "application/json,",
    "Access-Control-Allow-Origin": "*",
  },
});

export { instance };
