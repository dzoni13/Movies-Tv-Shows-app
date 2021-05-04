import React from "react";
import { useHistory } from "react-router-dom";
import queryString from "query-string";
import coreConfig from "../../config";
import { Movie } from "../../models/Movie";
import { TvShow } from "../../models/TvShow";
import noImage from "./image/noImage.png";
import noDataImage from "./image/noDataImage.png";
import "./index.css";

interface Props {
  selectedButton: string;
  data: Array<Movie | TvShow>;
}

const List = (props: Props) => {
    const history = useHistory();

    function getDetails(id: string) {
        if (props.selectedButton === "movie") {
            history.push({ pathname: 'movie-details', search: queryString.stringify({ id: id.toString() }) })
        } else {
            history.push({ pathname: 'tvshow-details', search: queryString.stringify({ id: id.toString() }) })
        }
    }

    function renderItems() {
        if(props?.data?.length === 0){
          return(
            <div className="noDataPage">
              <div className="messageWrapper">
              <img src={noDataImage} alt="No Data"  className="noDataImage"/>
              <h2>No results found</h2>
              <p>Try adjusting your search or tag to find what you are looking for.</p>
              </div>
            </div>
          )
        } else {
          const link = coreConfig.LINK_IMAGE;
          return props?.data?.map((item: any, i: any) => {
              return (
                  <div key={i} className="elementContainer" onClick={() => getDetails(item.id)}>
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
                      <h3> {item.title || item.name} </h3>
                      <h2> {item.release_date || item.first_air_date} </h2>
                      <div className="raiting"><p> {item.vote_average} </p></div>
                  </div>
              )
          })
        }
    }

    return (
        <>
          {renderItems()}
        </>
    )
};

export default List;
