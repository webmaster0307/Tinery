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
  GET_FAVID,
  CLEAR_CURRENT_PROFILE
} from "../actions/Types";

const initialState = {
  // userID: [],
  // favorites: [],
  user: {},
  itineraries: [],
  favitin: [],
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
        // favid: action.payload,
        favid: action.payload,
        loading: false
      };
    // case GET_FAVID:
    //   return {
    //     // favid: [...state]
    //     // user.favorites : favid,
    //     // ...state.favid
    //     ...state
    //   };
    // GETS FAVORITES FROM ITINERARIES USING ITIN ID
    case FETCH_ITINERARIES_ID:
      // console.log("fetchid favid", action.payload);
      return {
        ...state,
        favitin: action.payload

        // favid: [action.payload, ...state.favid]
      };

    case POST_FAVORITES:
      return {
        ...state,
        favid: [action.payload, ...state.favid]
        // LINE WAS ENABLED favorites: [action.payload, ...state.favorites]
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
        // favid: state.favid.filter(favorite => favorite._id !== action.payload)
        favitin: state.favitin.filter(
          favorite => favorite._id !== action.payload
        )
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
