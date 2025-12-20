import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const authDataContext = createContext();

function Authcontext({ children }) {
  const serverUrl = "http://localhost:5000";

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(
          `${serverUrl}/api/profile`,
          { withCredentials: true }
        );
        setUser(res.data);
        console.log(res.data)
        
      } catch (err) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [serverUrl]);

  
  const value = {
    serverUrl,
    user,
    setUser,
    loading
  };

  return (
    <authDataContext.Provider value={value}>
      {children}
    </authDataContext.Provider>
  );
}

export default Authcontext;
