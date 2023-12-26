import { BrowserRouter as Router, Route, Link, Switch, NavLink, } from "react-router-dom";
import Page404 from "../components/ErrorPage/Page404";
import Login from "../components/Login/Login";
import Users from "../components/ManageUsers/Users";
import PrivateRoutes from "./PrivateRoutes";
import Project from "../components/Project/Project";
import LoginUser from '../components/UserLogin/Login';
import ListUser from "../components/User/ListUser";
import ListDoc from "../components/User/ListDoc";
import ListDocOfDepartment from "../components/User/ListDocOfDepartment";
import MemberTask from "../components/Task/MemberTask";
import Header from "../components/Nav/Header";
import Employee from "../components/User/Employee";

const AppRoutes = (props) => {
  return (
    <>
      <Router>
        <Header />
        <Switch>
          <Route exact path="/">{"home"}</Route>
          <Route path="/about">about</Route>
          <Route path="/login"><Login /></Route>
          <Route path="/login-user"><LoginUser /></Route>
          <PrivateRoutes path="/users" component={Users} />
          <PrivateRoutes path="/projects" component={Project} />
          <PrivateRoutes path="/list-user" component={ListUser} />
          <PrivateRoutes path="/list-doc" component={ListDoc} />
          <PrivateRoutes path="/list-doc-department" component={ListDocOfDepartment} />
          <PrivateRoutes path="/member-task-department" component={MemberTask} />
          <PrivateRoutes path="/employee" component={Employee} />
          <Route path="*">
            <Page404 />{" "}
          </Route>
        </Switch>
      </Router>
    </>
  );
};
export default AppRoutes;
