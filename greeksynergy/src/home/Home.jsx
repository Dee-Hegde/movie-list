import axios from 'axios';
import React, { useEffect,useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { isAuthenticated } from '../utils/CommonFunctions';
import Cards from './components/Cards';
import "../assets/Css/cards.css"
import Navbar from './components/Navbar';

function Home() {
    const navigate=useNavigate()
    const [isLoading, setIsLoading]=useState(true);
    const [userDetails, setUserDetails]=useState(true);
    const [dashboardDetails, setDashboardDetails]=useState(true);
    const payload=localStorage.getItem("token")
    

    const getUserDetails= async()=>{
        const token=isAuthenticated();
        if(token){
        const res=await axios.post(`http://localhost:4000/users/user`,{payload,})
        console.log(res?.data.user)
        setUserDetails(res?.data.user);
        getDashboardDetails()
        }
        else{
                navigate("/");
            }
        
    }
    const getDashboardDetails= async()=>{
       const resp= await axios.post("https://hoblist.com/api/movieList",{
                category: "movies",
                language: "kannada",
                genre: "all",
                sort: "voting"
        })
        setDashboardDetails(resp?.data?.result);
        setIsLoading(false)
    }
useEffect(() => {
getUserDetails()
}, [])

  return !isLoading &&(<>
<Navbar userDetails={userDetails}/>
    <div className='home-container wrap'>
        {dashboardDetails.map((item,i)=><div className='card-container' key={i}><Cards data={item}/></div>)}
    </div>
    </>
  )
}

export default Home