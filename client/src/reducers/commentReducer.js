import { FETCH_COMMENTS, POST_COMMENTS } from "../actions/Types";

const initialState = {
  comments: [],
  comment: {}
  // loading: false
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
        // comments: state.comments
      };

    // case DELETE_COMMENTS:
    //   return state.filter(comment => comment._id !== action.payload.id);

    default:
      return state;
  }
}
