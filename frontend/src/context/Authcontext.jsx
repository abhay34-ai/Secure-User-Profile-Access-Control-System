import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const authDataContext = createContext();

axios.defaults.withCredentials = true;

function Authcontext({ children }) {
  const serverUrl =
    import.meta.env.MODE === "development"
      ? "http://localhost:5000"
      : "https://secure-user-profile-access-control-system-51xe.onrender.com";

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`${serverUrl}/api/profile`);
        setUser(res.data);
      } catch (err) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const value = {
    serverUrl,
    user,
    setUser,
    loading,
  };

  return (
    <authDataContext.Provider value={value}>
      {children}
    </authDataContext.Provider>
  );
}

export default Authcontext;
