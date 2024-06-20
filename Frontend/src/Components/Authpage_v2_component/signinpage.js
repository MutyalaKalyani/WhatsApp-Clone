import React, { useState } from "react";
import Signuppage from "./signuppage";
import { signin } from "../Apiservice/api";
import { useContext } from "react";
import { AccountContext } from "../Contextapi/Accountprovider";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./signinpage.css"

export default function Signinpage() {
  // Context for managing the user account
  const { setAccount } = useContext(AccountContext);
  

  // State variables for email, password, and controlling the rendering of Signuppage
  const [email, setemail] = useState(null);
  const [password, setpassword] = useState(null);
  const [showSignuppage, setShowSignuppage] = useState(false);

  // Function to navigate to the Signuppage component
  const routetosignuppagehandler = () => {
    setShowSignuppage(true);
  }

  // Function to handle the signin process
  const signinhandler = async () => {
    try {
      // Check if both email and password are filled
      if (email && password) {
        // Make a signin API call
        const response = await signin({ email: email, password: password });

        // Handle the API response
        if (response.status === 200) {
          // If signin is successful, set the account in context
          setAccount(response.data);
        }
        if (response.status === 203) {
          // If there is an issue with signin, show a toast notification with the response data
          toast(response.data);
        }
      } else {
        // If email or password is not filled, show a toast notification
        toast("Enter both Email and Password");
      }
    } catch (err) {
      console.log('Error in signin page', err);
    }
  };

  return (
    <>
      {showSignuppage ? (
        <Signuppage />
      ) : (
        <div className="signin_page_main">
        <div className="signin_page_inner">
  
          <div className="signinpage_title"><h2 className="signin_title">Login</h2></div>
            <div className="mb-4">
              <label htmlFor="phoneNumber" className="signin_label">
                Email Address
              </label>
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                className="signin_input"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setemail(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="signin_label">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="signin_input"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setpassword(e.target.value)}
              />
            </div>
            {/* Signin button */}
            <button
              type="submit"
              className="signin_button"
              onClick={signinhandler}
            >
              Sign In
            </button>
            {/* Link to go to the Signuppage */}
            <button className="signin_page_info" onClick={routetosignuppagehandler}>
              Don't have an account? Sign Up
            </button>
            {/* Toast notifications container */}
            <ToastContainer />
          </div>
        </div>
      )}
    </>
  );
}
