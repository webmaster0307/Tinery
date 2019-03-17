import axios from "axios";
import { FETCH_ITINERARIES } from "./Types";

export const fetchAxiosItineraries = url => dispatch => {
  axios.get(`/api/itin/${url}`).then(res => {
    dispatch({
      type: FETCH_ITINERARIES,
      payload: res.data
    });
  });
};
