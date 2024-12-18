import React, { useState } from "react";
import {
  Button,
  List,
  ListItem,
  Typography,
  CircularProgress,
} from "@mui/material";
import { getTransactionHistory } from "../api";
import { useWallet } from "../context/WalletContext";

const TransactionHistory = () => {
  const { wallet } = useWallet();
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchHistory = async () => {
    setLoading(true);
    setError("");
    try {
      const { data } = await getTransactionHistory(wallet.address);
      setTransactions(data);
      if (data.length === 0) {
        setError("No transactions found.");
      }
    } catch (err) {
      setError("Failed to fetch transaction history.");
    }
    setLoading(false);
  };

  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        onClick={fetchHistory}
        disabled={loading}
      >
        {loading ? <CircularProgress size={24} /> : "Load Transaction History"}
      </Button>
      {error && (
        <Typography color="error" mt={2}>
          {error}
        </Typography>
      )}
      <List sx={{ marginTop: 2 }}>
        {transactions.map((tx, index) => (
          <ListItem key={index} sx={{ borderBottom: "1px solid #eee" }}>
            <Typography variant="body1">
              <strong>From:</strong> {tx.from} <strong>To:</strong> {tx.to}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {tx.value} ETH | {new Date(tx.timestamp).toLocaleString()}
            </Typography>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default TransactionHistory;
