import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import PageLoader from "../PageLoader/PageLoader";
import Changepassword from "../Pages/Changepassword";
import AdminDashboard from "../Adminpanel/AdminDashboard";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import PublicRoute from "../PublicRoute/PublicRoute";
import AdminLayout from "../Adminpanel/AdminLayout";

// these are normal imports but now we use lazy imports.
// import Home from "../Pages/Home";
// import Adminlogin from "../Pages/Adminlogin";
// import Studentlogin from "../Pages/Studentlogin";
// import Signup from "../Pages/Signup";

//lazy imports
const Home = lazy(() => import("../Pages/Home"));
const Adminlogin = lazy(() => import("../Pages/Adminlogin"));
const Studentlogin = lazy(() => import("../Pages/Studentlogin"));
const Signup = lazy(() => import("../Pages/Signup"));

const AppRoutes = () => {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route
          path="/"
          element={
            <PublicRoute>
              <Home />
            </PublicRoute>
          }
        />
        <Route
          path="/admin-login"
          element={
            <PublicRoute>
              <Adminlogin />
            </PublicRoute>
          }
        />
        <Route
          path="/student-login"
          element={
            <PublicRoute>
              <Studentlogin />
            </PublicRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <PublicRoute>
              <Signup />
            </PublicRoute>
          }
        />
        <Route path="change-password" element={<Changepassword />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute role="admin">
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="complaints" element={<AdminDashboard />} />
          <Route path="departments" element={<AdminDashboard />} />
          <Route path="users" element={<AdminDashboard />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
