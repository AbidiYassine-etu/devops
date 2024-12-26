import React from "react";
import "./App.css";
import "./responsive.css";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginScreen from "./LoginScreen";
import EmployeeScreen from "./Employee/screens/EmployeeScreen";
import AddConges from "./Employee/components/AddConges";
import CongesScreen from "./Employee/screens/CongesScreen";
import AddFeuille from "./Employee/components/addFeuille";
import AllFeuille from "./Employee/screens/AllFeuille";
import Profile from "./Employee/screens/Profile";
import AdminScreen from "./Admin/screens/AdminScreen";
import AddEmployee from "./Admin/screens/addEmployee";
import ValidateConge from "./Admin/screens/validateConge";
import ValidateFeuille from "./Admin/screens/validateFeuille";
function App() {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<LoginScreen/>} exact />
          <Route path="/login" element={<LoginScreen/>} />
          <Route path="/employees" element={<EmployeeScreen/>} />
          <Route path="/addConges" element={<AddConges />} />
          <Route path="/congesList" element={<CongesScreen/>} />
          <Route path="/addFeuille" element={<AddFeuille/>} />
          <Route path="/feuilleList" element={<AllFeuille/>} />
          <Route path="/editProfile" element={<Profile/>} />
          <Route path="/admin" element={<AdminScreen/>} />
          <Route path="/addEmployee" element={<AddEmployee/>} />
          <Route path="/validateConge" element={<ValidateConge/>} />
          <Route path="/validateFeuille" element={<ValidateFeuille/>} />
          
        </Routes>
      </Router>
  );
}

export default App;
