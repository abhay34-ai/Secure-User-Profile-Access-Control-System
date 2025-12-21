import { useContext, useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { authDataContext } from "../context/Authcontext";
import navLogo from "../assets/nav.png";
import "./styles/Navbar.css";

function Navbar() {
  const { user, setUser, serverUrl, loading } = useContext(authDataContext);
  const navigate = useNavigate();
  const [showProfile, setShowProfile] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const closeDropdown = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowProfile(false);
      }
    };
    document.addEventListener("mousedown", closeDropdown);
    return () => document.removeEventListener("mousedown", closeDropdown);
  }, []);

  if (loading) return null;

  const handleLogout = async () => {
    try {
      await axios.post(`${serverUrl}/api/auth/logout`);
      setUser(null);
      setShowProfile(false);
      navigate("/login");
    } catch (err) {
      console.log(err.message);
    }
  };

  const userInitial =
    user?.name?.charAt(0)?.toUpperCase() ||
    user?.email?.charAt(0)?.toUpperCase();

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo" onClick={() => navigate("/")}>
          <img src={navLogo} alt="Logo" />
        </div>

        <div className="navbar-center">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/transfer" className="nav-link">Transfer</Link>
          <Link to="/history" className="nav-link">History</Link>
        </div>

        <div className="navbar-actions" ref={dropdownRef}>
          {!user && <Link to="/login" className="login-link">Login</Link>}
          {!user && <Link to="/register" className="signup-btn">Sign Up</Link>}

          {user && (
            <div
              className="profile-circle"
              onClick={() => setShowProfile((p) => !p)}
            >
              {userInitial}
            </div>
          )}

          {showProfile && user && (
            <div className="profile-dropdown">
              <p onClick={() => navigate("/profile")}>View Profile</p>
              <p onClick={() => navigate("/transfer")}>Transfer</p>
              <p onClick={() => navigate("/history")}>History</p>
              <p onClick={handleLogout}>Logout</p>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
