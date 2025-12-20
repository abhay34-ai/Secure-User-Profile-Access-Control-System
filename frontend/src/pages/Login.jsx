import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { authDataContext } from "../context/AuthContext";

function Login() {
  const navigate = useNavigate();
  const { serverUrl,setUser } = useContext(authDataContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
  e.preventDefault();

  try {
    await axios.post(
      `${serverUrl}/api/auth/login`,
      { email, password },
      { withCredentials: true }
    );

    const profileRes = await axios.get(
      `${serverUrl}/api/profile`,
      { withCredentials: true }
    );

    setUser(profileRes.data); 
    navigate("/");
  } catch (error) {
    console.log(error.response?.data || error.message);
  }
};


  return (
    <div className="page">
      <div className="card">
        <h2>Login</h2>

        <form onSubmit={handleLogin}>
          <label>Email</label>
          <input
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />

          <br /><br />

          <label>Password</label>
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <br /><br />

          <button type="submit">Login</button>
        </form>

        <p>
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
