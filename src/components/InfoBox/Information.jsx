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
import { plants } from "../LegendLayer";

const Information = () => {
  const [{ currentWeather, isLoadingInfo, latlng, landUseInfo, mapMode }] =
    useStateValue();
  const [pressureChartData, setPressureChartData] = useState(null);
  const [humidityChartData, setHumidityChartData] = useState(null);
  const [cloudsChartData, setCloudsChartData] = useState(null);
  const [temperatureChartData, setTemperatureChartData] = useState(null);
  const [value, setValue] = useState(0);

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
        {mapMode?.title === "LAND USE 2" && landUseInfo?.label ? (
          <>
            <p className="mb-3">
              According to land use data, current location is{" "}
              <strong>{landUseInfo?.label}</strong> area.
            </p>
            <p className="mb-3">
              Selected area is{" "}
              <strong>{landUseInfo?.area.toFixed(1)}&#13217;</strong>.{" "}
              <strong>
                {plants.includes(landUseInfo?.label)
                  ? `This area absorbs approximately ${Math.floor(
                      0.0001 * landUseInfo?.area * 22.6
                    )} tons of carbon dioxide per year`
                  : null}
              </strong>
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
