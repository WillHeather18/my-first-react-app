import React from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/Authcontext';

const ProtectedRoute = ({ component: Component }) => {
  const { isAuthenticated, setIsAuthenticated } = React.useContext(AuthContext);
  setIsAuthenticated(!!localStorage.getItem('token'));

  return isAuthenticated ? <Component/> : <Navigate to="/login"/>
}

export default ProtectedRoute;