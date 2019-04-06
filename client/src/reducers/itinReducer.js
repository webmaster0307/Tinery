import { FETCH_ITINERARIES, FETCH_ITINERARIES_HASHTAG } from "../actions/Types";

const initialState = {
  itineraries: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_ITINERARIES:
      return {
        ...state,
        itineraries: action.payload
      };
    case FETCH_ITINERARIES_HASHTAG:
      return {
        ...state,
        itineraries: action.payload
      };
    default:
      return state;
  }
}
