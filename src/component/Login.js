import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "../App.scss";
import { postLoginApi } from "../service/userService";
import { useContext } from "react";
import { UserContext } from "../context/useContext";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useContext(UserContext);

  const navigate = useNavigate();

  // const [formData, setFormData] = useState({
  //   email: "",
  //   password: "",
  // });
  // const handleText = (e) => {
  //   const { email, value } = e.target;
  //   setFormData((prevData) => ({
  //     ...prevData,
  //     [email]: value,
  //   }));
  // };

  const handleName = (e) => {
    setEmail(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleLogin = async () => {
    if (!email || !password) {
      toast.error("Login failed");
      return;
    }
    toast.success("Login success");
    setLoading(true);
    let res = await postLoginApi(email, password);
    if (res && res.token) {
      login(email, res.token);
      navigate("/");
    } else {
      //error
      if (res && res.status === 400) {
        toast.error(res.data.error);
      }
    }
    setLoading(false);
  };
  const handleClick = () => {
    navigate("/");
  };
  useEffect(() => {
    let token = localStorage.getItem("token");
    if (token) {
      navigate("/");
    }
  }, []);
  return (
    <div className="login-container col-12 my-5 col-sm-4">
      <div className="title">LOGIN</div>
      <div className="text">Email or username (eve.holt@reqres.in)</div>
      <input
        type="text"
        placeholder="Enter email or username..."
        value={email}
        onChange={handleName}
        // email="email"
        // value={formData.email}
        // onChange={handleText}
      />
      <input
        type="password"
        placeholder="Enter password..."
        value={password}
        onChange={handlePassword}
        // email="password"
        // value={formData.password}
        // onChange={handleText}
      />

      <button
        className={email && password ? "active" : ""}
        disabled={email && password ? false : true}
        onClick={handleLogin}
      >
        {loading && (
          <div className="spinner-border spinner-border-sm" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        )}
        &nbsp; Login
      </button>

      <div className="text-center " onClick={handleClick}>
        <FontAwesomeIcon icon={faChevronLeft} className="mx-2" />
        Go back
      </div>
    </div>
  );
};

export default Login;
