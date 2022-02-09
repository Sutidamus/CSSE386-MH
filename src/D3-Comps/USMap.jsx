import * as d3 from "d3";
import { geoPath } from "d3";
import React from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";

class USMap extends React.Component {
  constructor(props) {
    super(props);

    this.topoURL = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";
    // this.dimensions = useResizeObserver
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(geo) {
    return () => console.log(geo);
  }

  render() {
    return (
      <div>
        <ComposableMap projection={"geoAlbersUsa"}>
          <Geographies geography={this.topoURL}>
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography
                  key={geo.rsmKey}
                  stroke="#FFF"
                  geography={geo}
                  fill="#DDD"
                  onClick={this.handleClick(geo.properties)}
                />
              ))
            }
          </Geographies>
        </ComposableMap>
      </div>
    );
  }
}

export default USMap;
