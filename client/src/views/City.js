import React, { Component } from "react";
import PropTypes from "prop-types";
import { getCurrentProfile } from "./../actions/profileActions";
import { connect } from "react-redux";
import { fetchCities } from "../actions/citiesActions";
import { fetchAxiosItineraries } from "../actions/itinerariesActions";

import Itinerary from "../components/Itinerary";
import Header from "../components/layout/Header";

class City extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cities: this.props.cities.cities,
      city: "",
      country: "",
      itineraries: []
    };
  }
  componentDidMount() {
    this.props.fetchAxiosItineraries(this.props.match.params.city_name);
    this.props.fetchCities();
    if (this.props.auth.isAuthenticated === true) {
      this.props.getCurrentProfile();
    }
  }
  render() {
    let showCity = (
      <span>
        {this.props.location.state.city}, {this.props.location.state.country}
      </span>
    );

    return (
      <div>
        <div>
          <Header title={showCity} />
        </div>
        <div>
          <Itinerary />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  let id = ownProps.match.params.city_name;
  return {
    city: state.cities.cities.find(city => city.id === id),
    cities: state.cities,
    profile: state.profile,
    auth: state.auth
  };
};

City.propTypes = {
  cities: PropTypes.object
};

export default connect(
  mapStateToProps,
  {
    fetchAxiosItineraries,
    fetchCities,
    getCurrentProfile
  }
)(City);
