import { useContext, useState, useEffect, useRef } from "react";
import {  FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { authDataContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
import navLogo from "../assets/nav.png";

import "./Navbar.css";

function Navbar() {
  
  const { user, setUser, serverUrl, loading } = useContext(authDataContext);
  const navigate = useNavigate();
  const [showProfile, setShowProfile] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setShowProfile(false);
      }
    };


    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (loading) return null;



  const handleLogout = async () => {
    try {
      await axios.post(
        `${serverUrl}/api/auth/logout`,
        {},
        { withCredentials: true }
      );
      setUser(null);
      setShowProfile(false);
      navigate("/login");
    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };



  const userInitial = user?.name?.charAt(0)?.toUpperCase() || user?.email?.charAt(0)?.toUpperCase();

  return (
    <nav className="navbar">
    
      <div
      className="navbar-left"
      onClick={() => navigate("/")}
      style={{ cursor: "pointer" }}
    >
      <img src={navLogo} alt="Logo" />

    </div>


    
      
      <div className="navbar-right" ref={dropdownRef}>

      <div>
         <Link to="/" className="nav-link">Home</Link>
         <Link to="/transfer" className="nav-link">Transfer</Link>
         <Link to="/history" className="nav-link">History</Link>
      </div>

        
        <div
          className="profile-circle"
          title={user?.name || "Profile"}
          onClick={() => setShowProfile((prev) => !prev)}
        >
          {user ? userInitial : <FaUserCircle />}
        </div>

        
        {showProfile && (
          <div className="profile-wrapper">
            <ul>
              {!user && (
                <li
                  onClick={() => {
                    navigate("/login");
                    setShowProfile(false);
                  }}
                >
                  Login
                </li>
              )}

              {user && (
                <>
                  <li
              onClick={() => {
                navigate("/profile");
                setShowProfile(false);
              }}
            >
              View Profile
            </li>

                  <li onClick={handleLogout}>Logout</li>
                </>
              )}
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
