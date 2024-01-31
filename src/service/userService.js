import axios from "./customize_axios";
const fetchAllUser = (page) => {
  return axios.get(`/api/users?page=${page}`);
};

const postNewUsers = (name, job) => {
  return axios.post("/api/users", { name, job });
};
const putUpdateUsers = (name, job) => {
  return axios.put("/api/users/2", { name, job });
};
const deleteUsers = (id) => {
  return axios.delete(`/api/users/${id}`);
};
const postLoginApi = (email, password) => {
  return axios.post(`/api/login`, { email, password });
};
export {
  fetchAllUser,
  postNewUsers,
  putUpdateUsers,
  deleteUsers,
  postLoginApi,
};
