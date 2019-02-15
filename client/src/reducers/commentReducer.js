import { FETCH_COMMENTS } from "../actions/Types";
import { POST_COMMENTS } from "../actions/Types";

const initialState = {
  comments: [],
  comment: {},
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_COMMENTS:
      return {
        ...state,
        comments: action.payload
      };

    case POST_COMMENTS:
      return {
        ...state,
        comments: [...action.payload, state.comments]
      };

    default:
      return state;
  }
}
