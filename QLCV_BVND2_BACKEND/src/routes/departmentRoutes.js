import express from "express";
import departmentController from '../controllers/departmentController';
import { testAPI } from "../controllers/apiController";
import { handleHelloWord } from "../controllers/departmentController";
const router = express.Router();
const initWebRoutes = (app) => {
    //path, handler
    router.get("/", departmentController.handleHelloWord);
    router.get("/department", departmentController.handleUserPage);

    router.get("/testAPI", testAPI);

    return app.use("/", router);
}
export default initWebRoutes;
