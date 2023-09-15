import userApiService from "../service/userApiService";

const handleHomePage = (req, res) => {
  return res.render("user.ejs");
}

const show = async (req, res) => {
  try {
    let data = await userApiService.getAllUser();
    return res.status(200).json({ EM: data.EM, EC: data.EC, DT: data.DT });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ EM: "error from server", EC: "-1", DT: "" });
  }
};
const create = async (req, res) => {
  try {
    let { userName, email, phone, password } = req.body;
    if (!userName || !email || !phone || !password) {
      return res
        .status(200)
        .json({ EM: "Missing required parameters", EC: "1", DT: "" });
    }
    //service
    let data = await userApiService.createNewUser(req.body);
    return res.status(200).json({ EM: data.EM, EC: data.EC, DT: data.DT });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ EM: "error from server", EC: "-1", DT: "" });
  }
};
const update = async (req, res) => {
  try {
    let { id, userName, email, phone } = req.body;
    if ((!id, !userName || !email || !phone)) {
      return res
        .status(200)
        .json({ EM: "Missing required parameters", EC: "1", DT: "" });
    }
    //service
    let data = await userApiService.updateUser(req.body);
    return res.status(200).json({ EM: data.EM, EC: data.EC, DT: data.DT });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ EM: "error from server", EC: "-1", DT: "" });
  }
};
const deleteUserApi = async (req, res) => {
  try {
    let { id } = req.body;
    if (!id) {
      return res
        .status(200)
        .json({ EM: "Missing required parameters", EC: "1", DT: "" });
    }
    let data = await userApiService.deleteUser(req.body);
    return res.status(200).json({ EM: data.EM, EC: data.EC, DT: data.DT });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ EM: "error from server", EC: "-1", DT: "" });
  }
};
const getUserByIdController = async (req, res) => {
  try {
    let { id } = req.body;
    if (!id) {
      return res
        .status(200)
        .json({ EM: "Missing required parameters", EC: "1", DT: "" });
    }
    let data = await userApiService.getUserById(req.body);
    return res.status(200).json({ EM: data.EM, EC: data.EC, DT: data.DT });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ EM: "error from server", EC: "-1", DT: "" });
  }
};
module.exports = {
  update,
  create,
  show,
  deleteUserApi,
  getUserByIdController,
};
