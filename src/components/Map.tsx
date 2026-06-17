import { MapContainer, Marker, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import type { Coords } from "../types.ts";
import { useEffect } from "react";

type Props = {
  coords: Coords;
  onMapClick: (lat: number, long: number) => void;
};

export default function Map({ coords, onMapClick }: Props) {
  const { lat, lon } = coords;
  return (
    <MapContainer
      center={[lat, lon]}
      zoom={5}
      style={{ width: "full", height: "400px" }}
    >
      <MapClick onMapClick={onMapClick} />
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[lat, lon]} />
    </MapContainer>
  );
}
//
// function MapClick({
//   onMapClick,
// }: {
//   onMapClick: (lat: number, long: number) => void;
// }) {
//   console.log("clicked");
//   const map = useMap();
//   map.on("click", (e) => {
//     const { lat, lng } = e.latlng;
//
//     map.panTo([lat, lng]);
//     onMapClick(lat, lng);
//   });
//
//   return null;
// }

function MapClick({
  onMapClick,
}: {
  onMapClick: (lat: number, lon: number) => void;
}) {
  const map = useMap();

  useEffect(() => {
    const handleClick = (e: L.LeafletMouseEvent) => {
      const { lat, lng } = e.latlng;
      map.panTo([lat, lng]);
      onMapClick(lat, lng);
    };

    map.on("click", handleClick);

    // Cleanup: remove listener when component unmounts or deps change
    return () => {
      map.off("click", handleClick);
    };
  }, [map, onMapClick]);

  return null;
}
