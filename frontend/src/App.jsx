import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import './app.css'
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Profile from "./pages/Profile";

function App() {

  return (
    <>
      
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/register" element={<Register/>}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/profile" element={<Profile />} />
        
      </Routes>

    </>
  );
}

export default App;
