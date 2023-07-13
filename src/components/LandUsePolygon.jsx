import React, { useEffect } from "react";
import { Polygon, useMap } from "react-leaflet";
import { big, small } from "../constants";
import { useStateValue } from "../context/StateProvider";
import { polygon, area } from "@turf/turf";
import { actionType } from "../context/reducer";
import { agri, urbanAreas, plants, industry } from "./InfoBox/Information";
import { M2_TO_KM2, AVG_PLANT_CO2 } from "../constants/information";

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

export const generalInfo = {
  "total area": 0,
  absorption: 0,
  emission: 0,
  "urban area": 0,
  // industryArea: 0,
  "vegetation area": 0,
  "agriculture area": 0,
};

const LandUsePolygon = () => {
  const [{ zoom, mapMode, landUseInfo }, dispatch] = useStateValue();
  const map = useMap();

  useEffect(() => {
    if (zoom == 14) {
      dispatch({ type: actionType.SET_LAND_USE_INFO, landUseInfo: {} });
    }
    return () =>
      dispatch({ type: actionType.SET_LAND_USE_INFO, landUseInfo: {} });
  }, [zoom]);

  useEffect(() => {
    if (mapMode.value === "LAND_USE_2") {
      map.fitBounds([
        [-28.1567145633876272, 153.3437067822543725],
        [-27.9648045166695525, 153.5003235987372818],
      ]);
    }
  }, [mapMode]);

  useEffect(() => {
    // Calculate statistics for general information of the map
    big.forEach((feature) => {
      const S = area(polygon([feature.polygon]));
      if (plants.includes(feature.label)) {
        generalInfo["vegetation area"] += S;
        generalInfo.absorption += M2_TO_KM2 * S * AVG_PLANT_CO2;
      } else if (urbanAreas.includes(feature.label)) {
        generalInfo["urban area"] += S;
        generalInfo.emission += M2_TO_KM2 * S * 6.92 * 1.1022927689594355;
      } else if (agri.includes(feature.label)) {
        generalInfo["agriculture area"] += S;
      }
      // } else if (industry.includes(feature.label)) {
      //   generalInfo.industryArea += S;
      //   generalInfo.emission +=
      //     M2_TO_KM2 * S * 6.92 * 1.1022927689594355;
      // }
      generalInfo["total area"] += S;
    });
  }, []);

  console.log(generalInfo);

  return (
    <>
      {mapMode?.value === "LAND_USE_2" && landUseInfo?.polygon ? (
        <Polygon
          pathOptions={{ color: colorMap[landUseInfo?.label] }}
          positions={landUseInfo?.polygon}
          fill={true}
          fillOpacity={0.8}
        />
      ) : null}
      {mapMode.value === "LAND_USE_2"
        ? zoom > 12
          ? small.map((feature) => {
              // checkSmall[feature.label] = "yeah";
              // console.log(checkSmall);
              return (
                <Polygon
                  pathOptions={{ color: colorMap[feature.label] }}
                  positions={feature.polygon}
                  key={feature.polygon[0]}
                  eventHandlers={{
                    click: () => {
                      const S = area(polygon([feature.polygon]));
                      dispatch({
                        type: actionType.SET_LAND_USE_INFO,
                        landUseInfo: {
                          label: feature.label,
                          area: S,
                          polygon: feature.polygon,
                        },
                      });
                      dispatch({
                        type: actionType.SET_IS_OPEN_INFO,
                        isOpenInfo: true,
                      });
                    },
                  }}
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
                  key={feature.polygon[0]}
                  eventHandlers={{
                    click: () => {
                      const S = area(polygon([feature.polygon]));
                      dispatch({
                        type: actionType.SET_LAND_USE_INFO,
                        landUseInfo: {
                          label: feature.label,
                          area: S,
                          polygon: feature.polygon,
                        },
                      });
                      dispatch({
                        type: actionType.SET_IS_OPEN_INFO,
                        isOpenInfo: true,
                      });
                    },
                  }}
                />
              );
            })
        : null}
    </>
  );
};

export default LandUsePolygon;
