import React from "react";
import Clock from "../components/Clock";

class Toggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isToggleOn: false };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState(state => ({
      isToggleOn: !state.isToggleOn
    }));
  }

  render() {
    return (
      <div>
        <button onClick={this.handleClick}>
          {this.state.isToggleOn ? "Turn Clock Off" : "Turn Clock On"}
        </button>
        {this.state.isToggleOn ? <Clock /> : <p />}
      </div>
    );
  }
}

export default Toggle;
