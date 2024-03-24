import React from 'react';
import Login from "./login/Login";
import { GoogleOAuthProvider } from '@react-oauth/google';
import Navebar from './Navebar';
import PasswordGenerator from './Password_Generetor/PasswordGenerator';
// import {gapi} from 'gapi-script'
function App() {
const clientId="232416043202-814erfoumpuobmt513rehc42ruijelb7.apps.googleusercontent.com"
  
  return (
    <GoogleOAuthProvider clientId ={clientId} >
      <Navebar/>
      <PasswordGenerator/>
    </GoogleOAuthProvider>

  );
} 

export default App;
