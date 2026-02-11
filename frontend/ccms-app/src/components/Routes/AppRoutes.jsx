import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import PageLoader from "../PageLoader/PageLoader";

// these are normal imports but now we use lazy imports.
// import Home from "../Pages/Home";
// import Adminlogin from "../Pages/Adminlogin";
// import Studentlogin from "../Pages/Studentlogin";
// import Signup from "../Pages/Signup";

//lazy imports
const Home = lazy(() => import("../Pages/Home"));
const Adminlogin = lazy(()=> import("../Pages/Adminlogin"));
const Studentlogin = lazy(()=> import("../Pages/Studentlogin"));
const Signup = lazy(()=> import("../Pages/Signup"));


const AppRoutes = () => {
  return (
    <Suspense fallback={<PageLoader/>}>
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/admin-login" element={<Adminlogin />} />
      <Route path="/student-login" element={<Studentlogin />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
    </Suspense>
  );
};

export default AppRoutes;
