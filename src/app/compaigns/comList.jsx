"use client";
import { useState, useEffect } from "react";
import { format, formatDistance, formatRelative, subDays } from 'date-fns'
import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { get } from "http";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import { ToastContainer, toast, Bounce  } from 'react-toastify';
import Button from '@mui/material/Button';
import Layout from "../components/layout"; // Ensure the import path is correct
import UsersList from './comList'
import { Add, ArrowBack } from "@mui/icons-material";
import { Typography } from "@mui/material/Typography";
import UserDetails from "./compDetails";
import SendToMobileIcon from '@mui/icons-material/SendToMobile';
import { SnackbarProvider, useSnackbar, enqueueSnackbar } from 'notistack';





export default function StickyHeadTable() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [data, setData] = useState([]);
  const [allData, setAllData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [addUser, setAddUser] = useState(false);
  const [rows, setRows] = useState(null);
  const [SearchQuery, setSearchQuery] = useState("");


  const HandleIsAddClose = () => {
    setAddUser(false);
  }

    useEffect(() => {
        getData();
    }, [addUser]);

    
    useEffect(() => {
      searchData(SearchQuery);
  }, [SearchQuery]);




    const searchData = (SearchQuery) =>{
      let filterData;
      if(SearchQuery){
        filterData = data.filter(usr => 
          usr.campaignName.toLowerCase().includes(SearchQuery.toLowerCase()) ||
          usr.description.toLowerCase().includes(SearchQuery.toLowerCase()) ||
          usr.campaignId.toString().toLowerCase().includes(SearchQuery.toLowerCase()) 
          
        )
        setData(filterData);
      }
      else{
        setData(allData);
      }

    }

    const getData = () => {
        fetch('http://localhost:8000/api/campaign/getAllCompaigns')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log('Data is', data);
                setData(data);
                setAllData(data);
                setLoading(false);
                return data;
            })
            .catch(err => {
                console.log(err);
            });
    }
 
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const PushNotification = (row) => {
   
  };

  const addRecord = (row) => {
    console.log("Edit Record is : ", row)
    setRows(null);
    setAddUser(true);
  };
    

  const deleteRecord = (row) => {
    console.log("Delete Record is : ", row);
    confirmAlert({
      title: 'Confirm to submit',
      message: 'Are you sure to do this.',
      buttons: [
        {
          label: 'Yes',
          onClick: () => deleteRow(row)
        },
        {
          label: 'No',
        
          
        }
      ]
    });
    
    
  };
  const deleteRow = (row) => {
    fetch('http://localhost:8000/api/campaign/deleteCompaign', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({campaignId:row.campaignId}) 
       }).then(response => {
        console.log("data", response);
        getData()
       }).then(response =>{
        // toast.success('User is Successfully deleted', {
        //   position: "top-right",
        //   autoClose: 5000,
        //   hideProgressBar: true,
        //   closeOnClick: true,
        //   pauseOnHover: true,
        //   draggable: true,
        //   progress: undefined,
        //   theme: "light",
        //   transition: Bounce,
        //   });

        enqueueSnackbar('User is Successfully deleted',  {
          variant: 'success',
          anchorOrigin: {
            vertical: 'top', // Customize the vertical position
            horizontal: 'right', // Customize the horizontal position
          },
          style: {
            backgroundColor: '#00ff00', // Customize the background color
            color: '#ffffff', // Customize the text color
            fontWeight: 'bold', // Customize the font weight
          },
        })  
       })
       



  }
  const dataFormatter = (dataString) => {
    const parsedDate = new Date(dataString);
    return format(parsedDate, "MMMM d, yyyy h:mm a")

  };
    

  return (
    <>
    
   
    {/* <ToastContainer /> */}
    <SnackbarProvider maxSnack={3}>
      
      </SnackbarProvider>
    {addUser ? (<UserDetails HandleIsAddClose = {HandleIsAddClose} />): (<>
      <h2 className="font-bold mb-4">Compaigns</h2>
      <div className="flex justify-between ">
      
      <div>
        <input type="text" placeholder="Search Compaigns"  value={SearchQuery} onChange={handleInputChange} className="mb-2 px-2 py-2 rounded-lg border-2">
        </input>
      </div>
      <Button variant="outlined" className="mb-2" onClick={()=>addRecord()} startIcon={<Add />}>
          Add Compaign
      </Button>
      </div>
    
    {/* <ToastContainer /> */}
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          
        <TableHead>
            <TableRow>
            <TableCell
                  
                  align="center"
                  style={{ minWidth: 70 }}
                >
                  ID
            </TableCell>
            <TableCell
                  
                  align="center"
                  style={{ minWidth: 170 }}
                >
                  NAME
            </TableCell>
            <TableCell
                  
                  align="center"
                  style={{ minWidth: 170 }}
                >
                  Description
            </TableCell>
            <TableCell
                  
                  align="center"
                  style={{ minWidth: 170 }}
                >
                  Compaign
            </TableCell>
            <TableCell
                  
                  align="center"
                  style={{ minWidth: 170 }}
                >
                  Views
            </TableCell>
            <TableCell
                  
                  align="center"
                  style={{ minWidth: 170 }}
                >
                  Creation Date
            </TableCell>
            <TableCell
                  
                  align="center"
                  style={{ minWidth: 170 }}
                >
                  Push Compaign
            </TableCell>
            <TableCell
                  
                  align="center"
                  style={{ minWidth: 170 }}
                >
                  Delete Compaign
            </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
            
            
            data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    
                     
                    <TableCell key={index} align="center">
                        {row.campaignId}
                    </TableCell>
                    <TableCell key={index} align="center">
                        {row.campaignName}
                    </TableCell>
                   
                    <TableCell key={index} align="center">
                        {row.description}
                    </TableCell>
                    <TableCell key={index} align="center">
                        {row.video}
                    </TableCell>
                    
                    <TableCell key={index} align="center">
                        {row.views}
                    </TableCell>
                    <TableCell key={index} align="center">
                        {/* {row.createdAt} */}
                        {dataFormatter(row.createdAt)}
                    </TableCell>
                    <TableCell key={index} align="center">
                        <div className="flex justify-center gap-2">
                            <div className="cursor-pointer text-green-500 "  onClick={()=>{PushNotification(row)}} >
                                {/* <EditIcon fontSize="large"></EditIcon> */}
                                <SendToMobileIcon/>
                            </div>
                            {/* <div className="cursor-pointer text-red-500" onClick={()=>{deleteRecord(row)}}>
                                <DeleteIcon></DeleteIcon>
                            </div> */}

                            
                        </div>
                    </TableCell>
                    <TableCell key={index} align="center">
                        <div className="flex justify-center gap-2">
                            {/* <div className="cursor-pointer text-green-500"  onClick={()=>{editRecord(row)}} >
                                <EditIcon></EditIcon>
                            </div> */}
                            <div className="cursor-pointer text-red-500" onClick={()=>{deleteRecord(row)}}>
                                <DeleteIcon></DeleteIcon>
                            </div>

                            
                        </div>
                    </TableCell>          
                    
                  </TableRow>
                );
              })}
          </TableBody>


        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
    </>)}
    
      
   
    </>
  );
}