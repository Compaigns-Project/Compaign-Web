import React from "react";
import { Chart } from "react-google-charts";

export const data = [
  ["Campaigns",  "Views"],
  ["2014", 1000, ],
  ["2015", 1170, ],
  ["2016", 660, ],
  ["2017", 1030, ],
];

export const options = {
  chart: {
    title: "Campaigns vs Views ",
    subtitle: "Shows Views on Each Compaign",
  },
};

export default function App() {
  return (
    <Chart
      chartType="Bar"
      width="100%"
      height="400px"
      data={data}
      options={options}
    />
  );
}
