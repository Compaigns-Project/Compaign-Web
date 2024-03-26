// Analytics.js
"use client";
import {useState} from "react";
import Button from '@mui/material/Button';
import Layout from "../components/layout"; // Ensure the import path is correct
import UsersList from './usersList'
import { Add } from "@mui/icons-material";
import { Typography } from "@mui/material/Typography";
import UserDetails from "./userDetails";

export default function Users() {

    const [addUser, setAddUser] = useState(false);


    return (
        <Layout>
                




            <div className="flex justify-between ">
            <h2 className="font-bold mb-4">Users</h2>
            <Button variant="outlined" className="mb-2" onClick={()=>{setAddUser(true)}} startIcon={<Add />}>
                Add User
            </Button>


            </div>



            <UsersList></UsersList>
        </Layout>
    );
}
