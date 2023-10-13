import axios from "axios";

const registerNewUser = (data) => {
  let { email, userName, phone, password } = data;
  return axios.post("http://localhost:8080/api/v1/register", {
    email,
    userName,
    phone,
    password,
  });
};
const userLogin = (data) => {
  let { email, password } = data;
  return axios.post("http://localhost:8080/api/v1/login", {
    email,
    password,
  });
};
const fetchAllUsers = () => {
  return axios.get("http://localhost:8080/api/v1/user/read");
};

export {
  registerNewUser,
  userLogin,
  fetchAllUsers,
};
