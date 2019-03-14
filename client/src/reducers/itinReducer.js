// import { FETCH_ITINERARIES, FETCH_ITINERARIES_ID } from "../actions/Types";
import { FETCH_ITINERARIES } from "../actions/Types";

const initialState = {
  itineraries: []
  // itinid: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_ITINERARIES:
      return {
        ...state,
        // itineraries: [action.payload, ...state.itineraries]
        itineraries: action.payload
      };
    // case FETCH_ITINERARIES_ID:
    //   console.log(action.payload);
    //   return {
    //     ...state,
    //     itinid: action.payload
    //     // itinid: [action.payload, ...state.itinid]
    //   };
    default:
      return state;
  }
}
