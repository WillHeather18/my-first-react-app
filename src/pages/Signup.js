import React, { useState } from 'react';
import { Link ,useNavigate } from 'react-router-dom';
import AppBar from "../Components/AppBar";
import "../styles/Signup.css"

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [signupStatus, setSignupStatus] = useState('');
  const navigate = useNavigate();


  const handleInputChange = (event) => {
    switch(event.target.name) {
      case 'email':
        setEmail(event.target.value);
        break;
      case 'password':
        setPassword(event.target.value);
        break;
      case 'confirmPassword':
        setConfirmPassword(event.target.value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    // Hash the password

    return fetch('https://bibliobackendserver.azurewebsites.net/users/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
    .then(response => response.json())
    .then(data => {
      if (data.status === 'success') {
        setSignupStatus('Signup Successful');
        alert("Signup Successful");
        navigate('/login');
      } else if (data.status === 'failure') {
        setSignupStatus(data.message);
      }
    })
    .catch((error) => {
      setSignupStatus('Signup Failed');
    });
  };

  return (
    <div>
      <AppBar transparent={false} />
      <div className='signup-page'>
        <h1>Signup</h1>
        <form onSubmit={handleSubmit}>
          <input type="text" name="email" placeholder="Email" onChange={handleInputChange} />
          <input type="password" name="password" placeholder="Password" onChange={handleInputChange} />
          <input type="password" name="confirmPassword" placeholder="Confirm Password" onChange={handleInputChange} />
          <button type="submit">Signup</button>
        </form>
        <p>{signupStatus}</p>
      </div>
    </div>
  );
};

export default Signup;