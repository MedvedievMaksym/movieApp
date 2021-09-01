import axios from "axios";

const moviesStore = {
    namespased: true,
    state: {},
    getters: {},
    mutatuions: {},
    actions: {
        async fetchMuvies(context) {
            console.log(context);
            const response = await axios.get("/", {
                params: {
                    apikey: process.env.VUE_APP_API_KEY,
                    plot: "full",
                    i: "tt0111161",
                },
            });
            console.log(response);
        },
    },
    namespaced: true,
};

export default moviesStore;
