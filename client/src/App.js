import React, { Component } from "react";

import { BrowserRouter, Route, Switch } from "react-router-dom";
// import { BrowserRouter, Route } from "react-router-dom";
// import logo from "./images/logo.svg";
import "./styles/App.css";

// import Navbar from "./components/Navbar";
import City from "./components/City";
import Home from "./views/Home";
import Cities from "./views/Cities";
import Login from "./views/Login";
import Signup from "./views/Signup";
import Lp1 from "./views/Lp1";
import Lp2 from "./views/Lp2";
import Rex from "./views/Rex";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          {/* <Navbar /> */}
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/Login" component={Login} />
            <Route exact path="/Signup" component={Signup} />
            <Route exact path="/Cities" component={Cities} />
            <Route exact path="/Lp1" component={Lp1} />
            <Route exact path="/Lp2" component={Lp2} />
            <Route exact path="/React_exercises" component={Rex} />

            {/* <Route exact path="/City/:city_name" component={City} /> */}
            <Route
              path="/City/:city_name"
              render={props => <City {...props} isAuthed={true} />}
            />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
