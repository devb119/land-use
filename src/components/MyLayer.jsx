import { useMap } from "react-leaflet";
import { useEffect } from "react";
import { useStateValue } from "../context/StateProvider";

const layer = L.tileLayer.wms("http://106.254.237.82:8080/geoserver/wms", {
  layers: "GU:big_layer",
  transparent: true,
  format: "image/jpeg",
  version: "1.1.0",
  attribution: "Your attribution",
  // crossOrigin: "anonymous",
});

const MyLayer = () => {
  const map = useMap();
  const [{ mapMode }] = useStateValue();

  useEffect(() => {
    if (mapMode.title === "LANDUSE 1") {
      map.addLayer(layer);
    } else {
      map.removeLayer(layer);
    }
  }, [mapMode]);
  return null;
};

export default MyLayer;
