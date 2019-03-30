import React, { Component } from "react";
import PropTypes from "prop-types";
// import { Link } from "react-router-dom";
import axios from "axios";
import { connect } from "react-redux";
import { debounce } from "lodash";
// import BottomNav from "../components/layout/BottomNav";

import { fetchItineraries } from "../actions/itinerariesActions";
import { fetchAxiosCities } from "../actions/citiesActions";

import Header from "../components/layout/Header";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import FilledInput from "@material-ui/core/FilledInput";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import { CircularProgress } from "@material-ui/core";

class EditItinerary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showlist: true,
      query: "",
      error: null,
      text: "",
      //EDIT
      itineraries: [],
      title: "",
      activitykey: "",
      rating: "",
      duration: "",
      price: "",
      author: "",
      likes: "",
      authorimage: "",
      cityurl: "",
      // hashtag: [],
      hashtag: [],
      // hashtagArray: "",

      // flagimg: null,
      // previewFile: null,
      id: ""
    };
    this.editValue = this.editValue.bind(this);
  }
  componentDidMount() {
    this.props.fetchItineraries();
  }

  //SELECT VALUE TO EDIT
  editValue = e => {
    // console.log(e);

    this.props.fetchAxiosCities();
    let allitineraries = this.props.itineraries.itineraries;
    let selectedValue = allitineraries.find(itin => itin.activitykey === e);

    let hashtagCSV =
      selectedValue.hashtag === null
        ? selectedValue.hashtag
        : selectedValue.hashtag.join(",");

    // let hashtagCSV = selectedValue.hashtag;
    // console.log("from edit", hashtagCSV);
    // console.log("from edit", selectedValue.hashtag);

    this.setState({
      id: selectedValue._id,
      title: selectedValue.title,
      activitykey: selectedValue.activitykey,
      rating: selectedValue.rating,
      duration: selectedValue.duration,
      price: selectedValue.price,
      author: selectedValue.author,
      likes: selectedValue.likes,
      authorimage: selectedValue.authorimage,
      cityurl: selectedValue.cityurl,
      hashtag: hashtagCSV,
      // hashtagArray: selectedValue.hashtag,
      // hashtag: selectedValue.hashtag,
      // country: selectedValue.country,
      // url: selectedValue.url,
      flagimg: selectedValue.flagimg,
      previewFile: selectedValue.flagimg,
      showlist: false
    });

    // console.log(this.state);
  };

  // SUBMIT
  onSubmit = e => {
    e.preventDefault();

    let hashtagString = this.state.hashtag.split(",");
    console.log(hashtagString);
    console.log(this.state.hashtag);
    // console.log(this.state.hashtagArray);

    // const formData = new FormData();
    // formData.append("title", this.state.title);
    // formData.append("activitykey", this.state.activitykey);
    // formData.append("rating", this.state.rating);
    // formData.append("duration", this.state.duration);
    // formData.append("price", this.state.price);
    // formData.append("author", this.state.author);
    // formData.append("likes", this.state.likes);
    // formData.append("authorimage", this.state.authorimage);
    // formData.append("cityurl", this.state.cityurl);
    // // formData.append("hashtag", this.state.hashtag);
    // formData.append("hashtag", hashtagString);
    // formData.append("id", this.state.id);

    const itinData = {
      title: this.state.title,
      activitykey: this.state.activitykey,
      rating: this.state.rating,
      duration: this.state.duration,
      price: this.state.price,
      author: this.state.author,
      likes: this.state.likes,
      authorimage: this.state.authorimage,
      cityurl: this.state.cityurl,
      // hashtag : this.state.hashtag,
      hashtag: hashtagString,
      id: this.state.id
    };

    //MIGRATE TO REDUX
    axios.post(`/api/cms/itin/${this.state.id}`, itinData, {});
    // axios.post(`/api/cms/itin/${this.state.id}`,  { itinData: itinData.favorites }, {});
    alert("Upload successful");
    this.setState({
      id: "",
      title: "",
      activitykey: "",
      rating: "",
      duration: "",
      price: "",
      author: "",
      likes: "",
      authorimage: "",
      cityurl: "",
      hashtag: []
      // authorimage: null,
      // previewFile: null
    });

    //MIGRATE TO REDUX
    this.props.fetchItineraries();
  };

  // FORM INFO
  onEdit = () => {
    this.setState({
      showlist: true
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
    var val = e.target.value;
    this.setState({
      [e.target.name]: e.target.value,
      activitykey: val
        .split(" ")
        .join("_")
        .toLowerCase()
    });
  };

  // SEARCH WITH DEBOUNCE
  handleSearch = debounce(text => {
    this.setState({
      query: text
    });
  }, 500);

  render() {
    // const previewFile = this.state.previewFile;
    const cmstitle = (
      <React.Fragment>
        <div>
          <Header title={"Edit Itineraries"} />
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
            <p>*Warning : Changing Title can affect Children</p>
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
            Update Itinerary!
          </button>
        </Card>
      </div>
    );

    let filteredList = this.props.itineraries.itineraries.filter(itin => {
      return (
        itin.title.toLowerCase().includes(this.state.query.toLowerCase()) ||
        itin.cityurl
          .replace(/_/g, " ")
          .toLowerCase()
          .includes(this.state.query.toLowerCase())
      );
    });

    const searchlist = (
      <React.Fragment>
        <div className="cmsTitletext">
          <p>Edit an Itinerary from the list below :</p>
        </div>
        <div className="citysearchflex">
          <TextField
            id="filled-with-placeholder"
            label="Search Itineraries"
            type="text"
            placeholder="Type to Search Itineraries"
            onChange={e => this.handleSearch(e.target.value)}
            margin="normal"
            className="cityfilter"
            variant="filled"
          />
        </div>
        {/* ITINERARIES */}

        {filteredList.map(itin => {
          return (
            <div key={itin._id} className="editCmsitems">
              <Button onClick={this.editValue.bind(this, itin.activitykey)}>
                {itin.title} - {itin.cityurl.replace(/_/g, " ")}
              </Button>
            </div>
          );
        })}
      </React.Fragment>
    );

    const selectedItin = (
      <React.Fragment>
        <div className="cmsTitletext">
          <p>Editing : {this.state.title}</p>
          <Button onClick={this.onEdit} variant="outlined">
            Edit Itineraries
          </Button>
        </div>
        {cmsbody}
        <div className="bottomNav">
          {/* {previewFile === null ? noPreview : preview} */}
        </div>
      </React.Fragment>
    );

    return (
      <React.Fragment>
        {cmstitle}
        {this.state.showlist === true ? searchlist : selectedItin}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    itineraries: state.itineraries,
    cities: state.cities,
    profile: state.profile
  };
};

EditItinerary.propTypes = {
  itineraries: PropTypes.object,
  fetchItineraries: PropTypes.func,
  fetchAxiosCities: PropTypes.func
};

export default connect(
  mapStateToProps,
  { fetchItineraries, fetchAxiosCities }
)(EditItinerary);
