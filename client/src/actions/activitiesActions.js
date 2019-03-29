import axios from "axios";
import { FETCH_ACTIVITIES } from "./Types";

export const fetchActivityByKey = activitykey => dispatch => {
  axios.get(`/api/activity/${activitykey}`).then(res => {
    dispatch({
      type: FETCH_ACTIVITIES,
      payload: res.data
    });
  });
};

export const fetchActivities = () => dispatch => {
  axios.get("/api/activity/").then(res => {
    dispatch({
      type: FETCH_ACTIVITIES,
      payload: res.data
    });
  });
};
