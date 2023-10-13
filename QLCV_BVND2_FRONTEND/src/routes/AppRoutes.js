import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  NavLink,
} from "react-router-dom";
import Page404 from "../components/ErrorPage/Page404";
import Login from "../components/Login/Login";
import CreateAccount from "../components/CreateAccount/CreateAccount";
import Users from "../components/ManageUsers/Users";
import PrivateRoutes from "./PrivateRoutes";
import Project from "../components/Project/Project";
import Department from "../components/Department/Department"

import Header from "../components/Nav/Header";
const AppRoutes = (props) => {
  return (
    <>
      <Router>
        <Header />{" "}
        <Switch>
          <Route exact path="/">
            home{" "}</Route>

          <Route path="/about">about</Route>

          <Route path="/login">
            <Login /></Route>

          <Route path="/create-account">
            <CreateAccount /></Route>

          <Route path="/department">
            <Department /> {/* khai báo tên component */}
          </Route>

          <Route path="/createDepartment">
            <createDepartment /> {/* khai báo tên component */}
          </Route>

          <PrivateRoutes path="/users" component={Users} />

          <PrivateRoutes path="/projects" component={Project} />{" "}

          <Route path="*">
            <Page404 />{" "}
          </Route>
        </Switch>
      </Router>
    </>
  );
};
export default AppRoutes;
