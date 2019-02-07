import { FETCH_CITY } from "./Types";
import axios from "axios";

export const fetchCities = cities => {
  return {
    type: FETCH_CITY,
    cities: cities
  };
};

export const fetchAllCities = () => {
  return dispatch => {
    return axios
      .get(`/api/test/`)
      .then(response => {
        dispatch(fetchCities(response.data));
      })
      .catch(error => {
        throw error;
      });
  };
};
