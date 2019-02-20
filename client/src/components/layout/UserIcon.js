import React, { Component } from "react";
import { NavLink, withRouter } from "react-router-dom";
import { Modal, Button, Icon } from "react-materialize";

class UserIcon extends Component {
  render() {
    return (
      <div>
        <Modal
          header="Modal Header"
          trigger={
            <Button waves="light">
              OR ME!<Icon right>insert_chart</Icon>
            </Button>
          }
        >
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </Modal>
      </div>
    );
  }
}
export default withRouter(UserIcon);
