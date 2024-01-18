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
export { fetchAllUser, postNewUsers, putUpdateUsers };
