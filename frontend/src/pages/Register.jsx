import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { authDataContext } from "../context/Authcontext";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
import "./styles/Auth.css";

function Register() {
  const navigate = useNavigate();
  const { serverUrl } = useContext(authDataContext);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [aadhaar, setAadhaar] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (aadhaar.length !== 12) {
      toast.error("Please enter all 12 digits of Aadhaar number");
      setLoading(false);
      return;
    }

    try {
      await axios.post(`${serverUrl}/api/auth/register`, {
        name,
        email,
        password,
        aadhaar,
      });

      toast.success("Registration successful. Please login.");
      navigate("/login");
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Registration failed. Try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2 className="auth-title">Register</h2>

        <form onSubmit={handleSignup} className="auth-form">
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              onChange={(e) => setName(e.target.value)}
              required
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label>Aadhaar Number</label>
            <input
              type="text"
              inputMode="numeric"
              maxLength={12}
              value={aadhaar}
              onChange={(e) => setAadhaar(e.target.value.replace(/\D/g, ""))}
              required
              disabled={loading}
            />
          </div>

          <button type="submit" className="auth-btn" disabled={loading}>
            {loading ? <Loader /> : "Register"}
          </button>
        </form>

        <p className="auth-footer">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
