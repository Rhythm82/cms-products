import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "https://cms-products-2.onrender.com",
  headers: { "Content-Type": "application/json" },
  timeout: 10000
});

export default api;
