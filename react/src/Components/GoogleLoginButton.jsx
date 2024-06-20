import React, { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';

const GoogleLoginButton = () => {
  useEffect(() => {
      google.accounts.id.initialize({
      client_id: '87007954807-kvlad6jjbcpte242b8o0negbjtlbv0t4.apps.googleusercontent.com',
      callback: handleCallbackResponse
    });
    window.google.accounts.id.renderButton(
      document.getElementById('signInDiv'),
      { theme: 'outline', size: 'large' }
    );
  }, []);

  const[user, setUser] = useState({});
  const handleCallbackResponse = (response) => {
    console.log("Encoded JWT ID token: " + response.credential);
    var userObj = jwtDecode(response.credential);
    console.log(userObj);
    setUser(userObj);

    // Send user data to Laravel backend
    fetch('/api/auth/google/callback', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${response.credential}`
        }
    })
    .then(response => response.json())
    .then(data => {
        console.log('User data sent to Laravel:', data);
        // Handle any response from the backend
    })
    .catch(error => {
        console.error('Error sending user data to Laravel:', error);
        // Handle any errors that occur during the fetch request
    });
  };

  return (
    <div id="signInDiv"></div>
  );
};

export default GoogleLoginButton;
