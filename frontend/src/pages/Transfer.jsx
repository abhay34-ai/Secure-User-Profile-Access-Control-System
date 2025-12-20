import { useState, useContext } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { authDataContext } from "../context/AuthContext";

function Transfer() {
  const [receiverId, setReceiverId] = useState("");
  const [amount, setAmount] = useState("");
  const [msg, setMsg] = useState("");

  const { serverUrl, setUser } = useContext(authDataContext);

  const transfer = async (e) => {
    e.preventDefault();
    setMsg("");

    try {
      // 1️⃣ Perform transfer
      const res = await axios.post(
        `${serverUrl}/api/transactions/transfer`,
        { receiverId, amount },
        { withCredentials: true }
      );

      setMsg(res.data.message);

      // 2️⃣ 🔥 REFRESH PROFILE (real-time update)
      const profileRes = await axios.get(
        `${serverUrl}/api/profile`,
        { withCredentials: true }
      );

      // 3️⃣ Update global user state
      setUser(profileRes.data);

      setReceiverId("");
      setAmount("");
    } catch (err) {
      setMsg(err.response?.data?.message || "Transfer failed");
    }
  };

  return (
    <>
      <Navbar />
      <h3>Transfer</h3>

      <form onSubmit={transfer}>
        <input
          placeholder="Receiver ID"
          value={receiverId}
          onChange={(e) => setReceiverId(e.target.value)}
        />

        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <button>Send</button>
      </form>

      <p>{msg}</p>
    </>
  );
}

export default Transfer;
