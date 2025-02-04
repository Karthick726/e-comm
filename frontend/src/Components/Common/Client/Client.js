
import axios from "axios";

//client

const client = axios.create({
  baseURL: "http://localhost:8000",
 // baseURL: "https://united-pgas-backend.vercel.app",
});

export default client;
