import * as d3 from "d3";
import { scaleLinear } from "d3";
import { geoPath } from "d3";
import axios from "axios";
import React from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";

const colorScale = scaleLinear()
  .domain([0.05, 0.7])
  .range(["#ffedea", "#ff5233"]);

class USMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      topoJSON: undefined,
      csvData: [],
    };
    this.topoURL = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";
    // this.dimensions = useResizeObserver
    this.handleClick = this.handleClick.bind(this);
    this.fetchData = this.fetchData.bind(this);
    this.filterData = this.filterData.bind(this);
    this.onColorVarSelect = this.onColorVarSelect.bind(this);
    this.csvData = [];
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextState != this.state || nextProps.date != this.props.date;
  }

  componentDidMount() {
    // this.fetchData("yup");
    d3.csv(
      "https://raw.githubusercontent.com/Sutidamus/CSSE386-MH/master/data/HealthData.csv"
    ).then((data) => {
      console.log("D3 CSV Data: ", data);
      this.csvData = data;
    });
  }

  handleClick(geo) {
    return () => this.fetchData();
  }

  fetchData() {
    axios
      .get(this.topoURL)
      .then((response) => response.data)
      .then((data) => {
        this.filterData(data);
      });
  }

  filterData(topoJSON) {
    console.log(topoJSON);

    // Filter by date
    let csvDat = [...this.csvData];

    csvDat = csvDat.filter(
      (row) => row["Time Period Start Date"] == this.props.date
    );
    // attach properties
    let geometries = topoJSON.objects.states.geometries;
    console.log("Geometries: ", geometries);
    let csvFields = Object.keys(csvDat[0]);

    for (let i = 0; i < geometries.length; i++) {
      for (let j = 0; j < csvDat.length; j++) {
        let csvObj = csvDat[j];

        if (csvObj.State == geometries[i].properties.name) {
          // geometries[i].properties
          csvFields.forEach((field) => {
            geometries[i].properties[field] = csvObj[field];
          });
          break;
        }
      }
      // geometries[i].properties.value = Math.random() * 100;
    }

    let newTopo = { ...topoJSON };
    newTopo.objects.states.geometries = geometries;
    this.setState({
      topoJSON: newTopo,
    });
  }

  onColorVarSelect(e) {
    let value = document.querySelector("#colorVarSelect").value;
    console.log("Color based on: ", value );
    this.setState({
      colorVar: value,
    });
  }

  render() {
    const { topoJSON } = this.state;

    console.log("Map Date: ", this.props.date);

    let map = topoJSON ? (
      <ComposableMap projection={"geoAlbersUsa"}>
        <Geographies geography={this.state.topoJSON}>
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography
                key={geo.rsmKey}
                stroke="#FFF"
                geography={geo}
                fill={colorScale((geo.properties["% Uninsured"] / 100) * 1.5)}
                onClick={this.handleClick(geo.properties)}
              />
            ))
          }
        </Geographies>
      </ComposableMap>
    ) : (
      <ComposableMap projection={"geoAlbersUsa"}>
        <Geographies geography={this.topoURL}>
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography
                key={geo.rsmKey}
                stroke="#FFF"
                geography={geo}
                fill="#ffedea"
                onClick={this.handleClick(geo.properties)}
              />
            ))
          }
        </Geographies>
      </ComposableMap>
    );

    if (this.state.topoJSON) {
      console.log("Rendered: ", this.state.topoJSON.objects.states.geometries);
    } else Math.random();

    return (
      <div>
        <select name="colorVarSelect" id="colorVarSelect" onChange={this.onColorVarSelect}>
          <option value="volvo">Volvo</option>
          <option value="saab">Saab</option>
          <option value="mercedes">Mercedes</option>
          <option value="audi">Audi</option>
        </select>
        {map}
        <input type="data" id="dateSelect" min="2020-01-01" max="2022-01-14" />
        <button onClick={this.fetchData}>GO</button>
      </div>
    );
  }
}

export default USMap;
