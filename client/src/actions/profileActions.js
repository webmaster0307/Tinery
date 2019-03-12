import axios from "axios";
import {
  POST_FAVORITES,
  DELETE_FAVORITES,
  // FETCH_FAVORITES,
  CLEAR_CURRENT_PROFILE,
  GET_PROFILE,
  GET_ERRORS
} from "./Types";

//-------------------------------------------------------------
// CLEAR PROFILE
export const clearCurrentProfile = () => {
  return {
    type: CLEAR_CURRENT_PROFILE
  };
};

// GET PROFILE
export const getCurrentProfile = userid => dispatch => {
  //   dispatch(setProfileLoading());
  console.log("test");
  console.log("from actions", userid);
  axios.get(`/auth/profile/get/${userid}`).then(res =>
    dispatch({
      type: GET_PROFILE,
      payload: res.data
    })
  );
  // .catch(err =>
  //   dispatch({
  //     type: GET_PROFILE,
  //     payload: null
  //   })
  // );
};

//-------------------------------------------------------------

// FETCH FAVORITES
// export const fetchFavorites = id => dispatch => {
//   axios.get(`/api/itinid/${id}`).then(res => {
//     dispatch({
//       type: FETCH_FAVORITES,
//       payload: res.data
//     });
//   });
// };

// POST FAVORITES
export const postFavorites = (id, favData) => dispatch => {
  // let id = userData.userID;
  //   console.log("from actions", id);
  //   console.log("from actions", favData);
  axios
    .post(`/auth/profile/${id}`, favData)
    .then(res => {
      dispatch({
        type: POST_FAVORITES,
        payload: res.data
      });
      // console.log("then posted actions:", res.data);
      // console.log("actions:", res.data.itinID);
    })
    // .catch(err =>
    //   dispatch({
    //     type: GET_ERRORS,
    //     payload: err.response.data
    //   })
    // );
    .catch(err => console.log(err));
};

//-------------------------------------------------------------
// REMOVE FAVORITES
export const removeFavorites = (id, favData) => dispatch => {
  // let id = userData.userID;
  //   console.log("from actions", id);
  console.log("from actions", favData);
  axios
    .delete(
      `/auth/profile/removefav/${id}/${favData}
    `
    )
    .then(res =>
      dispatch({
        type: DELETE_FAVORITES,
        payload: favData
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//-------------------------------------------------------------
