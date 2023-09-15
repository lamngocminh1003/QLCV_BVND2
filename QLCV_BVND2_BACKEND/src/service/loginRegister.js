import db from "../models/index";
import bcrypt from "bcryptjs";
const salt = bcrypt.genSaltSync(10);

const hashPassword = (password) => {
  let hashPassword = bcrypt.hashSync(password, salt);
  return hashPassword;
};
const checkEmailUser = async (email) => {
  const emailUser = await db.user.findOne({ where: { email: email } });
  if (emailUser) {
    return true;
  } else {
    return false;
  }
};
const checkUserName = async (userName) => {
  const userNameUser = await db.user.findOne({ where: { userName: userName } });
  if (userNameUser) {
    return true;
  } else {
    return false;
  }
};
const checkPhoneUser = async (phone) => {
  const phoneUser = await db.user.findOne({ where: { phone: phone } });
  if (phoneUser) {
    return true;
  } else {
    return false;
  }
};
const registerService = async (data) => {
  try {
    let { userName, email, phone, password } = data;
    // check email/phone are exist
    let isEmailExist = await checkEmailUser(email);
    if (isEmailExist === true) {
      return {
        EM: "The email is exist",
        EC: 1,
        DT: "",
      };
    }
    let isPhoneExist = await checkPhoneUser(phone);
    if (isPhoneExist === true) {
      return {
        EM: "The phone is exist",
        EC: 1,
        DT: "",
      };
    }
    if (password && password.length < 3) {
      return {
        EM: "The password must have more than 3 letters",
        EC: 1,
        DT: "",
      };
    }
    //hash user password
    let hashPasswordUser = await hashPassword(password);
    //create new user
    await db.user.create({
      email: email,
      password: hashPasswordUser,
      userName: userName,
      phone: phone,
    });
    return {
      EM: "Create new user successfully",
      EC: 0,
      DT: "",
    };
  } catch (error) {
    console.log(error);
    return {
      EM: "Something wrong from service",
      EC: -2,
      DT: "",
    };
  }
};
const checkPassword = (inputPassword, hashPassword) => {
  return bcrypt.compareSync(inputPassword, hashPassword);
};
const loginService = async (data) => {
  try {
    let { userName, password } = data;
    // check userName are exist
    let isUserNameExist = await checkUserName(userName);
    if (isUserNameExist === false) {
      return {
        EM: "The userName or password isn't exist",
        EC: 1,
        DT: "",
      };
    }
    let userLogin = await db.user.findOne({
      where: { userName: userName },
    });
    if (userLogin) {
      let checkPasswordLogin = checkPassword(password, userLogin.password);
      if (checkPasswordLogin === true) {
        return {
          EM: "Login successfully",
          EC: 2,
          DT: userLogin,
        };
      }
      if (checkPasswordLogin === false) {
        return {
          EM: "The userName or password isn't correct",
          EC: 1,
          DT: "",
        };
      }
    } else {
      console.log("Not found userName", userLogin.userName);
      return {
        EM: "The userName or password isn't correct",
        EC: 1,
        DT: "",
      };
    }
  } catch (error) {
    console.log(error);
    return {
      EM: "Something wrong from service",
      EC: -2,
      DT: "",
    };
  }
};
module.exports = {
  registerService,
  loginService,
};
