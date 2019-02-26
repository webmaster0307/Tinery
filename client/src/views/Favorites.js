import React, { Component } from "react";
import Navbar from "../components/layout/Navbar";
// import { connect } from "react-redux";

class Favorites extends Component {
  render() {
    const favorites = (
      <div>
        <p>Favorites App</p>
      </div>
    );
    return (
      <React.Fragment>
        <Navbar />
        {favorites}
      </React.Fragment>
    );
  }
}

export default Favorites;
