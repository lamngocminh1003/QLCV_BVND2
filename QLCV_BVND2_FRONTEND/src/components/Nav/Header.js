import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link, NavLink, useHistory } from "react-router-dom";
import { UserContext } from '../../context/UserContext';
import './Nav.scss';
import logo from '../../assets/image/logo.png';
import { handleLoginRedux, handleLogoutRedux } from "../redux/actions/userAction";
import { useContext, useState } from "react";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import { MenuItem } from '@mui/material';

const Header = (props) => {
  const { user, logoutContext } = useContext(UserContext);
  const [classActive, setClassActive] = useState(false);

  const location = useLocation();
  const history = useHistory();

  const handleLogout = async () => {
    localStorage.removeItem('jwt'); //xóa localStorage
    logoutContext();
    toast.success('Đăng xuất thành công!');
    history.push('/login-user');
  }

  const classNameFunc = ({ isActive }) => (isActive ? "active_link" : "");

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
                {user && user.isAuthenticated === true && user.account.departmentId === 'GD' ?
                  <>
                    <NavLink exact to="/list-doc" className="nav-link">Văn bản</NavLink>
                    {/* <NavLink exact to="/project-user" className="nav-link">Dự án</NavLink> */}
                  </>
                  :
                  <></>
                }

                {user && user.isAuthenticated === true && user.account.departmentId === 'HCQT'  ?
                  <>
                    <NavLink to="/list-doc" className="nav-link">Văn bản</NavLink>
                  </>
                  :
                  <></>
                }

                {user && user.isAuthenticated === true ? 
                <>
                  <NavLink exact to="/list-propose-sent" className="nav-link">Đề xuất gửi</NavLink>
                </> 
                : 
                <></>
                }

                {(() => {
                  if(user && user.isAuthenticated === true && user.account.userId === user.account.departmentHead && user.account.departmentType === 2){
                    //hiện khi người login là trưởng phòng ở các phòng chức năng
                    return(
                      <>
                        <NavDropdown title="Đề xuất nhận" className={classActive ? 'active' : ''} onClick={() => setClassActive(true)}>
                          <MenuItem> 
                            <NavLink exact to="/list-propose-recive-out-department" className="nav-link nav-link-item">Nhận từ phòng khoa</NavLink>
                          </MenuItem>
                          <MenuItem>
                            <NavLink exact to="/list-propose-recive-in-department" className="nav-link nav-link-item">Nhận từ nhân viên</NavLink>
                          </MenuItem>
                        </NavDropdown>
                        <NavLink exact to="/list-user" className="nav-link">Người dùng</NavLink>
                      </>
                    )
                  }
                  else if(user && user.isAuthenticated === true && user.account.userId === user.account.departmentHead && user.account.departmentType === 3){
                    //hiện khi người login là trưởng phòng ở các khoa bình thường
                    return(
                      <>
                        <NavLink exact to="/list-propose-recive-in-department" className="nav-link">Đề xuất nhận</NavLink>
                        <NavLink exact to="/list-user" className="nav-link">Người dùng</NavLink>
                      </>
                    )
                  }
                  else{
                    //hiện khi người login là nhân viên ở các khoa bình thường lẫn các phòng chức năng
                    return(
                      null
                    )
                  }
                })()}

                {(() => {
                  if (user && user.isAuthenticated === true && user.account.departmentId === 'GD'
                  || user && user.isAuthenticated === true && user.account.departmentId === 'HCQT') {
                    return (
                      <></>
                    )
                  }
                  else if (user && user.isAuthenticated === false) {
                    return (
                      <></>
                    )
                  }
                  else if (user && user.isAuthenticated === true && user.account.userId === user.account.departmentHead) {
                    return (
                      <></>
                    )
                  }
                  else if(user && user.isAuthenticated === true && user.account.departmentName !== 'GD' && user.account.userId === user.account.departmentHead
                  || user && user.isAuthenticated === true && user.account.departmentName !== 'HCQT' && user.account.userId === user.account.departmentHead ) {
                    return(
                      //hiện khi người login là trưởng phòng của các khoa
                      <>
                        <NavLink exact to="/list-doc-department" className="nav-link">Văn bản</NavLink>
                      </>
                    )
                  }
                  else {
                    return (
                      //ẩn khi người login là các thành viên trong khoa
                      <><NavLink exact to="/member-task-department" className="nav-link">Công việc</NavLink></>
                    )
                  }
                })()}
              </Nav>

              <Nav>
                {user && user.isAuthenticated === true ?
                  <>
                    <NavDropdown title={user.account.fullName} id="navbarScrollingDropdown">
                      <NavDropdown.Item href="">Đổi mật khẩu</NavDropdown.Item>
                      <NavDropdown.Item href="" onClick={() => handleLogout()}>Đăng xuất</NavDropdown.Item>
                    </NavDropdown>
                  </>
                  :
                  <>
                    <Nav>
                      <NavLink to="/login-user" className="nav-link">Đăng nhập</NavLink>
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
