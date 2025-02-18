
import axios from "axios";

//client

const client = axios.create({
//  baseURL: "http://localhost:8000",
 baseURL: "https://e-comm-backend-taupe.vercel.app",
});

export default client;
