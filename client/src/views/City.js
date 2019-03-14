import React, { Component } from "react";
import PropTypes from "prop-types";
import { getCurrentProfile } from "./../actions/profileActions";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { fetchAxiosCities } from "../actions/citiesActions";
import { fetchAxiosItineraries } from "../actions/itinerariesActions";
// import { fetchAxiosActivities } from "../actions/activitiesActions";
import Itinerary from "../components/Itinerary";
import Navbar from "../components/layout/Navbar";
import Typography from "@material-ui/core/Typography";

class City extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cities: this.props.cities.cities,
      city: [],
      itineraries: [],
      favid: []
    };
  }
  componentDidMount() {
    this.props.fetchAxiosItineraries(this.props.match.params.city_name);
    this.props.fetchAxiosCities();
    this.props.getCurrentProfile();
  }
  render() {
    // console.log("clog", this.state);
    // console.log("clog props", this.props);
    let city = this.state.cities.find(
      city => city.url === this.props.match.params.city_name
    );

    const showCity = city ? (
      <div>
        {city.cityname}, {city.country}
      </div>
    ) : (
      <div>{this.props.match.params.city_name.toUpperCase()}</div>
    );

    return (
      <div>
        <Navbar />
        <div>
          <Typography
            className="city"
            component="h2"
            variant="display2"
            gutterBottom
          >
            {showCity}
          </Typography>
          {/* <div className="card city_heading ">{showCity}</div> */}
        </div>

        <div>
          <Itinerary />

          {/* CHOOSE ALL CITIES */}
          <div>
            <Link className="" to={"/cities/"}>
              <i className="icons medium material-icons" to={"/cities/"}>
                location_city
              </i>
              <div className="city icons">Choose Another City</div>
            </Link>
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
    favid: state.favid,
    profile: state.profile
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
