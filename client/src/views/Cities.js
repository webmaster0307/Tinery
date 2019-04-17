import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { fetchCities } from "../actions/citiesActions";
import { getCurrentProfile } from "./../actions/profileActions";
import { debounce } from "lodash";
import Header from "../components/layout/Header";
// import Card from "@material-ui/core/Card";
// import CardContent from "@material-ui/core/CardContent";
// import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import ComplexCityButton from "./../components/layout/ComplexCityButton";

class Cities extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cities: [],
      city: "",
      country: "",
      query: "",
      error: null,
      text: ""
      // filteredCities: []
    };
  }

  componentDidMount() {
    this.props.fetchCities();
  }

  // SEARCH WITH DEBOUNCE
  handleSearch = debounce(text => {
    this.setState({
      query: text
    });
  }, 500);

  render() {
    let filteredCities = this.props.cities.cities.filter(city => {
      return (
        city.cityname.toLowerCase().includes(this.state.query.toLowerCase()) ||
        city.country.toLowerCase().includes(this.state.query.toLowerCase())
      );
    });
    return (
      <div>
        <Header title={"Cities List"} />
        <div className="citysearchflex">
          <TextField
            id="filled-with-placeholder"
            label="Search Destinations"
            type="text"
            placeholder="Type to Search Destinations"
            onChange={e => this.handleSearch(e.target.value)}
            margin="normal"
            className="cityfilter"
            variant="outlined"
          />
        </div>

        {/* CITIES */}
        <div>
          {filteredCities.length < 1 ? (
            <div className="paragraphText">
              There are no destinations matching your search query.
            </div>
          ) : (
            <React.Fragment>
              {filteredCities.map(city => {
                return (
                  <React.Fragment key={city._id}>
                    <Link
                      to={{
                        pathname: "/cities/" + city.url,
                        state: {
                          city: city.cityname,
                          country: city.country,
                          url: city.flagimg
                        }
                      }}
                      className="citylist"
                    >
                      <div className="flexIcons">
                        <div className="flexLink">
                          <ComplexCityButton
                            city={city.cityname}
                            country={city.country}
                            title={city.cityname}
                            src={city.flagimg}
                            url={city.url}
                          />
                        </div>
                      </div>
                      <div className="itineraryCard" />
                    </Link>
                  </React.Fragment>
                );
              })}
            </React.Fragment>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    cities: state.cities,
    favid: state.favid,
    profile: state.profile
  };
};

Cities.propTypes = {
  cities: PropTypes.object,
  fetchCities: PropTypes.func,
  getCurrentProfile: PropTypes.func
};

export default connect(
  mapStateToProps,
  { fetchCities, getCurrentProfile }
)(Cities);
