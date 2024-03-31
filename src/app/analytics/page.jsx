// Analytics.js
"use client";
import React from "react";
import Layout from "../components/layout"; // Ensure the import path is correct
// import AreaChart from './charts/areaChart';
// import SteppedChart from './charts/steppedChart';
// import PieChart from './charts/pieChart';
// import GeoChart from './charts/GeoChart';
// import LineChart from './charts/lineChart';
// import ColumnChart from './charts/columnChart';
import dynamic from "next/dynamic";


const PieChart = dynamic(()=> import("./charts/pieChart"),{
    loading: ()=> <p>Chart Loading... </p>
})
const AreaChart = dynamic(()=> import("./charts/areaChart"),{
    loading: ()=> <p>Chart Loading... </p>
})
const SteppedChart = dynamic(()=> import("./charts/steppedChart"),{
    loading: ()=> <p>Chart Loading... </p>
})
const GeoChart = dynamic(()=> import("./charts/GeoChart"),{
    loading: ()=> <p>Chart Loading... </p>
})
const LineChart = dynamic(()=> import("./charts/lineChart"),{
    loading: ()=> <p>Chart Loading... </p>
})
const ColumnChart = dynamic(()=> import("./charts/columnChart"),{
    loading: ()=> <p>Chart Loading... </p>
})






export default function Analytics() {
    return (
        <Layout>
            <h2>About page</h2>
            <div className="grid grid-cols-12 gap-5 ">
                <div className="col-span-7 rounded-lg shadow-lg px-4 py-4 bg-white">
                    <AreaChart/>
                </div>
                <div className="col-span-5 rounded-lg shadow-lg px-4 py-4 bg-white">
                    <SteppedChart/>
                </div>
            </div>
            <div className="grid grid-cols-12 gap-5 mt-5">
                <div className="col-span-5 rounded-lg shadow-lg px-4 py-4 bg-white">
                    <PieChart/>
                </div>
                <div className="col-span-7 rounded-lg shadow-lg px-4 py-4 bg-white">
                    <GeoChart/>
                </div>
            </div>
            <div className="grid grid-cols-12 gap-5 mt-5">
                <div className="col-span-5 rounded-lg shadow-lg px-4 py-4 bg-white">
                    <LineChart/>
                </div>
                <div className="col-span-7 rounded-lg shadow-lg px-4 py-4 bg-white">
                    <ColumnChart/>
                </div>
            </div>
        </Layout>
    );
}
