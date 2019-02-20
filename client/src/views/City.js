import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { fetchAxiosCities } from "../actions/fetchCities";
import { fetchAxiosItineraries } from "../actions/fetchItineraries";
import { fetchAxiosActivities } from "../actions/fetchActivities";
import Itinerary from "../components/Itinerary";

class City extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cities: this.props.cities.cities,
      activities: [],
      itineraries: [],
      city: []
    };
  }
  componentDidMount() {
    this.props.fetchAxiosItineraries(this.props.match.params.city_name);
    this.props.fetchAxiosActivities();
    this.props.fetchAxiosCities();
    // console.log("from city comp :", this.props);
    // console.log("from city comp props :", this.props.cities);
    // console.log("from city comp state :", this.state.cities);
    // console.log("from city comp params", this.props.match.params.city_name);
  }
  render() {
    let city = this.state.cities.find(
      city => city.url === this.props.match.params.city_name
    );
    // console.log(city);
    const showCity = city ? (
      <div className="card city_heading ">
        {city.cityname}, {city.country}
      </div>
    ) : (
      <div className="card city_heading ">
        {this.props.match.params.city_name.toUpperCase()}
      </div>
    );

    // console.log(this.state.city);
    // console.log(this.state.cities);
    // console.log(this.state.cities.cities);
    // console.log(this.props.match.params.city_name);

    return (
      <div>
        <div>
          <div className="card city_heading ">{showCity}</div>
        </div>

        <div className="city">
          <Itinerary />

          {/* CHOOSE ALL CITIES */}

          <div>
            <Link className="" to={"/cities/"}>
              <i className="icons medium material-icons" to={"/cities/"}>
                location_city
              </i>
              <div className="icons">Choose Another City</div>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

// const mapStateToProps = state => {
//   return {
//     cities: state.cities,
//     activities: state.activities,
//     itineraries: state.itineraries
//   };
// };

const mapStateToProps = (state, ownProps) => {
  let id = ownProps.match.params.city_name;
  return {
    city: state.cities.cities.find(city => city.id === id),
    cities: state.cities
  };
};

City.propTypes = {
  cities: PropTypes.object
};

export default connect(
  mapStateToProps,
  { fetchAxiosItineraries, fetchAxiosActivities, fetchAxiosCities }
)(City);
