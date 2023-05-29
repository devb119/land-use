import { useMap } from "react-leaflet";
import { useEffect } from "react";
import { useStateValue } from "../context/StateProvider";

const layer = L.tileLayer.wms("http://localhost:8080/geoserver/wms", {
  layers: "test:lo",
  format: "image/jpeg",
  transparent: true,
  version: "1.1.0",
  attribution: "Your attribution",
});

const MyLayer = () => {
  const map = useMap();
  const [{ mapMode }] = useStateValue();

  useEffect(() => {
    if (mapMode.title) {
      map.addLayer(layer);
    } else {
      map.removeLayer(layer);
    }
  }, [mapMode]);
  return null;
};

export default MyLayer;
