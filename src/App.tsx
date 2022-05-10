import { createTheme, ThemeProvider, Typography } from "@mui/material";
import { useState } from "react";
import "./App.scss";
import { Searcher, Tile, Loader, DatePicker } from "./components";
import WeatherData from "./interfaces";

export const theme = createTheme({
  typography: {
    fontSize: 12,
    fontFamily: ["Acme", "sans-serif"].join(","),
  },
});

const App = () => {
  const [isPending, setIsPending] = useState(false);
  const [value, setValue] = useState("");
  const [data, setData] = useState<WeatherData | undefined>();

  const getWeather = () => {
    setIsPending(true);
    fetch(
      `http://api.openweathermap.org/geo/1.0/direct?q=${value}&limit=3&appid=91ad49c742f0f69cffb9a715ff90686d`
    )
      .then((res) => res.json())
      .then((res) => {
        const lat = res[0]?.lat;
        const lon = res[0]?.lon;
        if (lat && lon) {
          getWeatherForCity(lat, lon);
        }
      })
      .catch((e) => {
        setIsPending(false);
        console.error(e);
      });
  };

  const getWeatherForCity = (lat: number, lon: number) => {
    fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=91ad49c742f0f69cffb9a715ff90686d`
    )
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setValue("");
        setData(res);
      })
      .catch((e) => {
        console.error(e);
      })
      .finally(() => {
        setIsPending(false);
      });
  };

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <header>
          <Typography variant="h1">
            <title className="title">Weather checker</title>
          </Typography>
        </header>
        <Searcher
          getWeather={getWeather}
          value={value}
          setValue={setValue}
          data={data}
        />
        <Tile />
      </div>
    </ThemeProvider>
  );
};

export default App;
