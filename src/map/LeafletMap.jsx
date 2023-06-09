import React from "react";
import { MapContainer, TileLayer, ZoomControl } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import {
  Annotate,
  CountryBox,
  LandUsePolygon,
  MyLayer,
  MyPopup,
  OWMTileLayer,
  Roads,
  SearchBar,
} from "../components";
import GeneralInfo from "../components/GeneralInfo";
import { useStateValue } from "../context/StateProvider";
import { menuValues } from "../components/Sidebar";

const LeafletMap = () => {
  const [{ mapMode }] = useStateValue();
  return (
    <MapContainer
      center={[-24.327077, 134.248541]}
      zoom={5}
      zoomControl={false}
      className="h-full w-full relative"
      style={{ zIndex: 0 }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <ZoomControl position="topright" />
      <SearchBar />
      <MyPopup />
      <MyLayer />
      <LandUsePolygon />
      <Roads />
      <CountryBox />
      <OWMTileLayer />
      <GeneralInfo />
      {mapMode.value === menuValues.ANNOTATE ? <Annotate /> : null}
    </MapContainer>
  );
};

export default LeafletMap;
