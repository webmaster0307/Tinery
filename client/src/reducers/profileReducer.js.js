import {
  POST_FAVORITES,
  DELETE_FAVORITES,
  GET_PROFILE,
  PROFILE_LOADING,
  CLEAR_CURRENT_PROFILE
} from "../actions/Types";

const initialState = {
  // userID: [],
  itinID: [],
  itineraries: [],
  favorites: [],
  profile: [],
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case POST_FAVORITES:
      return {
        ...state,
        favorites: [action.payload, ...state.favorites]
        // favorites: [action.payload, ...state.favorites]
        // favorites: action.payload
      };

    case DELETE_FAVORITES:
      console.log("del fav", action.payload);
      return {
        // console.log("test")
        ...state,
        // favorites: [action.payload]
        // favorites: state.favorites.filter(
        //   favorite => favorite._id !== action.payload
        // )
        itinID: state.itinID.filter(favorite => favorite !== action.payload)
      };

    case PROFILE_LOADING:
      return {
        ...state,
        loading: true
      };

    case GET_PROFILE:
      return {
        ...state,
        profile: action.payload,
        loading: false
      };

    case CLEAR_CURRENT_PROFILE:
      return {
        ...state,
        profile: null
      };
    // COMMENT EXAMPLE
    // case POST_COMMENTS:
    //   return {
    //     ...state,
    //     comments: [...state.comments, action.payload]
    //     // comments: state.comments
    //   };

    default:
      return state;
  }
}

// import {
//   GET_PROFILE,
//   GET_PROFILES,
//   PROFILE_LOADING,
//   CLEAR_CURRENT_PROFILE
// } from "../actions/types";

// const initialState = {
//   profile: null,
//   profiles: null,
//   loading: false
// };

// export default function(state = initialState, action) {
//   switch (action.type) {
//     case PROFILE_LOADING:
//       return {
//         ...state,
//         loading: true
//       };
//     case GET_PROFILE:
//       return {
//         ...state,
//         profile: action.payload,
//         loading: false
//       };
//     case GET_PROFILES:
//       return {
//         ...state,
//         profiles: action.payload,
//         loading: false
//       };
//     case CLEAR_CURRENT_PROFILE:
//       return {
//         ...state,
//         profile: null
//       };
//     default:
//       return state;
//   }
// }
