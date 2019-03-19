// import { createStore, applyMiddleware, compose } from "redux";

import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension/logOnlyInProduction";

import thunk from "redux-thunk";
import rootReducer from "./reducers/rootReducer";

const initialState = {};

const middleware = [thunk];

const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

// const store = createStore(
//   rootReducer,
//   initialState,
//   compose(applyMiddleware(...middleware))
// );

// if (process.env.NODE_ENV === "production") {
//   const store = createStore(
//     rootReducer,
//     initialState,
//     compose(applyMiddleware(...middleware))
//   );
// }

// if (process.env.NODE_ENV === "production") {
//   const store = createStore(
//     rootReducer,
//     initialState,
//     compose(applyMiddleware(...middleware))
//   );
// } else {
//   const store = createStore(
//     rootReducer,
//     initialState,
//     compose(
//       applyMiddleware(...middleware),
//       window.__REDUX_DEVTOOLS_EXTENSION__ &&
//         window.__REDUX_DEVTOOLS_EXTENSION__()
//     )
//   );
// }

// const store = createStore(
//   rootReducer,
//   initialState,
//   compose(
//     applyMiddleware(...middleware),
//     window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
//   )
// );

export default store;
