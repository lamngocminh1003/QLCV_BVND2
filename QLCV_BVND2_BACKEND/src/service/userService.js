import bcrypt from "bcryptjs";
import db from "../models/index";
const salt = bcrypt.genSaltSync(10);
const hashPassword = (password) => {
  let hashPassword = bcrypt.hashSync(password, salt);
  return hashPassword;
};
const createNewUser = async (data) => {
  let { email, userName, password } = data;
  let hashPasswordUser = hashPassword(password);
  try {
    await db.user.create({
      email: email,
      password: hashPasswordUser,
      userName: userName,
    });
  } catch (error) {
    console.log("check error", error);
  }
};
const getUserList = async () => {
  //test relationships

  const users = await db.user.findAll({
    attributes: ["id", "userName", "email"],
    include: { model: db.group, attributes: ["id", "name", "des"] },
    raw: "true",
    nest: true,
  });
  const role = await db.role.findAll({
    include: { model: db.group, attributes: ["id", "name", "des"] },
    attributes: ["id", "url", "des"],
    raw: "true",
    nest: true,
  });
  console.log("users", users);
  console.log("role", role);

  let user = [];
  user = await db.user.findAll();
  return user;
};
const deleteUser = async (userId) => {
  let { id } = userId;
  await db.user.destroy({
    where: { id: id },
  });
};
const handleGetUserByIdService = async (userId) => {
  let { id } = userId;
  let user = await db.user.findOne({
    where: { id: id },
  });
  
  return user;
};
const handleUpdateUserService = async (data) => {
  let { id, email, userName } = data;
  await db.user.update(
    {
      email: email,
      userName: userName,
    },
    {
      where: {
        id: id,
      },
    }
  );
};
module.exports = {
  createNewUser,
  getUserList,
  deleteUser,
  handleGetUserByIdService,
  handleUpdateUserService,
};
