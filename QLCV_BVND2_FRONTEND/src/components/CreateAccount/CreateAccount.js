import React, { useEffect, useState, useRef } from "react";
import "../CreateAccount/CreateAccount.scss";
import { Link, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { registerNewUser } from "../../services/userService";
const CreateAccount = (props) => {
  useEffect(() => {
    // axios.get("http://localhost:8080/api/v1/testAPI").then((data) => {
    //   console.log("data", data);
    // });
  }, []);
  let history = useHistory();
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isShowRePassword, setIsShowRePassword] = useState(false);
  const inputRefs = useRef([]);
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
      setPhone(e.target.value);
    }
    if (index === 2) {
      setEmail(e.target.value);
    }
    if (index === 3) {
      setPassword(e.target.value);
    }
    if (index === 4) {
      setRePassword(e.target.value);
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
    isValidEmail: true,
    isValidPassword: true,
    isValidUserName: true,
    isValidPhone: true,
    isValidRePassword: true,
  };
  const [objCheckInput, setObjCheckInput] = useState(defaultValidInput);
  const isValidInputs = () => {
    setObjCheckInput(defaultValidInput);
    if (!userName) {
      toast.error("Your user name is required");
      setObjCheckInput({ ...defaultValidInput, isValidUserName: false });
      return false;
    }
    if (!phone) {
      toast.error("Your phone number is required");
      setObjCheckInput({ ...defaultValidInput, isValidPhone: false });
      return false;
    }
    if (!email) {
      toast.error("Your email is required");
      setObjCheckInput({ ...defaultValidInput, isValidEmail: false });
      return false;
    }
    if (!password) {
      toast.error("Your password is required");
      setObjCheckInput({ ...defaultValidInput, isValidPassword: false });
      return false;
    }
    if (!rePassword) {
      toast.error("Your conform password is required");
      setObjCheckInput({ ...defaultValidInput, isValidRePassword: false });
      return false;
    }
    if (password !== rePassword) {
      toast.error("Your password & conform password isn't the same");
      return false;
    }
    let re = /\S+@\S+\.\S+/;
    if (!re.test(email)) {
      toast.error("Your email isn't valid");
      return false;
    }
    let isVietnamesePhoneNumber = /(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/;
    if (!isVietnamesePhoneNumber.test(phone)) {
      toast.error("Your number isn't valid");
      return false;
    }
    return true;
  };
  const handleRegister = async () => {
    let data = { email, userName, phone, password, rePassword };
    let check = isValidInputs();
    if (check === true) {
      let res = await registerNewUser(data);
      if (res && res.data && +res.data.EC === 0) {
        toast.success("Register successfully");
        history.push("/");
      }
      if (res && res.data && +res.data.EC === 1) {
        toast.error(res.data.EM);
      }
      if (res && res.data && +res.data.EC === -2) {
        toast.error(res.data.EM);
      }
    }
  };
  const handlePressEnter = (event) => {
    if (event && event.keyCode === 13) {
      handleRegister();
    }
  };
  return (
    <div className="create-account-container ">
      <div className="container">
        <div className="row">
          <div className="content-left col-sm-12 col-lg-6 ">
            <div className="brand mt-4">JWT App</div>
          </div>
          <div className="content-right mt-4 col-12 col-lg-6">
            <div className="create-account-form">
              <div className="mb-3">
                <div className="title">Create a new account</div>
                <div className="detail">It's quick and easy.</div>
              </div>
              <hr />
              <div className="mb-3 row">
                <div className="col-6">
                  <input
                    type="text"
                    className={
                      objCheckInput.isValidUserName
                        ? "form-control"
                        : "form-control is-invalid"
                    }
                    placeholder="User name"
                    value={userName}
                    ref={(ref) => addInputRef(ref, 0)}
                    onChange={(e) => handleInputChange(e, 0)}
                    required
                  />
                </div>
                <div className="col-6">
                  <input
                    type="text"
                    placeholder="Phone number"
                    value={phone}
                    onChange={(e) => handleInputChange(e, 1)}
                    ref={(ref) => addInputRef(ref, 1)}
                    required
                    className={
                      objCheckInput.isValidPhone
                        ? "form-control"
                        : "form-control is-invalid"
                    }
                  />
                </div>
              </div>
              <div className="mb-3">
                <input
                  type="email"
                  className={
                    objCheckInput.isValidEmail
                      ? "form-control"
                      : "form-control is-invalid"
                  }
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => handleInputChange(e, 2)}
                  ref={(ref) => addInputRef(ref, 2)}
                  required
                />
              </div>
              <div className="mb-3 input-password">
                <input
                  type={isShowPassword === true ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => handleInputChange(e, 3)}
                  ref={(ref) => addInputRef(ref, 3)}
                  required
                  className={
                    objCheckInput.isValidPassword
                      ? "form-control"
                      : "form-control is-invalid"
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
              <div className="mb-3 input-password">
                <input
                  type={isShowRePassword === true ? "text" : "password"}
                  className={
                    objCheckInput.isValidRePassword
                      ? "form-control"
                      : "form-control is-invalid"
                  }
                  placeholder="Re-enter password"
                  value={rePassword}
                  onChange={(e) => handleInputChange(e, 4)}
                  ref={(ref) => addInputRef(ref, 4)}
                  onKeyDown={(event) => handlePressEnter(event)}
                  required
                />
                <i
                  className={
                    isShowRePassword === true
                      ? "fa-regular fa-eye "
                      : "fa-regular fa-eye-slash"
                  }
                  onClick={() => setIsShowRePassword(!isShowRePassword)}
                ></i>
              </div>
              <div className="create">
                <button
                  className="btn btn-success"
                  onClick={() => handleRegister()}
                >
                  Register{" "}
                </button>
                <div className="forgotten mt-3">
                  <Link className="forgotten-password " to="/login">
                    Already have an account?
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateAccount;
