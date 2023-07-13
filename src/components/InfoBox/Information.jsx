import { useState, useEffect } from "react";
import { useStateValue } from "../../context/StateProvider";
import RoundSpinner from "../RoundSpinner";
import { Tabs, Tab } from "@mui/material";
import { FaTemperatureHigh, FaEyeDropper, FaCloud } from "react-icons/fa";
import { TbGauge } from "react-icons/tb";
import { TabPanel } from "./InfoBox";
import { getForecastWeather } from "../../apis";
import MinMaxChart from "./MinMaxChart";
import SingleLineChart from "./SingleLineChart";
import { menuValues } from "../Sidebar";
import {
  AVG_HOUSEHOLD_SIZE,
  PEOPLE_PER_KM2,
  M2_TO_KM2,
  AVG_PLANT_CO2,
  FOREST_AREA,
  TOTAL_ROAD_LENGTH,
  URBAN_LAND_AREA,
  AGRICULTURE_LAND_AREA,
  NUMBER_OF_HOUSEHOLD,
} from "../../constants/information";
import { generalInfo } from "../LandUsePolygon";

export const urbanAreas = ["Urban_areas", "Urban areas"];
export const agri = ["Agriculture"];
export const emission = ["Industrials areas", "Urban areas", "Urban_areas"];
export const plants = [
  "Bush, grassy savanna",
  "Dense vegetation, forests",
  "Wooded savanna, forest path border",
  "Vegetations",
  "Vegetation",
];
export const industry = ["Industrials areas"];

const hasPercentageData = [...plants, ...urbanAreas];
function getPercentageAndTotalType(landuse) {
  if (plants.includes(landuse.label))
    return [
      (landuse.area / generalInfo["vegetation area"]) * 100,
      "forest areas",
    ];
  if (urbanAreas.includes(landuse.label))
    return [(landuse.area / generalInfo["urban area"]) * 100, "urban areas"];
  if (agri.includes(landuse.label))
    return [
      (landuse.area / generalInfo["agriculture area"]) * 100,
      "agricultural land area",
    ];
  return false;
}

const Information = () => {
  const [
    { currentWeather, isLoadingInfo, latlng, landUseInfo, roadInfo, mapMode },
  ] = useStateValue();
  const [pressureChartData, setPressureChartData] = useState(null);
  const [humidityChartData, setHumidityChartData] = useState(null);
  const [cloudsChartData, setCloudsChartData] = useState(null);
  const [temperatureChartData, setTemperatureChartData] = useState(null);
  const [value, setValue] = useState(0);

  const percentage = getPercentageAndTotalType(landUseInfo);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    getForecastWeather(latlng.wrap().lat, latlng.wrap().lng).then((data) => {
      const temp = [];
      const pressure = [];
      const humid = [];
      const clouds = [];
      data.list.forEach((el) => {
        const formattedTime = el.dt_txt.split(" ")[1].slice(0, 5);
        temp.push({
          formattedTime,
          value: +(el.main.temp - 272.15).toFixed(1),
        });
        pressure.push({ formattedTime, value: el.main.pressure });
        humid.push({ formattedTime, value: el.main.humidity });
        clouds.push({ formattedTime, value: el.clouds.all });
      });
      setTemperatureChartData(temp);
      setPressureChartData(pressure);
      setHumidityChartData(humid);
      setCloudsChartData(clouds);
    });
  }, [latlng]);

  return isLoadingInfo ? (
    <RoundSpinner />
  ) : (
    <div className="flex flex-col gap-0">
      <div className="mb-3">
        {mapMode?.value === menuValues.LAND_USE_2 && landUseInfo?.label ? (
          <>
            <p className="mb-3">
              According to land use data, current location is{" "}
              <strong>{landUseInfo?.label}</strong> area.
              <p className="mb-3">
                Selected area is{" "}
                <strong>{landUseInfo?.area.toFixed(1)}&#13217;</strong>.{" "}
                {percentage ? (
                  <span>
                    It accounts for <strong>{percentage[0].toFixed(2)}%</strong>{" "}
                    of the total {percentage[1]} in Gold Coast.
                  </span>
                ) : null}
              </p>
              {urbanAreas.includes(landUseInfo.label) ? (
                <p>
                  It has about{" "}
                  <strong>
                    {Math.ceil(
                      (landUseInfo.area * PEOPLE_PER_KM2 * M2_TO_KM2) /
                        AVG_HOUSEHOLD_SIZE
                    )}
                  </strong>{" "}
                  households (equally{" "}
                  <strong>
                    {Math.ceil(landUseInfo.area * PEOPLE_PER_KM2 * M2_TO_KM2)}{" "}
                  </strong>
                  people) that's residing on. This number of household accounts
                  for{" "}
                  <strong>
                    {(
                      ((landUseInfo.area * PEOPLE_PER_KM2 * M2_TO_KM2) /
                        AVG_HOUSEHOLD_SIZE /
                        NUMBER_OF_HOUSEHOLD) *
                      100
                    ).toFixed(2)}
                    %
                  </strong>{" "}
                  households in Australia
                </p>
              ) : null}
            </p>
            <p className="mb-3">
              <strong>
                {plants.includes(landUseInfo?.label)
                  ? `This area absorbs approximately ${Math.floor(
                      M2_TO_KM2 * landUseInfo?.area * AVG_PLANT_CO2
                    )} tons of carbon dioxide per year`
                  : null}
              </strong>
              <strong>
                {emission.includes(landUseInfo?.label)
                  ? `This area emits approximately ${Math.round(
                      M2_TO_KM2 * landUseInfo?.area * 6.92 * 1.1022927689594355
                    )} tons of carbon dioxide per year`
                  : null}
              </strong>
            </p>
          </>
        ) : null}
        {mapMode?.title === "ROADS" && roadInfo?.type ? (
          <>
            <p className="mb-3">
              According to land use data, this road is of type{" "}
              <strong>{roadInfo?.type}</strong>.
            </p>
            <p className="mb-3">
              Selected road is <strong>{roadInfo?.length.toFixed(2)}km</strong>.{" "}
              <span>
                It accounts for{" "}
                <strong>
                  {((roadInfo?.length / TOTAL_ROAD_LENGTH) * 100).toFixed(2)}%
                </strong>{" "}
                of the total road length in Australia.
              </span>
            </p>
          </>
        ) : null}
        <h6 className="uppercase mb-1 text-active text-lg">Current weather</h6>
        <div className="mt-0 mb-1 flex gap-3">
          {currentWeather ? (
            <>
              <p className="m-0">
                Temperature:{" "}
                <span className="text-primary">
                  {(currentWeather.main.temp - 272.15).toFixed(1)}
                  &#8451;
                </span>
              </p>
              <p className="m-0">
                Humidity:{" "}
                <span className="text-primary">
                  {currentWeather.main.humidity}%
                </span>
              </p>
              <p className="m-0">
                Pressure:{" "}
                <span className="text-primary">
                  {currentWeather.main.pressure}hPa
                </span>
              </p>
            </>
          ) : null}
        </div>

        <div className="grid-2-cols">
          <p className="m-0">Wind direction:</p>
          <p className="m-0">{currentWeather.wind.deg}°</p>
          <p className="m-0">Wind speed:</p>
          <p className="m-0">{currentWeather.wind.speed}m/s</p>
        </div>
      </div>
      <h6 className="uppercase mb-2 text-lg text-active">Forecast</h6>
      <Tabs
        value={value}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons="auto"
      >
        <Tab
          icon={<FaTemperatureHigh />}
          label="Temperature"
          aria-label="temperature"
        />
        <Tab icon={<FaCloud />} label="Cloud" aria-label="cloud" />
        <Tab icon={<FaEyeDropper />} label="Humidity" aria-label="humidity" />
        <Tab icon={<TbGauge />} label="Pressure" aria-label="pressure" />
      </Tabs>
      <TabPanel value={value} index={0}>
        {temperatureChartData && (
          <SingleLineChart data={temperatureChartData} unit="℃" />
        )}
      </TabPanel>
      <TabPanel value={value} index={1}>
        {humidityChartData && (
          <SingleLineChart data={humidityChartData} unit="%" />
        )}
      </TabPanel>
      <TabPanel value={value} index={2}>
        {cloudsChartData && <SingleLineChart data={cloudsChartData} unit="%" />}
      </TabPanel>
      <TabPanel value={value} index={3}>
        {pressureChartData && (
          <SingleLineChart data={pressureChartData} unit="hPa" />
        )}
      </TabPanel>
    </div>
  );
};

export default Information;
