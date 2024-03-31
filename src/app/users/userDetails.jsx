import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { ToastContainer, toast, Bounce  } from 'react-toastify';
import Layout from "../components/layout"; // Ensure the import path is correct
import UsersList from './usersList'
import { Add, ArrowBack } from "@mui/icons-material";
import { Typography } from "@mui/material/Typography";
import UserDetails from "./userDetails";
import { useState, useEffect } from 'react';

import 'react-toastify/dist/ReactToastify.css';
import { setDate } from 'date-fns';
    

const schema = yup.object({
    userName: yup.string().required('Please Enter Complete Name'),
    userEmail: yup.string().email().required('Please Enter Your Email'),
    location: yup.string().required('Please Enter Your location'),
    password: yup.string()
        .required('Password is required')
        .min(8, 'Password must be at least 8 characters')
        .matches(/[a-zA-Z]/, 'Password must contain at least one letter')
        .matches(/[0-9]/, 'Password must contain at least one number')
        .matches(/[!@#$%^&*(),.?":{}|<>]/, 'Password must contain at least one special character'),
}).required();


export default function UserDetailsForm({ HandleIsAddClose, initialRows }) {
    console.log('Initial rows:', initialRows);
    const [rows, setRows] = useState(initialRows);
    const [uType, setUType] = useState('');
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    useEffect(() => {
        if (rows) {
            console.log('Setting uType:', rows.Type);
            setUType(rows.Type);
            reset({
                userId: rows.userId,
                userName: rows.userName,
                userEmail: rows.userEmail,
                location: rows.location,
                password: rows.password,
            });
        }
    }, [rows]);

    const onSubmit = (data) => {
        console.log('Submitting data:', data);
        if (rows && rows.hasOwnProperty('userName')) {
            console.log('Updating user:', rows.userName);
            fetch('http://localhost:8000/api/user/update', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            }).then(() => {
                setRows(null);
                setUType('');
                reset();
                toast.success('User is Successfully Edited', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    transition: Bounce,
                });
                HandleIsAddClose();
            }).catch(error => {
                console.error('Error editing user:', error);
                // Handle error here
            });
        } else {
            console.log('Adding new user');
            fetch('http://localhost:8000/api/user/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            }).then(() => {
                setRows(null);
                setUType('');
                reset();
                toast.success('User is Successfully Added', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                    transition: Bounce,
                });
                HandleIsAddClose();
            }).catch(error => {
                console.error('Error adding user:', error);
                // Handle error here
            });
        }
    };

    const handleChange = (event) => {
        setUType(event.target.value);
    };

    return (
        <>
            <div className="flex justify-left" onClick={HandleIsAddClose}>
                <ArrowBack className='mr-2 cursor-pointer' />
                <h2 className="font-bold mb-4 cursor-pointer">Add Users</h2>   
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid gap-3 sm:grid-cols-1 md:grid-cols-3 grid-cols-5">
                    <div>
                        <TextField size='small' label="Name" {...register("userName")} variant="outlined" />
                        <p className='text-red-400 text-sm ml-1'>{errors.userName?.message}</p>
                    </div>
                    <div>
                        <TextField size='small' label="Email"  {...register("userEmail")}  variant="outlined" />
                        <p  className='text-red-400 text-sm ml-1'>{errors.userEmail?.message}</p>
                    </div>
                    <div>
                        <FormControl fullWidth size='small'>
                            <InputLabel>Type</InputLabel>
                            <Select
                                value={uType}
                                label="Type"
                                onChange={handleChange}
                            >
                                <MenuItem value="admin">Admin</MenuItem>
                                <MenuItem value="influencer">Influencer</MenuItem>
                                <MenuItem value="organization">Organization</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                    <div>
                        <TextField size='small' label="Location"  {...register("location")} variant="outlined" />
                        <p  className='text-red-400 text-sm ml-1'>{errors.location?.message}</p>
                    </div>
                    <div>
                        <TextField size='small' label="Password"  {...register("password")} variant="outlined" />
                        <p  className='text-red-400 text-sm ml-1'>{errors.password?.message}</p>
                    </div>
                </div>
                <div className='mt-3 justify-center flex'>
                    <Button type="submit" variant="outlined" className="mb-2">
                        Save
                    </Button>
                </div>
            </form>
        </>
    );
}
