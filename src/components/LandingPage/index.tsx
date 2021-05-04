import React, { useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import { useLocation, useHistory } from "react-router-dom";
import queryString from "query-string";
import { loadTopRatedMovies } from "../../actions/movieAction";
import { loadTopRatedTvShows } from "../../actions/tvShowAction";
import Tabs from "../Tabs/index";
import List from "../List/index";
import Search from "../Search/index";
import { Movie } from "../../models/Movie";
import { TvShow } from "../../models/TvShow";
import "./index.css";

interface Props{
  movies: Array<Movie>;
  tvShows: Array<TvShow>;
}

const LandingPage = (props: Props) => {
    const dispatch = useDispatch();
    const location = useLocation();
    const history = useHistory();
    const params = queryString.parse(location.search)
    const selectedButton: any = params.type;

    useEffect(() => {
        if (!params.type) {
            history.push({ pathname: `/`, search: queryString.stringify({ type: 'movie' }) })
        }
        if (params.type === 'movie') {
            dispatch(loadTopRatedMovies());
        } else {
            dispatch(loadTopRatedTvShows());
        }
    }, [dispatch, history, params.type]);

    const selectButton = (type: string) => {
        let newParams: Record<string, unknown> = {};

        if (type) {
            const obj = {};
            obj['type'] = type;

            newParams = { ...params, ...obj };
            history.push({
              pathname: '/',
              search: queryString.stringify(newParams),
            });
        }
    }
    
    return (
        <div className="mainContainer">
          <div className="tabsBlockContainer">
            <Tabs selectButton={selectButton} />
            <p className="line"></p>
          </div>
          <div className="listBlockContainer">
            <Search />
            <div className="listContaier">
              <List data={selectedButton === 'tvShow' ? props?.tvShows : props?.movies} selectedButton={selectedButton} />
            </div>
          </div>
        </div>
    )
};

const mapStateToProps = (state: any) => ({
    tvShows: state.tvShowReducer.tvShows,
    movies: state.movieReducer.movies
});

export default connect(mapStateToProps)(LandingPage);
