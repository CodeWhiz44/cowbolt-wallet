import React from "react";
import { AppBar, Toolbar, Typography, Button, Container } from "@mui/material";
import { useWallet } from "../context/WalletContext";
import { useNavigate } from "react-router-dom";

const Layout = ({ children }) => {
  const { wallet, setWallet } = useWallet();
  const navigate = useNavigate();

  const handleLogout = () => {
    setWallet(null);
    navigate("/");
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Crypto Wallet App
          </Typography>
          {wallet ? (
            <>
              <Button
                color="inherit"
                onClick={() => navigate("/check-balance")}
              >
                Check Balance
              </Button>
              <Button
                color="inherit"
                onClick={() => navigate("/send-transaction")}
              >
                Send Transaction
              </Button>
              <Button
                color="inherit"
                onClick={() => navigate("/transaction-history")}
              >
                Transaction History
              </Button>
              <Button color="inherit" onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            <Button color="inherit" onClick={() => navigate("/")}>
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>
      <Container maxWidth="sm" sx={{ mt: 4 }}>
        {children}
      </Container>
    </>
  );
};

export default Layout;
