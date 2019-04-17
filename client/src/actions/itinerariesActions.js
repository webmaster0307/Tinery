import axios from "axios";
import { FETCH_ITINERARIES, FETCH_ITINERARIES_HASHTAG } from "./Types";

export const fetchItinerariesByCity = url => dispatch => {
  axios.get(`/api/itin/${url}`).then(res => {
    dispatch({
      type: FETCH_ITINERARIES,
      payload: res.data
    });
  });
};

export const fetchItineraries = () => dispatch => {
  axios.get("/api/itin/").then(res => {
    dispatch({
      type: FETCH_ITINERARIES,
      payload: res.data
    });
  });
};

export const fetchItinerariesHashtag = hashtag => dispatch => {
  axios
    .post("/api/itinhashtag", { hashtag: hashtag })
    .then(res => {
      dispatch({
        type: FETCH_ITINERARIES_HASHTAG,
        payload: res.data
      });
    })
    .catch(err => console.log(err));
};
