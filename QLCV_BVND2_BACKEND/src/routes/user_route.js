import express from "express";
import userController from "../controllers/userController";
import { testAPI } from "../controllers/apiController";

const router = express.Router();
const initUserWebRoutes = (app) => {
    router.get("/", userController.handleHomePage);
    router.get("/user", userController.handleUserPage);
    // router.post("/user/create-user", handleCreateUser);
    // router.post("/user/delete-user/:id", handleDeleteUser);
    // router.get("/user/edit-user/:id", handleEditUser);
    // router.post("/user/update-user", handleUpdateUser);

    // router.get("/testAPI", testAPI);

    return app.use("/", router);
};
export default initUserWebRoutes;
