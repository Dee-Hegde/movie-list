import axios from "axios";
import { showNotification } from "./CommonFunctions";


export const UserLogin= async (payload)=>{
    
const res=await axios.post(`http://localhost:4000/users/login`,payload)
if(res?.data?.status===200){
    showNotification("error",res.data.message)
}
else if(res?.data?.status==="success"){
    showNotification("success", res.data.message)
    {(res.data.token) && localStorage.setItem("token",res?.data?.token)};
}
}

export const userRegister= async (payload)=>{
    
    const res=await axios.post(`http://localhost:4000/users/signup`,payload)
    if(res?.data?.status==="error"){
        showNotification("error",res.data.message)
    }
    else if(res?.data?.status==="success"){
        showNotification("success", res.data.message)
        {(res.data.token) && localStorage.setItem("token",res?.data?.token)};
    }
    }