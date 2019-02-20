import React, { Component } from "react";
import { NavLink, withRouter } from "react-router-dom";
import { SideNav, SideNavItem, Button, Nav } from "react-materialize";
// import cx from "classnames";
import PropTypes from "prop-types";
// import idgen from "./idgen";

class Sidenav extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {}

  render() {
    return (
      <div>
        {/* <SideNav
        trigger={<Button>SIDE NAV DEMO</Button>}
        options={{ closeOnClick: true }}
      > */}
        {/* <SideNav> */}
        {/* <SideNavItem
          userView
          user={{
            image: "img/yuna.jpg",
            name: "John Doe",
            email: "jdandturk@gmail.com"
          }} */}
        {/* /> */}
        {/* <SideNavItem href="#!icon" icon="cloud">
          First Link With Icon
        </SideNavItem>
        <SideNavItem href="#!second">Second Link</SideNavItem> */}
        {/* <SideNavItem divider />
        <SideNavItem subheader>Subheader</SideNavItem> */}
        {/* <SideNavItem waves href="#!third">
          Third Link With Waves
        </SideNavItem> */}
        {/* </SideNav> */}
      </div>
    );
  }
}
export default withRouter(Sidenav);
