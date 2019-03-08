import axios from "axios";
import { GET_ERRORS, POST_COMMENTS } from "./Types";

export const postAxiosCommentSuccess = data => {
  return {
    type: POST_COMMENTS,
    payload: {
      user: data.user,
      message: data.message,
      timestamp: data.timestamp,
      activitykey: data.activitykey
    }
  };
};

export const postAxiosComments = ({
  user,
  message,
  timestamp,
  activitykey
}) => {
  return dispatch => {
    return axios
      .post("/api/comment", { user, message, timestamp, activitykey })
      .then(res => {
        // console.log("redux:", res.data);
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
