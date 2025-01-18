import axios, { AxiosInstance } from "axios";
// const SERVER_URL = "http://127.0.0.1:8000";
const SERVER_URL = "https://farm-shop-tfwt.onrender.com";

// const SERVER_URL = 'https://farm-shop-tfwt.onrender.com'

const getAxiosInstance = (): AxiosInstance => {
  const token = localStorage.getItem("access_token");
  //   axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  if (token === null) {
    return axios.create({
      baseURL: SERVER_URL,
      headers: {
        Accept: "application/json",
      },
    });
  }

  return axios.create({
    baseURL: SERVER_URL,
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

// const customFetch = axios.create({
//   baseURL: "http://localhost:3000",
//   headers: {
//     Accept: "application/json",
//   },
// });

export { getAxiosInstance, SERVER_URL };
