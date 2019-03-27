import React from "react";
import { Spring } from "react-spring/renderprops";
import { Link } from "react-router-dom";

export default function HomeImg() {
  return (
    <React.Fragment>
      {/* <Spring
        from={{ opacity: 0, marginTop: -500 }}
        to={{ opacity: 1, marginTop: 0 }}
      /> */}
      <Spring
        from={{ opacity: 0 }}
        to={{ opacity: 1 }}
        config={{ delay: 500, duration: 500 }}
      >
        {props => (
          <div style={props}>
            <div style={c1Style}>
              <div>
                <img
                  className="homeBrand"
                  alt="logo_image"
                  src={require("../../images/client/MYtineraryLogo.png")}
                />
              </div>

              <div className="homeP">
                Find your perfect trip, designed by insider who know and love
                their cities.
              </div>

              <div className="homeBrowsing">
                <span>Start Browsing</span>
              </div>

              <div>
                <Link to="/cities">
                  <img
                    className="homeCircle"
                    alt="logo_image"
                    src={require("../../images/client/circled-right-2.png")}
                  />
                </Link>
              </div>

              <div className="homeP bold">
                Want to build your own MYtinerary?
              </div>
            </div>
          </div>
        )}
      </Spring>
    </React.Fragment>
  );
}

const c1Style = {};
