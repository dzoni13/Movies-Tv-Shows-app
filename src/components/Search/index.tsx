import React, { useEffect, ChangeEvent } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useHistory } from "react-router-dom";
import queryString from "query-string";
import { loadMoviesByTerm, loadTopRatedMovies } from "../../actions/movieAction";
import { loadTvShowsByTerm, loadTopRatedTvShows } from "../../actions/tvShowAction";
import "./index.css";

const Search = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const history = useHistory();
    const params: any = queryString.parse(location.search)

    const handleParamsChange = (key: string, value: string) => {
      let newParams: Record<string, unknown> = {};
      const obj = {};
      obj[key] = value;
      newParams = { ...params, ...obj };

      history.push({
        pathname: '/',
        search: queryString.stringify(newParams),
      });
    };

    useEffect(() => {
        const timeoutid = setTimeout(() => {
            if (params?.search?.length >= 3) {
                if (params?.type === 'tvShow') {
                    dispatch(loadTvShowsByTerm(params.search));
                } else {
                    dispatch(loadMoviesByTerm(params.search));
                }
            } else {
                if (params?.type === 'tvShow') {
                    dispatch(loadTopRatedTvShows());
                } else {
                    dispatch(loadTopRatedMovies());
                }
            }
        }, 1000);

        return () => {
            clearTimeout(timeoutid)
        };

    }, [dispatch, params.search, params.type])

    function onChange(event: ChangeEvent<any>) {
        handleParamsChange('search', event.target.value)
    }

    return (
        <div className="searchFieldStyle">
          <input
            type="text"
            name="search"
            value={params.search}
            onChange={(e) => onChange(e)}
          />
          <button className="searchButton"></button>
       </div>
    )
};

export default Search;
