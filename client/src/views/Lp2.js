import React from "react";
import axios from "axios";
import { checkServerIdentity } from "tls";

export default class CitiesList extends React.Component {
  state = {
    cities: []
  };

  componentDidMount() {
    console.log("didmount");
    axios.get(`http://localhost:5000/api/test/`).then(res => {
      console.log("didmount2");
      const cities = res.data;
      this.setState({ cities });
    });
  }

  render() {
    return (
      <ul>
        {this.state.cities.map(city => (
          <li>{city.cityname}</li>
        ))}
      </ul>
    );
  }
}
