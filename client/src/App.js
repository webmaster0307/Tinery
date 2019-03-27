import React, { Component } from "react";
// import { connect } from "react-redux";
import PropTypes from "prop-types";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./actions/utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import { clearCurrentProfile } from "./actions/profileActions";
// import { getCurrentProfile } from "./actions/profileActions";

import store from "./store";
import { Provider } from "react-redux";

// CSS
import "./styles/App.css";
import CssBaseline from "@material-ui/core/CssBaseline";
// import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import Navbar from "./components/layout/Navbar";
import Editcity from "./components/Editcity";
import City from "./views/City";
import Home from "./views/Home";
import Cities from "./views/Cities";
import Login from "./views/Login";
import Signup from "./views/Signup";
// import Favorites from "./components/Favorites";
import Cmsitin from "./views/Cmsitin";
import Cmsactivity from "./views/Cmsactivity";
import Cmscity from "./views/Cmscity";
import Dashboard from "./views/Dashboard";

import PrivateRoute from "./components/layout/PrivateRoute";

// Check for token
// if (localStorage.jwtToken) {
if (sessionStorage.jwtToken) {
  // Set auth token header auth
  // setAuthToken(localStorage.jwtToken);
  setAuthToken(sessionStorage.jwtToken);
  // Decode token and get user info and exp
  // const decoded = jwt_decode(localStorage.jwtToken);
  const decoded = jwt_decode(sessionStorage.jwtToken);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  // Get favorites from User Account
  // store.dispatch(getCurrentProfile(decoded));
  // store.dispatch(getCurrentProfile());
  // console.log(decoded);
  // console.log(decoded.favorites);

  // Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Clear current Profile
    store.dispatch(clearCurrentProfile());
    // Redirect to login
    window.location.href = "/login";
  }
}

class App extends Component {
  componentDidMount() {
    // console.log(this.props);
    // console.log(this.state);
    // store.dispatch(getCurrentProfile());
    // store.dispatch(getProfileFavorites());
  }
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div>
            <CssBaseline />
            <Navbar />
            <div className="navApp">
              {/* <Navbar /> */}
              <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/signup" component={Signup} />
                <Route exact path="/cities" component={Cities} />
                {/* <PrivateRoute exact path="/Favorites" component={Favorites} /> */}
                <PrivateRoute exact path="/Cmsitin" component={Cmsitin} />
                <PrivateRoute
                  exact
                  path="/Cmsactivity"
                  component={Cmsactivity}
                />
                <PrivateRoute exact path="/Cmscity" component={Cmscity} />
                <PrivateRoute
                  exact
                  path="/Cmscity/Editcity"
                  component={Editcity}
                />
                {/* <Route exact path="/Cms" component={Cms} /> */}
                {/* <PrivateRoute exact path="/Dashboard" component={Dashboard} /> */}
                <PrivateRoute exact path="/Dashboard" component={Dashboard} />
                {/* <Route
                path="/Dashboard"
                render={props => <Dashboard {...props} isAuthed={true} />}
              /> */}
                {/* <Route exact path="/City/:city_name" component={City} /> */}
                <Route
                  path="/cities/:city_name"
                  render={props => <City {...props} isAuthed={true} />}
                />
              </Switch>
            </div>
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

App.protoTypes = {
  cities: PropTypes.array
};

// const mapStateToProps = state => ({
//   favid: state.favid
// });

export default App;

// export default connect(
//   mapStateToProps,
//   { getCurrentProfile }
// )(App);
