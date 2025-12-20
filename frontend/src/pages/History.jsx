import { useEffect, useState, useContext } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { authDataContext } from "../context/AuthContext";

function History() {
  const [transactions, setTransactions] = useState([]);
  const [balance, setBalance] = useState(0);

  const { serverUrl } = useContext(authDataContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 1️⃣ Fetch profile (for balance)
        const profileRes = await axios.get(
          `${serverUrl}/api/profile`,
          { withCredentials: true }
        );
        setBalance(profileRes.data.balance);

        // 2️⃣ Fetch transaction history
        const historyRes = await axios.get(
          `${serverUrl}/api/transactions/history`,
          { withCredentials: true }
        );
        setTransactions(historyRes.data);
      } catch (error) {
        console.error("Failed to fetch data");
      }
    };

    fetchData();
  }, [serverUrl]);

  return (
    <>
      <Navbar />

      <h2>Transaction History</h2>

      {/* ✅ Remaining Balance */}
      <h3>Remaining Balance: ₹{balance}</h3>

      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>Sender</th>
            <th>Receiver</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Date</th>
          </tr>
        </thead>

        <tbody>
          {transactions.map((tx) => (
            <tr key={tx._id}>
              <td>{tx.sender?.name}</td>
              <td>{tx.receiver?.name}</td>
              <td>{tx.amount}</td>
              <td>{tx.status}</td>
              <td>{new Date(tx.createdAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default History;
