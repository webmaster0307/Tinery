import axios from "axios";
// import setAuthToken from "../actions/utils/setAuthToken";
// import jwt_decode from "jwt-decode";
import { GET_ERRORS } from "./Types";

export const createCity = formData => dispatch => {
  axios
    .post("api/cms/city", formData)
    .then(res => console.log(res))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const createActivity = formData => dispatch => {
  axios
    .post("api/cms/activity", formData)
    .then(res => console.log(res))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const createItinerary = formData => dispatch => {
  axios
    .post("api/cms/itin", formData)
    .then(res => console.log(res))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
