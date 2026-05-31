import axios from "axios";

const api = axios.create({

    baseURL: "https://audiotospeech.onrender.com"
});

export default api;