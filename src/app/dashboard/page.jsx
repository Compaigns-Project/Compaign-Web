"use client";
import React from "react";
import Layout from "../components/layout";
import { PeopleAlt, Percent } from "@mui/icons-material";
import { Typography } from "@mui/material";
import { Circle, Line } from 'rc-progress';
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import BroadcastOnHomeIcon from '@mui/icons-material/BroadcastOnHome';
import LiveTvIcon from '@mui/icons-material/LiveTv';
import LocationSearchingIcon from '@mui/icons-material/LocationSearching';
import ContactlessIcon from '@mui/icons-material/Contactless';

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




export default function Dashboard() {
    const score = 70;
    const calcolor = (percent, start, end) =>{
        let a= percent/100,
        b = (end-start)*a,
        c = b+ start;

        return "hsl(" + c + ", 100%, 50%;"

    }
    return (
        <>
            <Layout>
              <div className="grid grid-cols-4 gap-4">


                <div className="lg:col-span-1 sm:col-span-4 xs:col-span-4">
                    <div className="mx-auto bg-sky-50 rounded-lg shadow-lg hover:scale-105 transition duration-150">
                        <div className="flex justify-between">
                        <div className="ml-7 mt-5">
                            <LiveTvIcon style={{ fontSize: '60px' }}/>
                        </div>
                        <div className="mr-5 mt-5 roundprogress size-16">
                            
                            <CircularProgressbar
                                value={score}
                                text = {`${score}%`}
                                circleRatio={0.7}
                                styles={{
                                    trail:{
                                        strokeLinecap : "butt",
                                        transform: "rotate(-126deg)",
                                        transformOrigin: "center center"

                                    },
                                    path: {
                                        strokeLinecap : "butt",
                                        transform: "rotate(-126deg)",
                                        transformOrigin: "center center",
                                        stroke: "0000ff"
                                    },
                                    text:{
                                        fill: "#ddd"
                                    }

                                }}

                                strokeWidth={10}
                            />

                            {/* <Line percent={10} strokeWidth={4} strokeColor="#D3D3D3" />
                            <Circle percent={10} strokeWidth={4} strokeColor="#D3D3D3" />  */}
                        </div>
                        </div>


                        <div className="pl-7 py-3">
                            <div className="text-blue-600 font-semibold text-xl">
                                Total Compaigns
                            </div>
                            <div className="text=3xl font-semibold text-xl pt-2">
                                127
                            </div>

                        </div>
                    </div>
                </div>


                <div className="lg:col-span-1 sm:col-span-4 xs:col-span-4">
                    <div className="mx-auto bg-sky-50 rounded-lg shadow-lg hover:scale-105 transition duration-150">
                        <div className="flex justify-between">
                        <div className="ml-7 mt-5">
                            <ContactlessIcon style={{ fontSize: '60px' }}/>
                        </div>
                        <div className="mr-5 mt-5 roundprogress size-16">
                            
                            <CircularProgressbar
                                value={score}
                                text = {`${score}%`}
                                circleRatio={0.7}
                                styles={{
                                    trail:{
                                        strokeLinecap : "butt",
                                        transform: "rotate(-126deg)",
                                        transformOrigin: "center center"

                                    },
                                    path: {
                                        strokeLinecap : "butt",
                                        transform: "rotate(-126deg)",
                                        transformOrigin: "center center",
                                        stroke: "0000ff"
                                    },
                                    text:{
                                        fill: "#ddd"
                                    }

                                }}

                                strokeWidth={10}
                            />

                            {/* <Line percent={10} strokeWidth={4} strokeColor="#D3D3D3" />
                            <Circle percent={10} strokeWidth={4} strokeColor="#D3D3D3" />  */}
                        </div>
                        </div>


                        <div className="pl-7 py-3">
                            <div className="text-blue-600 font-semibold text-xl">
                                Active Compaigns
                            </div>
                            <div className="text=3xl font-semibold text-xl pt-2">
                                50
                            </div>

                        </div>
                    </div>
                </div>

                <div className="lg:col-span-1 sm:col-span-4 xs:col-span-4">
                    <div className="mx-auto bg-sky-50 rounded-lg shadow-lg hover:scale-105 transition duration-150">
                        <div className="flex justify-between">
                        <div className="ml-7 mt-5">
                            <LocationSearchingIcon style={{ fontSize: '60px' }}/>
                        </div>
                        <div className="mr-5 mt-5 roundprogress size-16">
                            
                            <CircularProgressbar
                                value={score}
                                text = {`${score}%`}
                                circleRatio={0.7}
                                styles={{
                                    trail:{
                                        strokeLinecap : "butt",
                                        transform: "rotate(-126deg)",
                                        transformOrigin: "center center"

                                    },
                                    path: {
                                        strokeLinecap : "butt",
                                        transform: "rotate(-126deg)",
                                        transformOrigin: "center center",
                                        stroke: "0000ff"
                                    },
                                    text:{
                                        fill: "#ddd"
                                    }

                                }}

                                strokeWidth={10}
                            />

                            {/* <Line percent={10} strokeWidth={4} strokeColor="#D3D3D3" />
                            <Circle percent={10} strokeWidth={4} strokeColor="#D3D3D3" />  */}
                        </div>
                        </div>


                        <div className="pl-7 py-3">
                            <div className="text-blue-600 font-semibold text-xl">
                                Compaign Active Locations
                            </div>
                            <div className="text=3xl font-semibold text-xl pt-2">
                                127
                            </div>

                        </div>
                    </div>
                </div>


                <div className="lg:col-span-1 sm:col-span-4 xs:col-span-4">
                    <div className="mx-auto bg-sky-50 rounded-lg shadow-lg hover:scale-105 transition duration-150">
                        <div className="flex justify-between">
                        <div className="ml-7 mt-5">
                            <PeopleAlt style={{ fontSize: '60px' }}/>
                        </div>
                        <div className="mr-5 mt-5 roundprogress size-16">
                            
                            <CircularProgressbar
                                value={score}
                                text = {`${score}%`}
                                circleRatio={0.7}
                                styles={{
                                    trail:{
                                        strokeLinecap : "butt",
                                        transform: "rotate(-126deg)",
                                        transformOrigin: "center center"

                                    },
                                    path: {
                                        strokeLinecap : "butt",
                                        transform: "rotate(-126deg)",
                                        transformOrigin: "center center",
                                        stroke: "0000ff"
                                    },
                                    text:{
                                        fill: "#ddd"
                                    }

                                }}

                                strokeWidth={10}
                            />

                            {/* <Line percent={10} strokeWidth={4} strokeColor="#D3D3D3" />
                            <Circle percent={10} strokeWidth={4} strokeColor="#D3D3D3" />  */}
                        </div>
                        </div>


                        <div className="pl-7 py-3">
                            <div className="text-blue-600 font-semibold text-xl">
                                Total Users
                            </div>
                            <div className="text=3xl font-semibold text-xl pt-2">
                                127
                            </div>

                        </div>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-12 gap-5 mt-5">
                <div className="col-span-5 rounded-lg shadow-lg px-4 py-4 bg-white">
                    <PieChart/>
                </div>
                <div className="col-span-7 rounded-lg shadow-lg px-4 py-4 bg-white">
                    <AreaChart/>
                </div>
            </div>
            </Layout>
        </>
    );
}
