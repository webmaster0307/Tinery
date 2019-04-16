import React, { Component } from "react";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import { debounce } from "lodash";
import { fetchActivities } from "../actions/activitiesActions";
import { fetchItineraries } from "../actions/itinerariesActions";
import { editActivity, deleteActivity } from "../actions/cmsActions";

import Header from "../components/layout/Header";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import FilledInput from "@material-ui/core/FilledInput";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Icon from "@material-ui/core/Icon";

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
      authorid: "",
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
  };

  // SUBMIT
  onSubmit = e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", this.state.title);
    formData.append("activitykey", this.state.activitykey);
    formData.append("image", this.state.image);
    formData.append("id", this.state.id);

    this.props.editActivity(this.state.id, formData);

    this.setState({
      id: "",
      title: "",
      activitykey: "",
      image: null,
      previewFile: null,
      showlist: true
    });

    this.props.fetchActivities();
  };

  //SELECT VALUE TO EDIT
  editValue = e => {
    this.props.fetchItineraries();
    this.props.fetchActivities();

    let allactivities = this.props.activities.activities;
    let selectedValue = allactivities.find(activity => activity.title === e);
    this.setState({
      id: selectedValue._id,
      activitykey: selectedValue.activitykey,
      title: selectedValue.title,
      image: selectedValue.image,
      previewFile: selectedValue.image,
      authorid: selectedValue.authorid,
      showlist: false
    });
  };

  // TOGGLE BETWEEN LIST AND FORM
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

    this.props.deleteActivity(data.id);
    this.props.history.push("/cmsactivity");
  };

  // FORM INFO
  onChange = e => {
    // const parentItin = e.target.value;
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  render() {
    const previewFile = this.state.previewFile;

    const deleteButton = (
      <React.Fragment>
        <div className="deleteButton">
          <Button onClick={this.onDelete} variant="outlined" color="secondary">
            Delete Activity <Icon>delete</Icon>
          </Button>
        </div>
      </React.Fragment>
    );
    const cmstitle = (
      <React.Fragment>
        <Header title={"Edit Activity"} />
      </React.Fragment>
    );
    const selectItinerary = (
      <React.Fragment>
        <FormControl variant="filled">
          <InputLabel htmlFor="filled-itin-simple">
            Select Itinerary:
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

            {this.state.authorid === this.props.auth.user.id ? (
              <React.Fragment>
                <div className="cmsAction">
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={this.onSubmit}
                  >
                    Update Activity!<Icon>save</Icon>
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
                    Update Activity!<Icon>save</Icon>
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

          <div className="cmsTitletext">
            <h3>Preview Your Image Below : </h3>
          </div>
        </div>
      </React.Fragment>
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
            variant="outlined"
          />
        </div>
        {/* ACTIVITIES */}

        {filteredList.length < 1 ? (
          <div className="paragraphText">
            There are no activities matching your search query.
          </div>
        ) : (
          <React.Fragment>
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
        )}
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
    profile: state.profile,
    auth: state.auth
  };
};

EditActivity.propTypes = {
  activities: PropTypes.object,
  fetchActivities: PropTypes.func
};

export default connect(
  mapStateToProps,
  { fetchActivities, fetchItineraries, editActivity, deleteActivity }
)(EditActivity);
