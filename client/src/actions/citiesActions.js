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
