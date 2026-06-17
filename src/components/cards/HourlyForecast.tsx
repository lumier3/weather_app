import Card from "./Card.tsx";
import { useSuspenseQuery } from "@tanstack/react-query";
import { getWeather } from "../../api.ts";
import { WeatherIcon } from "../WeatherIcon.tsx";

type Props = {};

export default function HourlyForecast({}: Props) {
  const { data } = useSuspenseQuery({
    queryKey: ["weather"],
    queryFn: () => getWeather({ lat: 16.8713, lon: 96.1994 }),
  });
  return (
    <Card
      title="Hourly Forecast"
      childrenClassName="flex gap-4 overflow-x-scroll"
    >
      {data?.hourly?.map((hour) => (
        <div
          key={hour.dt}
          className="flex flex-col gap-2 items-center p-2 mb-2"
        >
          <p className="whitespace-nowrap">
            {new Date(hour.dt * 1000).toLocaleTimeString(undefined, {
              hour: "numeric",
              minute: "2-digit",
              hour12: true,
            })}
          </p>
          <WeatherIcon src={hour.weather[0].icon} />
          <p>{Math.round(hour.temp)}°F</p>
        </div>
      ))}
    </Card>
  );
}
