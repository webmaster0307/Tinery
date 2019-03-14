import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import BtnHome from "../components/layout/BtnHome";
import Navbar from "../components/layout/Navbar";
import { fetchAxiosCities } from "../actions/citiesActions";
// import { debounce } from "lodash";

import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import { getCurrentProfile } from "./../actions/profileActions";

class Cities extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cities: [],
      query: "",
      error: null
      // filteredCities: []
    };
  }

  componentDidMount() {
    // console.log(this.props);
    this.props.fetchAxiosCities();
    // CONVERT REDUX TO LOCAL STATE
    // this.setState({
    //   cities: this.props.cities.cities
    // });
  }
  // makeRemoteRequest = () => {
  //   this.setState({ loading: true });

  //   fetchAxiosCities(this.state.query)
  //     .then(users => {
  //       this.setState({
  //         loading: false,
  //         cities: users,
  //         fullCities: users
  //       });
  //     })
  //     .catch(error => {
  //       this.setState({ error, loading: false });
  //     });
  // };
  // handleSearch = text => {
  //   console.log("text", text);
  //   this.setState({
  //     query: text
  //   });
  // };

  // handleSearch = debounce(text => {
  //   this.setState({
  //     query: text
  //   });
  // }, 100);

  // debounceEvent(...args) {
  //   this.debouncedEvent = debounce(...args);
  //   console.log(this.query);
  //   return e => {
  //     e.persist();
  //     return this.debouncedEvent(e);
  //   };
  // }
  // onChange={this.debounceEvent(this.handleSearch, 500)}
  // handleSearch = e => {
  //   this.setState({
  //     query: e.target.value
  //   });
  // };
  // handleFilter = debounce(
  //   text => this.setState({ cities: this.filteredCities(text) }),
  //   500
  // );

  // handleSearch = text => {
  //   this.setState(
  //     {
  //       query: text
  //     },
  //     () => {
  //       this.handleFilter(text);
  //     }
  //   );
  // };
  handleSearch = event => {
    this.setState({
      query: event.target.value
    });
  };

  render() {
    // console.log(this.props.cities.cities);
    // let filteredCities = this.props.cities.cities.filter(
    //   debounce(city => {
    //     return city.cityname
    //       .toLowerCase()
    //       .includes(this.state.query.toLowerCase());
    //   }),
    //   500
    // );
    let filteredCities = this.props.cities.cities.filter(city => {
      return city.cityname
        .toLowerCase()
        .includes(this.state.query.toLowerCase());
    });
    return (
      <div>
        <Navbar />
        {/* <Card className="city" raised> */}
        {/* <CardHeader> */}
        <Typography
          className="city"
          component="h2"
          variant="display2"
          gutterBottom
        >
          Cities List
        </Typography>
        {/* </CardHeader> */}
        {/* </Card> */}
        <div className="citysearchflex">
          {/* INPUT */}
          <TextField
            id="filled-with-placeholder"
            label="Search Cities"
            type="text"
            placeholder="Type to Search Destinations"
            onChange={this.handleSearch}
            margin="normal"
            className="cityfilter"
            variant="outlined"
          />
          {/* <input
            type="text"
            id="filter"
            value={this.state.query}
            placeholder="Type to Search Destinations"
            onChange={this.handleSearch}
            className="cityfilter"
          /> */}
        </div>
        {/* CITIES */}
        {filteredCities.map(city => {
          return (
            <div key={city._id}>
              <Card className="city citycard">
                <Link
                  to={"/cities/" + city.url}
                  cities={this.props.cities.cities}
                  className="citylist"
                >
                  <CardActionArea>
                    <CardContent>
                      <img
                        alt="proflagfile"
                        src={city.flagimg}
                        className="dashboardImg"
                      />
                      <Typography gutterBottom variant="h5" component="h2">
                        {/* <Link
                        to={"/cities/" + city.url}
                        cities={this.props.cities.cities}
                        className="citylist"
                      > */}
                        <Typography variant="button" gutterBottom>
                          <span>{city.cityname}</span>
                        </Typography>
                        {/* </Link> */}
                      </Typography>
                      <Typography>{city.country}</Typography>
                    </CardContent>
                  </CardActionArea>
                </Link>
              </Card>
            </div>
          );
        })}
        <BtnHome />
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
  cities: PropTypes.object
};

export default connect(
  mapStateToProps,
  { fetchAxiosCities, getCurrentProfile }
)(Cities);
