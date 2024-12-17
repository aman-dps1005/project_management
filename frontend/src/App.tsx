import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import SignIn from "./Pages/Signin";
import SignUp from "./Pages/Signup";
import DashBoard from "./Pages/DashBoard";

const App: React.FC = () => {
  // Check if the token exists in localStorage
  const token = localStorage.getItem("token");

  return (
    <Router>
      <Routes>
        {/* If token exists, redirect to dashboard */}
        <Route path="/login" element={token ? <Navigate to="/dashboard" /> : <SignIn />} />
        
        {/* If token exists, redirect to dashboard */}
        <Route path="/register" element={token ? <Navigate to="/dashboard" /> : <SignUp />} />
        
        {/* Dashboard route */}
        <Route path="/dashboard" element={token ? <DashBoard /> : <Navigate to="/login" />} />
        
        {/* Redirect to login if the route is not matched */}
        <Route path="*" element={<Navigate to={token ? "/dashboard" : "/login"} />} />
      </Routes>
    </Router>
  );
};

export default App;
