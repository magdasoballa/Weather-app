import { WeatherForOneDay } from "../../interfaces";
import { Tile } from "../tile";

interface TilesProps {
  data: WeatherForOneDay[];
  city: string | undefined;
}

export const Tiles = ({ data, city }: TilesProps) => {
  return (
    <div>
      {city && <p className="city-name">Search results for {city}</p>}

      {data.map((dayData) => (
        <Tile dayData={dayData} key={dayData.date} />
      ))}
    </div>
  );
};
