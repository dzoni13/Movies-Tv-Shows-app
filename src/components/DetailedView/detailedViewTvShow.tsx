import React, { useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
import queryString from "query-string";
import { connect } from "react-redux";
import { useDispatch } from "react-redux";
import Iframe from "react-iframe";
import coreConfig from "../../config";
import { loadTvShowDetails, loadTvShowVideos, loadSimilarMovieVideos } from "../../actions/tvShowAction";
import { TvShow } from "../../models/TvShow";
import { SimilarTvShows } from "../../models/SimilarTvShows";
import noImage from "../List/image/noImage.png";
import noDataImage from "../List/image/noDataImage.png";
import "./detailedView.css";

interface Props{
  tvShow: TvShow;
  similarTvShows: Array<SimilarTvShows>;
  videos: Array<any>;
}

const DetailedViewTvShow = (props: Props) => {
    const location = useLocation();
    const params: any = queryString.parse(location.search)
    const history = useHistory();
    const dispatch = useDispatch();
    const linkImg = coreConfig.LINK_IMAGE;
    const linkVideo = coreConfig.LINK_VIDEO;

    useEffect(() => {
        dispatch(loadTvShowDetails(params?.id));
        dispatch(loadTvShowVideos(params?.id));
        dispatch(loadSimilarMovieVideos(params?.id));
    }, [dispatch, params.id]);

    function loadSimilarItem(item: any) {
      dispatch(loadTvShowDetails(item?.id));
      dispatch(loadTvShowVideos(item?.id));
    }

    function renderItems() {
        const link = coreConfig.LINK_IMAGE;
        return props?.similarTvShows?.map((item: any, i: any) => {
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
                              {props?.tvShow?.poster_path === null && props?.tvShow?.backdrop_path === null ? (
                                  <img className="noImageDeteilStyle" alt={props?.tvShow?.name} />
                              ) : (
                                    <>
                                        {props?.tvShow?.poster_path === null ? (
                                            <img src={linkImg + props?.tvShow?.backdrop_path} alt={props?.tvShow?.name} />
                                        ) : (
                                                <img src={linkImg + props?.tvShow?.poster_path} alt={props?.tvShow?.name}  />
                                            )}
                                    </>
                                )}
                           </>
                        )}
                </div>
                <div className="imgAndAbout">
                      <div className="aboutWrapper">
                            <h1> {props?.tvShow?.name} </h1>
                            <h3> {props?.tvShow?.overview} </h3>
                      </div>
                      <div className="imgCardContainer">
                            <div>
                                <h2>Genre:<p> {props?.tvShow?.genres[0]?.name} </p></h2>
                                <h2>Raiting:<p> {props?.tvShow?.vote_average} </p></h2>
                            </div>
                            <div>
                                <h2>Relese Date:<p> {props?.tvShow?.first_air_date}</p> </h2>
                                <h2>Vote Count:<p> {props?.tvShow?.vote_count}</p></h2>
                                <a target="_blank" href={props?.tvShow?.homepage} rel="noreferrer">Web Site</a>
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
    tvShow: state.tvShowReducer.tvShow,
    similarTvShows: state.tvShowReducer.similarTvShows,
    videos: state.tvShowReducer.videos
});

export default connect(mapStateToProps)(DetailedViewTvShow);
