import React, { Component } from "react";
class Header extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="headerDiv">{this.props.title}</div>
      </React.Fragment>
    );
  }
}

export default Header;
