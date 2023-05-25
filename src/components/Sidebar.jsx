import React from "react";
import { MdLandslide } from "react-icons/md";
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";

const items = [
  { title: "LAND USE 1", icon: <MdLandslide /> },
  { title: "LAND USE 2", icon: <MdLandslide /> },
];
const Sidebar = () => {
  const [{ mapMode }, dispatch] = useStateValue();

  const handleChangeMode = (mode) => () => {
    if (mapMode.title === mode.title)
      dispatch({ type: actionType.SET_MAP_MODE, mapMode: {} });
    else dispatch({ type: actionType.SET_MAP_MODE, mapMode: mode });
  };

  return (
    <div className="fixed bg-gray-200 left-0 h-screen top-0 z-10 flex flex-col w-16">
      {items.map((item) => (
        <button
          className={`flex flex-col items-center justify-center hover:bg-white h-20 transition-all text-mainGray ${
            mapMode.title === item.title ? "bg-white" : ""
          }`}
          key={item.title}
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
