import React, { Component } from "react";
import PropTypes from "prop-types";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./actions/utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";

import store from "./store";
import { Provider } from "react-redux";

// CSS
import "./styles/App.css";
import CssBaseline from "@material-ui/core/CssBaseline";
// import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";

// import Navbar from "./components/Navbar";
import City from "./views/City";
import Home from "./views/Home";
import Cities from "./views/Cities";
import Login from "./views/Login";
import Signup from "./views/Signup";
import Favorites from "./views/Favorites";
import Cms from "./views/Cms";

// Check for token
if (localStorage.jwtToken) {
  //if (sessionStorage.jwtToken) {
  // Set auth token header auth
  setAuthToken(localStorage.jwtToken);
  //  setAuthToken(sessionStorage.jwtToken);
  // Decode token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken);
  // const decoded = jwt_decode(sessionStorage.jwtToken);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  // Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Clear current Profile
    // store.dispatch(clearCurrentProfile());
    // Redirect to login
    window.location.href = "/login";
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div>
            <CssBaseline />
            {/* <Navbar /> */}
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/Login" component={Login} />
              <Route exact path="/Signup" component={Signup} />
              <Route exact path="/Cities" component={Cities} />
              <Route exact path="/Favorites" component={Favorites} />
              <Route exact path="/Cms" component={Cms} />

              {/* <Route exact path="/City/:city_name" component={City} /> */}
              <Route
                path="/Cities/:city_name"
                render={props => <City {...props} isAuthed={true} />}
              />
              {/* <Route
                path="/Cities/:city_name/:activitykey"
                render={props => <City {...props} isAuthed={true} />}
              /> */}
            </Switch>
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

App.protoTypes = {
  cities: PropTypes.array
};

export default App;
