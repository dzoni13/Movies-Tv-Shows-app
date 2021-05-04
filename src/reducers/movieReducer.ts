import movieActionTypes from "../constants/movieActionTypes";
import { Action } from "../models/Action";

const initialState = {
    isFailed: false,
    inProgress: true,
    movie: null,
    movies: null,
    similarMovies: null,
    videos: null,
};

export default function movieReducer(state = initialState, action: Action<any>) {
    const { type, payload } = action;
    switch (type) {
        case movieActionTypes.TOP_RATED_MOVIES_LOADED:
            return {
                ...state,
                isFailed: false,
                movies: payload.slice(0, 10)
            };
        case movieActionTypes.TOP_RATED_MOVIES_LOADING_FAIL:
            return {
                ...state,
                isFailed: true,
            };
        case movieActionTypes.MOVIE_DETAILS_LOADED:
            return {
                ...state,
                isFailed: false,
                movie: payload,
            };
        case movieActionTypes.MOVIE_DETAILS_LOADING_FAIL:
            return {
                ...state,
                isFailed: true,
            };
        case movieActionTypes.MOVIE_VIDEOS_LOADED:
            return {
                ...state,
                isFailed: false,
                videos: payload.results,
            };
        case movieActionTypes.MOVIE_VIDEOS_LOADING_FAIL:
            return {
                ...state,
                isFailed: true,
            };
        case movieActionTypes.MOVIES_BY_TERM_LOADED:
            return {
                ...state,
                isFailed: false,
                movies: payload,
            };
        case movieActionTypes.MOVIES_BY_TERM_LOADING_FAIL:
            return {
                ...state,
                isFailed: true,
            };
        case movieActionTypes.MOVIES_BY_TERM_IN_PROGRESS:
          return {
              ...state,
              inProgress: payload,
          };
        case movieActionTypes.SIMILAR_MOVIE_LOADED:

            return {
                ...state,
                isFailed: false,
                similarMovies: payload.slice(0, 20)
            };
        case movieActionTypes.SIMILAR_MOVIE_LOADING_FAIL:
          return {
              ...state,
              isFailed: true,
          };
        default:
            return state;

    }
}
