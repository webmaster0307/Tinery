import { FETCH_CITY } from "../actions/Types";

const initialState = {
  cities: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_CITY:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
}
