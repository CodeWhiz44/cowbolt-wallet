import React, { useState } from "react";
import { Button, Typography } from "@mui/material";
import { getBalance } from "../api";
import { useWallet } from "../context/WalletContext";

const CheckBalance = () => {
  const [balance, setBalance] = useState("");
  const { wallet } = useWallet();

  const fetchBalance = async () => {
    if (wallet) {
      const { data } = await getBalance(wallet.address);
      setBalance(data);
    }
  };

  return (
    <div>
      <Button variant="contained" color="success" onClick={fetchBalance}>
        Check Balance
      </Button>
      {balance && <Typography mt={2}>Balance: {balance} ETH</Typography>}
    </div>
  );
};

export default CheckBalance;
