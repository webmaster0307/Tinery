import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { debounce } from "lodash";

import { fetchItineraries } from "../actions/itinerariesActions";
import { fetchCities } from "../actions/citiesActions";
import { editItinerary, deleteItinerary } from "../actions/cmsActions";

import Header from "../components/layout/Header";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import Icon from "@material-ui/core/Icon";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import FilledInput from "@material-ui/core/FilledInput";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";

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
      authorid: "",
      likes: "",
      authorimage: "",
      cityurl: "",
      hashtag: [],
      id: ""
    };
    this.editValue = this.editValue.bind(this);
  }
  componentDidMount() {
    this.props.fetchItineraries();
  }

  // SUBMIT
  onSubmit = e => {
    e.preventDefault();

    let hashtagString = this.state.hashtag.split(",");

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
      hashtag: hashtagString,
      id: this.state.id
    };

    this.props.editItinerary(this.state.id, itinData);

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
      hashtag: [],
      showlist: true
    });
    this.props.fetchItineraries();
    // this.props.history.push("/cmsitinerary/edititinerary");
  };

  //SELECT VALUE TO EDIT
  editValue = e => {
    this.props.fetchCities();
    let allitineraries = this.props.itineraries.itineraries;
    let selectedValue = allitineraries.find(itin => itin.activitykey === e);

    let hashtagCSV =
      selectedValue.hashtag === null
        ? selectedValue.hashtag
        : selectedValue.hashtag.join(",");

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
      authorid: selectedValue.authorid,
      cityurl: selectedValue.cityurl,
      hashtag: hashtagCSV,
      flagimg: selectedValue.flagimg,
      previewFile: selectedValue.flagimg,
      showlist: false
    });
  };

  // FORM INFO
  onEdit = () => {
    this.setState({
      showlist: true
    });
  };

  // DELETE BUTTON
  onDelete = () => {
    let data = {
      id: this.state.id
    };

    this.props.deleteItinerary(data.id);
    this.props.history.push("/cmsitinerary");
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
    const deleteButton = (
      <React.Fragment>
        <div className="deleteButton">
          <Button onClick={this.onDelete} variant="outlined" color="secondary">
            Delete Itinerary <Icon>delete</Icon>
          </Button>
        </div>
      </React.Fragment>
    );
    const cmstitle = (
      <React.Fragment>
        <Header title={"Edit Itineraries"} />
      </React.Fragment>
    );
    const selectCity = (
      <React.Fragment>
        <FormControl variant="filled">
          <InputLabel htmlFor="filled-city-simple">Select City:</InputLabel>
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
      <React.Fragment>
        <div className="itineraryCard">
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
              <p className="cmswarning">
                *Warning : Changing Title can affect linked Activity
              </p>
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

            {/* SUBMIT BUTTON */}
            {this.state.authorid === this.props.auth.user.id ? (
              <React.Fragment>
                <div className="cmsAction">
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={this.onSubmit}
                  >
                    Update Itinerary!<Icon>save</Icon>
                  </Button>
                </div>
                <div>{deleteButton}</div>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <div className="cmsAction">
                  <Button
                    disabled
                    variant="outlined"
                    color="primary"
                    onClick={this.onSubmit}
                  >
                    Update Itinerary!<Icon>save</Icon>
                  </Button>
                  <div>
                    <p className="cmsimagerequired">
                      *Create Your Own to enable Edit.
                    </p>
                  </div>
                </div>
              </React.Fragment>
            )}
          </Card>
        </div>
      </React.Fragment>
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
            variant="outlined"
          />
        </div>
        {/* ITINERARIES */}

        {filteredList.length < 1 ? (
          <div className="paragraphText">
            There are no itineraries matching your search query.
          </div>
        ) : (
          <React.Fragment>
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
        )}
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
        <div />
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
    profile: state.profile,
    auth: state.auth
  };
};

EditItinerary.propTypes = {
  itineraries: PropTypes.object,
  fetchItineraries: PropTypes.func,
  fetchCities: PropTypes.func
};

export default connect(
  mapStateToProps,
  { fetchItineraries, fetchCities, editItinerary, deleteItinerary }
)(EditItinerary);
