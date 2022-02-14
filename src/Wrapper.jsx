import "./App.css";
import React from "react";
import TestPlot from "./TestPlot";
import USAMap from "react-usa-map";
import USMap from "./D3-Comps/USMap";
import HorizontalTimeline from "react-horizontal-timeline";
import TimeLine from "./TimeLine";

const VALUES = [
  "2020-04-23",
  "2020-05-07",
  "2020-05-14",
  "2020-05-21",
  "2020-05-28",
  "2020-06-04",
  "2020-06-11",
  "2020-06-18",
  "2020-06-25",
  "2020-07-02",
  "2020-07-09",
  "2020-07-16",
  "2020-07-22",
  "2020-08-19",
  "2020-09-02",
  "2020-09-16",
  "2020-09-30",
  "2020-10-14",
  "2020-10-28",
  "2020-11-11",
  "2020-11-25",
  "2020-12-09",
  "2020-12-22",
  "2021-01-06",
  "2021-01-20",
  "2021-02-03",
  "2021-02-17",
  "2021-03-03",
  "2021-03-17",
  "2021-03-30",
  "2021-04-14",
  "2021-04-28",
  "2021-05-12",
  "2021-05-26",
  "2021-06-09",
  "2021-06-23",
  "2021-07-06",
  "2021-07-21",
  "2021-08-04",
  "2021-08-18",
  "2021-09-01",
  "2021-09-15",
  "2021-09-29",
  "2021-10-12",
  "2021-12-01",
];

class Wrapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: VALUES[0],
      index: 0,
    };

    this.onTimelineDateClick = this.onTimelineDateClick.bind(this);
  }

  onTimelineDateClick(value) {
      console.log("Wrapper Date", VALUES[value])
    this.setState({
      date: VALUES[value],
      index: value,
    });
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h3>Mental Health Stats During COVID-19</h3>
        </div>
        <div className="TimelineContainer">
          <TimeLine
            idx={this.state.index}
            onTimelineClick={this.onTimelineDateClick}
          ></TimeLine>
        </div>
        <div className="main">
          <USMap date={this.state.date}></USMap>
        </div>
      </div>
    );
  }
}

export default Wrapper;
