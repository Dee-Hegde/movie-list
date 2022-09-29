import { Button, Input, Row, } from "antd";
import "../assets/Css/login.css";
import React, { useState, useCallback, useRef, useEffect } from "react";
import { validEmail, validPassword } from "../utils/CommonFunctions";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { UserLogin } from "../utils/ApiConfig";

function Login() {
  const navigate= useNavigate()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, handleError] = useState({ email: null, password: null });
  const token=localStorage.getItem("token");
 
  const handleLogin = useCallback(async () => {
    if (validEmail(email) && validPassword(password)) {
      await UserLogin({email,password});
      const token=localStorage.getItem("token");
      if(token){
        navigate("/home");
      }
    } else {
      let emailError = null;
      let passwordError = null;
      if (email?.trim() === "") {
        emailError = "Email cannot be blank";
      } else if (!validEmail(email)) {
        emailError = "Email is not valid";
      }
      if (password?.trim() === "") {
        passwordError = "Password cannot be blank";
      } else if (!validPassword(password)) {
        passwordError = "Password length should be of minimum 4 characters";
      }
      handleError({ email: emailError, password: passwordError });
    }
  }, [email, password,UserLogin]);

  useEffect(() => {
    if(token){
      navigate("/home")
    }
  }, [token])
  

  return (
    <div>
      <h1 className="t1">Welcome!.</h1>
      <h3 className="t2">Login here</h3>
      <Row className="signup-Container">
        <Row className="fw row">
          <Input 
          size="small"
          onChange={(e)=>{setEmail(e.target.value);
            handleError({...err,email:null})}}
          className="input" placeholder="Email" />
          <Row className="error">{err.email}</Row>
        </Row>
        <Row className="fw row">
          <Input 
           size="small"
          onChange={(e)=>{setPassword(e.target.value);
            handleError({...err,password:null})}}
          className="input" placeholder="Password" />
          <Row className="error">{err.password}</Row>
        </Row>
        
        <Row className="fw">
          <Button type="primary" onClick={handleLogin}>Login</Button>
        </Row>
        <Row className="fw row">
          <span className=" fw m-auto h3">
            Don't have account? <br />
            <Link className="m-auto" to="/signup">
              Sign up here
            </Link>
          </span>
        </Row>
      </Row>
    </div>
  );
}

export default Login;
