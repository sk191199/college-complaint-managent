import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import PageLoader from "../PageLoader/PageLoader";
import Changepassword from "../Pages/Changepassword";

import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import PublicRoute from "../PublicRoute/PublicRoute";
import AdminLayout from "../Adminpanel/AdminLayout";
import StudentLayout from "../Studentpanel/StudentLayout";

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
//admin
const AdminDashboard = lazy(() => import("../Adminpanel/AdminDashboard"));
const Departments = lazy(() => import("../Adminpanel/Departments"));
const Complaints = lazy(() => import("../Adminpanel/Complaints"));
const Users = lazy(() => import("../Adminpanel/Users"));
//students
const StudentDashboard = lazy(() => import("../Studentpanel/StundentDashboard"));
const StudentComplaints = lazy(() => import("../Studentpanel/StudentComplaints"));

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
        <Route path="/change-password" element={<Changepassword />} />

        <Route
          path="/admin"
          element={
            <ProtectedRoute role="admin">
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="complaints" element={<Complaints />} />
          <Route path="departments" element={<Departments />} />
          <Route path="users" element={<Users />} />
        </Route>
        {/* student nested Routes */}
        <Route
          path="/student"
          element={
            <ProtectedRoute role="student">
              <StudentLayout />
            </ProtectedRoute>
          }
        >
          <Route path="dashboard" element={<StudentDashboard/>}/>
          <Route path="complaints" element={<StudentComplaints/>}/>
        </Route>
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
