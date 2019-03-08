import axios from "axios";
import {
  POST_FAVORITES,
  DELETE_FAVORITES,
  FETCH_FAVORITES,
  CLEAR_CURRENT_PROFILE,
  GET_PROFILE,
  GET_ERRORS
} from "./Types";

// FETCH FAVORITES
export const fetchFavorites = id => dispatch => {
  axios.get(`/api/itinid/${id}`).then(res => {
    dispatch({
      type: FETCH_FAVORITES,
      payload: res.data
    });
  });
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

// REMOVE FAVORITES
export const removeFavorites = (id, favData) => dispatch => {
  // let id = userData.userID;
  //   console.log("from actions", id);
  console.log("from actions", favData);
  axios
    .delete(`/auth/profile/${id}`, favData)
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

// CLEAR PROFILE
export const clearCurrentProfile = () => {
  return {
    type: CLEAR_CURRENT_PROFILE
  };
};

// GET PROFILE
export const getCurrentProfile = () => dispatch => {
  //   dispatch(setProfileLoading());
  axios
    .get("/api/profile")
    .then(res =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_PROFILE,
        payload: {}
      })
    );
};

// import axios from "axios";
// import {
//   GET_PROFILE,
//   GET_ERRORS,
//   GET_PROFILES,
//   CLEAR_CURRENT_PROFILE,
//   PROFILE_LOADING,
//   SET_CURRENT_USER
// } from "./Types";

// // import {
// //   GET_PROFILE,
// //   GET_PROFILES,
// //   PROFILE_LOADING,
// //   CLEAR_CURRENT_PROFILE,
// //   GET_ERRORS,
// //   SET_CURRENT_USER
// // } from "./types";

// // Get profile by handle
// export const getProfileByHandle = handle => dispatch => {
//   dispatch(setProfileLoading());
//   axios
//     .get(`/api/profile/handle/${handle}`)
//     .then(res =>
//       dispatch({
//         type: GET_PROFILE,
//         payload: res.data
//       })
//     )
//     .catch(err =>
//       dispatch({
//         type: GET_PROFILE,
//         payload: null
//       })
//     );
// };

// // Create Profile
// export const createProfile = (profileData, history) => dispatch => {
//   axios
//     .post("/api/profile", profileData)
//     .then(res => history.push("/dashboard"))
//     .catch(err =>
//       dispatch({
//         type: GET_ERRORS,
//         payload: err.response.data
//       })
//     );
// };

// // Add experience
// export const addExperience = (expData, history) => dispatch => {
//   axios
//     .post("/api/profile/experience", expData)
//     .then(res => history.push("/dashboard"))
//     .catch(err =>
//       dispatch({
//         type: GET_ERRORS,
//         payload: err.response.data
//       })
//     );
// };

// // Delete Experience
// export const deleteExperience = id => dispatch => {
//   axios
//     .delete(`/api/profile/experience/${id}`)
//     .then(res =>
//       dispatch({
//         type: GET_PROFILE,
//         payload: res.data
//       })
//     )
//     .catch(err =>
//       dispatch({
//         type: GET_ERRORS,
//         payload: err.response.data
//       })
//     );
// };

// // Add education
// // export const addEducation = (eduData, history) => dispatch => {
// //       axios
// //         .post("/api/profile/education", eduData)
// //         .then(res => history.push("/dashboard"))
// //         .catch(err =>
// //           dispatch({
// //             type: GET_ERRORS,
// //             payload: err.response.data
// //           })
// //         );
// //     };

// // Delete Education
// // export const deleteEducation = id => dispatch => {
// //   axios
// //     .delete(`/api/profile/education/${id}`)
// //     .then(res =>
// //       dispatch({
// //         type: GET_PROFILE,
// //         payload: res.data
// //       })
// //     )
// //     .catch(err =>
// //       dispatch({
// //         type: GET_ERRORS,
// //         payload: err.response.data
// //       })
// //     );
// // };

// // Get all profiles
// // export const getProfiles = () => dispatch => {
// //   dispatch(setProfileLoading());
// //   axios
// //     .get("/api/profile/all")
// //     .then(res =>
// //       dispatch({
// //         type: GET_PROFILES,
// //         payload: res.data
// //       })
// //     )
// //     .catch(err =>
// //       dispatch({
// //         type: GET_PROFILES,
// //         payload: null
// //       })
// //     );
// // };

// // Delete account & profile
// export const deleteAccount = () => dispatch => {
//   if (window.confirm("Are you sure? This can NOT be undone!")) {
//     axios
//       .delete("/api/profile")
//       .then(res =>
//         dispatch({
//           type: SET_CURRENT_USER,
//           payload: {}
//         })
//       )
//       .catch(err =>
//         dispatch({
//           type: GET_ERRORS,
//           payload: err.response.data
//         })
//       );
//   }
// };

// // Profile loading
// export const setProfileLoading = () => {
//   return {
//     type: PROFILE_LOADING
//   };
// };
