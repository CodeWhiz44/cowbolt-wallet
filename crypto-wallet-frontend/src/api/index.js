import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const loginOrCreateWallet = (username) =>
  axios.post(`${API_BASE_URL}/wallet`, { username });
export const getBalance = (address) =>
  axios.get(`${API_BASE_URL}/wallet/${address}/balance`);
export const sendTransaction = (data) =>
  axios.post(`${API_BASE_URL}/wallet/transaction`, data);
export const getTransactionHistory = (address) =>
  axios.get(`${API_BASE_URL}/wallet/${address}/transactions`);
