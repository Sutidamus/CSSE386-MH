import logo from "./logo.svg";
import "./App.css";
import TestPlot from "./TestPlot";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <TestPlot dataURL="https://raw.githubusercontent.com/Sutidamus/CSSE386-MH/master/data/coordData.csv"></TestPlot>
      </header>
    </div>
  );
}

export default App;
