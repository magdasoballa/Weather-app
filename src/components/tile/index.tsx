import moment from "moment";
import { useEffect, useState } from "react";
import { TimeOfTheDay, WeatherForOneDay } from "../../interfaces";
import "./tile.scss";

const degreeSign = <span>&#176;</span>;

const weatherTimeOfTheDays = (title: string, data: TimeOfTheDay) => {
  return (
    <div className="time-of-day-wrapper">
      <p className="time-title">{title}</p>
      <p className="time-of-day-section">
        Max temperature: {data.tempCelsiusMax}
        {degreeSign}
      </p>
      <p className="time-of-day-section">
        Min temperature: {data.tempCelsiusMin}
        {degreeSign}
      </p>
      <p className="time-of-day-section">
        Average temperature: {data.averageTempCelsius}
        {degreeSign}
      </p>
      <p className="time-of-day-section">
        humidity temperature: {data.humidity}%
      </p>
    </div>
  );
};

interface TileProps {
  dayData: WeatherForOneDay;
}

export const Tile = ({ dayData }: TileProps) => {
  const [isNoData, setIsNoData] = useState(false);

  useEffect(() => {
    console.log(dayData);
    if (!dayData.morning && !dayData.afternoon && !dayData.evening) {
      setIsNoData(true);
    }
  }, [dayData]);

  return (
    <div className="tile-wrapper">
      <p className="main-title">day: {dayData.date}</p>
      {dayData.morning &&
        weatherTimeOfTheDays("Weather morning", dayData.morning)}
      {dayData.afternoon &&
        weatherTimeOfTheDays("Weather afternoon", dayData.afternoon)}
      {dayData.evening &&
        weatherTimeOfTheDays("Weather evening", dayData.evening)}

      {isNoData && <p className="no-data-message">No data</p>}
    </div>
  );
};
