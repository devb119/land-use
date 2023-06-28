import { Polyline, useMap } from "react-leaflet";
import { useStateValue } from "../context/StateProvider";
import { goldcoast } from "../constants";
import { useEffect } from "react";

const colors = [
  { value: "residential", color: "#a291ce" },
  { value: "tertiary", color: "#cb5353" },
  { value: "secondary", color: "#c173f9" },
  { value: "primary", color: "#a9e95c" },
  { value: "footway", color: "#ac7904" },
  { value: "service", color: "#b87ef5" },
  { value: "unclassified", color: "#1a5b2b" },
  { value: "tertiary_link", color: "#1b76c3" },
  { value: "cycleway", color: "#50896c" },
  { value: "pedestrian", color: "#a23763" },
  { value: "trunk", color: "#dfe469" },
  { value: "path", color: "#1ce1c3" },
  { value: "primary_link", color: "#e8a54a" },
  { value: "motorway_link", color: "#c75a15" },
  { value: "steps", color: "#23cc0d" },
  { value: "living_street", color: "#b543b8" },
  { value: "motorway", color: "#11ab69" },
  { value: "secondary_link", color: "#dbb7e9" },
  { value: "track", color: "#70f9f1" },
  { value: "trunk_link", color: "#97fa28" },
  { value: "construction", color: "#97fa28" },
  { value: "corridor", color: "#d39722" },
  { value: "bridleway", color: "#92e74b" },
  { value: "raceway", color: "#84810d" },
  { value: "bus_guideway", color: "#42f3e9" },
  { value: "proposed", color: "#020ada" },
  { value: "rest_area", color: "#c7aec3" },
  { value: "escape", color: "#8ec00e" },
  { value: "road", color: "#510d64" },
  { value: "none", color: "#75ad2a" },
  { value: "services", color: "#66cec7" },
  { value: "bus_stop", color: "#1211ee" },
  { value: "disused", color: "#384d13" },
  { value: "platform", color: "#b4734d" },
  { value: "abandoned", color: "#786174" },
  { value: "unclassified_link", color: "" },
  { value: "highway", color: "#1b874f" },
  { value: "elevator", color: "#88fd7a" },
  { value: "traffic_island", color: "#cfd1d0" },
  { value: "barrier", color: "#6db0ab" },
  { value: "turning_circle", color: "#0764b9" },
  { value: "razed", color: "#270bd4" },
  { value: "crossing", color: "#e47618" },
  { value: "stairs", color: "#8ddd13" },
  { value: "closed", color: "#7f5c55" },
  { value: "roundabout", color: "#efa3ca" },
  { value: "passing_place", color: "#eb0222" },
  { value: "keep_clear", color: "#8286da" },
  { value: "emergency_bay", color: "#325c74" },
  { value: "cyclepath", color: "#b91aa6" },
];

const Roads = () => {
  const [{ mapMode }] = useStateValue();
  const map = useMap();

  useEffect(() => {
    if (mapMode.title === "ROADS") {
      map.fitBounds([
        [-28.1567145633876272, 153.3437067822543725],
        [-27.9648045166695525, 153.5003235987372818],
      ]);
    }
  }, [mapMode]);
  return (
    mapMode.title === "ROADS" &&
    goldcoast.map((road) => (
      <Polyline
        pathOptions={{
          color: colors.find((el) => el.value === road.type).color,
        }}
        positions={road.polyline}
        weight={1}
      />
    ))
  );
};

export default Roads;
