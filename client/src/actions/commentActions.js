import axios from "axios";
import { FETCH_COMMENTS, GET_ERRORS, POST_COMMENTS } from "./Types";

export const fetchAxiosComments = activitykey => dispatch => {
  axios.get(`/api/comment/${activitykey}`).then(res => {
    dispatch({
      type: FETCH_COMMENTS,
      payload: res.data
    });
  });
};

export const postAxiosCommentSuccess = data => {
  return {
    type: POST_COMMENTS,
    payload: {
      user: data.user,
      message: data.message,
      timestamp: data.timestamp,
      activitykey: data.activitykey,
      avatar: data.avatar
    }
  };
};

export const postAxiosComments = ({
  user,
  message,
  timestamp,
  activitykey,
  avatar
}) => {
  return dispatch => {
    return axios
      .post("/api/comment", { user, message, timestamp, activitykey, avatar })
      .then(res => {
        dispatch(postAxiosCommentSuccess(res.data));
      })
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      );
  };
};
