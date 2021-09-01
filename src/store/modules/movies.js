import axios from "@/plugins/axios";
import IDs from "../mock/imdb_top250";
import mutations from "@/store/mutations";

function serializeResponse(movies) {
    return movies.reduce((acc, movie) => {
        acc[movie.imdbID] = movie;

        return acc;
    }, {});
}

const { MOVIES } = mutations;

const moviesStore = {
    namespased: true,
    state: {
        top250IDs: IDs,
        muviesPerPage: 12,
        currentPage: 1,
        movies: {},
    },
    getters: {
        slicedIDs:
            ({ top250IDs }) =>
            (from, to) =>
                top250IDs.slice(from, to),

        currentPage: ({ currentPage }) => currentPage,
        muviesPerPage: ({ muviesPerPage }) => muviesPerPage,
    },
    mutations: {
        [MOVIES](state, value) {
            state.movies = value;
        },
    },
    actions: {
        async fetchMuvies({ getters, commit }) {
            try {
                //деструктурируем геттеры
                const { currentPage, muviesPerPage, slicedIDs } = getters;

                //пагинация страницы
                const from = currentPage * muviesPerPage - muviesPerPage;
                const to = currentPage * muviesPerPage;

                //получаем массив из 12 id
                const muviesToFetch = slicedIDs(from, to);

                //получаем promise каждого фильма
                const requests = muviesToFetch.map((id) =>
                    axios.get(`/?i=${id}`)
                );

                const response = await Promise.all(requests);

                const movies = serializeResponse(response);

                commit(MOVIES, movies);
            } catch (err) {
                console.log(err);
            }
        },
    },
    namespaced: true,
};

export default moviesStore;
