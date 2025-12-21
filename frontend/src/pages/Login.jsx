import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { authDataContext } from "../context/Authcontext";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
import "./styles/auth.css";

function Login() {
  const navigate = useNavigate();
  const { serverUrl, setUser } = useContext(authDataContext);

  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await axios.post(`${serverUrl}/api/auth/login`, {
        email,
        password,
      });

      const profileRes = await axios.get(`${serverUrl}/api/profile`);
      setUser(profileRes.data);

      toast.success("Login successful");
      navigate("/");
    } catch (err) {
      const msg =
        err.response?.data?.message || "Invalid email or password";
      setError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2 className="auth-title">Login</h2>

        <form onSubmit={handleLogin} className="auth-form">
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

          {error && <p className="error-text">{error}</p>}

          <button type="submit" className="auth-btn" disabled={loading}>
            {loading ? <Loader /> : "Login"}
          </button>
        </form>

        <p className="auth-footer">
          Don’t have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
