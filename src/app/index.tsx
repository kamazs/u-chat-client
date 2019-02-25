/**
 *
 * U-Chat application
 * ENTRY POINT
 *
 * Initializes store and webscoket connection
 * and ounts main react node
 *
 */

import * as React from "react";
import * as ReactDOM from "react-dom";
import { App } from "./App";
import { createStore, applyMiddleware, Store } from "redux";
import { reducer, State } from "./state/state";
import { Provider } from "react-redux";

import { messenger } from "./state/messanger";

// setup store

const store = createStore(
    reducer,
    applyMiddleware(messenger()),
);

// entry point

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById("root"),
);

// hot reload

if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {

    interface DevNodeModule extends NodeModule {
        hot?: { accept: () => void };
    }

    if ((module as DevNodeModule).hot) {
        (module as DevNodeModule).hot.accept();
    }

    type DevWindow = Window & { store: Store<State>; };
    (window as DevWindow).store = store;
}
