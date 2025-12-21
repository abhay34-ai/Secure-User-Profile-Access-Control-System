import { useState, useContext } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { authDataContext } from "../context/AuthContext";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
import "./styles/Transfer.css";

function Transfer() {
  const [receiverId, setReceiverId] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);

  const { serverUrl, setUser } = useContext(authDataContext);

  const transfer = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(
        `${serverUrl}/api/transactions/transfer`,
        { receiverId, amount },
        { withCredentials: true }
      );

      toast.success(res.data.message || "Transfer successful");

      // Refresh profile for real-time balance update
      const profileRes = await axios.get(
        `${serverUrl}/api/profile`,
        { withCredentials: true }
      );

      setUser(profileRes.data);
      setReceiverId("");
      setAmount("");
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Transfer failed"
      );
      setReceiverId("");
      setAmount("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <div className="transfer-page">
        <div className="transfer-card">
          <h2 className="transfer-title">Transfer Funds</h2>

          <form onSubmit={transfer} className="transfer-form">
            <div className="form-group">
              <label>Receiver ID</label>
              <input
                type="text"
                value={receiverId}
                onChange={(e) => setReceiverId(e.target.value)}
                required
                disabled={loading}
              />
            </div>

            <div className="form-group">
              <label>Amount</label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
                disabled={loading}
              />
            </div>

            <button
              type="submit"
              className="transfer-btn"
              disabled={loading}
            >
              {loading ? <Loader /> : "Send Money"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Transfer;
