import React, { Component } from "react";
// import { connect } from "react-redux";
import PropTypes from "prop-types";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./actions/utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import { clearCurrentProfile } from "./actions/profileActions";
import PrivateRoute from "./components/layout/PrivateRoute";
import store from "./store";
import { Provider } from "react-redux";

// CSS
import "./styles/App.css";
import CssBaseline from "@material-ui/core/CssBaseline";
import Navbar from "./components/layout/Navbar";
import BottomNav from "./components/layout/BottomNav";

// ROUTES
import City from "./views/City";
import Home from "./views/Home";
import Cities from "./views/Cities";
import Login from "./views/Login";
import Signup from "./views/Signup";
import Cmsitin from "./views/Cmsitin";
import Cmsactivity from "./views/Cmsactivity";
import Cmscity from "./views/Cmscity";
import EditActivity from "./components/EditActivity";
import EditItinerary from "./components/EditItinerary";
import Editcity from "./components/Editcity";
import Dashboard from "./views/Dashboard";
import Hashtag from "./views/Hashtag";
import Cms from "./views/Cms";

// JWT TOKEN
if (sessionStorage.jwtToken) {
  // Set auth token header auth
  setAuthToken(sessionStorage.jwtToken);
  // Decode token and get user info and exp
  const decoded = jwt_decode(sessionStorage.jwtToken);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
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
  componentDidMount() {}
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div>
            <CssBaseline />
            <Navbar />
            <div className="navApp">
              <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/signup" component={Signup} />
                <Route exact path="/cities" component={Cities} />
                <PrivateRoute exact path="/cms" component={Cms} />
                <PrivateRoute exact path="/cmsitinerary" component={Cmsitin} />
                <PrivateRoute
                  exact
                  path="/cmsactivity"
                  component={Cmsactivity}
                />
                <PrivateRoute exact path="/cmscity" component={Cmscity} />
                <PrivateRoute
                  exact
                  path="/cmscity/editcity"
                  component={Editcity}
                />
                <PrivateRoute
                  exact
                  path="/cmsitinerary/edititinerary"
                  component={EditItinerary}
                />
                <PrivateRoute
                  exact
                  path="/cmsactivity/editactivity"
                  component={EditActivity}
                />
                <PrivateRoute exact path="/dashboard" component={Dashboard} />
                <Route
                  path="/cities/:city_name"
                  render={props => <City {...props} isAuthed={true} />}
                />
                <Route
                  exact
                  path="/hashtag/:itinerary"
                  render={props => <Hashtag {...props} isAuthed={true} />}
                />
              </Switch>
            </div>
            <BottomNav />
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
