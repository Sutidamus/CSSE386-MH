import "./App.css";
import TestPlot from "./TestPlot";
import USAMap from "react-usa-map";
import USMap from "./D3-Comps/USMap";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/* <TestPlot dataURL="https://raw.githubusercontent.com/Sutidamus/CSSE386-MH/master/data/coordData.csv"></TestPlot> */}
        {/* <div className="world-map"></div> */}
        <USMap></USMap>
      </header>
    </div>
  );
}

export default App;
