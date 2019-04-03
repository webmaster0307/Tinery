import axios from "axios";
import {
  GET_ERRORS,
  DELETE_CITY,
  DELETE_ACTIVITY,
  DELETE_ITINERARY
} from "./Types";

//-------------------------------------------------------------
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

// DELETE  CITY
export const deleteCity = id => dispatch => {
  // console.log("property id", id);
  axios
    .delete(`/api/cms/deletecity/${id}`)
    .then(() =>
      dispatch({
        type: DELETE_CITY,
        payload: id
      })
    )
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

//-------------------------------------------------------------
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

// DELETE ACTIVITY
export const deleteActivity = id => dispatch => {
  console.log("property id", id);
  axios
    .delete(`/api/cms/deleteactivity/${id}`)
    .then(() =>
      dispatch({
        type: DELETE_ACTIVITY,
        payload: id
      })
    )
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

//-------------------------------------------------------------
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

export const deleteItinerary = id => dispatch => {
  console.log("property id", id);
  axios
    .delete(`/api/cms/deleteitin/${id}`)
    .then(() =>
      dispatch({
        type: DELETE_ITINERARY,
        payload: id
      })
    )
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};
