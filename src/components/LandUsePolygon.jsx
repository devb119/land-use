import React from "react";
import { Marker, Polygon, useMap } from "react-leaflet";
import { big, small } from "../constants";

const LandUsePolygon = () => {
  console.log(small[0].polygon);
  const map = useMap();
  map.fitBounds(small[0].polygon);
  return (
    <>
      {small.map((polygon) => (
        <Polygon
          pathOptions={{ color: "#128199" }}
          positions={polygon.polygon}
        />
      ))}
      {big.map((polygon) => (
        <Polygon
          pathOptions={{ color: "#121199" }}
          positions={polygon.polygon}
        />
      ))}
    </>
  );
};

export default LandUsePolygon;
