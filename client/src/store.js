import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import rootReducer from "./reducers/rootReducer";

import { fetchAllCities } from "./actions/Index";

const store = createStore(rootReducer, applyMiddleware(thunk));
store.dispatch(fetchAllCities());
