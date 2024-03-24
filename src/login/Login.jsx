import React, { useEffect } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { gapi } from 'gapi-script';
import { axiosInstance } from '../Service/axiosConfig';

function Login() {
  const clientId="232416043202-814erfoumpuobmt513rehc42ruijelb7.apps.googleusercontent.com"

    const responseMessage = (response) => {
      const cc = response.credential
        console.log(cc,'blas');
        axiosInstance.post('/auth/convert-token/',{
          token:cc,
          backend:'google-oauth2',
          grant_type: 'convert_token',
          client_id: '232416043202-814erfoumpuobmt513rehc42ruijelb7.apps.googleusercontent.com',
          client_secret:'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',
        }).then((e)=>{
          console.log(e)
        })
    };

    const errorMessage = (error) => {
        console.log(error);
    };

    useEffect(()=>{
        function start(){
          gapi.client.init({
            clientId: clientId,
            scoppe:""
          })
        };
        gapi.load('client:auth2',start)
        // var accessToken = gapi.auth.getToken()
        // console.log(accessToken,'blabl')
      })

    return (
        <div>
           
            <GoogleLogin 
            clientId='232416043202-814erfoumpuobmt513rehc42ruijelb7.apps.googleusercontent.com'
            onSuccess={responseMessage} onError={errorMessage} />
        </div>
    )
}
export default Login;