import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import logo from "../../assets/image/logo512.png";
import { Link, NavLink } from "react-router-dom";
import { useHistory } from "react-router-dom";

import {
  handleLoginRedux,
  handleLogoutRedux,
} from "../redux/actions/userAction";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";

const Header = (props) => {
  let history = useHistory();

  const [isShowNav, setIsShowNav] = useState(true);
  const user = useSelector((state) => state.user.user);
  const auth = localStorage.getItem("auth");
  console.log("auth", auth);
  const userNameUser = localStorage.getItem("userName");
  useEffect(() => {
    if (user && user.auth === false && window.location.pathname !== "/login") {
      history.push("/");
      toast.success("Logout successfully");
    }
  }, [user]);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(handleLogoutRedux());
  };
  return (
    <>
      {isShowNav === true && (
        <Navbar
          collapseOnSelect
          expand="lg"
          className="bg-body-tertiary"
          bg="info"
        >
          <Container>
            <Navbar.Brand as={Link} to="/">
              {" "}
              <img
                alt="Logo ReactJS"
                src={logo}
                width="30"
                height="30"
                className="d-inline-block align-top"
              />{" "}
              React-Bootstrap
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto">
                <NavLink to="/" className="nav-link">
                  Home
                </NavLink>
                {user && user.userName && user.auth === true && (
                  <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                    {/* <NavDropdown.Item as={Link} to="/users">
                    Manage Users
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/projects">
                    Manage Projects
                  </NavDropdown.Item> */}
                    <NavDropdown.Item as={Link} to="/tasks">
                      Manage Task
                    </NavDropdown.Item>
                  </NavDropdown>
                )}
              </Nav>
              <Nav>
                {user && user.userName && (
                  <Navbar.Text className="me-3">
                    Welcome {user.userName}
                  </Navbar.Text>
                )}
                <NavDropdown title="Setting" id="basic-nav-dropdown">
                  {user && user.userName ? (
                    <NavDropdown.Item onClick={() => handleLogout()}>
                      Logout
                    </NavDropdown.Item>
                  ) : (
                    <NavLink to="/login" className="dropdown-item">
                      Login
                    </NavLink>
                  )}
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      )}
    </>
  );
};
export default Header;
