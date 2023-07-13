import React from "react";
import { MdLandslide } from "react-icons/md";
import { GiRoad } from "react-icons/gi";
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";
import { TbPolygon } from "react-icons/tb";

export const menuValues = {
  LAND_USE_1: "LAND_USE_1",
  LAND_USE_2: "LAND_USE_2",
  ROADS: "ROADS",
  ANNOTATE: "ANNOTATE",
};
const items = [
  // { title: "LAND USE 1", value: "LAND_USE_1", icon: <MdLandslide /> },
  { title: "LAND USE", value: "LAND_USE_2", icon: <MdLandslide /> },
  { title: "ROADS", value: "ROADS", icon: <GiRoad /> },
  { title: "ANNOTATE", value: "ANNOTATE", icon: <TbPolygon /> },
];
const Sidebar = () => {
  const [{ mapMode }, dispatch] = useStateValue();

  const handleChangeMode = (mode) => () => {
    if (mapMode.value === mode.value)
      dispatch({ type: actionType.SET_MAP_MODE, mapMode: {} });
    else dispatch({ type: actionType.SET_MAP_MODE, mapMode: mode });
  };

  return (
    <div className="fixed bg-gray-200 left-0 h-screen top-0 z-10 flex flex-col w-16">
      <div className="h-24 flex items-center justify-center cursor-pointer">
        <img src="/australia.svg" className="w-4/5" alt="australia symbol" />
      </div>
      {items.map((item) => (
        <button
          className={`flex flex-col items-center justify-center hover:bg-white h-20 transition-all text-mainGray ${
            mapMode.value === item.value ? "bg-white" : ""
          }`}
          key={item.value}
          onClick={handleChangeMode(item)}
        >
          <p className="text-2xl">{item.icon}</p>
          <p className="capitalize text-xs">{item.title}</p>
        </button>
      ))}
    </div>
  );
};

export default Sidebar;
