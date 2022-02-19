import "./App.css";
import React from "react";
import TestPlot from "./TestPlot";
import USAMap from "react-usa-map";
import USMap from "./D3-Comps/USMap";
import HorizontalTimeline from "react-horizontal-timeline";
import TimeLine from "./TimeLine";
import BarChart from "./D3-Comps/BarGraph-S";


class Wrapper extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      date: "2020-04-23",
      querySelector: "% Uninsured",
    }

    this.updateDate = this.updateDate.bind(this);
    this.updatequerySelector = this.updatequerySelector.bind(this);
  }
  
  updateDate(date){
    const oldqf = this.state.querySelector;
    this.setState({
      date: date,
      querySelector: oldqf
    });
  }

  updatequerySelector(querySelector){
    const olddate = this.state.date;
    this.setState({
      date: olddate,
      querySelector: querySelector
    });
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h3>Mental Health Stats During COVID-19</h3>
        </div>
        <div className="main">
          <USMap wrapperUpdate={this.updateDate} wrapperUpdateQuerySelector={this.updatequerySelector}></USMap>
        </div>
        <BarChart date={this.state.date} querySelector={this.state.querySelector}></BarChart>
      </div>
    );
  }
}

export default Wrapper;
