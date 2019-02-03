import React, { Component } from "react";
// import { Link } from "react-router-dom";
import { connect } from "react-redux";

class City extends Component {
  render() {
    const city = this.props.city ? (
      <div className="city">
        <h4 className="center">{this.props.city.city}</h4>
        <p className="center">{this.props.city.country}</p>
      </div>
    ) : (
      <div className="center">Loading city...</div>
    );
    return <div className="container">{city}</div>;
  }
}

const mapStateToProps = (state, ownProps) => {
  let id = ownProps.match.params.city_name;
  return {
    city: state.cities.find(city => city.url === id)
  };
};

export default connect(mapStateToProps)(City);
