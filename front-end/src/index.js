import React from "react";
import ReactDOM from "react-dom";

import { createStore, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import { routerMiddleware } from "react-router-redux";
import createHistory from "history/createBrowserHistory";

import "./index.css";
import App from "./App";
import reducer from "./reducers";
import registerServiceWorker from "./registerServiceWorker";

import "semantic-ui-css/semantic.min.css";
import { Router } from "react-router";

const history = createHistory();
const middleware = routerMiddleware(history);

export const store = createStore(
  reducer,
  compose(applyMiddleware(middleware))
  //   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
