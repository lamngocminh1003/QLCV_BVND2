import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import logo from "../../assets/image/logo512.png";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  NavLink,
} from "react-router-dom";

import { useEffect, useState } from "react";
import { NavItem } from "react-bootstrap";
const Header = (props) => {
  const [isShowNav, setIsShowNav] = useState(false);
  useEffect(() => {
    let session = sessionStorage.getItem("account");
    if (session) {
      setIsShowNav(!isShowNav);
    }
  }, []);
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
                <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                  <NavDropdown.Item as={Link} to="/users">
                    Manage Users
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/projects">
                    Manage Projects
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
              <Nav>
                <Navbar.Text>Signed in as: Amie</Navbar.Text>{" "}
                <NavLink to="/login" className="nav-link">
                  Login
                </NavLink>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      )}
    </>
  );
};
export default Header;
