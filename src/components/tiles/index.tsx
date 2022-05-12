import { WeatherForOneDay } from "../../interfaces";
import { Tile } from "../tile";
import "./tiles.scss";

interface TilesProps {
  data: WeatherForOneDay[];
  city: string | undefined;
}

export const Tiles = ({ data, city }: TilesProps) => {
  return (
    <div className="tiles-wrapper">
      {city && <p className="city-name">Search results for {city}</p>}

      <div className="tiles">
        {data.map((dayData) => (
          <Tile dayData={dayData} key={dayData.date} />
        ))}
      </div>
    </div>
  );
};
