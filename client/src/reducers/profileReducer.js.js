// import {
//   POST_FAVORITES,
//   DELETE_FAVORITES,
//   GET_PROFILE,
//   PROFILE_LOADING,
//   CLEAR_CURRENT_PROFILE
// } from "../actions/Types";
import {
  FETCH_ITINERARIES_ID,
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
  favid: [],

  profile: [],

  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    // GETS FAVORITES IDS FROM PROFILE
    case GET_PROFILE:
      // console.log(action.payload);
      return {
        ...state,
        // itinID: action.payload,
        favid: action.payload,
        loading: false
      };
    // GETS FAVORITES FROM ITINERARIES USING ITIN ID
    case FETCH_ITINERARIES_ID:
      console.log("fetchid", action.payload);
      return {
        ...state,
        itinID: action.payload

        // itinid: [action.payload, ...state.itinid]
      };

    case POST_FAVORITES:
      return {
        ...state,
        favorites: [action.payload, ...state.favorites]
        // favorites: [action.payload, ...state.favorites]
        // favorites: action.payload
      };

    case DELETE_FAVORITES:
      // console.log("delete fav", action.payload);
      return {
        ...state,
        // console.log("test")
        // favorites: [action.payload]
        // favorites: state.favorites.filter(
        //   favorite => favorite._id !== action.payload
        // )
        itinID: state.itinID.filter(favorite => favorite._id !== action.payload)
      };

    case PROFILE_LOADING:
      return {
        ...state,
        loading: true
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
