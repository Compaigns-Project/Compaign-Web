import React from "react";
import { Chart } from "react-google-charts";

export const data = [
  ["Users", "Views"],
  ["20 Secs", 11],
  ["5 Secs", 2],
  ["10 Secs", 2],
  ["15 Secs", 2],
  ["30 Secs", 7],
];

export const options = {
  title: "User Vs Views",
  is3D: true,
};

export default function App() {
  return (
    <Chart
      chartType="PieChart"
      data={data}
      options={options}
      width={"100%"}
      height={"400px"}
    />
  );
}
