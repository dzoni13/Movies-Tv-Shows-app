import axios from "axios";
import coreConfig from "../config"

const TvShowService = {
    getTopRatedTvShows() {

        return axios.get(
            `${coreConfig.API_URL}/tv/top_rated?api_key=${coreConfig.API_KEY}&language=en-US`, {
              headers: { "Content-Type": "application/json" }
            }
        ).then((response) => response);
    },

    getTopRatedTvShowById(id: string) {
        return axios.get(
            `${coreConfig.API_URL}/tv/${id}?api_key=${coreConfig.API_KEY}&language=en-US`, {
              headers: { "Content-Type": "application/json" }
          }
        ).then((response) => response);
    },

    getTvShowVideosById(id: string) {
        return axios.get(
            `${coreConfig.API_URL}/tv/${id}/videos?api_key=${coreConfig.API_KEY}&language=en-US`, {
              headers: { "Content-Type": "application/json" }
          }
        ).then((response) => response);
    },

    getTvShowsByTerm(term: string) {
        return axios.get(
            `${coreConfig.API_URL}/search/tv?api_key=${coreConfig.API_KEY}&language=en-US`, {
              headers: { "Content-Type": "application/json" },
              params: { query: term }
           }
        ).then((response) => response);
    },
    
    getSimilarTvShowById(id: string) {
        return axios.get(
            `${coreConfig.API_URL}/tv/${id}/similar?api_key=${coreConfig.API_KEY}&language=en-US`, {
              headers: { "Content-Type": "application/json" },
            }
        ).then((response) => response);
    },

};
export default TvShowService;
