import axios from "axios";
import { FETCH_ACTIVITIES } from "./Types";

export const fetchAxiosActivities = activitykey => dispatch => {
  axios.get(`/api/activity/${activitykey}`).then(res => {
    dispatch({
      type: FETCH_ACTIVITIES,
      payload: res.data
    });
  });
};
