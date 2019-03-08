import { POST_FAVORITES, DELETE_FAVORITES } from "../actions/Types";

const initialState = {
  // userID: [],
  // itinID: [],
  favorites: [],
  profile: [],
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    // case FETCH_FAVORITES:
    //   return {
    //     // ...state.favorites,
    //     // ...state,
    //     favorites: action.payload

    //     // favorites: [action.payload, ...state.favorites]
    //   };

    // COMMENT EXAMPLE
    // case POST_COMMENTS:
    //   return {
    //     ...state,
    //     comments: [...state.comments, action.payload]
    //     // comments: state.comments
    //   };

    case POST_FAVORITES:
      return {
        ...state,
        // favorites: [...state.favorites, action.payload]
        favorites: [action.payload, ...state.favorites]
        // favorites: action.payload
      };

    case DELETE_FAVORITES:
      return {
        ...state,
        favorites: state.favorites.filter(
          favorite => favorite._id !== action.payload
        )
      };

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
