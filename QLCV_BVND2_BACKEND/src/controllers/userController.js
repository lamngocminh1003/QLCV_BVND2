// import userApiService from "../service/userApiService";

import user from "../models/user";
import userService from "../service/userService";

const handleHomePage = (req, res) => {
  return res.render("home");
}

const handleUserHomePage = async (req, res) => {
  let userList = await userService.getUserList();
  let roleList = await userService.getAllRole();
  let positionList = await userService.getAllPosition();
  let departmentList = await userService.getAllDepartment();
  return res.render("user", { userList, roleList, positionList, departmentList });
}

const handleCreateUser = (req, res) => {
  let userFullName = req.body.fullName;
  let userUserName = req.body.userName;
  let userUserPassword = req.body.userPassword;
  let userUserPhone = req.body.userPhone;
  let userUserEmail = req.body.userEmail;
  let userUserRole = req.body.userRole;
  let userUserPosition = req.body.userPosition;
  let userUserDepartment = req.body.userDepartment;
  let userUserImage = req.body.userImage;
  userService.createNewUser(userFullName, userUserName, userUserPassword, userUserPhone, userUserEmail, userUserRole, userUserPosition, userUserDepartment, userUserImage);
  return res.redirect("/user");
}

const handleGetUserUpdateById = async (req, res) => {
  let foundUser = await userService.getUserById(req.params.id);
  if (foundUser.length === 0) {
    return res.redirect("/user");
  }
  else {
    let roleList = await userService.getAllRole();
    let positionList = await userService.getAllPosition();
    let departmentList = await userService.getAllDepartment();
    return res.render("update-user", { foundUser, roleList, positionList, departmentList });
  }
}

const handleUpdateUserById = async (req, res) => {
  let userId = req.body.idUser;
  let userFullName = req.body.fullName;
  let userUserPhone = req.body.userPhone;
  let userUserEmail = req.body.userEmail;
  let userUserRole = req.body.userRole;
  let userUserPosition = req.body.userPosition;
  let userUserDepartment = req.body.userDepartment;
  userService.handleUpdateUserById(userId, userFullName, userUserPhone, userUserEmail, userUserRole, userUserPosition, userUserDepartment);
  return res.redirect("/user");
}

const handleDeleteUser = async (req, res) => {
  await userService.deleteUser(req.params.id);
  return res.redirect("/user");
}

// const show = async (req, res) => {
//   try {
//     let data = await userApiService.getAllUser();
//     return res.status(200).json({ EM: data.EM, EC: data.EC, DT: data.DT });
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({ EM: "error from server", EC: "-1", DT: "" });
//   }
// };
// const create = async (req, res) => {
//   try {
//     let { userName, email, phone, password } = req.body;
//     if (!userName || !email || !phone || !password) {
//       return res
//         .status(200)
//         .json({ EM: "Missing required parameters", EC: "1", DT: "" });
//     }
//     //service
//     let data = await userApiService.createNewUser(req.body);
//     return res.status(200).json({ EM: data.EM, EC: data.EC, DT: data.DT });
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({ EM: "error from server", EC: "-1", DT: "" });
//   }
// };
// const update = async (req, res) => {
//   try {
//     let { id, userName, email, phone } = req.body;
//     if ((!id, !userName || !email || !phone)) {
//       return res
//         .status(200)
//         .json({ EM: "Missing required parameters", EC: "1", DT: "" });
//     }
//     //service
//     let data = await userApiService.updateUser(req.body);
//     return res.status(200).json({ EM: data.EM, EC: data.EC, DT: data.DT });
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({ EM: "error from server", EC: "-1", DT: "" });
//   }
// };
// const deleteUserApi = async (req, res) => {
//   try {
//     let { id } = req.body;
//     if (!id) {
//       return res
//         .status(200)
//         .json({ EM: "Missing required parameters", EC: "1", DT: "" });
//     }
//     let data = await userApiService.deleteUser(req.body);
//     return res.status(200).json({ EM: data.EM, EC: data.EC, DT: data.DT });
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({ EM: "error from server", EC: "-1", DT: "" });
//   }
// };
// const getUserByIdController = async (req, res) => {
//   try {
//     let { id } = req.body;
//     if (!id) {
//       return res
//         .status(200)
//         .json({ EM: "Missing required parameters", EC: "1", DT: "" });
//     }
//     let data = await userApiService.getUserById(req.body);
//     return res.status(200).json({ EM: data.EM, EC: data.EC, DT: data.DT });
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({ EM: "error from server", EC: "-1", DT: "" });
//   }
// };

import userApiService from "../service/userApiService";

// const handleHomePage = (req, res) => {
//   return res.render("user.ejs");
// }

// const show = async (req, res) => {
//   try {
//     let data = await userApiService.getAllUser();
//     return res.status(200).json({ EM: data.EM, EC: data.EC, DT: data.DT });
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({ EM: "error from server", EC: "-1", DT: "" });
//   }
// };
// const create = async (req, res) => {
//   try {
//     let { userName, email, phone, password } = req.body;
//     if (!userName || !email || !phone || !password) {
//       return res
//         .status(200)
//         .json({ EM: "Missing required parameters", EC: "1", DT: "" });
//     }
//     //service
//     let data = await userApiService.createNewUser(req.body);
//     return res.status(200).json({ EM: data.EM, EC: data.EC, DT: data.DT });
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({ EM: "error from server", EC: "-1", DT: "" });
//   }
// };
// const update = async (req, res) => {
//   try {
//     let { id, userName, email, phone } = req.body;
//     if ((!id, !userName || !email || !phone)) {
//       return res
//         .status(200)
//         .json({ EM: "Missing required parameters", EC: "1", DT: "" });
//     }
//     //service
//     let data = await userApiService.updateUser(req.body);
//     return res.status(200).json({ EM: data.EM, EC: data.EC, DT: data.DT });
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({ EM: "error from server", EC: "-1", DT: "" });
//   }
// };
// const deleteUserApi = async (req, res) => {
//   try {
//     let { id } = req.body;
//     if (!id) {
//       return res
//         .status(200)
//         .json({ EM: "Missing required parameters", EC: "1", DT: "" });
//     }
//     let data = await userApiService.deleteUser(req.body);
//     return res.status(200).json({ EM: data.EM, EC: data.EC, DT: data.DT });
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({ EM: "error from server", EC: "-1", DT: "" });
//   }
// };
// const getUserByIdController = async (req, res) => {
//   try {
//     let { id } = req.body;
//     if (!id) {
//       return res
//         .status(200)
//         .json({ EM: "Missing required parameters", EC: "1", DT: "" });
//     }
//     let data = await userApiService.getUserById(req.body);
//     return res.status(200).json({ EM: data.EM, EC: data.EC, DT: data.DT });
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({ EM: "error from server", EC: "-1", DT: "" });
//   }
// };
module.exports = {
  handleHomePage, handleUserHomePage, handleCreateUser, handleGetUserUpdateById, handleUpdateUserById, handleDeleteUser
};
