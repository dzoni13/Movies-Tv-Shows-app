import React, { useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
import queryString from "query-string";
import { connect, useDispatch } from "react-redux";
import Iframe from "react-iframe";
import coreConfig from "../../config";
import { loadMovieDetails, loadMovieVideos, loadSimilarMovieVideos } from "../../actions/movieAction";
import { Movie } from "../../models/Movie";
import { SimilarMovies } from "../../models/SimilarMovies";
import noImage from "../List/image/noImage.png";
import noDataImage from "../List/image/noDataImage.png";
import "./detailedView.css";

interface Props{
  movie: Movie;
  similarMovies: Array<SimilarMovies>;
  videos: Array<any>;
}

const DetailedViewMovie = (props: Props) => {
    const location = useLocation();
    const params: any = queryString.parse(location?.search);
    const dispatch = useDispatch();
    const history = useHistory();
    const linkImg = coreConfig.LINK_IMAGE;
    const linkVideo = coreConfig.LINK_VIDEO;
    const linkImdb = coreConfig.LINK_IMDB;

    useEffect(() => {
      if (params.id){
        dispatch(loadMovieDetails(params?.id));
        dispatch(loadMovieVideos(params?.id));
        dispatch(loadSimilarMovieVideos(params?.id));
      }
    }, [dispatch, params.id]);

    function loadSimilarItem(item: any) {
      dispatch(loadMovieDetails(item?.id));
      dispatch(loadMovieVideos(item?.id));
    }

    function renderItems() {
        const link = coreConfig.LINK_IMAGE;
        return props?.similarMovies?.map((item: any, i: any) => {
            return (
                <div key={i} className="elementContainer" onClick={() => loadSimilarItem(item)}>
                    <div className="imgContainer">
                        {item.poster_path === null && item.backdrop_path === null ? (
                            <img src={noImage} className="noImageStyle" alt={item.title || item.name} />
                        ) : (
                            <>
                              {item.poster_path === null ? (
                                <img src={link + item?.backdrop_path} alt={item.title || item.name}/>
                              ) : (
                                  <img src={link + item?.poster_path} alt={item.title || item.name} />
                              )}
                            </>
                        )}
                    </div>
                    <div className="raiting"><p> {item.vote_average} </p></div>
                </div>
            )
        })
    }

    return (
        <div className="detailContainer">
            <div className="detailCardContainer">
            <div className="backButton" onClick={() => history.goBack()}><i></i><p>Back</p></div>
                <div className="iframeContainer">
                    {props?.videos?.length ? (
                      <Iframe url={linkVideo + props.videos[0].key}
                           width="550px"
                           height="400px"
                           id="myId"
                           className="iframeStyle"
                           // display="initial"
                           // type="video"
                           position="relative" />
                         ) : (
                            <>
                                {!props?.movie?.poster_path && !props?.movie?.backdrop_path ? (
                                    <img className="noImageDeteilStyle" alt={props?.movie?.title} />
                                ) :
                                    (
                                        <>
                                            {!props?.movie?.poster_path ? (
                                                <img src={linkImg + props?.movie?.backdrop_path} alt={props?.movie?.title} />
                                            ) : (
                                                    <img src={linkImg + props?.movie?.poster_path} alt={props?.movie?.title}  />
                                                )}
                                        </>
                                    )}
                            </>
                          )}
                </div>
                    <div className="imgAndAbout">
                        <div className="aboutWrapper">
                            <h1> {props?.movie?.title} </h1>
                            <h3> {props?.movie?.overview} </h3>
                        </div>
                        <div className="imgCardContainer">
                              <div>
                                <h2>Raiting: <p>{props?.movie?.vote_average}</p> </h2>
                                <h2>Genre:<p> {props?.movie?.genres[0]?.name} </p></h2>
                                <h2>Duration: <p>{props?.movie?.runtime} min</p> </h2>
                              </div>
                              <div>
                              <h2>Relese Date:<p> {props?.movie?.release_date}</p> </h2>
                              <h2>Vote Count:<p> {props?.movie?.vote_count}</p></h2>
                              <a target="_blank" href={linkImdb + props?.movie?.imdb_id} rel="noreferrer">IMDb</a>
                        </div>
                    </div>
                </div>
            </div>
            <h1>Similar Movies</h1>
              <div className="similarRenderContainer">
                <div className="similarWrapper">
                  {renderItems()}
                </div>
              </div>
        </div>
    )
};

const mapStateToProps = (state: any) => ({
    movie: state.movieReducer.movie,
    similarMovies: state.movieReducer.similarMovies,
    videos: state.movieReducer.videos
});

export default connect(mapStateToProps)(DetailedViewMovie);
