import "./App.css";
import React from "react";
import TestPlot from "./TestPlot";
import USAMap from "react-usa-map";
import USMap from "./D3-Comps/USMap";
import HorizontalTimeline from "react-horizontal-timeline";
import TimeLine from "./TimeLine";
import BarChart from "./D3-Comps/BarGraph-S";
import SingleBarChart from "./D3-Comps/SingleBarChart";

class Wrapper extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      date: "2020-04-23",
      querySelector: "% Uninsured",
    };

    this.updateDate = this.updateDate.bind(this);
    this.updatequerySelector = this.updatequerySelector.bind(this);
  }

  updateDate(date) {
    const oldqf = this.state.querySelector;
    this.setState({
      date: date,
      querySelector: oldqf,
    });
  }

  updatequerySelector(querySelector) {
    const olddate = this.state.date;
    this.setState({
      date: olddate,
      querySelector: querySelector,
    });
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h3>Mental Health Stats During COVID-19</h3>
        </div>
        <div className="main">
          <USMap
            wrapperUpdate={this.updateDate}
            wrapperUpdateQuerySelector={this.updatequerySelector}
          ></USMap>
        </div>
        {/* <BarChart date={this.state.date} querySelector={this.state.querySelector}></BarChart> */}
        {/* <div id="allChartsContainer"> */}
        <div id="mainContainer">
          <div
            style={{ display: "flex", justifyContent: "space-evenly" }}
            className="chartContainer"
          >
            <SingleBarChart
              date={this.state.date}
              group="By Age"
              width={500}
              height={400}
              percentWidth={0.2}
              stat={this.state.querySelector}
              fill="darkred"
              title={"By Age: " + this.state.querySelector}
              chartId="barContainer1"
            ></SingleBarChart>
            <SingleBarChart
              date={this.state.date}
              group="By Education"
              width={1000}
              percentWidth={0.5}
              height={400}
              stat={this.state.querySelector}
              fill="darkblue"
              title={"By Education: " + this.state.querySelector}
              chartId="barContainer2"
            ></SingleBarChart>
            <SingleBarChart
              date={this.state.date}
              group="By Sex"
              width={500}
              percentWidth={0.2}
              height={400}
              stat={this.state.querySelector}
              fill="darkgreen"
              title={"By Gender: " + this.state.querySelector}
              chartId="barContainer3"
            ></SingleBarChart>
          </div>
          <div style={{ display: "flex", justifyContent: "space-evenly" }}>
            <SingleBarChart
              date={this.state.date}
              group="By Race/Hispanic ethnicity"
              width={500}
              height={400}
              percentWidth={0.25}
              stat={this.state.querySelector}
              fill="darkgray"
              title={"By Race/Hispanic Ethnicity: " + this.state.querySelector}
              chartId="barContainer4"
            ></SingleBarChart>

            <SingleBarChart
              date={this.state.date}
              group="By State"
              width={1800}
              height={400}
              percentWidth={0.7}
              stat={this.state.querySelector}
              fill="darkorange"
              title={"National Average: " + this.state.querySelector}
              chartId="barContainer5"
            ></SingleBarChart>
          </div>
        </div>
        {/* </div> */}
      </div>
    );
  }
}

export default Wrapper;
