import HorizontalTimeline from "react-horizontal-timeline";
import React from "react";
/*
Format: YYYY-MM-DD
Note: Make sure dates are sorted in increasing order
*/
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

export default class TimeLine extends React.Component {
  constructor(props){
      super(props);

      this.state = {
          value: props.idx,
          previous: 0
      }
  }

  render() {
    return (
      <div>
        {/* Bounding box for the Timeline */}
        <div style={{ width: "95%", height: "100px", margin: "0 auto" }}>
          <HorizontalTimeline
            index={this.state.value}
            minEventPadding={100}
            titleWidth={300}
            indexClick={(index) => {
              this.setState({ value: index, previous: this.state.value });
              this.props.onTimelineClick(index)
            }}
            styles={{ background: '#f8f8f8', foreground: '#377cd6', outline: '#dfdfdf' }}
            values={VALUES}
            style={{backgroundColor: "#f8f8f8"}}
          />
        </div>
      </div>
    );
  }
}
