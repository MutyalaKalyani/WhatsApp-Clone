import React, { useState } from 'react'
import "./ForgetPassword.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faCircleCheck } from '@fortawesome/free-solid-svg-icons'
import { forgottenpassword } from '../Apiservice/api'
import { useNavigate } from "react-router-dom";

const ForgetPassword = (email) => {
  // Initialize navigate function from react-router-dom
  const navigate = useNavigate();

  // Destructure email from props
  const emaill = email;

  // State for password and confirm password
  const [password, setpassword] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");

  // Refs for password strength indicators
  let myInput = document.getElementById("password");
  let letter = document.getElementById("letter");
  let capital = document.getElementById("capital");
  let number = document.getElementById("number");
  let length = document.getElementById("length");
  let specialchar = document.getElementById("specialch");

  // Function to display strength indicators
  const focus = () => {
    document.getElementById("message").style.display = "block";
  }

  // Function to hide strength indicators
  const blur = () => {
    document.getElementById("message").style.display = "none";
  }

  // Function to check password strength on keyup
  const keyup = () => {
    // Regular expressions for password strength
    let lowerCaseLetters = /[a-z]/g;
    let upperCaseLetters = /[A-Z]/g;
    let numbers = /[0-9]/g;
    let special = /[@#$&^!*.~`/?,+-_=()<>]/g;

    // Check and update strength indicators based on password content
    if (myInput.value.match(lowerCaseLetters)) {
      letter.classList.remove("invalid");
      letter.classList.add("valid");
    } else {
      letter.classList.remove("valid");
      letter.classList.add("invalid");
    }

    if (myInput.value.match(upperCaseLetters)) {
      capital.classList.remove("invalid");
      capital.classList.add("valid");
    } else {
      capital.classList.remove("valid");
      capital.classList.add("invalid");
    }

    if (myInput.value.match(numbers)) {
      number.classList.remove("invalid");
      number.classList.add("valid");
    } else {
      number.classList.remove("valid");
      number.classList.add("invalid");
    }

    if (myInput.value.match(special)) {
      specialchar.classList.remove("invalid");
      specialchar.classList.add("valid");
    } else {
      specialchar.classList.remove("valid");
      specialchar.classList.add("invalid");
    }

    if (myInput.value.length >= 8) {
      length.classList.remove("invalid");
      length.classList.add("valid");
    } else {
      length.classList.remove("valid");
      length.classList.add("invalid");
    }
  }

  // Function to handle password change
  const changePasswordhandler = async () => {
    if (confirmpassword === password) {
      let result = forgottenpassword({ email: emaill, password: confirmpassword });

      if (result.success === true) {
        navigate("/");
        alert('Password changed successfully');
      }
    } else {
      document.getElementById('ForgetpaswPage_error').innerHTML = 'Passwords are not matching';
    }
  }

  return (
    <div className="ForgetpaswPage_container">
      <div className='ForgetpaswPage_inner_container'>
        <h1 className='ForgetpaswPage_title'>
          Choose a new password
        </h1>
        <p>Almost done. Enter your new password and you're all set.</p>
        <form onSubmit={changePasswordhandler}>
          <div className='ForgetpaswPage_input_title'>New password</div>
          <input
            className='ForgetpaswPage_input'
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setpassword(e.target.value)}
            placeholder='Enter your password'
            onClick={focus}
            onBlur={blur}
            onKeyUp={keyup}
            pattern="((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{6,20})"
            title="Must contain at least one number, one uppercase and lowercase letter, one special character and at least 8 or more characters"
            required="required"
          />
          <div className='ForgetpaswPage_input_title'>Confirm password</div>
          <input
            className='ForgetpaswPage_input'
            type="password"
            name="password"
            required="required"
            value={confirmpassword}
            onChange={(e) => setConfirmpassword(e.target.value)}
            placeholder='Re-enter your password'
          />
          <h3 className='ForgetpaswPage_instructions'>Password must contain the following:</h3>
          <div id="message">
            <p id="letter" className="invalid"><FontAwesomeIcon className="ForgetpaswPage_icon" icon={faCircleCheck} /> one lowercase letter</p>
            <p id="capital" className="invalid"><FontAwesomeIcon className="ForgetpaswPage_icon" icon={faCircleCheck} /> one capital uppercase letter</p>
            <p id="number" className="invalid"><FontAwesomeIcon className="ForgetpaswPage_icon" icon={faCircleCheck} /> one number</p>
            <p id="length" className="invalid"><FontAwesomeIcon className="ForgetpaswPage_icon" icon={faCircleCheck} /> Minimum 8 characters</p>
            <p id="specialch" className="invalid"><FontAwesomeIcon className="ForgetpaswPage_icon" icon={faCircleCheck} /> one special char characters</p>
          </div>
          <button className='ForgetpaswPage_button'>Reset Password</button>
          <p id='ForgetpaswPage_error'></p>
        </form>
      </div>
    </div>
  )
}

export default ForgetPassword;
