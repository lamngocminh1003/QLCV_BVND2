// import axios from "axios";
import axios from '../setup/axios';

const registerNewUser = (data) => {
  let { email, userName, phone, password } = data;
  return axios.post("http://localhost:8080/api/v1/register", {
    email,
    userName,
    phone,
    password,
  });
};
const userLogin = (valueUserName, valuePassWord) => {
  return axios.post("/api/user/login", { valueUserName, valuePassWord });
};

const userLogout = () => {
  return axios.post("/api/user/logout");
}

const fetchUserList = (page, limit) => {
  return axios.get(`/api/user/read?page=${page}&limit=${limit}`);
}

const fetchUserById = (user) => {
  return axios.get("/api/user/read/userId", { data: { userId: user.id } });
}

const getUserAccount = () => {
  return axios.get(`api/user/account`);
}

const createNewUser = (userData) => {
  return axios.post(`/api/user/create`, { userData });
}

const deleteUserById = (user) => {
  return axios.delete("/api/user/delete", { data: { userId: user.id } });
}

const updateUserById = (userData) => {
  return axios.put(`/api/user/update`, { userData });
}

const fetchRoleList = () => {
  return axios.get(`/api/user/role/read`);
}

const fetchPositionList = () => {
  return axios.get(`/api/user/position/read`);
}

const fetchDepartmentList = () => {
  return axios.get(`/api/user/department/read`);
}

export {
  registerNewUser, userLogin, userLogout, fetchUserList, deleteUserById, updateUserById, createNewUser, getUserAccount,
  fetchRoleList, fetchPositionList, fetchDepartmentList
};
