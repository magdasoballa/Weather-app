import { KeyboardEvent } from "react";
import { IconButton, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import "./Searcher.scss";

export const Searcher = ({ getWeather, value, setValue, data }: any) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const enterListener = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.code === "Enter" || event.code === "NumpadEnter") {
      getWeather();
    }
  };

  return (
    <div className="searcher-component-wrapper" onKeyDown={enterListener}>
      <TextField
        value={value}
        onChange={handleChange}
        style={{ width: "30%" }}
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
  );
};
