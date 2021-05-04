import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import DetailedViewMovie from "./components/DetailedView/detailedViewMovie";
import DetailedViewTvShow from "./components/DetailedView/detailedViewTvShow";
import LandingPage from "./components/LandingPage/index";

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/movie-details">
                    <DetailedViewMovie />
                </Route>
                <Route path="/tvshow-details">
                    <DetailedViewTvShow />
                </Route>
                <Route path="/">
                    <LandingPage />
                </Route>
            </Switch>
        </BrowserRouter>
    );
}
