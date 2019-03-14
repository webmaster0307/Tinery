import axios from "axios";
import setAuthToken from "../actions/utils/setAuthToken";
import jwt_decode from "jwt-decode";
import { GET_ERRORS, SET_CURRENT_USER } from "./Types";

// REGISTER USER
export const registerUser = (userData, history) => dispatch => {
  // console.log("from actions", userData.avatar);
  // console.log("from actions", userData);
  axios
    .post("/auth/user/register", userData)
    .then(res => history.push("/login"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// LOGIN GET USER TOKEN
export const loginUser = userData => dispatch => {
  axios
    .post("/auth/user/login", userData)
    .then(res => {
      console.log(res.data);
      // Save to localStorage
      const { token } = res.data;
      // Set token to ls
      // localStorage.setItem("jwtToken", token);
      sessionStorage.setItem("jwtToken", token);
      // Set token to Auth header
      setAuthToken(token);
      // Decode token to get user data
      const decoded = jwt_decode(token);
      // Set current user
      dispatch(setCurrentUser(decoded));
      // console.log(decoded);
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// REMEMBER ME LOGIN

// export const rememberUser = userData => dispatch => {
//   axios
//     .post("/auth/user/login", userData)
//     .then(res => {
//       // console.log(res.data);
//       // Save to localStorage
//       const { token } = res.data;
//       // Set token to ls
//       localStorage.setItem("jwtToken", token);
//       // sessionStorage.setItem("jwtToken", token);
//       // Set token to Auth header
//       setAuthToken(token);
//       // Decode token to get user data
//       const decoded = jwt_decode(token);
//       // Set current user
//       dispatch(setCurrentUser(decoded));
//     })
//     .catch(err =>
//       dispatch({
//         type: GET_ERRORS,
//         payload: err.response.data
//       })
//     );
// };

// SOCIAL USER
export const socialRegisterUser = (userData, history) => dispatch => {
  // console.log("from actions", userData.avatar);
  // console.log("from actions", userData);
  axios
    .post("/auth/user/registersocial", userData)
    .then(res => {
      // console.log(res.data);
      // Save to localStorage
      const { token } = res.data;
      // Set token to ls
      // localStorage.setItem("jwtToken", token);
      sessionStorage.setItem("jwtToken", token);
      // Set token to Auth header
      setAuthToken(token);
      // Decode token to get user data
      const decoded = jwt_decode(token);
      // Set current user
      dispatch(setCurrentUser(decoded));
    })
    .catch(err => console.log(err));
  // .catch(err => err.status(200).send("success"));
  // .catch(err => err.status(404).json({ msg: "success" }));
  // .catch(err =>
  //   dispatch({
  //     type: GET_ERRORS,
  //     payload: err.response.data
  //   })
  // );
};

// Set logged in user
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

// Log user out
export const logoutUser = () => dispatch => {
  // Remove token from localStorage
  // localStorage.removeItem("jwtToken");
  sessionStorage.removeItem("jwtToken");

  // Remove auth header for future requests
  setAuthToken(false);
  // Set current user to {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
};
