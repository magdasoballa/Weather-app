interface WeatherData {
  list: {
    clouds: { all: number };
    main: {
      feels_like: number;
      humidity: number;
      pressure: number;
      temp: number;
      temp_max: number;
      temp_min: number;
    }[];
  }[];
}

export default WeatherData;
