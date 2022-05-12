import { KeyboardEvent } from "react";
import {
  createTheme,
  IconButton,
  TextField,
  ThemeProvider,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import "./Searcher.scss";
import { WeatherData } from "../../interfaces";

const theme = createTheme({
  palette: {
    primary: {
      main: "#000",
    },
  },
});

interface SearcherProps {
  getWeather: () => void;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  data: WeatherData | null;
}

export const Searcher = ({
  getWeather,
  value,
  setValue,
  data,
}: SearcherProps) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const enterListener = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.code === "Enter" || event.code === "NumpadEnter") {
      getWeather();
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <div className="searcher-component-wrapper" onKeyDown={enterListener}>
        <TextField
          value={value}
          onChange={handleChange}
          size="medium"
          color="primary"
          variant="outlined"
          id="filled-basic"
          label="Enter the city name"
          InputProps={{
            endAdornment: (
              <IconButton onClick={getWeather}>
                <SearchIcon sx={{ color: "#000" }} />
              </IconButton>
            ),
          }}
        />
      </div>
    </ThemeProvider>
  );
};
