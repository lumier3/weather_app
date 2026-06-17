import DailyForecast from "./components/cards/DailyForecast.tsx";
import HourlyForecast from "./components/cards/HourlyForecast.tsx";
import CurrentWeather from "./components/cards/CurrentWeather.tsx";
import AdditionalInfo from "./components/cards/AdditionalInfo.tsx";
import Map from "./components/Map.tsx";
import { useState } from "react";
import type { Coords } from "./types.ts";

function App() {
  const [coords, setCoords] = useState<Coords>({
    lat: 18.8713,
    lon: 92.1994,
  });

  const onMapClick = (lat: number, long: number) =>
    setCoords({ lat, lon: long });

  console.log(coords);

  return (
    <div className="flex flex-col gap-4 p-4">
      <Map coords={coords} onMapClick={onMapClick} />
      <CurrentWeather coords={coords} />
      <HourlyForecast coords={coords} />
      <DailyForecast coords={coords} />
      <AdditionalInfo coords={coords} />
    </div>
  );
}

export default App;
