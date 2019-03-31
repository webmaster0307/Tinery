import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createItinerary } from "../actions/cmsActions";
import { fetchAxiosCities } from "../actions/citiesActions";
import { Link } from "react-router-dom";

import Header from "../components/layout/Header";

import Card from "@material-ui/core/Card";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import FilledInput from "@material-ui/core/FilledInput";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";

class Cmsitin extends Component {
  constructor() {
    super();
    this.state = {
      cities: [],
      author: "",
      authorimage: "",
      title: "",
      activitykey: "",
      duration: "",
      likes: "",
      hashtag: [],
      rating: "",
      price: "",
      cityurl: "",
      cityname: ""
    };
  }

  componentDidMount() {
    this.props.fetchAxiosCities();
  }

  //SUBMIT
  onSubmit = e => {
    e.preventDefault();
    const itinData = {
      title: this.state.title,
      activitykey: this.state.activitykey,
      rating: this.state.rating,
      duration: this.state.duration,
      price: this.state.price,
      author: this.props.auth.user.username,
      likes: this.state.likes,
      authorimage: this.props.auth.user.avatar,
      cityurl: this.state.cityurl,
      hashtag: this.state.hashtag,
      id: this.state.id
    };

    this.props.createItinerary(itinData);
    alert("Upload successful");
    this.setState({
      title: "",
      rating: "",
      duration: "",
      price: "",
      likes: "",
      cityurl: "",
      cityname: "",
      activitykey: "",
      hashtag: []
    });
  };

  // FORM INFO
  onChange = e => {
    console.log(this.state.cityurl);
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  //CONVERT TO SNAKE CASE
  onSnakecase = e => {
    var value = e.target.value;
    this.setState({
      [e.target.name]: e.target.value,
      activitykey: value
        .split(" ")
        .join("_")
        .toLowerCase()
    });
  };

  render() {
    const cmstitle = (
      <React.Fragment>
        <div>
          <Header title={"Create Itineraries"} />
        </div>
        <div className="cmsTitletext">
          <p>Fill out the form below to create a new city.</p>
          <p>Or click below to edit an existing Itinerary.</p>
          <div>
            <Link to="/cmsitin/edititinerary">
              <Button variant="outlined">Edit Itineraries</Button>
            </Link>
          </div>
        </div>
      </React.Fragment>
    );
    const selectCity = (
      <React.Fragment>
        <FormControl variant="filled">
          <InputLabel htmlFor="filled-city-simple">
            Select Parent City (Key):
          </InputLabel>
          <Select
            className="selectForms"
            value={this.state.cityurl}
            onChange={this.onChange}
            type="select"
            name="cityurl"
            input={<FilledInput name="cityurl" id="filled-city-simple" />}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {this.props.cities.cities.map(city => {
              return (
                <MenuItem key={city._id} value={city.url}>
                  {city.cityname}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </React.Fragment>
    );
    const selectPrice = (
      <React.Fragment>
        <FormControl variant="filled">
          <InputLabel htmlFor="filled-price-simple">
            Select Price Range:
          </InputLabel>
          <Select
            className="selectForms"
            value={this.state.price}
            onChange={this.onChange}
            type="select"
            name="price"
            input={<FilledInput name="price" id="filled-price-simple" />}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={"$"}>$</MenuItem>
            <MenuItem value={"$$"}>$$</MenuItem>
            <MenuItem value={"$$$"}>$$$</MenuItem>
          </Select>
        </FormControl>
      </React.Fragment>
    );
    const selectRating = (
      <React.Fragment>
        <FormControl variant="filled">
          <InputLabel htmlFor="filled-rating-simple">
            Select Rating out of 5:
          </InputLabel>
          <Select
            className="selectForms"
            value={this.state.rating}
            onChange={this.onChange}
            type="select"
            name="rating"
            input={<FilledInput name="rating" id="filled-rating-simple" />}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={1}>*</MenuItem>
            <MenuItem value={2}>**</MenuItem>
            <MenuItem value={3}>***</MenuItem>
            <MenuItem value={4}>****</MenuItem>
            <MenuItem value={5}>*****</MenuItem>
          </Select>
        </FormControl>
      </React.Fragment>
    );

    const cmsbody = (
      <div>
        <Card raised className="commentForm">
          <form
            encType="multipart/form-data"
            noValidate
            onSubmit={this.onSubmit}
          >
            <div>
              <TextField
                className="commentFormInput"
                id="outlined-with-placeholder"
                label="Please enter Itinerary Title:"
                placeholder=""
                margin="normal"
                variant="outlined"
                type="text"
                name="title"
                value={this.state.title}
                onChange={this.onSnakecase}
              />
            </div>
            <div> {selectCity}</div>
            <div>
              <TextField
                className="commentFormInput"
                id="outlined-with-placeholder"
                label="Please enter number of Likes:"
                placeholder=""
                margin="normal"
                variant="filled"
                type="number"
                name="likes"
                value={this.state.likes}
                onChange={this.onChange}
              />
            </div>
            <div>{selectRating}</div>
            <div>{selectPrice}</div>
            <div>
              <TextField
                className="commentFormInput"
                id="outlined-with-placeholder"
                label="Please enter number of Hours:"
                placeholder=""
                margin="normal"
                variant="filled"
                type="number"
                name="duration"
                value={this.state.duration}
                onChange={this.onChange}
              />
            </div>
            <div>
              <TextField
                className="commentFormInput"
                id="outlined-with-placeholder"
                label="Please enter Hashtags:"
                placeholder="Seperate with Comma, maximum of 3."
                margin="normal"
                variant="outlined"
                type="text"
                name="hashtag"
                value={this.state.hashtag}
                onChange={this.onChange}
              />
            </div>
          </form>
          {/* SUBMIT BUTTON */}
          <button className="submitCommentBtn" onClick={this.onSubmit}>
            Upload Itinerary!
          </button>
        </Card>
      </div>
    );

    return (
      <React.Fragment>
        {cmstitle}
        {cmsbody}
      </React.Fragment>
    );
  }
}

Cmsitin.propTypes = {
  createItinerary: PropTypes.func,
  fetchAxiosCities: PropTypes.func,
  auth: PropTypes.object
};

const mapStateToProps = state => ({
  cities: state.cities,
  favid: state.favid,
  profile: state.profile,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { createItinerary, fetchAxiosCities }
)(Cmsitin);
