import "./App.css";
import { InfoBox, LegendLayer, Sidebar } from "./components";
import LeafletMap from "./map/LeafletMap";

function App() {
  return (
    <div className="h-screen w-screen relative z-0">
      <LeafletMap />
      <InfoBox />
      <Sidebar />
      <LegendLayer />
    </div>
  );
}

export default App;
