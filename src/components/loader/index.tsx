import CircularProgress from "@mui/material/CircularProgress";
import "./loader.scss";

export const Loader = () => {
  return (
    <div className="loader-wrapper">
      <CircularProgress />
    </div>
  );
};
