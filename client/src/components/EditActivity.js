import React, { Component } from "react";
import PropTypes from "prop-types";
// import { Link } from "react-router-dom";
import axios from "axios";
import { connect } from "react-redux";
import { debounce } from "lodash";
// import BottomNav from "../components/layout/BottomNav";

import { fetchActivities } from "../actions/activitiesActions";
import { fetchItineraries } from "../actions/itinerariesActions";

import Header from "../components/layout/Header";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import FilledInput from "@material-ui/core/FilledInput";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";

class EditActivity extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showlist: true,
      query: "",
      error: null,
      text: "",
      //EDIT
      itineraries: [],
      activities: [],
      title: "",
      activitykey: "",
      image: null,
      previewFile: null,
      // url: "",
      id: ""
    };
    this.editValue = this.editValue.bind(this);
    this.onChange = this.onChange.bind(this);
  }
  componentDidMount() {
    this.props.fetchActivities();
  }

  // SEARCH WITH DEBOUNCE
  handleSearch = debounce(text => {
    this.setState({
      query: text
    });
  }, 500);

  // IMAGE INFO
  fileChangedHandler = event => {
    this.setState({
      image: event.target.files[0],
      previewFile: URL.createObjectURL(event.target.files[0])
    });
    console.log(this.state);
    console.log(typeof this.state.image);
    console.log(typeof this.state.previewFile);
  };

  // SUBMIT
  onSubmit = e => {
    e.preventDefault();
    console.log(this.parentItin);
    const formData = new FormData();
    formData.append("title", this.state.title);
    formData.append("activitykey", this.state.activitykey);
    formData.append("image", this.state.image);
    formData.append("id", this.state.id);

    //MIGRATE TO REDUX
    axios.post(`/api/cms/activity/${this.state.id}`, formData, {});
    alert("Upload successful");
    this.setState({
      id: "",
      title: "",
      activitykey: "",
      image: null,
      previewFile: null
    });
    //MIGRATE TO REDUX
    this.props.fetchActivities();
  };

  //SELECT VALUE TO EDIT
  editValue = e => {
    this.props.fetchItineraries();

    let allactivities = this.props.activities.activities;
    let selectedValue = allactivities.find(activity => activity.title === e);
    this.setState({
      id: selectedValue._id,
      activitykey: selectedValue.activitykey,
      title: selectedValue.title,
      image: selectedValue.image,
      previewFile: selectedValue.image,
      showlist: false
    });
  };

  // TOGGLE BETWEEN LIST AND FORM
  onEdit = () => {
    this.setState({
      showlist: true
    });
  };

  // FORM INFO
  onChange = e => {
    const parentItin = e.target.value;
    this.setState({
      [e.target.name]: e.target.value,
      activitykey: parentItin
    });
  };

  render() {
    const previewFile = this.state.previewFile;
    const cmstitle = (
      <React.Fragment>
        <div>
          <Header title={"Edit Activity"} />
        </div>
      </React.Fragment>
    );
    const selectItinerary = (
      <React.Fragment>
        <FormControl variant="filled">
          <InputLabel htmlFor="filled-itin-simple">
            Select Parent Itinerary (Key):
          </InputLabel>
          <Select
            className="selectForms"
            value={this.state.activitykey}
            onChange={this.onChange}
            type="select"
            name="activitykey"
            input={<FilledInput name="activitykey" id="filled-itin-simple" />}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {this.props.itineraries.itineraries.map(itin => {
              let cityName = itin.cityurl
                .split("_")
                .map(s => s.charAt(0).toUpperCase() + s.substring(1))
                .join(" ");
              return (
                <MenuItem key={itin._id} value={itin.activitykey}>
                  {itin.title} - {cityName}
                </MenuItem>
              );
            })}
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
                label="Please enter Activity Title:"
                placeholder=""
                margin="normal"
                variant="outlined"
                type="text"
                name="title"
                value={this.state.title}
                onChange={this.onChange}
              />
            </div>
            {selectItinerary}
          </form>
          <div className="cmsUploadimage">
            Upload Country Flag Here.
            <input type="file" onChange={this.fileChangedHandler} />
          </div>
          {/* SUBMIT BUTTON */}
          <button className="submitCommentBtn" onClick={this.onSubmit}>
            Update Activity!
          </button>
        </Card>

        <div className="cmsTitletext">
          <h3>Preview Your Image Below : </h3>
        </div>
      </div>
    );
    const noPreview = (
      <div>
        <Card />
      </div>
    );
    const preview = (
      <div>
        <Card raised>
          <div className="cmsImageDiv">
            <img alt="cmsImage" src={this.state.previewFile} />
          </div>
        </Card>
      </div>
    );

    let filteredList = this.props.activities.activities.filter(activity => {
      return (
        activity.title.toLowerCase().includes(this.state.query.toLowerCase()) ||
        activity.activitykey
          .replace(/_/g, " ")
          .toLowerCase()
          .includes(this.state.query.toLowerCase())
      );
    });

    const searchlist = (
      <React.Fragment>
        <div className="cmsTitletext">
          <p>Edit an Activity from the list below :</p>
        </div>
        <div className="citysearchflex">
          <TextField
            id="filled-with-placeholder"
            label="Search Activities"
            type="text"
            placeholder="Type to Search Activities"
            onChange={e => this.handleSearch(e.target.value)}
            margin="normal"
            className="cityfilter"
            variant="filled"
          />
        </div>
        {/* ACTIVITIES */}

        {filteredList.map(activity => {
          return (
            <div key={activity._id} className="editCmsitems">
              <Button onClick={this.editValue.bind(this, activity.title)}>
                {activity.title} - {activity.activitykey.replace(/_/g, " ")}
              </Button>
            </div>
          );
        })}
      </React.Fragment>
    );

    const selectedActivity = (
      <React.Fragment>
        <div className="cmsTitletext">
          <p>Editing : {this.state.title}</p>
          <Button onClick={this.onEdit} variant="outlined">
            Edit Activities
          </Button>
        </div>
        {cmsbody}
        <div>{previewFile === null ? noPreview : preview}</div>
      </React.Fragment>
    );

    return (
      <React.Fragment>
        {cmstitle}
        {this.state.showlist === true ? searchlist : selectedActivity}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    activities: state.activities,
    itineraries: state.itineraries,
    profile: state.profile
  };
};

EditActivity.propTypes = {
  activities: PropTypes.object,
  fetchActivities: PropTypes.func
};

export default connect(
  mapStateToProps,
  { fetchActivities, fetchItineraries }
)(EditActivity);
