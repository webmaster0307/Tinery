import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
// import { fetchAxiosCities } from "../actions/fetchCities";
import { fetchAxiosItineraries } from "../actions/fetchItineraries";
import { fetchAxiosActivities } from "../actions/fetchActivities";
import Itinerary from "./Itinerary";

class City extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // cities: [],
      activities: [],
      itineraries: []
    };
  }
  componentDidMount() {
    // this.props.fetchAxiosCities();
    this.props.fetchAxiosItineraries(this.props.match.params.city_name);
    this.props.fetchAxiosActivities();
    // this.props.fetchAxiosActivities(
    //   this.props.activities.activities.activitykey
    // );
    // this.setState({
    //   cities: this.props.cities.cities
    // });
  }
  render() {
    // console.log("itin props", this.props.itineraries.itineraries);
    // console.log(this.props.cities);
    // console.log(this.props.itineraries.itineraries);
    // console.log(this.props.activities.activities);
    // console.log(this.props);
    // console.log(this.props.activities.activities);
    // console.log("City Specific Info : ", this.props.cities);
    // const cityprop = this.props.city.find(
    //   city => city.url === this.props.match.params.city_name
    // );
    // console.log(cityprop);
    // console.log("city prop params :", this.props.match.params.city_name);
    return (
      <div>
        <div>
          <h1 className="city_heading">
            {this.props.match.params.city_name.toUpperCase()}
          </h1>
        </div>

        <div className="city">
          <Itinerary />
          {/* <button className="btn-flat" to={"/cities/"}>
            <Link className="waves-effect waves-teal btn-large" to={"/cities/"}>
              Choose Another City
            </Link>
          </button> */}

          {/* CHOOSE ALL CITIES */}
          {/* <a
            href={"/cities/"}
            className="waves-effect waves-light btn-flat btn-large"
            to={"/cities/"}
          > */}
          <i className="material-icons left" to={"/cities/"}>
            location_city
          </i>
          <Link className="" to={"/cities/"}>
            Choose Another City
          </Link>
          {/* </a> */}

          {/* <div>{cityprop}</div> */}
          {/* <h4 className="center">{this.props.cities.id}</h4> */}
          {/* <h4 className="center">{this.props.city.city_name}</h4>
        <p className="center">{this.props.city.country}</p> */}
        </div>
      </div>
    );
    // return this.props.city.map(city => <p> {city.id} </p>);
  }
}
// render() {
//   console.log(this.props.cities.cities);
//   console.log(this.props.match.params.city_name);
//   const city = this.props.cityname ? (
//     <div className="city">
//       <h4 className="center">{this.props.city.cityname}</h4>
//       <p className="center">{this.props.city.country}</p>
//     </div>
//   ) : (
//     <div className="center">Loading city...</div>
//   );
//   return <div className="container">{city}</div>;
// }
// render() {
//   // console.log(this.props.cities.cities);
//   console.log(this.props.match.params.city_name);
//   return (
//     <div>
//       {this.props.cities.cities.map(function(city, index) {
//         return (
//           <div className="post card" key={index}>
//             <div className="card-content center">
//               {city.cityname}, {city.country}
//             </div>
//           </div>
//         );
//       })}
//     </div>
//   );
// }
// }

// this.props.cities.cities

// const mapStateToProps = (state, ownProps) => {
//   let id = ownProps.match.params.city_name;
//   return {
//     cities: state.cities.find(city => city.url === id)
//   };
// };

// const mapStateToProps = (props, ownProps) => {
//   let id = ownProps.match.params.city_name;
//   // console.log("Cities Axios .Get : ", props.cities.cities);
//   // console.log("Itinerary Axios .Get : ", props.itineraries.itineraries);
//   // console.log(ownProps.match.params.city_name);
//   return {
//     cities: props.cities.cities.find(city => city.url === id)
//     // cities: props.cities
//     // city: props.cities.cities
//   };
// };

const mapStateToProps = state => {
  return {
    // cities: state.cities,
    activities: state.activities,
    itineraries: state.itineraries
  };
};

export default connect(
  mapStateToProps,
  { fetchAxiosItineraries, fetchAxiosActivities }
)(City);

// export default City;
// export default connect(mapStateToProps)(City);
