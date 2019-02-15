import axios from "axios";
import { FETCH_CITIES } from "./Types";

export const fetchAxiosCities = () => dispatch => {
  axios.get(`/api/city/`).then(res => {
    // console.log("fetched from actions", res.data);
    dispatch({
      type: FETCH_CITIES,
      payload: res.data
    });
  });
};

// CODE FROM INDEX:JS IN ACTIONS

// import { FETCH_CITY } from "./Types";
// import axios from "axios";

// export const fetchCities = cities => {
//   return {
//     type: FETCH_CITY,
//     cities: cities
//   };
// };

// export const fetchAllCities = () => {
//   return dispatch => {
//     return axios
//       .get(`/api/test/`)
//       .then(response => {
//         dispatch(fetchCities(response.data));
//       })
//       .catch(error => {
//         throw error;
//       });
//   };
// };
