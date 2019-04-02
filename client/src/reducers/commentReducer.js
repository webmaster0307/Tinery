import { FETCH_COMMENTS, POST_COMMENTS } from "../actions/Types";

const initialState = {
  comments: [],
  comment: {}
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
        comments: [...state.comments, action.payload]
      };

    default:
      return state;
  }
}
