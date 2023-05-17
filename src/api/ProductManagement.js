import axios from "axios";

const api = axios.create({
    baseURL: "https://645fc9ecfe8d6fb29e263406.mockapi.io"
});

export default api;