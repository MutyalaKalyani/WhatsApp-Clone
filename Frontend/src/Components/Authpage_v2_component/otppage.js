import React, { useState,useContext } from "react";
import "./Otp.css"
import { signup } from "../Apiservice/api";
import { AccountContext } from "../Contextapi/Accountprovider";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Otppage = ({name,email,phonenumber,password,otp}) => {

  const { setAccount } = useContext(AccountContext);
  
  // State to manage OTP input values
  const [enterotp, setenterOtp] = useState("");
  
 const handleverifyuser=async()=>{
    try{
    
      if(enterotp===otp){      
     // Make a signup API call
    const response = await signup({
      name: name,
      email: email,
      phonenumber: phonenumber,
      password: password,
    });

    // Handle the API response
    if (response.status === 200) {
      // If signup is successful, set the account in context
      setAccount(response.data);
    }
    if (response.status === 203) {
      // If the user already exists with this email, show a toast notification
      toast("A user with this email already exists. Please sign in.");
    }
        
        
      }else{
        toast("otp do not match")
      }
      
    }catch(err){
      console.log("there is some error to verify the otp ",err)
    }
  }
  
  return (
    <div className="Otp_Container">
      <div className="inner_Otp_Container">
        <h1>Verify</h1>
        <p className="Otp_page_info">A verification code has been sent to you. Enter the code below</p>
        
        
            <input
              type="text"
              placeholder="enter your otp here"
              value={enterotp}
              onChange={(e) => setenterOtp(e.target.value)}
              className="otpInput"
            />
          
        <button className="Otp_button" onClick={handleverifyuser}>Verify and Register</button>
      </div>
      <ToastContainer/>
    </div>
  
  );
};

export default Otppage;
