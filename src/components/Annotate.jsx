import React, { useEffect, useState } from "react";
import { EditControl } from "react-leaflet-draw";
import { FeatureGroup, Polygon, useMap } from "react-leaflet";
import { useStateValue } from "../context/StateProvider";
import { menuValues } from "./Sidebar";

let apiData = [
  [-28.0025999, 153.4225884],
  [-28.0025354, 153.4215415],
  [-28.0027954, 153.4211494],
  [-28.003243, 153.4206937],
  [-28.0038712, 153.4204289],
  [-28.0044175, 153.4209138],
  [-28.004765, 153.4212758],
  [-28.0053245, 153.4217636],
  [-28.0054412, 153.4218852],
  [-28.0055021, 153.4224266],
];

const Annotate = () => {
  const [{ mapMode }] = useStateValue();
  const [polygon, setPolygon] = useState(apiData);
  const [result, setResult] = useState([]);
  const [label, setLabel] = useState("");
  const map = useMap();
  useEffect(() => {
    map.fitBounds(apiData);
  }, []);

  const onEdited = (e) => {
    e.layers.eachLayer(function (layer) {
      var geoJSON = layer.toGeoJSON();
      setResult(geoJSON.geometry.coordinates[0]);
      // setPolygon(geoJSON.geometry.coordinates[0]);
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (label.length === 0) {
      alert("You haven't entered label");
      return;
    }
    alert("Your label: " + label);
  };

  console.log(result);
  return mapMode.value === menuValues.ANNOTATE ? (
    <>
      <form
        className="absolute right-8 top-32 z-[1000] flex items-center bg-white p-4 gap-2 rounded"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          className="rounded-full p-2 text-lg border"
        />
        <button
          type="submit"
          className="bg-primary p-2 rounded-full text-lg text-white"
          onClick={handleSubmit}
        >
          Save
        </button>
      </form>
      <FeatureGroup>
        <EditControl
          position="bottomright"
          onEdited={onEdited}
          // onCreated={onCreated}
          // onDeleted={this._onDeleted}
          draw={{
            rectangle: false,
          }}
        />
        <Polygon positions={polygon} color="red" />
      </FeatureGroup>
    </>
  ) : null;
};

export default Annotate;
