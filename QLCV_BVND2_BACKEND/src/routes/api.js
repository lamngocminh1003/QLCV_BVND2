import express from "express";
import apiController from "../controllers/apiController";
import userController from "../controllers/userController";
import permissionRoleController from "../controllers/permissionRoleController";
const router = express.Router();
const initApiRoutes = (app) => {
  router.get("/testAPI", apiController.testAPI);
  router.post("/register", apiController.handleRegister);
  router.post("/login", apiController.handleLogin);

  // router.get("/user/read", userController.show);
  // router.get("/user", userController.getUserByIdController);
  // router.post("/user/create", userController.create);
  // router.put("/user/update", userController.update);
  // router.delete("/user/delete", userController.deleteUserApi);

  return app.use("/api/v1", router);
};

export const initPermRoutes = (app) => {
  router.get("/perm", permissionRoleController.getPermissionById);

  return app.use("/api/v1", router)
}

export const initRoleRoutes = (app) => {
  router.get("/role", permissionRoleController.getRoleById);
  router.put("/role", permissionRoleController.createRole);
  router.patch("/role", permissionRoleController.updateRole);
  router.delete("/role", permissionRoleController.deleteRole);

  return app.use("/api/v1", router)
}

export const initPermissionRoleRoutes = (app) => {
  router.get("/permissionRole/byRoleId", permissionRoleController.getPermissionsByRole);

  return app.use("/api/v1", router)
}

export default initApiRoutes;
