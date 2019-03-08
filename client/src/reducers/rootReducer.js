import { combineReducers } from "redux";
import cityReducer from "./cityReducer";
import itinReducer from "./itinReducer";
import activityReducer from "./activityReducer";
import commentReducer from "./commentReducer";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import profileReducer from "./profileReducer.js";

export default combineReducers({
  //cityReducer
  cities: cityReducer,
  itineraries: itinReducer,
  activities: activityReducer,
  comments: commentReducer,
  auth: authReducer,
  errors: errorReducer,
  profile: profileReducer
});
