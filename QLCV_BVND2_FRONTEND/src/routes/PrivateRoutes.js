import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, useHistory } from "react-router-dom";
const PrivateRoutes = (props) => {
  let history = useHistory();

  useEffect(() => {
    let session = sessionStorage.getItem("account");
    if (!session) {
      history.push("/login");
    }
  }, []);
  return (
    <>
      <Route path={props.path} component={props.component}></Route>
    </>
  );
};
export default PrivateRoutes;
