import express from "express";
import userController from "../controllers/userController";

const router = express.Router();
const initUserWebRoutes = (app) => {
    router.get("/", userController.handleHomePage);
    router.get("/user", userController.handleUserHomePage);
    router.post("/user/create-user", userController.handleCreateUser);
    router.get("/user/update-user/:id", userController.handleGetUserUpdateById);
    router.post("/user/update-user-by-id", userController.handleUpdateUserById);
    router.get("/user/delete-user/:id", userController.handleDeleteUser);

    return app.use("/", router);
};
export default initUserWebRoutes;
