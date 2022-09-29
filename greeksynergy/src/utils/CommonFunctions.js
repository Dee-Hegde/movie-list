import { notification } from "antd";
import jwtDecode from "jwt-decode";
export const validEmail = (email) => {
    let mailformat = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    return mailformat.test(email);
  };
  
  export const validPassword = (password = "") => {
    return password.length >= 4;
  };
  export const isValidMobileNumber = ( mobile = "") => {
    let format = /^[789]\d{9}$/;
    if (!format) return false;
    return format.test(mobile);
  };

  export const showNotification = (type, msg) => {
    notification[type]({
      message: msg,
      placement: "bottomLeft",
    });
  };

  export const isAuthenticated = () => {
  
    const token = localStorage.getItem("token");
   
    if (token) {
      const user = jwtDecode(token);
     
      const dateNow = new Date();
    
      if (user?.exp >=(Math.floor(dateNow.getTime() / 10000))) {
        
        return true;
      } else {
      
        localStorage.removeItem(token);
        return false
      }
    }
    else{
      return false;
    }
  
 
  };