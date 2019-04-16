import React, { Component } from "react";
// import Fab from "@material-ui/core/Fab";
import Button from "@material-ui/core/Button";
// import CustomFab from "./layout/CustomFab";

class CustomButton extends Component {
  render() {
    return (
      <div className="fabButtonDiv">
        {/* <Fab
          disabled={this.props.disabled}
          className="fabButton"
          color={this.props.color}
          variant={this.props.variant}
          size={this.props.size}
          aria-label="Add"
          type={this.props.type}
          value={this.props.value}
        >
          {this.props.title}
        </Fab> */}

        <Button
          style={{
            backgroundColor: this.props.bgcolor
          }}
          color={this.props.color}
          disabled={this.props.disabled}
          className="fabButton"
          variant="contained"
          size={this.props.size}
          aria-label="Add"
          type={this.props.type}
          value={this.props.value}
        >
          {this.props.title}
        </Button>
      </div>
    );
  }
}

export default CustomButton;
