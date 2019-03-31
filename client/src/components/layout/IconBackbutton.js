import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Icon from "@material-ui/core/Icon";

// import PropTypes from "prop-types";

class BackButton extends Component {
  render() {
    return (
      <React.Fragment>
        <Icon
          fontSize="large"
          className="homeIcon"
          onClick={this.props.history.goBack}
        >
          arrow_back
        </Icon>
      </React.Fragment>
    );
  }
}

// BackButton.defaultProps = {
//   standAlone: true
// };

// BackButton.propTypes = {
//   standAlone: PropTypes.bool.isRequired
// };

export default withRouter(BackButton);
