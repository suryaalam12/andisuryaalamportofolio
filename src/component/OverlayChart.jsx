import React, { useEffect, useContext, useState } from "react";
import { GlobalStateContext } from "../provider/globalProvider";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function OverlayChart() {
  const { state } = useContext(GlobalStateContext);
  const [chartData, setChartData] = useState([]); // State to hold transformed chart data

  const colors = {
    "GRASS LAND": "#E101FF",
    URBAN: "#FE9900",
    AGRICULTURE: "#4CAF50",
  };

  useEffect(() => {
    if (state.chartDataOvrly && Object.keys(state.chartDataOvrly).length > 0) {
      const transformedData = Object.keys(state.chartDataOvrly).map((key) => ({
        name: key,
        value: state.chartDataOvrly[key],
        fill: colors[key] || "#8884d8",
      }));
      setChartData(transformedData);
      console.log("Chart data updated:", transformedData);
    } else {
      setChartData([]);
      console.log("Chart data is empty or null");
    }
  }, [state.chartDataOvrly]);

  return (
    <div style={{ width: "100%", height: "400px" }}>
      {chartData.length > 0 ? (
        <ResponsiveContainer>
          <BarChart data={chartData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#8884d8" radius={[10, 10, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          <p>Play with buffer and intersection</p>
        </div>
      )}
    </div>
  );
}
