import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { debounce } from "lodash";
import { fetchCities } from "../actions/citiesActions";
import { editCity, deleteCity } from "../actions/cmsActions";

import Header from "../components/layout/Header";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import TextField from "@material-ui/core/TextField";
import Icon from "@material-ui/core/Icon";

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
      authorid: "",
      id: ""
    };
    this.editValue = this.editValue.bind(this);
  }
  componentDidMount() {
    this.props.fetchCities();
    this.setState({
      cities: this.props.cities.cities
    });
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

    this.props.editCity(this.state.id, formData);

    this.setState({
      id: "",
      cityname: "",
      country: "",
      url: "",
      flagimg: null,
      previewFile: null,
      showlist: true
    });

    this.props.fetchCities();
  };

  //SELECT VALUE TO EDIT
  editValue = e => {
    this.props.fetchCities();
    let allcities = this.props.cities.cities;
    let selectedValue = allcities.find(city => city.cityname === e);
    this.setState({
      id: selectedValue._id,
      cityname: selectedValue.cityname,
      country: selectedValue.country,
      url: selectedValue.url,
      flagimg: selectedValue.flagimg,
      previewFile: selectedValue.flagimg,
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
    this.props.deleteCity(data.id);
    this.props.history.push("/cmscity");
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
    const deleteButton = (
      <React.Fragment>
        <div className="deleteButton">
          <Button onClick={this.onDelete} variant="outlined" color="secondary">
            Delete City <Icon>delete</Icon>
          </Button>
          <br />
        </div>
      </React.Fragment>
    );

    const cmstitle = (
      <React.Fragment>
        <Header title={"Edit City"} />
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
              {/* <p className="cmswarning">
                *Warning : Changing City Name can affect linked Itinerary
              </p> */}
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
              Upload City Cover Image.
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
                    Update City!<Icon>save</Icon>
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
                    Update City!<Icon>save</Icon>
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
            variant="outlined"
          />
        </div>
        {/* CITIES */}
        {filteredList.length < 1 ? (
          <div className="paragraphText">
            There are no cities matching your search query.
          </div>
        ) : (
          <React.Fragment>
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
        )}
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
        <div>{previewFile === null ? noPreview : preview}</div>
      </React.Fragment>
    );

    return (
      <React.Fragment>
        {cmstitle}
        {this.state.showlist === true ? searchlist : selectedcity}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    cities: state.cities,
    profile: state.profile,
    auth: state.auth
  };
};

Editcity.propTypes = {
  cities: PropTypes.object,
  fetchCities: PropTypes.func
};

export default connect(
  mapStateToProps,
  { fetchCities, editCity, deleteCity }
)(Editcity);
