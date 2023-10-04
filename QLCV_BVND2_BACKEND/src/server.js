import express from "express";
import configViewEngine from "./config/viewEngine";
import initUserWebRoutes from "./routes/user_route";
import initUserApiRoutes from "./routes/user_route_api";
// import initApiRoutes from "./routes/api";
import initTaskApi from "./routes/taskApi";
import cors from "./config/cors";
require("dotenv").config();
import bodyParser from "body-parser";
import cookieParser from 'cookie-parser';
import connection from "./config/connectDB";

const app = express();
const PORT = process.env.PORT || 8000;

cors(app);
//config body-parser
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

//config cookie parser
app.use(cookieParser());

//config view engine
configViewEngine(app);

//test connection
connection();

//init web routes
initUserWebRoutes(app);
initUserApiRoutes(app);
//initApiRoutes(app);


app.use((req, res) => {
  return res.send('404')
})

initTaskApi(app);
app.listen(PORT, () => {
  console.log("JWT - Backend is running on the port = ", PORT);
});
