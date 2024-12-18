import React, { useState } from "react";
import { TextField, Button, Stack, Snackbar } from "@mui/material";
import { sendTransaction } from "../api";
import { useWallet } from "../context/WalletContext";

const SendTransaction = ({ addMessage }) => {
  const { wallet } = useWallet();
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [transaction, setTransaction] = useState(null);
  const [message, setMessage] = useState("");

  const handleSend = async () => {
    try {
      const { data } = await sendTransaction({
        senderPrivateKey: wallet.privateKey,
        recipientAddress: recipient,
        amount,
      });
      setMessage("Transaction successful!");
      setTransaction(data);
    } catch (err) {
      setMessage(
        "Transaction failed. Insufficient balance or invalid address."
      );
      setTransaction(null);
    }
  };

  return (
    <Stack spacing={2}>
      <TextField
        label="Recipient Address"
        value={recipient}
        onChange={(e) => setRecipient(e.target.value)}
      />
      <TextField
        label="Amount (ETH)"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <Button variant="contained" color="primary" onClick={handleSend}>
        Send Transaction
      </Button>
      {transaction && (
        <div>
          <h3>Transaction Details:</h3>
          <p>Hash: {transaction.hash}</p>
          <p>From: {transaction.from}</p>
          <p>To: {transaction.to}</p>
          <p>Amount: {transaction.value} ETH</p>
        </div>
      )}
      <Snackbar
        open={!!message}
        autoHideDuration={6000}
        onClose={() => setMessage("")}
        message={message}
      />
    </Stack>
  );
};

export default SendTransaction;
