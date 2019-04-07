import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import IconHome from "./IconHome";
import IconBackbutton from "./IconBackbutton";
import IconCity from "./IconCity";
import IconDashboard from "./IconDashboard";
import Toolbar from "@material-ui/core/Toolbar";

const styles = theme => ({
  text: {
    paddingTop: theme.spacing.unit * 2,
    paddingLeft: theme.spacing.unit * 2,
    paddingRight: theme.spacing.unit * 2
  },
  paper: {
    paddingBottom: 50
  },
  list: {
    marginBottom: theme.spacing.unit * 2
  },
  subHeader: {
    backgroundColor: theme.palette.background.paper
  },
  appBar: {
    top: "auto",
    bottom: 0
  },
  toolbar: {
    alignItems: "center",
    justifyContent: "space-between"
  },
  fabButton: {
    position: "absolute",
    zIndex: 1,
    top: -30,
    left: 0,
    right: 0,
    margin: "0 auto"
  }
});

function BottomAppBar(props) {
  const { classes } = props;

  return (
    <React.Fragment>
      <div className="bottomNav" />
      <AppBar position="fixed" color="default" className={classes.appBar}>
        <Toolbar className="toolBarFlex">
          <div>
            <IconBackbutton />
          </div>
          <div>
            <IconHome />
          </div>
          <div>
            <IconDashboard />
          </div>
          <div>
            <IconCity />
          </div>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
}

BottomAppBar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(BottomAppBar);
