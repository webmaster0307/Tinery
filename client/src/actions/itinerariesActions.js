import axios from "axios";
import { FETCH_ITINERARIES, FETCH_ITINERARIES_ID } from "./Types";

// export const fetchAxiosItineraries = () => dispatch => {
//   axios.get(`/api/itin/`).then(res => {
//     // console.log("fetched from actions", res.data);
//     dispatch({
//       type: FETCH_ITINERARIES,
//       payload: res.data
//     });
//   });
// };

export const fetchAxiosItineraries = url => dispatch => {
  axios.get(`/api/itin/${url}`).then(res => {
    // console.log("fetched from actions", res.data);
    dispatch({
      type: FETCH_ITINERARIES,
      payload: res.data
    });
  });
};

// export const fetchAxiosItinerariesID = id => dispatch => {
//   axios.get(`/api/itinid/${id}`).then(res => {
//     // console.log("fetched from actions", res.data);
//     dispatch({
//       type: FETCH_ITINERARIES_ID,
//       payload: res.data
//     });
//   });
// };

export const fetchAxiosItinerariesID = favid => dispatch => {
  axios.post(`/api/itinid`, { favid: favid }).then(res => {
    // console.log("fetched from actions", res.data);
    dispatch({
      type: FETCH_ITINERARIES_ID,
      payload: res.data
    });
  });
};
