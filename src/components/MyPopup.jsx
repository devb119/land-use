import React from "react";
import { Popup } from "react-leaflet";
import { useStateValue } from "../context/StateProvider";
import { menuValues } from "./Sidebar";

const MyPopup = () => {
  const [{ latlng, address, mapMode }] = useStateValue();

  return mapMode.value === menuValues.ANNOTATE ? null : (
    <Popup position={latlng} autoPan={false}>
      <div className="flex flex-col w-72">
        <h6 className="text-lg font-bold">{address}</h6>
        <p className="m-0 text-sm">
          {" "}
          {`Latitude: ${latlng.lat.toFixed(3)}, Longitude: ${latlng.lng.toFixed(
            3
          )}`}
        </p>
      </div>
    </Popup>
  );
};

export default MyPopup;
