import { combineReducers } from "redux";
import rootReducer from "./rootReducer";
import cityReducer from "./cityReducer";

export default combineReducers({
  roots: rootReducer,
  cities: cityReducer
});
