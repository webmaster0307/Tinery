import React, { Component } from "react";

class MouseClick extends Component {
  handleEvent = () => {
    alert("I was clicked");
  };
  render() {
    // const { onPress, children } = this.props;

    return (
      <div>
        <button onClick={this.handleEvent}>Mouse Event - Click on me</button>
      </div>
    );
  }
}

export default MouseClick;
