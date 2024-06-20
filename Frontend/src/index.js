import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
 import UserProvider from './Components/Contextapi/Userprovider';
 import AccountProvider from './Components/Contextapi/Accountprovider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
 <UserProvider>
  <AccountProvider>
  <BrowserRouter>
   <App/>
  </BrowserRouter>
   </AccountProvider>
 </UserProvider>
      
);

