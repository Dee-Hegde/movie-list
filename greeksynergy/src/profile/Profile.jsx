import { Button, Input, Row, Select } from 'antd';
import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../home/components/Navbar';
import { isAuthenticated, isValidMobileNumber, showNotification, validEmail, validPassword } from '../utils/CommonFunctions';
const { Option } = Select;

function Profile() {
  const navigate=useNavigate()
    const [isLoading, setIsLoading]=useState(true);
    const [userDetails, setUserDetails]=useState({});
    const payload=localStorage.getItem("token");
    const [err, handleError] = useState({ email: null, password: null,name:null,mobile:null,work:null });
    const [pass,setPass]=useState(false)
  
  const getUserDetails= async()=>{
    const token=isAuthenticated();
    if(token){
    const res=await axios.post(`http://localhost:4000/users/user`,{payload,})
    setUserDetails(res?.data.user);
    setIsLoading(false)
    }
    else{
            navigate("/");
        }
}
const saveUpdate=async()=>{
 
const res=await axios.patch(`http://localhost:4000/users/updateuser/${userDetails._id}`,userDetails);
showNotification("success",res.data.status)
setUserDetails(res.data.user);
setIsLoading(false);
}
const handleLogout=()=>{
  localStorage.removeItem("token");
  showNotification("success","Logged out")
  navigate("/");
}
const handleUpdate = useCallback(async () => {
  if (validEmail(userDetails.email)&&(isValidMobileNumber(userDetails.mobile)&& userDetails.profession)&&userDetails.name) {
    setIsLoading(true)
   saveUpdate()
  } else {
    let nameError = null;
    let mobileError = null;
    let workError = null;
    if (userDetails.name?.trim() === "") {
      nameError = "Name cannot be blank";
    }
    if ((userDetails?.mobile)?.trim() === "") {
      mobileError = "mobile number cannot be blank";
    } else if (!isValidMobileNumber(userDetails.mobile)) {
      mobileError = "Enter valid mobile number";
    }
    if (userDetails.profession?.trim() === "") {
      workError = "select your profession";
    }
    handleError({name:nameError,mobile:mobileError,profession:workError });
  }
}, [userDetails]);

useEffect(() => {
  getUserDetails()
  }, [])
  return !isLoading && (
    <div>
      <Navbar userDetails={userDetails}/>
    <h1 className="t1">Profile!.</h1>
     <Row className="login-Container" style={{height:"70vh"}}>
      <Row className="fw">
      <Input onChange={(e)=>{setUserDetails({...userDetails,name:e.target.value});handleError({...err,name:null})}} value={userDetails.name} className="input" placeholder="Your Name"/>
      </Row>
      <Row className="error">{err.name}</Row>
      <Row className="fw">
      <Input disabled={true} value={userDetails.email} className="input" placeholder="Your email"/>
      </Row>
      <Row className="fw">
      <Input onChange={(e)=>{setUserDetails({...userDetails,mobile:e.target.value});handleError({...err,mobile:null})}} value={userDetails.mobile} className="input" placeholder="Your mobile"/>
      </Row>
      <Row className="error">{err.mobile}</Row>
      <Row className="fw">
      <Select onChange={(e)=>{setUserDetails({...userDetails,profession:e});handleError({...err,profession:null})}} value={userDetails.profession} className="input" placeholder="Select your profession here">
      <Option  value="Web Developer">Web Developer</Option>
  <Option value="Android Developer">Android Developer</Option>
  <Option value="IOS developer">IOS developer</Option>
      </Select>
      </Row>
      <Row className="error">{err.profession}</Row>
      <Button loading={isLoading} onClick={handleUpdate} type="primary">Update</Button>
      <Button loading={isLoading} onClick={handleLogout} type="primary">Logout</Button>
     </Row>
  </div>
  )
}

export default Profile