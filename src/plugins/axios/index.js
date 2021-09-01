import axios from "axios";

const instance = axios.create({
    baseURL: process.env.VUE_APP_API_URL,
    // params: {
    //     apikey: process.env.VUE_APP_API_KEY,
    //     plot: "full",
    //     i: "tt0111161",
    // },
});

export default instance;
