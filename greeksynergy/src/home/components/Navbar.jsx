import { Button, Col, Popover, Row } from 'antd'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import "../../assets/Css/Navbar.css"

function Navbar(userDetails) {
    const navigate=useNavigate()
 
        const name="Geeksynergy Technologies Pvt Ltd";
        const content = (
            <div>
              <p>Address: Sanjayanagar, Bengaluru-56</p>
              <p>Phone: XXXXXXXXX09</p>
              <p>Email: XXXXXX@gmail.com</p>
            </div>
          );
          const content1 = (
            <div>
                <Row>
                <Link to="/profile">Profile</Link>
                </Row>
            </div>
          );
  return (
    <div className='nav-Container'>
       <div style={{cursor:"pointer"}}>
        <img onClick={()=>navigate("/home")} className='logo-img' src="https://as1.ftcdn.net/v2/jpg/01/25/66/46/1000_F_125664611_YJnr7lQqJ1RcGOf5n1zlfXhZge0qZJyx.jpg" alt="" />
       </div>
       <div className='button-div'>
       <Popover placement="bottom" title={name} content={content} >
        <Button type='primary'>Company Info</Button>
      </Popover>
       </div>
       <div className='profile-done'>
       <Popover placement="bottom" content={content1}>
        {<Button type='primary'>{userDetails&& userDetails?.userDetails?.name}</Button>}
      </Popover>
       </div>
        
    </div>
  )
}

export default Navbar