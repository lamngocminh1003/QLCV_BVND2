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
import LoginUser from '../components/UserLogin/Login';
import ListUser from "../components/User/ListUser";
import ListDoc from "../components/User/ListDoc";

import Header from "../components/Nav/Header";
import { useEffect, useState } from "react";
import _ from 'lodash';

const AppRoutes = (props) => {
  return (
    <>
      <Router>
        <Header />{" "}
        <Switch>
          <Route exact path="/">
            home{" "}
          </Route>
          <Route path="/about">about</Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/create-account">
            <CreateAccount />
          </Route>
          <PrivateRoutes path="/users" component={Users} />
          <PrivateRoutes path="/projects" component={Project} />{" "}

          <PrivateRoutes path="/list_user" component={ListUser}> </PrivateRoutes>
          <PrivateRoutes path="/list_doc" component={ListDoc}></PrivateRoutes>
          <Route path="/login_user"> <LoginUser /></Route>

          <Route path="*">
            <Page404 />{" "}
          </Route>
        </Switch>
      </Router>
    </>
  );
};
export default AppRoutes;
