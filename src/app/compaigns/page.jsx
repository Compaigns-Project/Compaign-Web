// Analytics.js
import React from "react";
import Layout from "../components/layout"; // Ensure the import path is correct
import CompaignsList from './compaignsList'
import { Typography } from "@mui/material/Typography";

export default function Compaigns() {
    return (
        <Layout>
            <h2 className="font-bold mb-4">Compaigns</h2>
            <CompaignsList/>
        </Layout>
    );
}
