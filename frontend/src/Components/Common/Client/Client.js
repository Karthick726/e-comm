
import axios from "axios";

//client

const client = axios.create({
// baseURL: "http://localhost:8000",
 baseURL: "https://e-comm-backend-livid.vercel.app",
});

export default client;
