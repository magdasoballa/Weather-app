import { useState } from "react";
import { createTheme, ThemeProvider, Typography } from "@mui/material";
import { Searcher, Loader } from "./components";
import { Tiles } from "./components/tiles";
import { convertDataFromApi } from "./helpers";
import { WeatherData } from "./interfaces";
import "./App.scss";

export const theme = createTheme({
  typography: {
    fontSize: 12,
    fontFamily: ["Acme", "sans-serif"].join(","),
  },
});

const App = () => {
  const [isPending, setIsPending] = useState(false);
  const [value, setValue] = useState("");
  const [notFound, setNotFound] = useState(false);
  const [data, setData] = useState<WeatherData>();
  const appId = "91ad49c742f0f69cffb9a715ff90686d";

  const getWeather = () => {
    setIsPending(true);
    setNotFound(false);
    fetch(
      `http://api.openweathermap.org/geo/1.0/direct?q=${value}&limit=3&appid=${appId}`
    )
      .then((res) => res.json())
      .then((res) => {
        const lat = res[0]?.lat;
        const lon = res[0]?.lon;
        if (lat && lon) {
          getWeatherForCity(lat, lon);
        } else {
          setNotFound(true);
          setIsPending(false);
        }
      })
      .catch((e) => {
        setIsPending(false);
        console.error(e);
      });
  };

  const getWeatherForCity = (lat: number, lon: number) => {
    fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${appId}`
    )
      .then((res) => res.json())
      .then((res) => {
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
        {isPending ? (
          <Loader />
        ) : (
          <div>
            <Tiles data={convertDataFromApi(data)} city={data?.city?.name} />
          </div>
        )}
        {notFound && <div>City not found</div>}
      </div>
    </ThemeProvider>
  );
};

export default App;
