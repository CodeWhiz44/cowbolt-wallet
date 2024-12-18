import React, { useState } from "react";
import { TextField, Button, Snackbar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useWallet } from "../context/WalletContext";
import { loginOrCreateWallet } from "../api";

const Login = () => {
  const [username, setUsername] = useState("");
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const { setWallet } = useWallet();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const { data } = await loginOrCreateWallet(username);
      setWallet(data);
      navigate("/dashboard");
      setMessage("Wallet logged in successfully!");
      setOpen(true);
    } catch (err) {
      setMessage("Failed to log in or create wallet.");
      setOpen(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <TextField
        label="Username"
        variant="outlined"
        fullWidth
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        margin="normal"
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleLogin}
        fullWidth
      >
        Login / Create Wallet
      </Button>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message={message}
      />
    </>
  );
};

export default Login;
