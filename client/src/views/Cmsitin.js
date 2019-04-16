import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createItinerary } from "../actions/cmsActions";
import { fetchCities } from "../actions/citiesActions";
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
import Icon from "@material-ui/core/Icon";

class Cmsitin extends Component {
  constructor() {
    super();
    this.state = {
      errors: {},
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

  // ERROR MAPPING
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  componentDidMount() {
    this.props.fetchCities();
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
      authorid: this.props.auth.user.id,
      likes: this.state.likes,
      authorimage: this.props.auth.user.avatar,
      cityurl: this.state.cityurl,
      hashtag: this.state.hashtag,
      id: this.state.id
    };

    this.props.createItinerary(itinData);
    // alert("Upload successful");
    this.setState({
      title: "",
      rating: "",
      duration: "",
      price: "",
      likes: "",
      cityurl: "",
      cityname: "",
      activitykey: "",
      author: "",
      hashtag: []
    });
  };

  // FORM INFO
  onChange = e => {
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
    const { errors } = this.state;

    const cmstitle = (
      <React.Fragment>
        <Header title={"Create Itineraries"} />
        <div className="cmsTitletext">
          <p>Fill out the form below to create a new city.</p>
          <p>Or click below to edit an existing Itinerary.</p>
          <div>
            <Link to="/cmsitinerary/edititinerary">
              <Button variant="outlined">Edit Itineraries</Button>
            </Link>
          </div>
        </div>
      </React.Fragment>
    );
    const selectCity = (
      <React.Fragment>
        <FormControl variant="filled">
          <InputLabel htmlFor="filled-city-simple">Select City :</InputLabel>
          <Select
            className="selectForms"
            value={this.state.cityurl}
            onChange={this.onChange}
            type="select"
            name="cityurl"
            errorform={errors.cityurl}
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
          {errors.cityurl && (
            <div className="invalid-feedback">{errors.cityurl}</div>
          )}
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
            errorform={errors.price}
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
            errorform={errors.rating}
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
      <React.Fragment>
        <div className="itineraryCard">
          <Card raised className="commentForm">
            <form encType="multipart/form-data" onSubmit={this.onSubmit}>
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
                  errorform={errors.title}
                />
              </div>
              {errors.title && (
                <div className="invalid-feedback">{errors.title}</div>
              )}
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
                  errorform={errors.likes}
                />
              </div>
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
                  errorform={errors.duration}
                />
              </div>
              <div>{selectRating}</div>
              <div>{selectPrice}</div>
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

            {/* SUBMIT BUTTON VALIDATION */}
            {!this.state.title ||
            !this.state.rating ||
            !this.state.cityurl ||
            !this.state.duration ||
            !this.state.price ||
            !this.state.likes ||
            this.state.hashtag.length === 0 ? (
              <React.Fragment>
                <div className="cmsAction">
                  <Button variant="outlined" color="primary" disabled>
                    Create Itinerary!<Icon>save</Icon>
                  </Button>
                </div>
                <div>
                  <p className="cmsimagerequired">
                    *Fill out Form to enable Create Itinerary.
                  </p>
                </div>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <div className="cmsAction">
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={this.onSubmit}
                    value="Submit"
                  >
                    Create Itinerary!<Icon>save</Icon>
                  </Button>
                </div>
              </React.Fragment>
            )}
          </Card>
        </div>
      </React.Fragment>
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
  fetchCities: PropTypes.func,
  auth: PropTypes.object
};

const mapStateToProps = state => ({
  cities: state.cities,
  favid: state.favid,
  profile: state.profile,
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { createItinerary, fetchCities }
)(Cmsitin);
