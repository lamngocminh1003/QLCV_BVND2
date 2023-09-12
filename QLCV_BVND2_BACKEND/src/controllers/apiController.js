import loginRegister from "../service/loginRegister";
const testAPI = (req, res) => {
  return res.status(200).json({ message: "ok", data: "test api" });
};
const handleRegister = async (req, res) => {
  try {
    let { userName, email, phone, password } = req.body;
    if (!userName || !email || !phone || !password) {
      return res
        .status(200)
        .json({ EM: "Missing required parameters", EC: "1", DT: "" });
    }
    //service
    let data = await loginRegister.registerService(req.body);
    return res.status(200).json({ EM: data.EM, EC: data.EC, DT: data.DT });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ EM: "error from server", EC: "-1", DT: "" });
  }
};
const handleLogin = async (req, res) => {
  try {
    let { email, password } = req.body;
    if (!email || !password) {
      console.log("email", email, "password", password);
      return res
        .status(200)
        .json({ EM: "Missing required parameters", EC: "1", DT: "" });
    }
    //service
    let data = await loginRegister.loginService(req.body);
    console.log("data", data);
    return res.status(200).json({ EM: data.EM, EC: data.EC, DT: data.DT });
    // return res.status(200).json({ message: "ok", data: "test api" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ EM: "error from server", EC: "-1", DT: "" });
  }
};
module.exports = { testAPI, handleRegister, handleLogin };
