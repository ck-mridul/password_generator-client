import React from 'react';
import { GoogleLogin } from '@react-oauth/google';

function Login() {
    const responseMessage = (response) => {
        console.log(response);
    };
    const errorMessage = (error) => {
        console.log(error);
    };
    return (
        <div>
            <h2>React Google Login</h2>
            <br />
            <br />
            <GoogleLogin 
            clientId='232416043202-814erfoumpuobmt513rehc42ruijelb7.apps.googleusercontent.com'
            onSuccess={responseMessage} onError={errorMessage} />
        </div>
    )
}
export default Login;