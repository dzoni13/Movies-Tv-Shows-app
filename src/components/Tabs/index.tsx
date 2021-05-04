import React from "react";
import { useLocation } from "react-router-dom";
import queryString from "query-string";

interface Props{
  selectButton: (type: string) => void;
}

const Tabs = (props: Props) => {
  const location = useLocation();
  const params: any = queryString.parse(location?.search);

  return (
    <div className="tabsContainer">
      <ul>
        <li>
          <button className={params.type === 'movie' ? 'tabsBlockContainerTabHover' : 'tabsBlockContainerTab'} onClick={() => props.selectButton('movie')}> Movies </button>
        </li>
        <li>
          <button className={params.type === 'tvShow' ? 'tabsBlockContainerTabHover' : 'tabsBlockContainerTab'} onClick={() => props.selectButton('tvShow')}> TV Shows </button>
        </li>
      </ul>
    </div>
  )
};

export default Tabs;
