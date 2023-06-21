import React from "react";
import { countryBoundingBox, centroids } from "../constants";
import { Marker, Polygon, Polyline } from "react-leaflet";
import { useStateValue } from "../context/StateProvider";

function rad2degr(rad) {
  return (rad * 180) / Math.PI;
}
function degr2rad(degr) {
  return (degr * Math.PI) / 180;
}

/**
 * @param latLngInDeg array of arrays with latitude and longtitude
 *   pairs in degrees. e.g. [[latitude1, longtitude1], [latitude2
 *   [longtitude2] ...]
 *
 * @return array with the center latitude longtitude pairs in
 *   degrees.
 */
function getLatLngCenter(latLngInDegr) {
  var LATIDX = 0;
  var LNGIDX = 1;
  var sumX = 0;
  var sumY = 0;
  var sumZ = 0;

  for (var i = 0; i < latLngInDegr.length; i++) {
    var lat = degr2rad(latLngInDegr[i][LATIDX]);
    var lng = degr2rad(latLngInDegr[i][LNGIDX]);
    // sum of cartesian coordinates
    sumX += Math.cos(lat) * Math.cos(lng);
    sumY += Math.cos(lat) * Math.sin(lng);
    sumZ += Math.sin(lat);
  }

  var avgX = sumX / latLngInDegr.length;
  var avgY = sumY / latLngInDegr.length;
  var avgZ = sumZ / latLngInDegr.length;

  // convert average x, y, z coordinate to latitude and longtitude
  var lng = Math.atan2(avgY, avgX);
  var hyp = Math.sqrt(avgX * avgX + avgY * avgY);
  var lat = Math.atan2(avgZ, hyp);

  return [rad2degr(lat), rad2degr(lng)];
}

const CountryBox = () => {
  const vn = countryBoundingBox.AUS;
  const centroid = centroids[179];
  const [{ bbox }] = useStateValue();
  const polygon = [
    [vn.ne.lat, vn.sw.lon],
    [vn.ne.lat, vn.ne.lon],
    [vn.sw.lat, vn.ne.lon],
    [vn.sw.lat, vn.sw.lon],
  ];

  const polygon2 = [
    [centroid.ne_lat, centroid.sw_lng],
    [centroid.ne_lat, centroid.ne_lng],
    [centroid.sw_lat, centroid.ne_lng],
    [centroid.sw_lat, centroid.sw_lng],
  ];

  const ggmap = {
    south: 8.195200055936033,
    west: 102.1440178124298,
    north: 23.39265041162843,
    east: 109.6765000139078,
  };

  const polyline = [
    [vn.ne.lat, vn.ne.lon],
    [vn.sw.lat, vn.sw.lon],
  ];

  return (
    <>
      {/* <Marker position={[+centroid.center_lat, +centroid.center_lng]} /> */}
      {/* <Polygon pathOptions={{ color: "black" }} positions={polygon} />
      <Polygon pathOptions={{ color: "black" }} positions={polyline} /> */}
      {/* <Polygon pathOptions={{ color: "blue" }} positions={polygon2} /> */}
      {/* <Polygon
        pathOptions={{ color: "purple" }}
        positions={[
          [21.373088487044015, 105.28208051999997],
          [21.373088487044015, 106.01361209492222],
          [20.568305569346535, 106.01361209492222],
          [20.568305569346535, 105.28208051999997],
        ]}
      /> */}
      {bbox ? (
        <Polygon pathOptions={{ color: "purple" }} positions={bbox} />
      ) : null}
    </>
  );
};

export default CountryBox;
