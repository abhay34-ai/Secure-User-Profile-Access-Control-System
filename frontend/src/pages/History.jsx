import { useEffect, useState, useContext } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { authDataContext } from "../context/AuthContext";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";
import "./styles/History.css";

function History() {
  const [transactions, setTransactions] = useState([]);
  const [balance, setBalance] = useState(0);
  const [loading, setLoading] = useState(false);

  const { serverUrl, user } = useContext(authDataContext);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch balance
        const profileRes = await axios.get(
          `${serverUrl}/api/profile`,
          { withCredentials: true }
        );
        setBalance(profileRes.data.balance);

        // Fetch transactions
        const historyRes = await axios.get(
          `${serverUrl}/api/transactions/history`,
          { withCredentials: true }
        );
        setTransactions(historyRes.data);

        toast.success("Transaction history loaded");
      } catch (error) {
        toast.error("Failed to fetch transaction history");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [serverUrl]);

  return (
    <>
      <Navbar />

      <div className="history-page">
        <h2>Transaction History</h2>
        <h3 className="balance">Remaining Balance: ₹{balance}</h3>

        {/* Loader */}
        {loading && (
          <div className="history-loader">
            <Loader />
          </div>
        )}

        {/* Table */}
        {!loading && (
          <table className="history-table">
            <thead>
              <tr>
                <th>Type</th>
                <th>Person</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>

            <tbody>
              {transactions.length === 0 ? (
                <tr>
                  <td colSpan="5">No transactions found</td>
                </tr>
              ) : (
                transactions.map((tx) => {
                  const isIncoming = tx.receiver?._id === user?._id;
                  const personName = isIncoming
                    ? tx.sender?.name
                    : tx.receiver?.name;

                  return (
                    <tr key={tx._id}>
                      {/* Incoming / Outgoing */}
                      <td>
                        <span
                          className={`tx-type ${
                            isIncoming ? "incoming" : "outgoing"
                          }`}
                        >
                          {isIncoming ? <FaArrowDown /> : <FaArrowUp />}
                          {isIncoming ? "Incoming" : "Outgoing"}
                        </span>
                      </td>

                      {/* Person */}
                      <td>{personName || "—"}</td>

                      {/* Amount */}
                      <td
                        className={
                          isIncoming ? "amount-plus" : "amount-minus"
                        }
                      >
                        {isIncoming ? "+" : "-"}₹{tx.amount}
                      </td>

                      {/* Status */}
                      <td>
                        <span
                          className={`status ${tx.status.toLowerCase()}`}
                        >
                          {tx.status}
                        </span>

                        {tx.status === "FAILED" && tx.reason && (
                          <div className="fail-reason">
                            {tx.reason}
                          </div>
                        )}
                      </td>

                      {/* Date */}
                      <td>
                        {new Date(tx.createdAt).toLocaleString()}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}

export default History;
