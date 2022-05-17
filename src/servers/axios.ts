import axios from "axios";

const instance = axios.create({
  withCredentials: true,
  baseURL: "https://api.cooperate-up.com/",
  headers: {
    "content-type": "application/json;charset=UTF-8",
    accept: "application/json,",
    "Access-Control-Allow-Origin": "*",
  },
});

export { instance };
