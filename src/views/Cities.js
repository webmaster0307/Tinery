import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import HomeButton from "../components/HomeButton";

class Cities extends Component {
  state = {
    name: null
  };
  componentDidMount() {
    console.log(this.props);
    let name = this.props.match.params.city_name;
    this.setState({
      name: name
    });
  }
  render() {
    const { cities } = this.props;
    return (
      <div>
        <h4 className="title center">Cities List</h4>
        {cities.map(function(city, index) {
          return (
            <div className="post card" key={index}>
              <div className="card-content center">
                <Link to={"/city/" + city.url}>
                  {city.id} : {city.city}, {city.country}
                </Link>
              </div>
            </div>
          );
        })}
        <HomeButton />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    cities: state.cities
  };
};

export default connect(mapStateToProps)(Cities);
