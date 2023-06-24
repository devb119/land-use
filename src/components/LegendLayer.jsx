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
};

export const plants = [
  "Bush, grassy savanna",
  "Dense vegetation, forests",
  "Wooded savanna, forest path border",
  "Vegetations",
  "Vegetation",
];

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
