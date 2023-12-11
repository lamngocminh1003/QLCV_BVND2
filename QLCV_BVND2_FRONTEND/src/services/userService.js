import axios from "axios";

const backendURL = 'http://146.190.89.3:9090';

const createConfig = () => {
  const token = localStorage.getItem("jwt");
  // Thiết lập tiêu đề "Authorization" trong yêu cầu Axios
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return config;
}

const userLogin = async (userId, password) => {
  return await axios.post(`${backendURL}/api/UserAccount/Login`, { userId, password })
    .then(function (response) {
      return response.data
    })
    .catch(function (error) {
      return error.response.status
    })
};

const getUserAccount = async () => {
  const config = createConfig();
  return await axios.get(`${backendURL}/api/UserAccount/GetUserLogin`, config)
    .then(function (response) {
      return response.data
    })
    .catch(function (error) {
      return error.response.status
    })
}

const getTotalNotification = async () => {
  const config = createConfig();
  return await axios.get(`${backendURL}/api/UserAccount/GetTotalNumberNotification`, config)
    .then(function (response) {
      return response.data
    })
    .catch(function (error) {
      return error.response.status
    })
}

const userLogout = () => {
  return axios.post("/api/user/logout");
}

const fetchUserList = (page, limit) => {
  return axios.get(`/api/user/read?page=${page}&limit=${limit}`);
}

const fetchUserById = (user) => {
  return axios.get("/api/user/read/userId", { data: { userId: user.id } });
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

const createDocAPI = (data) => {
  return axios.post(`http://localhost:8282/api/file/file2/addDocumentIncomming/documentIncomming1`, { data })
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
  getTotalNotification,


  userLogin, userLogout, fetchUserList, deleteUserById, updateUserById, createNewUser, getUserAccount,
  fetchRoleList, fetchPositionList, fetchDepartmentList,
  createDocAPI
};