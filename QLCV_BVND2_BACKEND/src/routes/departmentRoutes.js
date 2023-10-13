import express from "express";
import departmentController from '../controllers/departmentController';
import apiController from "../controllers/apiController";

import { handleHelloWord } from "../controllers/departmentController";
const router = express.Router();
const initWebRoutes = (app) => {
    //path, handler
    router.get("/department", departmentController.DepartmentPage);
    router.post("/department/create", departmentController.DepartmentCreate);
    router.put("/department-upload", departmentController.DepartmentUpload);
    router.post("/department-uploaded/", departmentController.DepartmentUploaded);
    router.delete("/department-delete", departmentController.DepartmentDelete);

    //rest api: GET - read, POST - create, PUT - upload, DELETE - delete (CRUD)
    router.get("/testAPI", apiController.testAPI);

    return app.use("/api/v1", router);
}
export default initWebRoutes;
