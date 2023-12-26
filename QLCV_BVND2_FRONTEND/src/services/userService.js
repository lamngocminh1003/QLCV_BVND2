import axios from "axios";
import signalRService from "./signalRService.js";
import { toast } from 'react-toastify';

const backendURL = 'http://146.190.89.3:9090';
const connection = signalRService.getConnection();

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
      if (response.data && userId) {
        signalRService.addToGroup(userId);
        connection.on("ReceiveMessage", (message) => {
          console.log(`Received message: ${message}`);
        });
      }
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
      signalRService.addToGroup(response.data.userId);
      connection.on("ReceiveMessage", (message) => {
        console.log(`Received message: ${message}`);
      });
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
      connection.on("ReceiveUpdateNotification", (message) => {
        //console.log(message);
        getTotalNotification();
      });






      return response.data
    })
    .catch(function (error) {
      return error.response.status
    })
}

export {
  userLogin,
  getUserAccount, getTotalNotification,
};