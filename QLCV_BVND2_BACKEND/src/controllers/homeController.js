import {
  createNewUser,
  getUserList,
  deleteUser,
  handleGetUserByIdService,
  handleUpdateUserService,
} from "../service/userService";
const handleHome = (req, res) => {
  return res.render("home");
};
const handleUserPage = async (req, res) => {
  let userList = await getUserList();
  return res.render("user", { userList: userList });
};
const handleCreateUser = (req, res) => {
  createNewUser(req.body);
  return res.redirect("/user");
};
const handleDeleteUser = async (req, res) => {
  await deleteUser(req.params);
  return res.redirect("/user");
};
const handleEditUser = async (req, res) => {
  let data = await handleGetUserByIdService(req.params);
  // if (data && data.length > 0) {
  //   dataUser = data[0];
  // }
  return res.render("update-user", { dataUser: data });
};
const handleUpdateUser = async (req, res) => {
  await handleUpdateUserService(req.body);
  return res.redirect("/user");
};
module.exports = {
  handleHome,
  handleUserPage,
  handleCreateUser,
  handleDeleteUser,
  handleEditUser,
  handleUpdateUser,
};
