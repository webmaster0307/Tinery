import React from "react";
import axios from "axios";
import HomeButton from "./../components/HomeButton";

export default class CitiesList extends React.Component {
  state = {
    cities: []
  };

  componentDidMount() {
    console.log("didmount");
    axios.get(`/api/test/`).then(res => {
      console.log("didmount2");
      const cities = res.data;
      this.setState({ cities });
    });
  }

  render() {
    return (
      <ul>
        {this.state.cities.map(city => (
          <div>
            <li>{city.cityname}</li>
          </div>
        ))}
        <HomeButton />;
      </ul>
    );
  }
}
