"use client";
import React, { useState, useEffect } from "react";
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table';

const UserList = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getData();
    }, []);

    const getData = () => {
        fetch('http://localhost:8000/api/analytics/users/usertable')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log('Data is', data);
                setData(data);
                setLoading(false);
            })
            .catch(err => {
                console.log(err);
            });
    }

    return (
        <Example data={data} />
    );
}

const Example = ({ data }) => {
    const columns = [
        {
            accessorKey: 'userName',
            header: 'USER NAME',
            size: 150,
        },
        {
            accessorKey: 'userEmail',
            header: 'Email',
            size: 150,
        },
        {
            accessorKey: 'location',
            header: 'Address',
            size: 200,
        },
        {
            accessorKey: 'campaignCount',
            header: 'Campaigns',
            size: 150,
        },
    ];

    const table = useMaterialReactTable({
        columns,
        data,
    });

    return (<MaterialReactTable table={table} />);
};

export default UserList;
