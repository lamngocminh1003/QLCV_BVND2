import "../Login/Login.scss";
import { useHistory } from "react-router-dom";
import React, { useEffect, useState, useRef } from "react";
import { toast } from "react-toastify";
import { userLogin } from "../../services/userService";
import { handleLoginRedux } from "../redux/actions/userAction";
import { useDispatch, useSelector } from "react-redux";
const Login = (props) => {
  let history = useHistory();
  const handleCreateNewAccount = () => {
    history.push("/create-account");
  };
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [isShowPassword, setIsShowPassword] = useState(false);
  const inputRefs = useRef([]);
  const isShowLoading = useSelector((state) => state.user.isLoading);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  useEffect(() => {
    // Kiểm tra trạng thái đăng nhập khi component được render
    if (user.auth === true) {
      history.push("/");
    }

    let session = localStorage.getItem("auth");
    if (session) {
      history.push("/");
    }
  }, [user, history]);
  const handleKeyDown = (e, index) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const nextIndex = index + 1;
      if (nextIndex < inputRefs.current.length) {
        inputRefs.current[nextIndex].focus();
      } else {
        inputRefs.current[0].focus(); // Focus on the first input field
      }
    }
  };
  const handleInputChange = (e, index) => {
    if (index === 0) {
      setUserName(e.target.value);
    }
    if (index === 1) {
      setPassword(e.target.value);
    }
  };
  const addInputRef = (ref, index) => {
    if (ref && !inputRefs.current.includes(ref)) {
      inputRefs.current.push(ref);
      if (index === inputRefs.current.length - 1) {
        ref.onkeydown = (e) => handleKeyDown(e, index);
      }
    }
  };
  const defaultValidInput = {
    isValidUserName: true,
    isValidPassword: true,
  };
  const [objCheckInput, setObjCheckInput] = useState(defaultValidInput);
  const isValidInputs = () => {
    setObjCheckInput(defaultValidInput);
    if (!userName) {
      toast.error("Your userName is required");
      setObjCheckInput({ ...defaultValidInput, isValidUserName: false });
      return false;
    }
    if (!password) {
      toast.error("Your password is required");
      setObjCheckInput({ ...defaultValidInput, isValidPassword: false });
      return false;
    }
    return true;
  };
  const handlePressEnter = (event) => {
    if (event && event.keyCode === 13) {
      handleLogin();
    }
  };
  const handleLogin = async () => {
    let data = { userName, password };
    let check = isValidInputs();
    if (check === true) {
      const res = await dispatch(handleLoginRedux(data));
      console.log("res", res);
      // Kiểm tra nếu đăng nhập thành công (tuỳ thuộc vào cách bạn xử lý trong action creator)
      if (res && res.data && +res.data.EC === 2 && res.data.DT) {
        // Điều hướng đến trang chính sau khi đăng nhập thành công
        history.push("/");
      }
    }
  };
  return (
    <div className="login-container ">
      <div className="container">
        <div className="row">
          <div className="content-left col-sm-12 col-lg-6 ">
            <div className="brand mt-4">JWT App</div>
            <div className="detail">JWT, Node.JS & React </div>
          </div>
          <div className="content-right mt-lg-5 mt-sm-3 col-12 col-lg-6">
            <div className="login-form">
              <div className="mb-3">
                <input
                  type="text"
                  className={
                    objCheckInput.isValidUserName
                      ? "form-control"
                      : "form-control is-invalid"
                  }
                  placeholder="User name"
                  required
                  value={userName}
                  ref={(ref) => addInputRef(ref, 0)}
                  onChange={(e) => handleInputChange(e, 0)}
                />
              </div>
              <div className="mb-3 input-password">
                <input
                  type={isShowPassword === true ? "text" : "password"}
                  placeholder="Password"
                  required
                  value={password}
                  ref={(ref) => addInputRef(ref, 1)}
                  onChange={(e) => handleInputChange(e, 1)}
                  onKeyDown={(event) => handlePressEnter(event)}
                  className={
                    objCheckInput.isValidPassword
                      ? "form-control"
                      : "form-control "
                  }
                />
                <i
                  className={
                    isShowPassword === true
                      ? "fa-regular fa-eye "
                      : "fa-regular fa-eye-slash"
                  }
                  onClick={() => setIsShowPassword(!isShowPassword)}
                ></i>
              </div>
              {isShowLoading && (
                <div className="fa-2x d-flex justify-content-center m-3 text-info">
                  {" "}
                  <i className="fas fa-spinner fa-pulse "></i>
                </div>
              )}
              <div>
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    handleLogin();
                  }}
                >
                  Log in
                </button>
                <div className="forgotten mt-2">
                  <a className="forgotten-password ">Forgotten password?</a>
                </div>
              </div>
              <hr />
              <div className="create">
                <button
                  type="submit"
                  className="btn btn-success"
                  onClick={() => handleCreateNewAccount()}
                >
                  Create new account
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
