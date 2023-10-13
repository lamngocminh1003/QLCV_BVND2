import express from "express";
import initWebRoutes from "./routes/departmentRoutes";
import configViewEngine from "./config/viewEngine";
import initApiRoutes from "./routes/api";
import initTaskApi from "./routes/taskApi";
import cors from "./config/cors";
import "dotenv/config";
require("dotenv").config();
import bodyParser from 'body-parser';

import { createJWT } from './middleware/jwtAction';

import connection from "./config/connectDB";

const app = express();
const PORT = process.env.PORT || 8000;

// Add headers before the routes are defined
app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', process.env.REACT_URL);

  //mấy cái này để phân quyền
  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});

// Test JWT
createJWT();

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
