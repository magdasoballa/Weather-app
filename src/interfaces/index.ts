export interface WeatherDataItem {
  dt: number;
  clouds: { all: number };
  main: {
    feels_like: number;
    humidity: number;
    pressure: number;
    temp: number;
    temp_max: number;
    temp_min: number;
  };
}

export interface WeatherData {
  list: WeatherDataItem[];
  city: {
    name: string;
    sunrise: number;
    sunset: number;
  };
}

export interface TimeOfTheDay {
  formattedDate: string;
  formattedTime: string;
  hour: string;
  tempCelsiusMax: number | null;
  tempCelsiusMin: number | null;
  averageTempCelsius: number | null;
  humidity: number | null;
}
export interface TimeData {
  [key: string]: TimeOfTheDay[];
}
export interface WeatherForOneDay {
  date: string;
  morning: TimeOfTheDay | null;
  afternoon: TimeOfTheDay | null;
  evening: TimeOfTheDay | null;
}
