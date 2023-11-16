import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link, NavLink, useHistory } from "react-router-dom";
import { UserContext } from '../../context/UserContext';
import './Nav.scss';
import logo from '../../assets/image/logo.png';
import { handleLoginRedux, handleLogoutRedux } from "../redux/actions/userAction";
import { useContext } from "react";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";

const Header = (props) => {
  const { user, logoutContext } = useContext(UserContext);
  const location = useLocation();
  const history = useHistory();

  const handleLogout = async () => {
    localStorage.removeItem('jwt'); //xóa localStorage
    logoutContext();
    toast.success('Đăng xuất thành công!');
    history.push('/login_user');
  }

  if (user && user.isAuthenticated === true || location.pathname === '/') {
    return (
      <div className="nav-header">
        <Navbar expand="lg" className="bg-body-tertiary bg-header" style={{ padding: '0.5rem 5.5rem' }} >
          <Container fluid>
            <Navbar.Brand href="#home">
              {/* <img src={logo} width="50" height="25" className="d-inline-block align-top" alt="React Bootstrap logo" /> */}
              <span className="navbar-brand">BVND2</span>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
              <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll>

                <NavLink exact to="/" className="nav-link">Trang chủ</NavLink>
                {user && user.isAuthenticated === true && user.account.departmentId === 1 ?
                  <>
                    <NavLink exact to="/list_user" className="nav-link">Người dùng</NavLink>
                    <NavLink exact to="/list_doc" className="nav-link">Văn bản</NavLink>
                    <NavLink exact to="/project_user" className="nav-link">Dự án</NavLink>
                  </>
                  :
                  <></>
                }

                {user && user.isAuthenticated === true && localStorage.getItem('userId') === user.account.departmentHead ?
                  <>
                    <NavLink exact to="/list_doc" className="nav-link">Văn bản</NavLink>
                  </>
                  :
                  <></>
                }

                {(() => {
                  if (user && user.isAuthenticated === true && user.account.departmentId === "1" || user && user.isAuthenticated === true && user.account.departmentId === "5") {
                    return (
                      <></>
                    )
                  }
                  else if (user && user.isAuthenticated === false) {
                    return (
                      <></>
                    )
                  }
                  else {
                    return (
                      <>
                        <NavLink exact to="/list_doc_department" className="nav-link">Văn bản</NavLink>
                      </>
                    )
                  }
                })()}
              </Nav>

              <Nav>
                {user && user.isAuthenticated === true ?
                  <>
                    <NavDropdown title={user.account.fullName} id="navbarScrollingDropdown">
                      <NavDropdown.Item href="#action/3.1">Đổi mật khẩu</NavDropdown.Item>
                      <NavDropdown.Item href="#action/3.2" onClick={() => handleLogout()}>Đăng xuất</NavDropdown.Item>
                    </NavDropdown>
                  </>
                  :
                  <>
                    <Nav>
                      <NavLink to="/login_user" className="nav-link">Đăng nhập</NavLink>
                    </Nav>
                  </>
                }
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>

    );
  }
  else {
    return <></>
  }
};
export default Header;
