import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { authDataContext } from "../context/AuthContext";

function Register() {
  const navigate = useNavigate();
  const { serverUrl } = useContext(authDataContext);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [aadhaar, setAadhaar] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const result=await axios.post(
        `${serverUrl}/api/auth/register`,
        { name, email, password, aadhaar },
        { withCredentials: true }
      );
      

      console.log(result.data)

      navigate("/login"); 
    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };

  return (
    <div className="page">
      <div className="card">
        <h2>Register</h2>

        <form onSubmit={handleSignup}>
          <label>Name  </label>
          <input
            type="text"
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
          />

          <br /><br />

          <label>Email  </label>
          <input
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />

          <br /><br />

          <label>Password  </label>
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <br /><br />

          <label>Aadhaar Number  </label>
          <input
            type="text"
            placeholder="Enter Aadhaar Number"
            maxLength="12"
            onChange={(e) => setAadhaar(e.target.value)}
          />
   <br /> <br />
          <button type="submit">Register</button>
          
        </form>

        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;




















