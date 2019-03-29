import React, { Component } from "react";
import PropTypes from "prop-types";
// import { Link } from "react-router-dom";
import axios from "axios";
import { connect } from "react-redux";
import { debounce } from "lodash";
// import BottomNav from "../components/layout/BottomNav";

import { fetchAxiosCities } from "../actions/citiesActions";

import Header from "../components/layout/Header";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import TextField from "@material-ui/core/TextField";

class Editcity extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showlist: true,
      query: "",
      error: null,
      text: "",
      //EDIT
      cities: [],
      cityname: "",
      country: "",
      flagimg: null,
      previewFile: null,
      url: "",
      id: ""
    };
    this.editValue = this.editValue.bind(this);
  }
  componentDidMount() {
    this.props.fetchAxiosCities();
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
      flagimg: event.target.files[0],
      previewFile: URL.createObjectURL(event.target.files[0])
    });
    console.log(this.state);
    console.log(typeof this.state.flagimg);
    console.log(typeof this.state.previewFile);
  };

  // SUBMIT
  onSubmit = e => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("cityname", this.state.cityname);
    formData.append("country", this.state.country);
    formData.append("flagimg", this.state.flagimg);
    formData.append("url", this.state.url);
    formData.append("id", this.state.id);

    //MIGRATE TO REDUX
    axios.post(`/api/cms/city/${this.state.id}`, formData, {});
    alert("Upload successful");
    this.setState({
      id: "",
      cityname: "",
      country: "",
      url: "",
      flagimg: null,
      previewFile: null
    });
    //MIGRATE TO REDUX
    this.props.fetchAxiosCities();
  };

  //SELECT VALUE TO EDIT
  editValue = e => {
    // console.log(e);
    let allcities = this.props.cities.cities;
    let selectedValue = allcities.find(city => city.cityname === e);
    this.setState({
      id: selectedValue._id,
      cityname: selectedValue.cityname,
      country: selectedValue.country,
      url: selectedValue.url,
      flagimg: selectedValue.flagimg,
      previewFile: selectedValue.flagimg,
      showlist: false
    });
    // console.log(this.state);
  };

  // TOGGLE BETWEEN LIST AND FORM
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
      url: val
        .split(" ")
        .join("_")
        .toLowerCase()
    });
  };

  render() {
    const previewFile = this.state.previewFile;
    const cmstitle = (
      <React.Fragment>
        <div>
          <Header title={"Edit City"} />
        </div>
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
                label="Please enter City Name:"
                placeholder=""
                margin="normal"
                variant="outlined"
                type="text"
                name="cityname"
                value={this.state.cityname}
                onChange={this.onSnakecase}
              />
            </div>
            <div>
              <TextField
                className="commentFormInput"
                id="outlined-with-placeholder"
                label="Please enter City Country:"
                placeholder=""
                margin="normal"
                variant="outlined"
                type="text"
                name="country"
                value={this.state.country}
                onChange={this.onChange}
              />
            </div>
          </form>
          <div className="cmsUploadimage">
            Upload Country Flag Here.
            <input type="file" onChange={this.fileChangedHandler} />
          </div>
          {/* SUBMIT BUTTON */}
          <button className="submitCommentBtn" onClick={this.onSubmit}>
            Update City!
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

    let filteredList = this.props.cities.cities.filter(city => {
      return (
        city.cityname.toLowerCase().includes(this.state.query.toLowerCase()) ||
        city.country.toLowerCase().includes(this.state.query.toLowerCase())
      );
    });

    const searchlist = (
      <React.Fragment>
        <div className="cmsTitletext">
          <p>Edit a City from the list below :</p>
        </div>
        <div className="citysearchflex">
          <TextField
            id="filled-with-placeholder"
            label="Search Destinations"
            type="text"
            placeholder="Type to Search Destinations"
            onChange={e => this.handleSearch(e.target.value)}
            margin="normal"
            className="cityfilter"
            variant="filled"
          />
        </div>
        {/* CITIES */}

        {filteredList.map(city => {
          return (
            <div key={city._id} className="editCmsitems">
              <Button onClick={this.editValue.bind(this, city.cityname)}>
                {city.cityname}, {city.country}
              </Button>
            </div>
          );
        })}
      </React.Fragment>
    );

    const selectedcity = (
      <React.Fragment>
        <div className="cmsTitletext">
          <p>Editing : {this.state.cityname}</p>
          <Button onClick={this.onEdit} variant="outlined">
            Edit Cities
          </Button>
        </div>
        {cmsbody}
        <div className="bottomNav">
          {previewFile === null ? noPreview : preview}
        </div>
      </React.Fragment>
    );

    return (
      <React.Fragment>
        {cmstitle}
        {this.state.showlist === true ? searchlist : selectedcity}
        {/* <div className="bottomNav"/> */}
        {/* <BottomNav /> */}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    cities: state.cities,
    profile: state.profile
  };
};

Editcity.propTypes = {
  cities: PropTypes.object,
  fetchAxiosCities: PropTypes.func
};

export default connect(
  mapStateToProps,
  { fetchAxiosCities }
)(Editcity);
