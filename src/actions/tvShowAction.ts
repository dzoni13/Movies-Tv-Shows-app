import { Dispatch } from "redux";
import TvShowService from "../service/tvShowService";
import tvShowActionTypes from "../constants/tvShowActionTypes";

export const handleLoadTvShowsByTermInProgress = (inProgress: boolean) => {
  return {
        type: tvShowActionTypes.TV_SHOWS_BY_TERM_IN_PROGRESS,
        payload: inProgress
    }
}

export const loadTopRatedTvShows = () => {
    return async (dispatch: Dispatch) => {
        try {
            dispatch(handleLoadTvShowsByTermInProgress(true));
            TvShowService.getTopRatedTvShows().then((res) => {
                dispatch(handleLoadTvShowsByTermInProgress(false));
                dispatch({
                    type: tvShowActionTypes.TOP_RATED_TV_SHOWS_LOADED,
                    payload: res?.data?.results,
                });
            });
        } catch (err) {
            console.log("ERROR:", err);
            dispatch({
                type: tvShowActionTypes.TOP_RATED_TV_SHOWS_LOADING_FAIL,
            });
        }
    };
};


export const loadTvShowsByTerm = (term: string) => {
    return async (dispatch: Dispatch) => {
        try {
          dispatch(handleLoadTvShowsByTermInProgress(true));
            TvShowService.getTvShowsByTerm(term).then((res) => {
                dispatch({
                    type: tvShowActionTypes.TV_SHOWS_BY_TERM_LOADED,
                    payload: res?.data?.results
                });
                dispatch(handleLoadTvShowsByTermInProgress(false));
            });
        } catch (err) {
            console.log("ERROR:", err);
            dispatch({
                type: tvShowActionTypes.TV_SHOWS_BY_TERM_LOADING_FAIL,
            });
        }
    };
};


export const loadTvShowDetails = (id: string) => {
    return async (dispatch: Dispatch) => {
        try {
            TvShowService.getTopRatedTvShowById(id).then((res) => {
                dispatch({
                    type: tvShowActionTypes.TV_SHOW_DETAILS_LOADED,
                    payload: res?.data
                });
            });
        } catch (err) {
            console.log("ERROR:", err);
            dispatch({
                type: tvShowActionTypes.TV_SHOW_DETAILS_LOADING_FAIL,
            });
        }
    };
};


export const loadTvShowVideos = (id: string) => {
    return async (dispatch: Dispatch) => {
        try {
            TvShowService.getTvShowVideosById(id).then((res) => {
                dispatch({
                    type: tvShowActionTypes.TV_SHOW_VIDEOS_LOADED,
                    payload: res?.data?.results,
                });
            });
        } catch (err) {
            console.log("ERROR:", err);
            dispatch({
                type: tvShowActionTypes.TV_SHOW_VIDEOS_LOADING_FAIL,
            });
        }
    };
};

export const loadSimilarMovieVideos = (id: any) => {
    return async (dispatch: Dispatch) => {
        try {
            TvShowService.getSimilarTvShowById(id).then((res) => {
                dispatch({
                    type: tvShowActionTypes.SIMILAR_TV_SHOWS_LOADED,
                    payload: res?.data?.results,
                });
            });
        } catch (err) {
            console.log("ERROR:", err);
            dispatch({
                type: tvShowActionTypes.SIMILAR_TV_SHOWS_LOADING_FAIL,
            });
        }
    };
};
