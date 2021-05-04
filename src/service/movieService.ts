import axios from "axios";
import coreConfig from "../config"

const MovieService = {
    getTopRatedMovies() {
        return axios.get(
            `${coreConfig.API_URL}/movie/top_rated/?api_key=${coreConfig.API_KEY}&language=en-US`, {
              headers: { "Content-Type": "application/json" }
            }
        ).then((response) => response);
    },

    getTopRatedMoviesById(id: string) {
        return axios.get(
            `${coreConfig.API_URL}/movie/${id}?api_key=${coreConfig.API_KEY}&language=en-US`, {
              headers: { "Content-Type": "application/json" }
            }
        ).then((response) => response);
    },

    getMovieVideosById(id: string) {
        return axios.get(
            `${coreConfig.API_URL}/movie/${id}/videos?api_key=${coreConfig.API_KEY}&language=en-US`, {
              headers: { "Content-Type": "application/json" },
            }
        ).then((response) => response);
    },

    getMoviesByTerm(term: string) {
        return axios.get(
            `${coreConfig.API_URL}/search/movie/?api_key=${coreConfig.API_KEY}&language=en-US`, {
              headers: { "Content-Type": "application/json" },
              params: { query: term }
          }
        ).then((response) => response);
    },

    getSimilarMovieById(id: string) {
        return axios.get(
            `${coreConfig.API_URL}/movie/${id}/similar?api_key=${coreConfig.API_KEY}&language=en-US`, {
              headers: { "Content-Type": "application/json" },
            }
        ).then((response) => response);
    },
};
export default MovieService;
