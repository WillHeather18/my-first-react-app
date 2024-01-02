import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/Authcontext'; // Import the AuthContext
import { UserContext } from '../context/UserContext';
import UserDetails from '../userDetails';
import AppBar from "../Components/AppBar";
import "../styles/Login.css";


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setIsAuthenticated } = React.useContext(AuthContext); // Get setIsAuthenticated from the context
  const { setUserDetails } = React.useContext(UserContext);
  const navigate = useNavigate();


  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const basicDetails = await APILogin(email, password);
      console.log(basicDetails);
      const uuid = basicDetails.uuid;
      const recommendations = await APIRecommendations(uuid);
      const userDetails = UserDetails.loginFromJSON(basicDetails);
      userDetails.currentRecommendations = UserDetails.recommendationsFromJSON(recommendations);
      setUserDetails(userDetails);
      console.log(recommendations);
      navigate('/dashboard');
      }
    catch (error) {
      console.error('Error:', error);
    }
  };

  function APILogin(email, password) {
    return fetch('https://bibliobackendserver.azurewebsites.net/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email,
        password: password
      })
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      if (data.status === 'success') {
        setIsAuthenticated(true);
        localStorage.setItem('token', data.token);
        return data.data;
      } else if (data.status === 'failure') {
      } else {
      }
    }).catch(error => {
  console.log('In catch callback'); // Log that we're in the catch callback
});
  }

  function APIRecommendations(uuid){
    const url = `https://bibliobackendserver.azurewebsites.net/books/getrecommendations/${uuid}`;
    return fetch(url , {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'authorization': 'Bearer ' + localStorage.getItem('token')
      },
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      if (data.status === 'success') {
        return data.recommendations;
      }
    }).catch(error => {
  })};

  return (
    <div>
      <AppBar transparent={false} />
      <div className="login-page">
      <h1>Login</h1>
      <form onSubmit={handleFormSubmit}>
        <input type="email" name="email" placeholder="Enter your email" onChange={handleInputChange} />
        <input type="password" name="password" placeholder="Enter your password" onChange={handleInputChange} />
        <button type="submit">Login</button>
      </form>
      <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
    </div>
    </div>
  );
};

export default Login;
