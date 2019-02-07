import React from "react";
import ReactDOM from "react-dom";
import "./styles/index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import rootReducer from "./reducers/rootReducer";
import { fetchAllCities } from "./actions/Index";

import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";

// const store = createStore(rootReducer);
// import cityReducer from "./reducers/cityReducer";
// const store = createStore(cityReducer, applyMiddleware(thunk));
const store = createStore(rootReducer, applyMiddleware(thunk));

store.dispatch(fetchAllCities());

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
