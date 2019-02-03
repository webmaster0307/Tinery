import React from "react";
import Toggle from "../actions/Toggle";
import MouseClick from "../actions/MouseClick";
import HomeButton from "../components/HomeButton";

const Home = () => {
  return (
    <div>
      <h4>React Exercises</h4>
      <div>
        <MouseClick />
        <Toggle />
      </div>
      <HomeButton />
    </div>
  );
};

export default Home;
