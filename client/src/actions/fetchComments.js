import axios from "axios";
import { FETCH_COMMENTS } from "./Types";

// export const fetchAxiosComments = () => dispatch => {
//   axios.get(`/api/comment/`).then(res => {
//     dispatch({
//       type: FETCH_COMMENTS,
//       payload: res.data
//     });
//   });
// };

export const fetchAxiosComments = activitykey => dispatch => {
  axios.get(`/api/comment/${activitykey}`).then(res => {
    dispatch({
      type: FETCH_COMMENTS,
      payload: res.data
    });
  });
};
