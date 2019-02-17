import React, { Component } from "react";
import PropTypes from "prop-types";
import { BrowserRouter, Route, Switch } from "react-router-dom";
// import { BrowserRouter, Route } from "react-router-dom";

import store from "./store";
import { Provider } from "react-redux";

// import logo from "./images/logo.svg";
import "./styles/App.css";

// import Navbar from "./components/Navbar";
import City from "./components/City";
import Home from "./views/Home";
import Cities from "./views/Cities";
import Login from "./views/Login";
import Signup from "./views/Signup";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div>
            {/* <Navbar /> */}
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/Login" component={Login} />
              <Route exact path="/Signup" component={Signup} />
              <Route exact path="/Cities" component={Cities} />

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
