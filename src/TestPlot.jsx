import React from "react";
import * as d3 from "d3";

class TestPlot extends React.Component {
  constructor(props) {
    super(props);
    this.dataURL = this.props.dataURL;
    this.state = { data: [] };
    this.medi = d3.median([1, 2, 5, 10, 59, 15901, 5812]);

    this.importData = this.importData.bind(this);
  }

  componentDidMount() {
    this.importData(this.dataURL);
  }

  importData(url) {
    d3.csv(url).then(data => {
        console.log(data);
        this.setState({data: data})
    });
  }

  render() {
    console.log(this.state.data);
    return (
      <div>
        <h1>Coordinate Data</h1>
        {this.state.data.map(o => <p>{o.State}: {o.Longitude}, {o.Latitude}</p>)}
      </div>
    );
  }
}

export default TestPlot;
