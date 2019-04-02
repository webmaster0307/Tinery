import axios from "axios";
import { GET_ERRORS } from "./Types";

// CREATE CITY
export const createCity = formData => dispatch => {
  axios
    .post("api/cms/city", formData)
    .then(res => {
      console.log(res.data);
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
// EDIT CITY
export const editCity = (id, formData) => dispatch => {
  axios
    .post(`/api/cms/cityedit/${id}`, formData)
    .then(res => {
      console.log(res.data);
    })
    .catch(err => console.log(err));
};

// CREATE ACTIVITY
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

// EDIT ACTIVITY
export const editActivity = (id, formData) => dispatch => {
  axios
    .post(`/api/cms/activityedit/${id}`, formData)
    .then(res => {
      console.log(res.data);
    })
    .catch(err => console.log(err));
};

// CREATE ITINERARY
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

// EDIT ITINERARY
export const editItinerary = (id, formData) => dispatch => {
  axios
    .post(`/api/cms/itinedit/${id}`, formData)
    .then(res => {
      console.log(res.data);
    })
    .catch(err => console.log(err));
};
