import React from "react";
import { Polygon } from "react-leaflet";
import { big, small } from "../constants";
import { useStateValue } from "../context/StateProvider";
import { polygon, area } from "@turf/turf";

const colorMap = {
  "Bare rocks": "#BEBEBE",
  "Bare soil": "#8B4513",
  "Bush, grassy savanna": "#C0D890",
  "Dense vegetation, forests": "#006400",
  "Industrials areas": "#4C4C4C",
  "Urban areas": "#f8be44",
  Urban_areas: "#f8be44",
  "Water bodies": "#0077BE",
  "Wooded savanna, forest path border": "#2E8B57",
  "Worksites and mines": "#FF7F00",
  Agriculture: "#FFD700 ",
  Vegetations: "#006400",
  Vegetation: "#006400",
  water: "#0077BE",
  Water: "#0077BE",
  null: "#000000",
};

const checkBig = {};
const checkSmall = {};

const LandUsePolygon = () => {
  const [{ zoom, mapMode }] = useStateValue();

  return (
    <>
      {mapMode.title === "LAND USE 2"
        ? zoom > 12
          ? small.map((feature) => {
              // checkSmall[feature.label] = "yeah";
              // console.log(checkSmall);
              return (
                <Polygon
                  pathOptions={{ color: colorMap[feature.label] }}
                  positions={feature.polygon}
                />
              );
            })
          : big.map((feature) => {
              // checkBig[polygon.label] = "yeah";
              // console.log(checkBig);
              return (
                <Polygon
                  pathOptions={{ color: colorMap[feature.label] }}
                  positions={feature.polygon}
                  eventHandlers={{
                    click: () => {
                      console.log(feature.label);
                      const S = area(polygon([feature.polygon]));
                      console.log(S);
                    },
                  }}
                  key={feature.polygon[0]}
                />
              );
            })
        : null}
    </>
  );
};

export default LandUsePolygon;
