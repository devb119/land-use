import { useState } from "react";
import { Tabs, Tab } from "@mui/material";
import { BsStack, BsFillBarChartFill } from "react-icons/bs";
import "./InfoBox.styles.css";
import { useStateValue } from "../../context/StateProvider";
import { actionType } from "../../context/reducer";
import { AiOutlineDown, AiOutlineUp } from "react-icons/ai";
import Information from "./Information";
import Analysis from "./Analysis";

export function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <>{children}</>}
    </div>
  );
}

const InfoBox = () => {
  const [{ isOpenInfo, address, latlng }, dispatch] = useStateValue();
  const [currentTab, setCurrentTab] = useState(0);

  const handleChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  const handleToggleInfo = () => {
    dispatch({ type: actionType.SET_IS_OPEN_INFO, isOpenInfo: !isOpenInfo });
  };

  return (
    <div className="info-box" style={{ maxHeight: isOpenInfo ? "28rem" : 0 }}>
      <Tabs
        value={currentTab}
        variant="fullWidth"
        className="fixed-tab"
        onChange={handleChange}
      >
        <Tab icon={<BsStack />} iconPosition="start" label="Information" />
        <Tab
          icon={<BsFillBarChartFill />}
          iconPosition="start"
          label="General"
        />
      </Tabs>
      <div className="p-3 mt-fixed relative">
        <button onClick={handleToggleInfo} className="toggle-info-btn">
          {isOpenInfo ? <AiOutlineUp /> : <AiOutlineDown />}
        </button>
        <h4 className="mb-0 text-primary text-2xl">
          <b>{address?.split(",")[0]}</b>
        </h4>
        <h5>{address?.split(",").slice(1).join(", ")}</h5>
        <p className="mt-0 h6 text-muted mb-3">
          {" "}
          {`Latitude: ${latlng.lat.toFixed(3)}, Longitude: ${latlng.lng.toFixed(
            3
          )}`}
        </p>
        <TabPanel value={currentTab} index={0}>
          <Information />
        </TabPanel>
        <TabPanel value={currentTab} index={1}>
          <Analysis />
        </TabPanel>
      </div>
    </div>
  );
};

export default InfoBox;
