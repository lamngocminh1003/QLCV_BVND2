import express from "express";
import { checkUserJWT, checkUserPermission } from "../middleware/JWTActions";
import apiUserController from "../controllers/apiUserController";

const router = express.Router();

const initUserApiRoutes = (app) => {
    router.all('*', checkUserJWT, checkUserPermission)

    router.post("/user/login", apiUserController.handleUserLogin);
    router.post("/user/logout", apiUserController.handleUserLogout)

    router.post("/user/register");
    router.get("/user/account", apiUserController.handleGetUserAccount);

    router.post("/user/create", apiUserController.handleCreateUserAPI);
    router.get("/user/read/", apiUserController.handleGetUserAPI);
    //router.get("/user/read/:page&:limit", apiUserController.handleGetUserAPI); //nếu dùng res.params thì khai báo router kiểu này
    router.get("/user/read/userId", apiUserController.handleGetUserByIdAPI);
    router.put("/user/update", apiUserController.handleUpdateUserByIdAPI);
    router.delete("/user/delete", apiUserController.handleDeleteUserByIdAPI);

    router.get("/user/role/read", apiUserController.handleReadRoleAPI);
    router.get("/user/position/read", apiUserController.handleReadPositionAPI);
    router.get("/user/department/read", apiUserController.handleReadDepartmentAPI);

    return app.use("/api/", router);
};
export default initUserApiRoutes;
