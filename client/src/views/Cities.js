import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { fetchCities } from "../actions/citiesActions";
import { getCurrentProfile } from "./../actions/profileActions";
import { debounce } from "lodash";
import Header from "../components/layout/Header";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";

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
            variant="filled"
          />
        </div>

        {/* CITIES */}
        <div>
          {filteredCities.map(city => {
            return (
              <div key={city._id}>
                <Card className="city citycard" raised>
                  <Link
                    to={{
                      pathname: "/cities/" + city.url,
                      state: {
                        city: city.cityname,
                        country: city.country
                      }
                    }}
                    className="citylist"
                  >
                    <CardContent>
                      <img
                        alt="proflagfile"
                        src={city.flagimg}
                        className="cityImg"
                      />

                      <Typography variant="button">{city.cityname}</Typography>
                      <Typography>{city.country}</Typography>
                    </CardContent>
                  </Link>
                </Card>
              </div>
            );
          })}
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
