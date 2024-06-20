// This app contains all the APIs used in the project

import axios from "axios";
const url = 'http://localhost:8000';

// New signin route for version 2
export const signin = async (data) => {
  try {
    // Make a POST request to the signin route
    let res = await axios.post(`${url}/signin`, data);
    return res;
  } catch (err) {
    // Handle errors during the signin process
    console.log("There is some error in signin route  ");
    console.error(err);
  }
}

// New signup route for version 2
export const signup = async(data) => {
  try {
    // Make a POST request to the signup route
    let res = await axios.post(`${url}/signup`, data);
    return res;
  } catch (err) {
    // Handle errors during the signup process
    console.log("There is some error in signup route  ");
    console.error(err);
  }
}

// api call to send otp at email
export const sendotp=async(data)=>{
  try{
    let res=await axios.post(`${url}/sendotp`,data);
    return res;
  }catch(err){
    console.log('there is error to send otp email ',err);
  }
}

// Route to change the password in the database
export const forgottenpassword = async(data) => {
  try {
    // Make a POST request to the forgottenpassword route
    let res = await axios.post(`${url}/forgottenpassword`, data);
    return res.data;
  } catch (err) {
    // Handle errors during the forgotten password process
    console.log("There is some error in forgotten password  ");
    console.error(err);
  }
}

// Get user route to fetch all users
export const getuser = async (data) => {
  try {
    // Make a GET request to the getuser route
    const response = await axios.get(`${url}/getuser`, data);
    return response.data;
  } catch (err) {
    // Handle errors during the fetch all users process
    console.log("There is some error in fetch all users in getuser route");
    console.error(err);
  }
}

// Set up the conversation and store the connection in the database
export const setconversation = async (data) => {
  try {
    // Make a POST request to the setconversation route
    await axios.post(`${url}/conversation/add`, data);
  } catch (err) {
    // Handle errors during the conversation setup process
    console.log('There is something error to choose the user from the chat list => ', err.message);
  }
}

// Get information about the connection set up between sender and receiver
export const getconversation = async (data) => {
  try {
    // Make a POST request to the getconversation route
    const response = await axios.post(`${url}/conversation/get`, data);
    return response.data;
  } catch (err) {
    // Handle errors during the information retrieval process
    console.log('There is something error to choose the user and get information about connection id from the chat list => ', err.message);
  }
}

// Send a message to the backend
export const sendmessageindatabase = async (data) => {
  try {
    // Make a POST request to the send message route
    await axios.post(`${url}/message/add`, data);
  } catch (err) {
    // Handle errors during the message sending process
    console.log("There is some error to send the message from chatmessage to backend ", err.message);
  }
}

// Get messages from the backend
export const getmessagefromdatabase = async (id) => {
  try {
    // Make a GET request to the get message route
    let res = await axios.get(`${url}/message/get/${id}`);
    return res.data;
  } catch (err) {
    // Handle errors during the message retrieval process
    console.log("There is some error to get the message from backend in scrollchat", err.message);
  }
}
