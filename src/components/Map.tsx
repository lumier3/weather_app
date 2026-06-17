import { MapContainer, Marker, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

type Props = {};

export default function Map({}: Props) {
  return (
    <MapContainer
      center={[16.8713, 96.1994]}
      zoom={5}
      style={{ width: "full", height: "400px" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[16.8713, 96.1994]} />
    </MapContainer>
  );
}
