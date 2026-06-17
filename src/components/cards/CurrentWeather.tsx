import Card from "./Card.tsx";
import { useSuspenseQuery } from "@tanstack/react-query";
import { getWeather } from "../../api.ts";
import { WeatherIcon } from "../WeatherIcon.tsx";
import type { Coords } from "../../types.ts";

type Props = {
  coords: Coords;
};

export default function CurrentWeather({ coords }: Props) {
  const { data } = useSuspenseQuery({
    queryKey: ["weather", coords],
    queryFn: () => getWeather({ lat: coords.lat, lon: coords.lon }),
  });
  return (
    <Card
      title="Current Weather"
      childrenClassName="flex flex-col gap-6 items-center"
    >
      <div className="flex flex-col gap-2 items-center">
        <h2 className="text-6xl font-semibold text-center">
          {Math.round(data?.current?.temp)}°F
        </h2>
        <WeatherIcon src={data?.current?.weather[0].icon} className="size-14" />
        <h3 className="capitalize text-xl">
          {data?.current?.weather[0].description}
        </h3>
      </div>
      <div className="flex flex-col gap-2 items-center">
        <p className="text-xl">Local Time:</p>
        <h3 className="text-4xl font-semibold">
          {new Intl.DateTimeFormat("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
            timeZone: data?.timezone,
          }).format(new Date(data.current.dt * 1000))}
        </h3>
      </div>
      <div className="w-full flex justify-between">
        <div className="flex flex-col gap-2 items-center">
          <p className="text-gray-500">Feel likes</p>
          <p>{Math.round(data.current.feels_like)}°F</p>
        </div>
        <div className="flex flex-col gap-2 items-center">
          <p className="text-gray-500">Humidity</p>
          <p>{Math.round(data.current.humidity)}%</p>
        </div>
        <div className="flex flex-col gap-2 items-center">
          <p className="text-gray-500">Wind</p>
          <p>{Math.round(data.current.wind_speed)}mph</p>
        </div>
      </div>
    </Card>
  );
}
