import { Routes, Route } from "react-router-dom";
import Home from "../Pages/Home";
import Adminlogin from "../Pages/Adminlogin";
import Studentlogin from "../Pages/Studentlogin";
import Signup from "../Pages/Signup";


const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/admin-login" element={<Adminlogin/>} />
      <Route path="/student-login" element={<Studentlogin/>} />
      <Route path="/signup" element={<Signup/>} />
    </Routes>
  );
};

export default AppRoutes;
