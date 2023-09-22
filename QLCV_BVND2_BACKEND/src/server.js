import express from "express";
import initWebRoutes from "./routes/departmentRoutes";
import configViewEngine from "./config/viewEngine";
import initApiRoutes from "./routes/api";
import initTaskApi from "./routes/taskApi";
import cors from "./config/cors";
import "dotenv/config";
import bodyParser from 'body-parser';

import connection from "./config/connectDB";

const app = express();
const PORT = process.env.PORT || 8000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
cors(app);

//config view engine
configViewEngine(app);

//config body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//test connection
connection();
//init web routes
initWebRoutes(app);
initApiRoutes(app);

// initWebRoutes(app);
// initApiRoutes(app);
initTaskApi(app);
app.listen(PORT, () => {
  console.log("JWT - Backend is running on the port = ", PORT);
});
