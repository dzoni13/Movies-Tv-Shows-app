import { Dispatch } from "redux";
import MovieService from "../service/movieService";
import movieActionTypes from '../constants/movieActionTypes';

export const handleLoadMoviesByTermInProgress = (inProgress: boolean) => {
  return {
        type: movieActionTypes.MOVIES_BY_TERM_IN_PROGRESS,
        payload: inProgress
    }
}

export const loadTopRatedMovies = () => {
    return async (dispatch: Dispatch) => {
        try {
          dispatch(handleLoadMoviesByTermInProgress(true))
            MovieService.getTopRatedMovies().then((res) => {
                dispatch(handleLoadMoviesByTermInProgress(false));
                dispatch({
                    type: movieActionTypes.TOP_RATED_MOVIES_LOADED,
                    payload: res?.data?.results,
                });
            });
        } catch (err) {
            console.log("ERROR:", err);
            dispatch({
                type: movieActionTypes.TOP_RATED_MOVIES_LOADING_FAIL,
            });
        }
    };
};


export const loadMoviesByTerm = (term: string) => {
    return async (dispatch: Dispatch) => {
        try {
          dispatch(handleLoadMoviesByTermInProgress(true))
            MovieService.getMoviesByTerm(term).then((res) => {
              dispatch(handleLoadMoviesByTermInProgress(false));
                dispatch({
                    type: movieActionTypes.MOVIES_BY_TERM_LOADED,
                    payload: res?.data?.results
                });

            });
        } catch (err) {
            console.log("ERROR:", err);
            dispatch({
                type: movieActionTypes.MOVIES_BY_TERM_LOADING_FAIL,
            });
        }
    };
};

export const loadMovieDetails = (id: any) => {
    return async (dispatch: Dispatch) => {
        try {
            MovieService.getTopRatedMoviesById(id).then((res) => {
                dispatch({
                    type: movieActionTypes.MOVIE_DETAILS_LOADED,
                    payload: res?.data
                });
            });
        } catch (err) {
            console.log("ERROR:", err);
            dispatch({
                type: movieActionTypes.MOVIE_DETAILS_LOADING_FAIL,
            });
        }
    };
};

export const loadMovieVideos = (id: any) => {
    return async (dispatch: Dispatch) => {
        try {
            MovieService.getMovieVideosById(id).then((res) => {
                dispatch({
                    type: movieActionTypes.MOVIE_VIDEOS_LOADED,
                    payload: res?.data,
                });
            });
        } catch (err) {
            console.log("ERROR:", err);
            dispatch({
                type: movieActionTypes.MOVIE_VIDEOS_LOADING_FAIL,
            });
        }
    };
};

export const loadSimilarMovieVideos = (id: any) => {
    return async (dispatch: Dispatch) => {
        try {
            MovieService.getSimilarMovieById(id).then((res) => {
                dispatch({
                    type: movieActionTypes.SIMILAR_MOVIE_LOADED,
                    payload: res?.data?.results,
                });
            });
        } catch (err) {
            console.log("ERROR:", err);
            dispatch({
                type: movieActionTypes.SIMILAR_MOVIE_LOADING_FAIL,
            });
        }
    };
};
