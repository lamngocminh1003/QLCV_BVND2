import { BrowserRouter as Router, Route, Link, Switch, NavLink, } from "react-router-dom";
import Page404 from "../components/ErrorPage/Page404";
import Login from "../components/Login/Login";
import Users from "../components/ManageUsers/Users";
import PrivateRoutes from "./PrivateRoutes";
import Project from "../components/Project/Project";
import LoginUser from '../components/UserLogin/Login';
import ListUser from "../components/User/ListUser";
import ListProposeSent from "../components/User/ListProposeSent";
import ListProposeReceiveIn from "../components/User/ListProposeReceiveIn";
import ListProposeReceiveOut from "../components/User/ListProposeReceiveOut";
import ListDoc from "../components/User/ListDoc";
import ListDocOfDepartment from "../components/User/ListDocOfDepartment";
import TaskOutDepartment from "../components/Task/TaskOutDepartment";
import MemberTask from "../components/Task/TaskInDepartment";
import Header from "../components/Nav/Header";

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
          <PrivateRoutes path="/list-propose-sent" component={ListProposeSent} />
          <PrivateRoutes path="/list-propose-recive-in-department" component={ListProposeReceiveIn} />
          <PrivateRoutes path="/list-propose-recive-out-department" component={ListProposeReceiveOut} />
          <PrivateRoutes path="/list-doc" component={ListDoc} />
          <PrivateRoutes path="/list-doc-department" component={ListDocOfDepartment} />
          <PrivateRoutes path="/member-task-out-department" component={TaskOutDepartment} />
          <PrivateRoutes path="/member-task-in-department" component={MemberTask} />
          <Route path="*">
            <Page404 />{" "}
          </Route>
        </Switch>
      </Router>
    </>
  );
};
export default AppRoutes;
