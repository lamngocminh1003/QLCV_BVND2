import express from "express";
import departmentController from '../controllers/departmentController';
import { testAPI } from "../controllers/apiController";
import { handleHelloWord } from "../controllers/departmentController";
const router = express.Router();
const initWebRoutes = (app) => {
    //path, handler
    router.get("/department", departmentController.DepartmentPage);
    router.post("/department/create", departmentController.DepartmentCreate);
    router.get("/department-upload/:id", departmentController.DepartmentUpload);
    router.post("/department-uploaded/", departmentController.DepartmentUploaded);
    router.post("/department-delete/:id", departmentController.DepartmentDelete);

    router.get("/testAPI", testAPI);

    return app.use("/", router);
}
export default initWebRoutes;
