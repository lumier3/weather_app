import { useQuery } from "@tanstack/react-query";
import { getWeather } from "./api.ts";
import Card from "./components/cards/Card.tsx";
import DailyForecast from "./components/cards/DailyForecast.tsx";

function App() {
  const { data } = useQuery({
    queryKey: ["weather"],
    queryFn: () => getWeather({ lat: 37.7749, lon: -122.4194 }),
  });

  return (
    <div className="flex flex-col gap-4 p-4">
      <Card title="Current Weather">
        {JSON.stringify(data?.current)?.slice(0, 100)}
      </Card>
      <Card title="Hourly Forecast (48 hours)">
        {JSON.stringify(data?.hourly)?.slice(0, 100)}
      </Card>
      <DailyForecast />
    </div>
  );
}

export default App;
