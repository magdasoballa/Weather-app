import {
  createTheme,
  IconButton,
  Input,
  TextField,
  ThemeProvider,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import "./Searcher.scss";
import {
  FormEventHandler,
  MutableRefObject,
  useRef,
  useState,
  KeyboardEvent,
} from "react";

const theme = createTheme({
  palette: {
    primary: {
      main: "#000",
    },
  },
});

export const Searcher = ({ getWeather, value, setValue, data }: any) => {
  // const [value, setValue] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const enterListener = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.code === "Enter" || event.code === "NumpadEnter") {
      console.log("enter");
      getWeather();
    }
  };
  return (
    <ThemeProvider theme={theme}>
      <div className="searcher-component-wrapper" onKeyDown={enterListener}>
        <TextField
          value={value}
          onChange={handleChange}
          style={{ width: "50%" }}
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
