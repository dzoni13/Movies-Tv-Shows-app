import tvShowActionTypes from '../constants/tvShowActionTypes';
import { Action } from "../models/Action";

const initialState = {
    isFailed: false,
    tvShow: null,
    tvShows: null,
    videos: null,
    inProgress: false
};

export default function tvShowReducer(state = initialState, action: Action<any>) {
    const { type, payload } = action;
    switch (type) {
        case tvShowActionTypes.TOP_RATED_TV_SHOWS_LOADED:
            return {
                ...state,
                isFailed: false,
                tvShows: payload.slice(0, 10)
            };
        case tvShowActionTypes.TOP_RATED_TV_SHOWS_LOADING_FAIL:
            return {
                ...state,
                isFailed: true,
            };
        case tvShowActionTypes.TV_SHOW_DETAILS_LOADED:
            return {
                ...state,
                isFailed: false,
                tvShow: payload,
            };
        case tvShowActionTypes.TV_SHOW_DETAILS_LOADING_FAIL:
            return {
                ...state,
                isFailed: true,
            };
        case tvShowActionTypes.TV_SHOW_VIDEOS_LOADED:
            return {
                ...state,
                isFailed: false,
                videos: payload.results,
            };
        case tvShowActionTypes.TV_SHOW_VIDEOS_LOADING_FAIL:
            return {
                ...state,
                isFailed: true,
            };
        case tvShowActionTypes.TV_SHOWS_BY_TERM_LOADED:
            return {
                ...state,
                isFailed: false,
                tvShows: payload,
            };
        case tvShowActionTypes.TV_SHOWS_BY_TERM_LOADING_FAIL:
            return {
                ...state,
                isFailed: true,
            };
        case tvShowActionTypes.TV_SHOWS_BY_TERM_IN_PROGRESS:
            return {
                ...state,
                inProgress: payload,
            };
            case tvShowActionTypes.SIMILAR_TV_SHOWS_LOADED:
                return {
                    ...state,
                    isFailed: false,
                    similarTvShows: payload.slice(0, 20)
                };
            case tvShowActionTypes.SIMILAR_TV_SHOWS_LOADING_FAIL:
                return {
                    ...state,
                    isFailed: true,
                };
        default:
            return state;
    }
}
