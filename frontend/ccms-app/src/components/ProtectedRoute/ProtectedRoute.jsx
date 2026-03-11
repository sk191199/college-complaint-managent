import React from 'react'
import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({children, role}) => {
  //get token and user from local storage
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  // if no token ===> redirect to Home
  if (!token) {
    return <Navigate to="/" replace/>
  }

  // if role not matched ===> rediect to Home
  if (role && user?.role !== role){
    return <Navigate to="/" replace/>
  }

  // allow page
  return children;

}

export default ProtectedRoute
