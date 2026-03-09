import React from "react";
import { Navigate } from "react-router-dom";

const PublicRoute = ({ children }) => {
  // get token and user from local storage
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  // if already logged in
  if (token) {
    //admin
    if (user.role === "admin") {
      return <Navigate to="/admin/dashboard" replace />;
    }

    //student
    if (user.role === "student") {
      return <Navigate to="/student/dashboard" replace />;
    }
  }

  //allow login page
  return children;
};

export default PublicRoute;
