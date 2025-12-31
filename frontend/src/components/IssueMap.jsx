import React from 'react'
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const categoryIcons = {
  Pothole: new L.Icon({
    iconUrl: "/icons/orange-marker.png",
    shadowUrl: markerShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  }),
  Garbage: new L.Icon({
    iconUrl: "/icons/green-marker.png",
    shadowUrl: markerShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  }),
  Streetlight: new L.Icon({
    iconUrl: "/icons/yellow-marker.png",
    shadowUrl: markerShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  }),
  "Water Leakage": new L.Icon({
    iconUrl: "/icons/blue-marker.png",
    shadowUrl: markerShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  }),
};

const IssueMap = ({issues}) => {
  return (
    <MapContainer center={[18.5204, 73.8567]} zoom={13} style={{ height: "400px", width: "100%" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />
      {issues.map((issue, i) => {
        let position = null;

        // Handle both [lat, lng] and GeoJSON { type: "Point", coordinates: [lng, lat] }
        if (Array.isArray(issue.location)) {
          position = issue.location;
        } else if (issue.location?.coordinates) {
          position = [issue.location.coordinates[1], issue.location.coordinates[0]];
        }

        if (!position) return null;

        return (
          <Marker
            key={i}
            position={position}
            icon={categoryIcons[issue.title] || new L.Icon.Default()}
          >
            <Popup>
              {issue.image && <img src={issue.image} alt={issue.title} width="80" />}
              <b>{issue.title}</b>
              <br />
              {issue.status}
              <br />
              {issue.timeAgo}
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  )
}

export default IssueMap