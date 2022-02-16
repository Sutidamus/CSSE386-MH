import "./App.css";
import React from "react";
import TestPlot from "./TestPlot";
import USAMap from "react-usa-map";
import USMap from "./D3-Comps/USMap";
import HorizontalTimeline from "react-horizontal-timeline";
import TimeLine from "./TimeLine";


class Wrapper extends React.Component {
  constructor(props) {
    super(props);
  }


  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h3>Mental Health Stats During COVID-19</h3>
        </div>
        <div className="main">
          <USMap></USMap>
        </div>
      </div>
    );
  }
}

export default Wrapper;
