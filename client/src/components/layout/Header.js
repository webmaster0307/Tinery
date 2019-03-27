import React, { Component } from "react";
import Typography from "@material-ui/core/Typography";

class Header extends Component {
  render() {
    //     console.log(this.props);
    return (
      <div>
        <React.Fragment>
          <Typography
            align="center"
            component="h2"
            variant="display2"
            gutterBottom
          >
            {this.props.title}
          </Typography>
        </React.Fragment>
      </div>
    );
  }
}

export default Header;
