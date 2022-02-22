import * as d3 from "d3";
import { scaleLinear } from "d3";
import { geoPath } from "d3";
import axios from "axios";
import React from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import TimeLine from "../TimeLine";

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

const colorScale = scaleLinear()
  .domain([0.05, 0.7])
  .range(["#ffedea", "#ff5233"]);

class USMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      topoJSON: undefined,
      csvData: [],
      date: VALUES[0],
      index: 0,
      colorVar: "% Uninsured",
    };
    this.topoURL = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";
    // this.dimensions = useResizeObserver
    this.handleClick = this.handleClick.bind(this);
    this.fetchData = this.fetchData.bind(this);
    this.filterData = this.filterData.bind(this);
    this.onColorVarSelect = this.onColorVarSelect.bind(this);
    this.onTimelineDateClick = this.onTimelineDateClick.bind(this);
    this.csvData = [];
    this.csvFields = [
      "Group",
      "State",
      "Subgroup",
      "Phase",
      "Time Period",
      "Time Period Start Date",
      "Time Period End Date",
      "% Uninsured",
      "% with Public Health Insurance",
      "% with Private Health Insurance",
      "% with Delayed Medical Care",
      "% Did Not Get Needed Medical Care",
      "% Took Prescription Medication for Mental Health",
      "% Recieved Counseling or Therapy",
      "% Did Not Get Needed Counseling or Therapy",
      "% Adults that Used Telemedicine",
      "% Households with Child that Used Telemedicine",
      "% with Depressive Symptoms",
      "% with Anxiety Symptoms",
    ];
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextState != this.state;
  }

  componentDidMount() {
    // this.fetchData("yup");
    d3.csv(
      "https://raw.githubusercontent.com/Sutidamus/CSSE386-MH/master/data/HealthData.csv"
    ).then((data) => {
      console.log("D3 CSV Data: ", data);
      this.csvData = data;
      console.log("CSV Fields: ", Object.keys(data[0]));
      // this.csvFields = Object.keys(data[0]);
    });
  }

  handleClick(geo) {
    return (e) => {
      console.log("Geo properties:" ,geo)
      console.log("Clicked X position: ", e.pageX)
      let popUp = document.querySelector("#popUpDiv");
      // popUp.style.display = "block";
      let width = 300;
      let height = 300;

      popUp.innerHTML = ""

      popUp.style.position = "absolute";
      popUp.style.left = `${e.pageX-20}px`
      popUp.style.top = `${e.pageY-20}px`

      popUp.style.removeProperty("display");

      popUp.onmouseleave = () => {
        popUp.style.display = "none";
      }
      // popUp.style.display = "";
      
      // let button = `<div id="viewMoreContainer"><button id="viewMoreButton">VIEW PLOTS</button></div>`
      // popUp.innerHTML +=button + '\n'
      let popUpFields = this.csvFields.filter(field => field[0] === '%' || field.includes("Time") || field === "State")
      popUpFields.map( field => field === "State" ? popUp.innerHTML+=`<h3 id="popUpStateName">${field}: ${geo[field]}</h3><hr><hr>` : popUp.innerHTML+=`<p>${field}: ${geo[field]}</p>`)
      
      
      


    };
  }

  fetchData() {
    axios
      .get(this.topoURL)
      .then((response) => response.data)
      .then((data) => {
        this.filterData(data);
      });
  }

  onTimelineDateClick(value) {
    console.log("Wrapper Date", VALUES[value]);
    this.props.wrapperUpdate(VALUES[value]);
    this.setState(
      {
        date: VALUES[value],
        index: value,
      },
      (newState) => {
        this.fetchData();
      }
    );
  }

  filterData(topoJSON) {
    console.log(topoJSON);

    // Filter by date
    let csvDat = [...this.csvData];

    csvDat = csvDat.filter(
      (row) => row["Time Period Start Date"] == this.state.date
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
    this.props.wrapperUpdateQuerySelector(value);
    console.log("Color based on: ", value);
    this.setState({
      colorVar: value,
    });
  }

  render() {
    const { topoJSON } = this.state;

    console.log("Map Date: ", this.state.date);
    // let colorVar = document.querySelector("select").value;
    let map = topoJSON ? (
      <ComposableMap projection={"geoAlbersUsa"} width={1600}>
        <Geographies geography={this.state.topoJSON}>
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography
                key={geo.rsmKey}
                stroke="#FFF"
                geography={geo}
                fill={colorScale(
                  (geo.properties[this.state.colorVar] / 100) * 1.5
                )}
                onClick={this.handleClick(geo.properties)}
              />
            ))
          }
        </Geographies>
      </ComposableMap>
    ) : (
      <div>
        <h3 style={{color: "white"}}>Click a timeline date to update map</h3>
        <ComposableMap projection={"geoAlbersUsa"} width={1600}>
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
      </div>
    );

    let selectableCSVFields = this.csvFields.filter((str) => str[0] == "%");


    return (
      <div>
        <select
          name="colorVarSelect"
          id="colorVarSelect"
          onChange={this.onColorVarSelect}
        >
          {selectableCSVFields.map((field) => (
            <option>{field}</option>
          ))}
        </select>
        <div id="popUpDiv" style={{display: "none"}}></div>
        {map}
        <div className="TimelineContainer">
          <TimeLine
            idx={this.state.index}
            onTimelineClick={this.onTimelineDateClick}
          ></TimeLine>
        </div>
      </div>
    );
  }
}

export default USMap;
