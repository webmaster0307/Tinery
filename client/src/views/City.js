import React, { Component } from "react";
import PropTypes from "prop-types";
import { getCurrentProfile } from "./../actions/profileActions";

import { connect } from "react-redux";
import { fetchAxiosCities } from "../actions/citiesActions";
import { fetchAxiosItineraries } from "../actions/itinerariesActions";
import IconCity from "../components/layout/IconCity";
// import { fetchAxiosActivities } from "../actions/activitiesActions";
import Itinerary from "../components/Itinerary";

import Typography from "@material-ui/core/Typography";

class City extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cities: this.props.cities.cities,
      city: "",
      country: "",
      itineraries: []
      // favid: []
    };
  }
  componentDidMount() {
    this.props.fetchAxiosItineraries(this.props.match.params.city_name);
    this.props.fetchAxiosCities();
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
          <Typography
            className="city"
            component="h2"
            variant="display2"
            gutterBottom
          >
            {showCity}
          </Typography>
        </div>

        <div>
          <Itinerary />

          <div>
            <IconCity />
          </div>
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
    // favid: state.favid,
    profile: state.profile,
    auth: state.auth

    // itineraries: state.itineraries
    // eventId: state.event.target.id,
  };
};

City.propTypes = {
  cities: PropTypes.object
};

export default connect(
  mapStateToProps,
  {
    fetchAxiosItineraries,
    fetchAxiosCities,
    getCurrentProfile
  }
)(City);
