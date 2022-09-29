import React, { useCallback, useEffect, useState } from 'react';
import { Button, Input, Row, Select } from "antd";
import { Link, useNavigate } from 'react-router-dom';
import { isValidMobileNumber, validEmail, validPassword } from '../utils/CommonFunctions';
import { userRegister } from '../utils/ApiConfig';
const { Option } = Select;

function Signup() {
  const navigate= useNavigate()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [work, setWork] = useState("");
 
  const [err, handleError] = useState({ email: null, password: null,name:null,mobile:null,work:null });
  const token=localStorage.getItem("token");
 
  const handleLogin = useCallback(async () => {
    if (validEmail(email) && validPassword(password)) {
      console.log(work)
      await userRegister({email,password,name,mobile,profession:work});
      const token=localStorage.getItem("token");
      if(token){
        navigate("/home");
      }
    } else {
      let emailError = null;
      let passwordError = null;
      let nameError = null;
      let mobileError = null;
      let workError = null;
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
      if (name?.trim() === "") {
        nameError = "Name cannot be blank";
      }
      if (mobile?.trim() === "") {
        mobileError = "mobile number cannot be blank";
      } else if (!isValidMobileNumber(mobile)) {
        mobileError = "Enter valid mobile number";
      }
      if (work?.trim() === "") {
        workError = "select your profession";
      }
      handleError({ email: emailError, password: passwordError,name:nameError,mobile:mobileError,work:workError });
    }
  }, [email, password,name,mobile,work,]);

  useEffect(() => {
    if(token){
      navigate("/home")
    }
  }, [token])
  return (
    <div>
      <h1 className="t1">Welcome!.</h1>
      <h3 className="t2">Signup here</h3>
       <Row className="login-Container">
       
        <Row className="fw">
        <Input onChange={(e)=>{setName(e.target.value); handleError({...err, name:null})}} className="input" placeholder="Your Name"/>
        </Row>
        <Row className="error">{err.name}</Row>
        <Row className="fw">
        <Input onChange={(e)=>{setEmail(e.target.value); handleError({...err, email:null})}} className="input" placeholder="Your email"/>
        </Row>
        <Row className="error">{err.email}</Row>
        <Row className="fw">
        <Input onChange={(e)=>{setPassword(e.target.value); handleError({...err, password:null})}} className="input" placeholder="Your password"/>
        </Row>
        <Row className="error">{err.password}</Row>
        <Row className="fw">
        <Input onChange={(e)=>{setMobile(e.target.value); handleError({...err, mobile:null})}} className="input" placeholder="Your mobile"/>
        </Row>
        <Row className="error">{err.mobile}</Row>
        <Row className="fw">
        <Select onChange={(e)=>{
          setWork(e);
          handleError({...err,work:null})
        }} className="input" placeholder="Select your profession here">
        <Option value="Web Developer">Web Developer</Option>
    <Option value="Android Developer">Android Developer</Option>
    <Option value="IOS developer">IOS developer</Option>
        </Select>
        </Row>
        <Row className="error">{err.work}</Row>
        <Row className="fw">
        <Button type="primary" onClick={handleLogin}>Signup</Button>
        </Row>
       <Row className="fw">
       <span className=" fw m-auto">Already have account? <br/><Link className="m-auto" to="/">Sign In here</Link></span>
       </Row>
       </Row>
    </div>
  )
}

export default Signup