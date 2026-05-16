import Card from "./Card.tsx";
import { useSuspenseQuery } from "@tanstack/react-query";
import { getWeather } from "../../api.ts";

type Props = {};

function DailyForecast({}: Props) {
  const { data } = useSuspenseQuery({
    queryKey: ["weather"],
    queryFn: () => getWeather({ lat: 37.7749, lon: -122.4194 }),
  });
  return (
    <Card title="Daily Forecast" childrenClassName="flex flex-col gap-4">
      {data?.daily?.map((day) => (
        <div key={day.dt} className="flex justify-between">
          <p className="w-9">
            {new Date(day.dt * 1000).toLocaleDateString(undefined, {
              weekday: "short",
            })}
          </p>
          <img
            className="size-10"
            src={`https://openweathermap.org/img/wn/${day.weather[0].icon}.png`}
            alt={day.weather[0].description}
          />
          <p>{Math.round(day.temp.day)}°F</p>
          <p className="text-gray-500/75">{Math.round(day.temp.min)}°F</p>
          <p className="text-gray-500/75">{Math.round(day.temp.max)}°F</p>
        </div>
      ))}
    </Card>
  );
}

export default DailyForecast;
