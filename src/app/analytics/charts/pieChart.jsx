import React from "react";
import { Chart } from "react-google-charts";

export const data = [
  ["Users", "Views"],
  ["Work", 11],
  ["Eat", 2],
  ["Commute", 2],
  ["Watch TV", 2],
  ["Sleep", 7],
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
