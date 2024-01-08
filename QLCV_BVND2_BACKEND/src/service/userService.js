import bcrypt from "bcryptjs";
import db from "../models/index";

const salt = bcrypt.genSaltSync(10);
const hashPassword = (password) => {
  let hashPassword = bcrypt.hashSync(password, salt);
  return hashPassword;
};

const createNewUser = async (userFullName, userUserName, userUserPassword, userUserPhone, userUserEmail, userUserRole, userUserPosition, userUserDepartment, userUserImage) => {
  let hash_userUserPassword = hashPassword(userUserPassword);
  await db.user.create({
    fullName: userFullName,
    userName: userUserName,
    password: hash_userUserPassword,
    phone: userUserPhone,
    email: userUserEmail,
    roleId: userUserRole,
    positionId: userUserPosition,
    departmentId: userUserDepartment,
    image: userUserImage,
  });
}

const getUserList = async () => {
  let users = [];
  users = await db.user.findAll({
    attributes: ["id", "fullName", "userName", "phone", "email", "roleId", "positionId", "departmentId"],
    include: [{ model: db.department }, { model: db.position }, { model: db.role }],
    raw: true,
    nest: true,
  });
  console.log(users);
  return users;
}

const getUserById = async (userId) => {
  let foundUser = {}
  foundUser = await db.user.findAll({
    where: { id: userId },
    include: [{ model: db.department }, { model: db.position }, { model: db.role }],
    raw: true,
    nest: true,
  });
  return foundUser;
}

const handleUpdateUserById = async (userId, userFullName, userUserPhone, userUserEmail, userUserRole, userUserPosition, userUserDepartment) => {
  await db.user.update(
    { fullName: userFullName, phone: userUserPhone, email: userUserEmail, roleId: userUserRole, positionId: userUserPosition, departmentId: userUserDepartment },
    { where: { id: userId } }
  );
}

const deleteUser = async (userId) => {
  await db.user.destroy(
    { where: { id: userId } }
  );
}

const getAllRole = async () => {
  let listRole = [];
  listRole = await db.role.findAll({ raw: true });
  return listRole;
}

const getAllPosition = async () => {
  let listPosition = [];
  listPosition = await db.position.findAll({ raw: true });
  return listPosition;
}

const getAllDepartment = async () => {
  let listDepartMent = [];
  listDepartMent = await db.department.findAll({ raw: true });
  return listDepartMent;
}

module.exports = {
  createNewUser, getUserList, deleteUser, getUserById, handleUpdateUserById, getAllRole, getAllPosition, getAllDepartment
};
