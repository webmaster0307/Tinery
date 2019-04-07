import React, { Component } from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";

import Card from "@material-ui/core/Card";
import Icon from "@material-ui/core/Icon";

class CmsCards extends Component {
  componentDidMount() {}

  render() {
    return (
      <React.Fragment>
        <Card raised>
          <div className="flexLink">
            <h3>{this.props.title}</h3>
          </div>
          <div className="flexIcons">
            <div className="flexLink">
              •{" "}
              <NavLink to={this.props.createurl}>
                <span className="homepageLinkText">
                  Create {this.props.subject}
                </span>
              </NavLink>
            </div>
            <div className="flexIcons">
              <Icon>{this.props.icon}</Icon>
            </div>
            <div className="flexLink">
              •{" "}
              <NavLink to={this.props.editurl}>
                <span className="homepageLinkText">
                  Edit {this.props.subject}
                </span>
              </NavLink>
            </div>
          </div>
        </Card>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    cities: state.cities,
    itineraries: state.itineraries,
    activites: state.activites,
    profile: state.profile,
    auth: state.auth
  };
};

CmsCards.propTypes = {
  cities: PropTypes.object
};

export default connect(
  mapStateToProps,
  {}
)(CmsCards);
