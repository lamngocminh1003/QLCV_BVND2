import express from "express";
import {
  handleHome,
  handleUserPage,
  handleCreateUser,
  handleDeleteUser,
  handleEditUser,
  handleUpdateUser,
} from "../controllers/homeController";
import { testAPI } from "../controllers/apiController";
const router = express.Router();
const initWebRoutes = (app) => {
  router.get("/", handleHome);
  router.get("/user", handleUserPage);
  router.post("/user/create-user", handleCreateUser);
  router.post("/user/delete-user/:id", handleDeleteUser);
  router.get("/user/edit-user/:id", handleEditUser);
  router.post("/user/update-user", handleUpdateUser);

  router.get("/testAPI", testAPI);

  return app.use("/", router);
};
export default initWebRoutes;
