import React from "react";
import * as d3 from "d3";
import { scaleBand, scaleLinear, axisBottom, axisRight, text } from "d3";


function getWidth() {
  return Math.max(
    document.body.scrollWidth,
    document.documentElement.scrollWidth,
    document.body.offsetWidth,
    document.documentElement.offsetWidth,
    document.documentElement.clientWidth
  );
}

function getHeight() {
  return Math.max(
    document.body.scrollHeight,
    document.documentElement.scrollHeight,
    document.body.offsetHeight,
    document.documentElement.offsetHeight,
    document.documentElement.clientHeight
  );
}

class SingleBarChart extends React.Component {
  constructor(props) {
    super(props);

    this.drawChart = this.drawChart.bind(this);
    this.csvData = [];
    this.allGroups = [
      "National Estimate",
      "By Age",
      "By Sex",
      "By Race/Hispanic ethnicity",
      "By Education",
    ];
  }

  componentDidMount() {
    d3.csv(
      "https://raw.githubusercontent.com/Sutidamus/CSSE386-MH/master/data/HealthData.csv"
    ).then((data) => {
      console.log("BAR CHART Data: ", data);
      this.csvData = data;
      this.drawChart();
    });
  }

  componentDidUpdate() {
    this.drawChart();
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

  drawChart(groupFilter, subgroupList) {
    const margin = { top: 30, right: 30, bottom: 70, left: 60 },
      width = (this.props.percentWidth * getWidth() )- margin.left - margin.right,
      height = this.props.height - margin.top - margin.bottom;

    // append the svg object to the body of the page
    let data = this.filterData(this.props.group, this.props.date);

    let yMax = data
      .map((rec) => parseFloat(rec[this.props.stat]))
      .reduce(function (a, b) {
        return Math.max(a, b);
      }, -1);

    console.log(
      "Y Max: ",
      data.map((rec) => parseFloat(rec[this.props.stat]))
    );

    document.querySelector(`#${this.props.chartId}`).innerHTML = "";
    document.querySelector(
      `#${this.props.chartId}`
    ).innerHTML = `<h3 class="chartTitle">${this.props.title}</h3>`;

    const svg = d3
      .select(`#${this.props.chartId}`)
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)

      // svg.append("rect")
      // .attr("width", "100%")
      // .attr("height", "100%")
      // .attr("fill", "white")
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Parse the Data

    // X axis
    const x = d3
      .scaleBand()
      .range([0, width])
      .domain(data.map((d) => d.Subgroup))
      .padding(0.2);


    // let textRotationAngle = this.props.group ==='By State' ? -55 : -15;
    svg
      .append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(d3.axisBottom(x))
      .selectAll("text")
      .attr("transform", `rotate(${this.props.xAxisRotAngle})`)
      .style("text-anchor", this.props.textAnchor ? "end": "");

    // Add Y axis
    const y = d3.scaleLinear().domain([0, yMax]).range([height, 0]);
    svg.append("g").call(d3.axisLeft(y));

    // Bars
    svg
      .selectAll("mybar")
      .data(data)
      .join("rect")
      .attr("x", (d) => x(d.Subgroup))
      .attr("y", (d) => y(d[this.props.stat]))
      .attr("width", x.bandwidth())
      .attr("padding-left", 200)
      .attr("height", (d) => height - y(d[this.props.stat]))
      .attr("fill", this.props.fill);
  }

  render() {
    console.log("The date inside of BarGraph.jsx: ", this.props.date);

    return <div className="chartContainer" id={this.props.chartId}></div>;
  }
}

export default SingleBarChart;
