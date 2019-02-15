import React, { Component } from "react";
import Slider from "react-slick";

import axios from "axios";
import HomeButton from "./../components/HomeButton";

export default class CitiesList extends Component {
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
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 1
    };
    return (
      <div className="row">
        <h2> Single Item</h2>
        <Slider {...settings}>
          <div>
            <h3>1</h3>
          </div>
          <div>
            <h3>2</h3>
          </div>
          <div>
            <h3>3</h3>
          </div>
          <div>
            <h3>4</h3>
          </div>
          <div>
            <h3>5</h3>
          </div>
          <div>
            <h3>6</h3>
          </div>
        </Slider>
        <HomeButton />
      </div>
    );
  }
}
