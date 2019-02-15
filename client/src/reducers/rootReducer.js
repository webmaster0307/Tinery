import { combineReducers } from "redux";
import cityReducer from "./cityReducer";
import itinReducer from "./itinReducer";
import activityReducer from "./activityReducer";
import commentReducer from "./commentReducer";

export default combineReducers({
  //cityReducer
  cities: cityReducer,
  itineraries: itinReducer,
  activities: activityReducer,
  comments: commentReducer
});
