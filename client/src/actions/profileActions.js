import axios from "axios";
// import setAuthToken from "../actions/utils/setAuthToken";

import {
  POST_FAVORITES,
  DELETE_FAVORITES,
  FETCH_ITINERARIES_ID,
  PROFILE_LOADING,
  CLEAR_CURRENT_PROFILE,
  GET_PROFILE,
  GET_ERRORS
} from "./Types";

//-------------------------------------------------------------
// GET PROFILE FAVORITES

export const getCurrentProfile = () => dispatch => {
  dispatch(setProfileLoading());
  axios.get("/auth/profileget").then(res => {
    // console.log(res.data);
    dispatch({
      type: GET_PROFILE,
      payload: res.data
    });
  });
  // .catch(err =>
  //   dispatch({
  //     type: GET_PROFILE,
  //     payload: null
  //   })
  // );
};

// SET PROFILE LOADING
export const setProfileLoading = () => {
  return {
    type: PROFILE_LOADING
  };
};

// CLEAR PROFILE
export const clearCurrentProfile = () => {
  return {
    type: CLEAR_CURRENT_PROFILE
  };
};

//-------------------------------------------------------------

// FETCH FAVORITES
// export const fetchAxiosItinerariesID = favid => dispatch => {
//   axios.post(`/api/itinid`, { favid: favid }).then(res => {
//     console.log("fetched from actions", res.data);
//     dispatch({
//       type: FETCH_ITINERARIES_ID,
//       payload: res.data
//     });
//   });
// };

export const fetchAxiosItinerariesID = favid => dispatch => {
  // console.log("test");
  // console.log("from fetchaxios", favid);
  axios
    .post("/api/itinid", { favid: favid })
    .then(res => {
      // console.log("fetched from actions res.data", res.data);
      // console.log("fetched from actions favid", favid);
      dispatch({
        type: FETCH_ITINERARIES_ID,
        payload: res.data
      });
    })
    .catch(err => console.log(err));
};

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
    .delete(`/auth/profile/removefav/${id}/${favData}`)
    .then(res =>
      dispatch({
        type: DELETE_FAVORITES,
        payload: favData
      })
    )
    // CHECK ERROR payload: err.response.data
    .catch(err => {
      console.log(err);
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

//-------------------------------------------------------------
