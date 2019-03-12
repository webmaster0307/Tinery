import { FETCH_ITINERARIES, FETCH_ITINERARIES_ID } from "../actions/Types";

const initialState = {
  itineraries: [],
  itinid: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_ITINERARIES:
      return {
        ...state,
        // itineraries: [action.payload, ...state.itineraries]
        itineraries: action.payload
      };
    case FETCH_ITINERARIES_ID:
      console.log(action.payload);
      return {
        ...state,
        itinid: action.payload
        // itinid: [action.payload, ...state.itinid]
        // itinid: [...state.itinid, action.payload]
        // itineraries: [action.payload, ...state.itineraries]
        // itineraries: [...state.itineraries, action.payload],
        // itinid: [action.payload]
        // itinid: [...state.itinid]
        // itinid: [action.payload, ...state.itinid]
        // itinid: [...state.itineraries]
        // itineraries: action.payload
        // itineraries: [...state.itineraries]
      };
    default:
      return state;
  }
}
