import moment from "moment";
import { maxWeatherTiles } from "../const";
import {
  TimeData,
  TimeOfTheDay,
  WeatherData,
  WeatherDataItem,
  WeatherForOneDay,
} from "../interfaces";

export enum UserResponse {
  MORNING = "morning",
  AFTERNOON = "afternoon",
  EVENING = "evening",
}

export const getHourForTimeOfDay = (
  weatherData: TimeOfTheDay[],
  type: UserResponse
) => {
  if (type === UserResponse.MORNING) {
    return weatherData.find((d) => +d.hour >= 6 && +d.hour <= 11) || null;
  } else if (type === UserResponse.AFTERNOON) {
    return weatherData.find((d) => +d.hour > 11 && +d.hour <= 16) || null;
  } else if (type === UserResponse.EVENING) {
    return weatherData.find((d) => +d.hour > 16) || null;
  }
  return null;
};

export const changeKelwinToCelsius = (kelwin: number) => {
  const celsius = Math.trunc(kelwin - 273.15);
  return celsius;
};

export const convertDataFromApi = (
  weatherData: WeatherData | undefined
): WeatherForOneDay[] => {
  if (!weatherData?.list) {
    return [];
  }

  const finalData: WeatherForOneDay[] = [];
  const timeDataObject: TimeData = {};

  weatherData.list.forEach((item: WeatherDataItem) => {
    console.log(item, "sss");
    const date = new Date(item?.dt * 1000);
    const momentDate = moment(date);
    const formattedDate = momentDate.format("YYYY-MM-DD");
    const formattedTime = momentDate.format("HH:mm");
    const hour = momentDate.format("HH");
    const tempMax = item?.main?.temp_max;
    const tempMin = item?.main?.temp_min;
    const averageTemp = item?.main?.temp;
    const tempCelsiusMax =
      tempMax || tempMax === 0 ? changeKelwinToCelsius(tempMax) : null;
    const tempCelsiusMin =
      tempMin || tempMin === 0 ? changeKelwinToCelsius(tempMin) : null;

    const averageTempCelsius =
      tempMin || averageTemp === 0 ? changeKelwinToCelsius(averageTemp) : null;

    const formattedData: TimeOfTheDay = {
      formattedDate,
      formattedTime,
      hour,
      tempCelsiusMax,
      tempCelsiusMin,
      averageTempCelsius,
      humidity: item?.main?.humidity || null,
    };

    timeDataObject[formattedDate]
      ? timeDataObject[formattedDate].push(formattedData)
      : (timeDataObject[formattedDate] = [formattedData]);
  });

  for (const date in timeDataObject) {
    const value = timeDataObject[date];
    const morning = getHourForTimeOfDay(value, UserResponse.MORNING);
    const afternoon = getHourForTimeOfDay(value, UserResponse.AFTERNOON);
    const evening = getHourForTimeOfDay(value, UserResponse.EVENING);
    const finalDataObject = {
      date,
      morning,
      afternoon,
      evening,
    };
    finalData.push(finalDataObject);
  }

  if (finalData.length > maxWeatherTiles) {
    return finalData.slice(0, maxWeatherTiles);
  }

  return finalData;
};
