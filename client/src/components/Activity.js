import React, { Component } from "react";
// import { fetchAxiosActivities } from "../actions/fetchActivities";
import { connect } from "react-redux";
import Slider from "react-slick";

// import Clock from "../components/Clock";

class Activity extends Component {
  componentDidMount() {
    // this.props.fetchAxiosActivities();
    // this.props.fetchAxiosItineraries();
    // this.props.fetchAxiosItineraries(this.props.match.params.city_name);
  }
  constructor() {
    super();
    this.state = { isBtn: false };
  }

  render() {
    const settings = {
      // SIMPLE SLIDER
      // dots: true,
      // infinite: true,
      // speed: 500,
      // slidesToShow: 1,
      // slidesToScroll: 1

      // FADE SLIDER
      dots: true,
      fade: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1

      //CENTER MODE SLIDER
      // className: "center",
      // centerMode: true,
      // infinite: true,
      // centerPadding: "60px",
      // slidesToShow: 1,
      // speed: 500
    };
    // console.log("from activity", this.props);
    const activityList = this.props.activities.activities.map(activity => (
      <div className="activity col" key={activity.title}>
        <h3 className="sliderImgTitle center-align"> {activity.title}</h3>
        <img alt="" className="sliderImg" width="650" src={activity.image} />
      </div>
    ));

    return (
      <div>
        <Slider {...settings}>{activityList} </Slider>
      </div>
    );
  }
}

const mapStateToProps = state => {
  // // let id = ownProps.match.params.city_name;
  return {
    // itineraries: state.itineraries,
    activities: state.activities
  };
};

export default connect(
  mapStateToProps,
  {}
)(Activity);
