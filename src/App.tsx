import React, { Fragment } from "react";
import { Provider } from "react-redux";
import Routes from "./Routes";

import store from "./store";

function App() {
    return (
        <Provider store={store}>
            <Fragment>
                <Routes />
            </Fragment>
        </Provider>
    );
}

export default App;
