import React, { useEffect } from 'react';
import Login from "./login/Login";
import { GoogleOAuthProvider } from '@react-oauth/google';
import {gapi} from 'gapi-script'
function App() {
const clientId="232416043202-814erfoumpuobmt513rehc42ruijelb7.apps.googleusercontent.com"
  useEffect(()=>{
    function start(){
      gapi.client.init({
        clientId: clientId,
        scoppe:""
      })
    };
    gapi.load('client:auth2',start)
    // var accessToken = gapi.auth.getToken()
    // console.log(accessToken,'blabla')
  })
  return (
    <GoogleOAuthProvider clientId ={clientId} >

    <div className="App">
      <Login/>
    </div>
    </GoogleOAuthProvider>

  );
}

export default App;
