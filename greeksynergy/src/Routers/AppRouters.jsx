import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../home/Home'
import Login from '../login/Login'
import Signup from '../login/Signup'
import Profile from '../profile/Profile'
import NotFound from '../utils/NotFound'

function AppRouters() {
  return (
    <div>
      <Routes>
   <Route path="/" element={<Login/>} />
   <Route path="/signup" element={<Signup/>} />
   <Route path="/home" element={<Home/>} />
   <Route path="/profile" element={<Profile/>} />
   <Route path="*" element={<NotFound/>} />
      </Routes>
        
    </div>
  )
}

export default AppRouters