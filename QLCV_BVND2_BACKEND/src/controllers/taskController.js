import taskService from "../service/taskService";
const getAllTasks = async (req, res) => {
  try {
    let data = await taskService.getAllTasksService();
    return res.status(200).json({ EM: data.EM, EC: data.EC, DT: data.DT });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ EM: "error from server", EC: "-1", DT: "" });
  }
};
const createNewTask = async (req, res) => {
  try {
    let data = await taskService.createNewTaskService(req.body);
    return res.status(200).json({ EM: data.EM, EC: data.EC, DT: data.DT });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ EM: "error from server", EC: "-1", DT: "" });
  }
};
const updateTask = async (req, res) => {
  try {
    let data = await taskService.updateTaskService(req.body);
    return res.status(200).json({ EM: data.EM, EC: data.EC, DT: data.DT });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ EM: "error from server", EC: "-1", DT: "" });
  }
};
const deleteTask = async (req, res) => {
  try {
    let data = await taskService.deleteTaskService(req.body);
    return res.status(200).json({ EM: data.EM, EC: data.EC, DT: data.DT });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ EM: "error from server", EC: "-1", DT: "" });
  }
};
module.exports = {
  getAllTasks,
  createNewTask,
  updateTask,
  deleteTask,
};
