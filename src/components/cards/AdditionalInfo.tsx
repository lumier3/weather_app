import Card from "./Card.tsx";
import { useSuspenseQuery } from "@tanstack/react-query";
import { getWeather } from "../../api.ts";
import Sunrise from "/src/assets/sunrise.svg?react";
import Sunset from "/src/assets/sunset.svg?react";
import Pressure from "/src/assets/pressure.svg?react";
import Uv from "/src/assets/uv.svg?react";
import Wind from "/src/assets/wind.svg?react";
import Cloud from "/src/assets/cloud.svg?react";
import Uparrow from "/src/assets/uparrow.svg?react";

export default function AdditionalInfo() {
  const { data } = useSuspenseQuery({
    queryKey: ["weather"],
    queryFn: () => getWeather({ lat: 16.8713, lon: 96.1994 }),
  });
  return (
    <Card
      title="Additional Weather Info"
      childrenClassName="flex flex-col gap-8"
    >
      {rows.map(({ label, value, Icon }) => (
        <div key={value} className="flex justify-between">
          <div className="flex gap-4">
            <span className="text-gray-500">{label}</span>
            <Icon className="size-6 invert" />
          </div>

          <span>
            <FormatComponent value={value} number={data.current[value]} />
          </span>
        </div>
      ))}
    </Card>
  );
}

const FormatComponent = ({
  value,
  number,
}: {
  value: string;
  number: number;
}) => {
  if (value === "sunrise" || value === "sunset") {
    return new Date(number * 1000).toLocaleTimeString(undefined, {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  }

  if (value === "wind_deg") {
    return (
      <Uparrow
        className="size-6 invert"
        style={{ transform: `rotate(${number}deg)` }}
      />
    );
  }

  return number;
};

const rows = [
  { label: "Sunrise", value: "sunrise", Icon: Sunrise },
  { label: "Sunset", value: "sunset", Icon: Sunset },
  { label: "UV Index", value: "uvi", Icon: Uv },
  { label: "Wind Direction", value: "wind_deg", Icon: Wind },
  { label: "Cloudiness (%)", value: "clouds", Icon: Cloud },
  { label: "Pressure (hPa)", value: "pressure", Icon: Pressure },
] as const;
