import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { WalletProvider } from "./context/WalletContext";
import Layout from "./components/Layout";
import Login from "./components/Login";
import CheckBalance from "./components/CheckBalance";
import SendTransaction from "./components/SendTransaction";
import TransactionHistory from "./components/TransactionHistory";

function App() {
  return (
    <WalletProvider>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/check-balance" element={<CheckBalance />} />
            <Route path="/send-transaction" element={<SendTransaction />} />
            <Route
              path="/transaction-history"
              element={<TransactionHistory />}
            />
          </Routes>
        </Layout>
      </BrowserRouter>
    </WalletProvider>
  );
}

export default App;
