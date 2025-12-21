import { useEffect, useState, useContext } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { authDataContext } from "../context/Authcontext";
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
    if (!user) return;

    const fetchData = async () => {
      setLoading(true);
      try {
        const profileRes = await axios.get(`${serverUrl}/api/profile`);
        setBalance(profileRes.data.balance);

        const historyRes = await axios.get(
          `${serverUrl}/api/transactions/history`
        );
        setTransactions(historyRes.data);

      } catch (error) {
        toast.error("Failed to fetch transaction history");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [serverUrl, user]);

  return (
    <>
      <Navbar />

      <div className="history-page">
        {!user && (
          <h3 style={{ textAlign: "center", marginTop: "80px" }}>
            No user found
          </h3>
        )}

        {user && (
          <>
            <h2>Transaction History</h2>
            <h3 className="balance">Remaining Balance: ₹{balance}</h3>

            {loading && (
              <div className="history-loader">
                <Loader />
              </div>
            )}

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
                          <td>
                            <span
                              className={`tx-type ${
                                isIncoming ? "incoming" : "outgoing"
                              }`}
                            >
                              {isIncoming ? <FaArrowDown /> : <FaArrowUp />}
                              {isIncoming ? "Received" : "Sent"}
                            </span>
                          </td>

                          <td>{personName || "—"}</td>

                          <td
                            className={
                              isIncoming ? "amount-plus" : "amount-minus"
                            }
                          >
                            {isIncoming ? "+" : "-"}₹{tx.amount}
                          </td>

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
          </>
        )}
      </div>
    </>
  );
}

export default History;
