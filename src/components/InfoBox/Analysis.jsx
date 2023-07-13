import React from "react";
import { generalInfo } from "../LandUsePolygon";

const Analysis = () => {
  return (
    <>
      <h2 className="uppercase mb-4 font-bold text-xl text-active">
        map information (Gold Coast)
      </h2>
      <div className="grid grid-cols-2 gap-1 gap-y-2 text-lg">
        {Object.keys(generalInfo).map((key) => {
          return (
            <>
              <p key={key} className="capitalize">
                {key}:
              </p>
              <p key={generalInfo[key]} className="">
                {new Intl.NumberFormat().format(generalInfo[key])}
                {key === "absorption" || key === "emission" ? " tons" : "m2"}
              </p>
            </>
          );
        })}
      </div>
    </>
  );
};

export default Analysis;
