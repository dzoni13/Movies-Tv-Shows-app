import { combineReducers } from "redux";
import movieReducer from "./movieReducer";
import tvShowReducer from "./tvShowReducer";

export default combineReducers({
    movieReducer,
    tvShowReducer
});
