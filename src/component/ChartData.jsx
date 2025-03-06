import React, { useContext, useMemo } from "react";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  ZAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { geojson } from "./Data"; // Ensure this path is correct
import { GlobalStateContext } from "../provider/globalProvider";

// Color scale based on magnitude
const getColor = (magnitude) => {
  if (magnitude >= 7.0) return "#800026";
  if (magnitude >= 6.5) return "#BD0026";
  if (magnitude >= 6.0) return "#E31A1C";
  if (magnitude >= 5.5) return "#FC4E2A";
  if (magnitude >= 5.0) return "#FEB24C";
  if (magnitude >= 4.5) return "#FFEDA0";
  return "#8884d8";
};

// Custom Tooltip component
const CustomTooltip = ({ active, payload }) => {
  if (active && payload?.length) {
    const { name, magnitude, depth, year } = payload[0].payload;

    return (
      <div
        style={{
          backgroundColor: "#fff",
          padding: "10px",
          border: "1px solid #ccc",
          color: "#000",
        }}
      >
        <p>{`Location: ${name || "N/A"}`}</p>
        <p>{`Magnitude: ${magnitude || "N/A"} Mw`}</p>
        <p>{`Depth: ${depth || "N/A"} km`}</p>
        <p>{`Year: ${year || "N/A"}`}</p>
      </div>
    );
  }

  return null;
};

// Main chart component
const DepthVsMagnitudeChart = () => {
  const { setState } = useContext(GlobalStateContext);

  // Transform GeoJSON data into a format suitable for the chart
  const data = useMemo(() => {
    return geojson.features.map((feature) => ({
      name: feature.properties.location,
      magnitude: feature.properties.magnitude,
      depth: feature.properties.depth_km,
      year: feature.properties.year,
      lat: feature.geometry.coordinates[1], // Latitude
      lng: feature.geometry.coordinates[0], // Longitude
      fill: getColor(feature.properties.magnitude),
    }));
  }, [geojson]); // Recalculate if geojson changes

  // Handle click events on scatter points
  const handleScatterClick = (data) => {
    if (data?.lat !== undefined && data?.lng !== undefined) {
      setState((prev) => ({
        ...prev,
        latLng: { lat: data.lat, lng: data.lng },
      }));
    }
  };

  return (
    <ResponsiveContainer width="80%" height={600}>
      <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          type="number"
          dataKey="magnitude"
          name="Magnitude"
          unit=" Mw"
          domain={[4, 7]} // Adjust domain as needed
        />
        <YAxis
          type="number"
          dataKey="depth"
          name="Depth"
          unit=" km"
          domain={[0, 60]} // Adjust domain as needed
        />
        <ZAxis type="number" dataKey="year" range={[50, 500]} name="Year" />
        <Tooltip
          content={<CustomTooltip />}
          cursor={{ strokeDasharray: "3 3" }}
        />
        <Scatter
          name="Earthquakes"
          data={data}
          fill={(entry) => entry.fill} // Use the fill color from the data
          shape="circle"
          onClick={handleScatterClick} // Add click handler
        />
      </ScatterChart>
    </ResponsiveContainer>
  );
};

export default DepthVsMagnitudeChart;
