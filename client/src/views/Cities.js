import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import BtnHome from "../components/layout/BtnHome";
import Navbar from "../components/layout/Navbar";
import { fetchAxiosCities } from "../actions/fetchCities";
// import { debounce } from "lodash";

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
        <h4 className="title center">Cities List</h4>
        <div className="filter-list">
          {/* INPUT */}
          <input
            type="text"
            id="filter"
            value={this.state.query}
            placeholder="Type to Search Destinations"
            onChange={this.handleSearch}
            className="card-content center"
          />
        </div>
        {/* CITIES */}
        {filteredCities.map(city => {
          return (
            <div className="post card" key={city.cityname}>
              <div className="card-content center">
                <Link
                  to={"/cities/" + city.url}
                  cities={this.props.cities.cities}
                >
                  {city.cityname}, {city.country}
                </Link>
              </div>
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
    cities: state.cities
  };
};

Cities.propTypes = {
  cities: PropTypes.object
};

export default connect(
  mapStateToProps,
  { fetchAxiosCities }
)(Cities);
