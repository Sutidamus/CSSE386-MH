import React from "react";
import * as d3 from "d3";
import { scaleBand, scaleLinear, axisBottom, axisRight } from "d3";


class BarChart extends React.Component {
  constructor(props) {
    super(props);

    this.drawChart = this.drawChart.bind(this);
    this.csvData = [];
    this.allGroups = [
      "National Estimate",
      "By Age",
      "By Sex",
      "By Race/Hispanic ethnicity",
      "By Education"
    ]
  }

  componentDidMount() {
    d3.csv(
      "https://raw.githubusercontent.com/Sutidamus/CSSE386-MH/master/data/HealthData.csv"
    ).then((data) => {
      console.log("BAR CHART Data: ", data);
      this.csvData = data;
      this.drawCharts();
    });
  }

  componentDidUpdate() {
    this.drawCharts();
  }

  filterData(group, date) {
    const filteredByDate = this.csvData.filter(
      (row) => row["Time Period Start Date"] == date
    );
    const filteredByGroup = filteredByDate.filter(
      (row) => row["Group"] == group
    );
    return filteredByGroup;
  }

  drawCharts() {

    d3.selectAll(".svgrectclass").remove();

    this.allGroups.forEach(element => {
      switch(element){
        case "National Estimate":
          this.drawChart(element, ["United States"]);
          break;
        case "By Age":
          this.drawChart(element, ["18 - 24 years", "25 - 34 years", "35 - 44 years", "45 - 64 years"]);
          break;
        case "By Sex":
          this.drawChart(element, ["Male", "Female"]);
          break;
        case "By Race/Hispanic ethnicity":
          this.drawChart(element, ["Hispanic", "White", "Black", "Asian", "Other"]);
          break;
        case "By Education":
          this.drawChart(element, ["< High school", "High School", "Associate's Degree", "Undergrad or higher"]);
          break;
      }
    });


  }

  drawChart(groupFilter, subgroupList) {
    let { date } = this.props;

    const filteredByGroup = this.filterData(groupFilter, date);

    const svgGraphHeight = 200;
    const svgGraphWidth = 600;
    const barGraphWidth = 30;
    const barGraphPadding = 0.5;

    const svg = d3.select("#barContainer")
      .append("svg")
      .attr("class", "svgrectclass")
      .attr("width", svgGraphWidth)
      .attr("height", svgGraphHeight);

    const height = 100;
    const xScale = scaleBand()
      .domain(filteredByGroup.map((value, index) => index))
      .range([0, 500])
      .padding(barGraphPadding);

    const xScaleAxis = scaleBand()
    .domain(filteredByGroup.map((value, index) => subgroupList[index]))
    .range([0, 500])
    .padding(barGraphPadding);

    const yScale = scaleLinear().domain([0, 100]).range([100, 0]);

    const colorScale = scaleLinear()
      .domain([75, 100, 150])
      .range(["green", "orange", "red"])
      .clamp(true);

    const xAxis = axisBottom(xScale).ticks(filteredByGroup.length);

    svg.select(".x-axis").style("transform", "translateY(150px)").call(xAxis);

    const yAxis = axisRight(yScale);
    svg.select(".y-axis").style("transform", "translateX(300px)").call(yAxis);

    svg
    .selectAll("rect")
    .data(filteredByGroup.map((d, i) => d[this.props.querySelector]))
    .join("rect")
    .attr("class", "bar")
    .attr("width", xScale.bandwidth())
    .attr("x", (value, index) => xScale(index))
    .attr("height", function (d) {
      return d;
    })
    .attr("y", (val) => height - val)
    .on("mouseenter", (event, value) => {

      const index = svg.selectAll(".bar").nodes().indexOf(event.target);

      console.log(value+":"+index);

      svg
        .selectAll(".tooltip")
        .data([value])
        .join("text")
        .attr("class", "tooltip")
        .attr("transform", "translate(0," + 50 + ")")
        .attr("x", xScale(index))
        .text("value: " + value);

    })
    .on("mouseleave", () => svg.select(".tooltip").remove());

    // Add the x Axis
    svg.append("g")
      .attr("transform", "translate(0," + 100  + ")")
      .call(d3.axisBottom(xScaleAxis).tickSize(10));


    // text label for the x axis
    svg.append("text")
      .attr("transform",
        "translate(" + (200 / 2) + " ," +
        (20) + ")")
      .style("text-anchor", "middle")
      .text(groupFilter);
  }

  render() {
    console.log("The date inside of BarGraph.jsx: ", this.props.date);

    return <div id="barContainer"></div>;
  }
}

export default BarChart;
