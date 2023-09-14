import express from "express";
import taskController from "../controllers/taskController";
const router = express.Router();
const initTaskApi = (app) => {
  router.get("/tasks", taskController.getAllTasks);
  router.post("/tasks/create", taskController.createNewTask);
  router.put("/tasks/update", taskController.updateTask);
  router.delete("/tasks/delete", taskController.deleteTask);

  return app.use("/api/v1", router);
};
export default initTaskApi;
