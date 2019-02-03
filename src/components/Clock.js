import React from "react";

class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = { date: new Date() };
  }

  componentDidMount() {
    this.timerID = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      date: new Date()
    });
  }

  render() {
    return (
      <div>
        <br />
        <br />
        <br />
        <h3 className="timeStyle">
          It is {this.state.date.toLocaleTimeString()}.
        </h3>
        <img
          className="App-logo"
          alt="logo_image"
          src={require("../images/logo.svg")}
        />
      </div>
    );
  }
}

export default Clock;
