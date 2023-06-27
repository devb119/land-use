import React from "react";
import { useStateValue } from "../context/StateProvider";

const units = {
  "LAND USE 1": [
    { value: "Forest", color: "#298944", text: "#ffffff" },
    { value: "Low-density vegetation", color: "#ADFFB5", text: "#333333" },
    { value: "Bare soil", color: "#000000", text: "#ffffff" },
    { value: "Agricultural land", color: "#FFAA00", text: "#ffffff" },
    { value: "Urban area", color: "#FF0000", text: "#ffffff" },
    { value: "Rural area", color: "#47828F", text: "#ffffff" },
    { value: "Water", color: "#0000FF", text: "#ffffff" },
  ],
  "LAND USE 2": [
    { value: "Bare rocks", color: "#BEBEBE" },
    { value: "Bare soil", color: "#8B4513" },
    { value: "Bush, grassy savanna", color: "#C0D890" },
    { value: "Dense vegetation, forests", color: "#006400" },
    { value: "Industrials areas", color: "#4C4C4C" },
    { value: "Urban areas", color: "#f8be44" },
    { value: "Water bodies", color: "#0077BE" },
    { value: "Wooded savanna, forest path border", color: "#2E8B57" },
    { value: "Worksites and mines", color: "#FF7F00" },
    { value: "Agriculture", color: "#FFD700 " },
    { value: "Vegetations", color: "#006400" },
    { value: "Water", color: "#0077BE" },
    { value: null, color: "#000000" },
  ],
  ROADS: [
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
  ],
};

export const plants = [
  "Bush, grassy savanna",
  "Dense vegetation, forests",
  "Wooded savanna, forest path border",
  "Vegetations",
  "Vegetation",
];

export const emission = ["Industrials areas", "Urban areas", "Urban_areas"];

// { value: "Bare rocks", color: "#BEBEBE" },
//     { value: "Bare soil", color: "#8B4513" },
//     { value: "Bush, grassy savanna", color: "#C0D890" },
//     { value: "Dense vegetation, forests", color: "#006400" },
//     { value: "Industrials areas", color: "#4C4C4C" },
//     { value: "Urban areas", color: "#f8be44" },
//     { value: 'Urban_areas', color: "#f8be44" },
//     { value: "Water bodies", color: "#0077BE" },
//     { value: "Wooded savanna, forest path border", color: "#2E8B57" },
//     { value: "Worksites and mines", color: "#FF7F00" },
//     { value: 'Agriculture', color: "#FFD700 " },
//     { value: 'Vegetations', color: "#006400" },
//     { value: 'Vegetation', color: "#006400" },
//     { value: 'water', color: "#0077BE" },
//     { value: 'Water', color: "#0077BE" },
//     { value: null, color: "#000000" },

const LegendLayer = () => {
  const [{ mapMode }] = useStateValue();
  return (
    mapMode.title && (
      <div className="flex flex-col absolute p-0 m-0 text-center font-bold right-8 top-32">
        <span className="bg-white">{mapMode.unit}</span>
        {units[mapMode.title]?.map((valueUnit, index) => {
          return (
            <span
              className={`px-2 text-center ${
                mapMode.title === "CLOUD" || mapMode.title === "PRECIPITATION"
                  ? "text-gray-800"
                  : "text-white"
              } font-bold`}
              key={index}
              style={{
                background: `${valueUnit.color}`,
                color: valueUnit.text ? valueUnit.text : null,
              }}
            >
              {valueUnit.value}
            </span>
          );
        })}
      </div>
    )
  );
};

export default LegendLayer;
