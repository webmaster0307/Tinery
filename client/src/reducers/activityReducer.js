import { FETCH_ACTIVITIES } from "../actions/Types";

const initialState = {
  activities: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_ACTIVITIES:
      return {
        ...state,
        activities: action.payload
      };

    default:
      return state;
  }
}
