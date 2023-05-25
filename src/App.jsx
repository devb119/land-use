import "./App.css";
import { InfoBox, LegendLayer, Sidebar } from "./components";
import Menu from "./components/Menu";
import LeafletMap from "./map/LeafletMap";

function App() {
  return (
    <div className="h-screen w-screen relative z-0">
      <LeafletMap />
      <InfoBox />
      {/* <Menu /> */}
      <Sidebar />
      <LegendLayer />
    </div>
  );
}

export default App;
