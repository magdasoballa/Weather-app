import { useEffect, useState } from "react";
import { TimeOfTheDay, WeatherForOneDay } from "../../interfaces";
import "./tile.scss";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import WbSunnyIcon from "@mui/icons-material/WbSunny";

const degreeSign = <span>&#176;</span>;

const weatherTimeOfTheDays = (title: string, data: TimeOfTheDay) => {
  return (
    <div className="time-of-day-wrapper">
      <p className="time-title">
        {title} <WbSunnyIcon></WbSunnyIcon>
      </p>
      <div className="time-of-day-section">
        Max temperature: <p className="amount-data">{data.tempCelsiusMax}</p>
        {degreeSign}
      </div>
      <div className="time-of-day-section">
        Min temperature: <p className="amount-data">{data.tempCelsiusMin}</p>
        {degreeSign}
      </div>
      <div className="time-of-day-section">
        Average temperature:{" "}
        <p className="amount-data">{data.averageTempCelsius}</p>
        {degreeSign}
      </div>
      <div className="time-of-day-section">
        Humidity: <p className="amount-data">{data.humidity}%</p>
      </div>
    </div>
  );
};

interface TileProps {
  dayData: WeatherForOneDay;
}

export const Tile = ({ dayData }: TileProps) => {
  const [isNoData, setIsNoData] = useState(false);

  useEffect(() => {
    if (!dayData.morning && !dayData.afternoon && !dayData.evening) {
      setIsNoData(true);
    }
  }, [dayData]);

  return (
    <div className="tile-wrapper">
      <p className="main-title">
        <CalendarTodayIcon></CalendarTodayIcon>
        {dayData.date}
      </p>
      <div className="tile">
        {dayData.morning &&
          weatherTimeOfTheDays("Weather morning", dayData.morning)}
        {dayData.afternoon &&
          weatherTimeOfTheDays("Weather afternoon", dayData.afternoon)}
        {dayData.evening &&
          weatherTimeOfTheDays("Weather evening", dayData.evening)}

        {isNoData && <p className="no-data-message">No data</p>}
      </div>
    </div>
  );
};
