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

const getUserInDepartment = async () => {
  const config = createConfig();
  return await axios.get(`${backendURL}/api/Department/GetUserInDepartment`, config)
    .then(function (response) {
      return response.data
    })
    .catch(function (error) {
      return error.response.status
    })
}

const updateActiveUser = async (userId, newStatus) => {
  const config = createConfig();
  const data = { user_IsActive: newStatus }; 
  try {
    const response = await axios.put(`${backendURL}/api/Department/UpdateActiveUser?userId=${userId}`, data, config);
    return response.status;
  } catch (error) {
    return error.response.status;
  }
};


export {
  userLogin,
  getUserAccount, getTotalNotification, getUserInDepartment,
  updateActiveUser
};