import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignIn from "./Pages/Signin";
import SignUp from "./Pages/Signup";
import DashBoard from "./Pages/DashBoard";



const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<SignIn />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="/dashboard" element={<DashBoard/>}/>
      </Routes>
    </Router>
  );
};

export default App;
