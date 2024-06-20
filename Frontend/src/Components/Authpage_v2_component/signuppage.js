import React, { useEffect, useState,useContext } from "react";
import Signinpage from "./signinpage";
import { AccountContext } from "../Contextapi/Accountprovider";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { sendotp } from "../Apiservice/api";
import Otppage from "./otppage";
import { signup } from "../Apiservice/api";
import './signuppage.css';


function generaterandomnumber() {
  return Math.floor(100000 + Math.random() * 900000);
}

export default function Signuppage() {
  // State variables for form inputs
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [phonenumber, setphonenumber] = useState("");
  const [password, setpassword] = useState("");
  const [otp, setotp] = useState("349178");
  const { setAccount } = useContext(AccountContext);
  const [confirmpassword, setconfirmpassword] = useState("");

  // State variable to control rendering of Signinpage component
  const [showSigninPage, setShowSigninPage] = useState(false);
  // Function to navigate to the Signinpage component
  const gotosigninpagehandler = () => {
    setShowSigninPage(true);
  };

 
  // Function to handle the signup process
  const signuphandler = async () => {

    try {
      // Check if passwords match
      if (confirmpassword === password) {

        // send otp to email
        //  demotest = generaterandomnumber();
        // setotp(demotest);
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
       
      } else {
        // If passwords don't match, show a toast notification
        toast("Passwords do not match. Please re-enter them carefully.");
      }
    } catch (err) {
      console.log("Error in signup process in Signuppage", err);
    }

  };

  return (
    <>
      {
        showSigninPage ? (
          <Signinpage />
        ) : (
          <div className="signup_page_main">
        <div className="signup_page_inner">
        <div className="signuppage_title"><h2 className="signup_title">Sign Up</h2></div>
            <div>
              <label className="signup_label" >
                Name
              </label>
                <input
                  type="text"
                  className="signup_input"
                  placeholder="Enter your first name"
                  value={name}
                  onChange={(e) => setname(e.target.value)}
                />
              </div>
              <div>
              <label className="signup_label">
                Email
              </label>
                <input
                  type="email"
                  className="signup_input"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setemail(e.target.value)}
                />
              </div>
              <div >
              <label className="signup_label">
                Phone Number
              </label>
              <input
                type="String"
                className="signup_input"
                placeholder="Enter your phone number"
                value={phonenumber}
                onChange={(e)=>setphonenumber(e.target.value)}
              />
            </div>
            <div >
              <label className="signup_label">
                Password
              </label>
              <input
                type="password"
                className="signup_input"
                placeholder="Enter your password"
                value={password}
                onChange={(e)=>setpassword(e.target.value)}
              />
            </div>
            <div>
              <label className="signup_label">
                Confirm Password
              </label>
              <input
                type="password"
                className="signup_input"
                placeholder="Confirm your password"
                value={confirmpassword}
                onChange={(e)=>setconfirmpassword(e.target.value)}
              />
            </div>
              {/* Signup button */}
              <button
                type="submit"
                onClick={signuphandler}
                className="signup_button"
              >
                Sign Up
              </button>
              {/* Link to go to the Signinpage */}
              <button className="gotosignin_button" onClick={gotosigninpagehandler}>
                For sign in click here
              </button>
              {/* Toast notifications container */}
              <ToastContainer />
            </div>
          </div>
        )}
    </>
  );
}
