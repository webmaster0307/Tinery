import axios from "axios";
import { FETCH_ITINERARIES } from "./Types";
// import { FETCH_ITINERARIES, FETCH_ITINERARIES_ID } from "./Types";

export const fetchAxiosItineraries = url => dispatch => {
  axios.get(`/api/itin/${url}`).then(res => {
    // console.log("fetched from actions", res.data);
    dispatch({
      type: FETCH_ITINERARIES,
      payload: res.data
    });
  });
};
