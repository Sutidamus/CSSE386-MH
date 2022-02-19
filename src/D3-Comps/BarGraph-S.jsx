import React from "react";
import * as d3 from "d3";
import {scaleBand, scaleLinear, axisBottom, axisRight} from "d3";

class BarChart extends React.Component {
  constructor(props) {
    super(props);

    this.drawChart = this.drawChart.bind(this);
    this.csvData = [];
  }

  componentDidMount() {
    d3.csv(
      "https://raw.githubusercontent.com/Sutidamus/CSSE386-MH/master/data/HealthData.csv"
    ).then((data) => {
      console.log("BAR CHART Data: ", data);
      this.csvData = data;
      //   console.log("CSV Fields: ", Object.keys(data[0]));
      // this.csvFields = Object.keys(data[0]);
      this.drawChart();
    });
  }

  componentDidUpdate() {
    this.drawChart();
  }

  drawChart() {
    let { date } = this.props;
    const filteredByDate = this.csvData.filter(
      (row) => row["Time Period Start Date"] == date
    );
    const filteredByGroup = filteredByDate.filter(
      (row) => row["Group"] == "By Age"
    );

    console.log("BarGraph, Correct Date Only: ", filteredByDate);
    console.log("BarGraph, Correct Group Only: ", filteredByGroup);

    const svg = d3.select("#barContainer").append("svg");

    const height = 100;
    const xScale = scaleBand()
      .domain(filteredByGroup.map((value, index) => index))
      .range([0, 100])
      .padding(0.5);

    const yScale = scaleLinear().domain([0, 150]).range([150, 0]);

    const colorScale = scaleLinear()
      .domain([75, 100, 150])
      .range(["green", "orange", "red"])
      .clamp(true);

    const xAxis = axisBottom(xScale).ticks(filteredByGroup.length);

    svg.select(".x-axis").style("transform", "translateY(150px)").call(xAxis);

    const yAxis = axisRight(yScale);
    svg.select(".y-axis").style("transform", "translateX(300px)").call(yAxis);

    // svg
    //   .selectAll(".bar")
    //   .data(fil)
    //   .join("rect")
    //   .attr("class", "bar")

    //   .style("transform", "scale(1, -1)")
    //   .attr("x", (value, index) => xScale(index))
    //   .attr("y", -150)
    //   .attr("width", xScale.bandwidth())
    //   .transition()
    //   .attr("fill", colorScale)
    //   .attr("height", (value) => 150 - yScale(value));
    //================== OUR CODE

    svg
      .selectAll("rect")
      .data(filteredByGroup.map((d, i) => d["% Uninsured"]))
      .join("rect")
      .attr("width", 20)
      .attr("x", (value, index) => xScale(index))
      .attr("height", function (d) {
        return d;
      })
      .attr("y", (val) => height - val)
      .attr("fill", "#69b3a2");
    // ==============================
  }

  render() {
    console.log("The date inside of BarGraph.jsx: ", this.props.date);

    return <div id="barContainer"></div>;
  }
}

export default BarChart;
