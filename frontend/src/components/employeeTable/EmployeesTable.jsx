import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import axios from "axios";
import LinearProgress from '@mui/material/LinearProgress';
import moment from "moment";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import InputLabel from '@mui/material/InputLabel';
import Pagination from '@mui/material/Pagination';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import AddEmployee from './AddEmployee';
import { useNavigate } from 'react-router-dom';
import EditEmployee from './EditEmployee';
import DeleteEmployee from './DeleteEmployee';

const columns = [
    {
        id: "firstName",
        label: "First Name",
        minwidth: 60,
        align: "left",
        background: "#755139FF"
    },
    {
        id: "lastName",
        label: "Last Name",
        minwidth: 60,
        align: "left",
        background: "#755139FF",
    },

    {
        id: "email",
        label: "Email",
        minwidth: 60,
        align: "left",
        background: "#755139FF",
    },
    {
        id: "phoneNumber",
        label: "Phone Number",
        minwidth: 60,
        align: "left",
        background: "#755139FF",
    },
    {
        id: "gender",
        label: "Gender",
        minwidth: 60,
        align: "left",
        background: "#755139FF",
    },
    {
        id: "status",
        label: "Status",
        minwidth: 60,
        align: "left",
        background: "#755139FF",
    },
    {
        id: "location",
        label: "Location",
        minwidth: 60,
        align: "left",
        background: "#755139FF",
    },
    {
        id: "date",
        label: "Date",
        minwidth: 60,
        align: "left",
        background: "#755139FF",
    },

    {
        id: "actions",
        label: "Actions",
        minwidth: 60,
        align: "center",
        background: "#755139FF",
    },
];




const EmployeesTable = () => {
    const navigate = useNavigate();
    const [search, setSearch] = useState("");
    const [gender, setGender] = useState("all");
    const [status, setStatus] = useState("all");
    const [sort, setSort] = useState("new");
    const [currentPage, setCurrentPage] = useState(sessionStorage.getItem('employeePage') || 1);
    const [pageCount, setPageCount] = useState(0);

    const [loading, setLoading] = useState(false);
    const [employeesData, setEmployeesData] = useState([]);
    const [noEmlployeeData, setNoEmployeeData] = useState(false);
    const [errorStatus, setErrorStatus] = useState(false)
    const [errorMessage, setErrorMessage] = useState("");

    const [addEmployeeOpen, setAddEmployeeOpen] = React.useState(false);
    const [editEmployeeopen, setEditEmployeeOpen] = React.useState(false);
    const [deleteEmployeeOpen, setDeleteEmployeeOpen] = useState(false);
    const [tableRowId, setTableRowId] = useState("");

    const getData = ({ search, gender, status, sort, page }) => {
        setLoading(true);
        let config = {
            method: "get",
            url: `http://localhost:5000/employeesTable?search=${search}&gender=${gender}&status=${status}&sort=${sort}&page=${page}`,
            headers: {
                "Content-Type": "application/json",
            },
        };

        //axios instance
        axios(config)
            .then((data) => {
                // console.log(
                //     "check dataa",
                //     data.data.Pagination.pageCount,
                //     data.data.employeesTableData
                // );
                if (data.data.employeesTableData.length === 0) {
                    setNoEmployeeData(true);
                } else {
                    setNoEmployeeData(false);
                }
                setEmployeesData(data.data.employeesTableData)
                setPageCount(data.data.Pagination.pageCount);
                setErrorStatus(false)
                setErrorMessage("");
            })
            .catch((error) => {
                // console.log("check error", error.message);
                setErrorStatus(true)
                setErrorMessage(error.message);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const requestSearch = () => {
        setCurrentPage(1);
        getData({ search, gender, status, sort, page: 1 });
    };

    const handleSearch = (searchedVal) => {
        setSearch(searchedVal)
        setCurrentPage(1);
        if (searchedVal == "") {
            getData({ search: searchedVal, gender, status, sort, page: 1 });
        }
    }

    const handleGenderChange = (event) => {
        setGender(event.target.value);
        setCurrentPage(1);
        getData({ search, gender: event.target.value, status, sort, page: 1 });
    };

    const handleStatusChange = (event) => {
        setStatus(event.target.value);
        setCurrentPage(1);
        getData({ search, gender, status: event.target.value, sort, page: 1 });
    };

    const handleSortChange = (event) => {
        setSort(event.target.value);
        setCurrentPage(1);
        getData({ search, gender, status, sort: event.target.value, page: 1 });
    };

    const handlePageChange = (event, newPage) => {
        setCurrentPage(newPage);
        getData({ search, gender, status, sort, page: newPage });
        sessionStorage.setItem("employeePage", newPage);
    };

    const handleAddEmployeeClickOpen = () => {
        setAddEmployeeOpen(true);
    };

    const handleEditEmployeeClickOpen = () => {
        setEditEmployeeOpen(true);
    };

    const handleDeleteEmployeeClickOpen = () => {
        setDeleteEmployeeOpen(true);
    }

    const handleViewClick = (e, id) => {
        navigate(`/employee/${id}`)
    }

    const handleEditClick = (e, id) => {
        setTableRowId(id);
        handleEditEmployeeClickOpen()
    }

    const handleDeleteClick = (e, id) => {
        setTableRowId(id);
        handleDeleteEmployeeClickOpen()
    }



    useEffect(() => {
        getData({ search, gender, status, sort, page: currentPage });

        if (sessionStorage.getItem("employeeCount") != 1) {
            sessionStorage.setItem('employeeCount', 1)
            sessionStorage.setItem("employeePage", 1);
        }

    }, []);

    return (
        <div>
            <div> <h1>Employees Table</h1> </div>
            <div
                style={{
                    width: "95%",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    margin: "auto"
                }}
            >
                <div style={{ display: "flex", gap: "10px", alignItems: "center", justifyContent: "center" }}>
                    <TextField id="standard-basic" label="Search" variant="standard" type="search"
                        value={search}
                        onChange={(e) => handleSearch(e.target.value)}
                    />
                    <Button variant="contained" onClick={() => requestSearch()} >Search</Button>
                </div>

                <div>
                    <FormControl component="fieldset">
                        <FormLabel component="legend">Gender</FormLabel>
                        <RadioGroup
                            aria-label="gender"
                            name="gender1"
                            value={gender}
                            onChange={handleGenderChange}
                            row
                        >
                            <FormControlLabel value="all" control={<Radio />} label="All" />
                            <FormControlLabel
                                value="female"
                                control={<Radio />}
                                label="Female"
                            />
                            <FormControlLabel value="male" control={<Radio />} label="Male" />
                        </RadioGroup>
                    </FormControl>
                </div>


                <div>
                    <FormControl variant="outlined">
                        <InputLabel id="demo-simple-select-outlined-label">
                            Status
                        </InputLabel>
                        <Select
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            value={status}
                            onChange={handleStatusChange}
                            label="Status"
                        >
                            <MenuItem value="all">All</MenuItem>
                            <MenuItem value="active">active</MenuItem>
                            <MenuItem value="inactive">inactive</MenuItem>
                        </Select>
                    </FormControl>
                </div>

                <div>
                    <FormControl variant="outlined">
                        <InputLabel id="demo-simple-select-outlined-label">Sort</InputLabel>
                        <Select
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            value={sort}
                            onChange={handleSortChange}
                            label="Sort"
                        >
                            <MenuItem value="new">new</MenuItem>
                            <MenuItem value="old">old</MenuItem>
                        </Select>
                    </FormControl>
                </div>

                <div>
                    <Button
                        size="large"
                        variant="contained"
                        color="primary"
                        onClick={() => handleAddEmployeeClickOpen()}
                    >
                        Add User
                    </Button>
                </div>

            </div>
            {loading ? (
                <div
                    style={{ width: "100%", display: "flex", justifyContent: "center" }}
                >
                    <LinearProgress style={{ width: "100%", marginTop: "20px" }} />
                </div>
            ) : errorStatus ? (
                <div
                    style={{ width: "100%", display: "flex", justifyContent: "center" }}
                >
                    <h4>{errorMessage}</h4>
                </div>
            ) : noEmlployeeData ? (
                <div
                    style={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                        textAlign: "center",
                    }}
                >
                    <h1>No Data Found</h1>
                </div>
            ) : (
                <div style={{ width: "95%", margin: "auto" }}>

                    <Grid container>
                        <Grid
                            item
                            xs={12}
                            style={{
                                width: "100%",
                                overflowX: "auto",
                                display: "inline-grid",
                                marginTop: "10px",
                            }}
                        >
                            <TableContainer component={Paper}>
                                <Table stickyHeader aria-label="sticky table">
                                    <TableHead>
                                        <TableRow>
                                            {columns.map((column) => (
                                                <TableCell
                                                    key={column.id}
                                                    align={column.align}
                                                    style={{
                                                        minWidth: column.minWidth,
                                                        background: column.background,
                                                        color: "#fff",
                                                    }}
                                                >
                                                    {column.label}
                                                </TableCell>
                                            ))}
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {employeesData?.map((row) => {
                                            return (
                                                <TableRow
                                                    hover
                                                    role="checkbox"
                                                    tabIndex={-1}
                                                    key={row._id}
                                                    style={{
                                                        background: "#F2EDD7FF"
                                                    }}
                                                >
                                                    <TableCell align="left" >
                                                        {row.fname}
                                                    </TableCell>
                                                    <TableCell align="left">
                                                        {row.lname}
                                                    </TableCell>

                                                    <TableCell align="left">
                                                        {row.email}
                                                    </TableCell>

                                                    <TableCell align="left">
                                                        {row.mobile}
                                                    </TableCell>

                                                    <TableCell align="left">
                                                        {row.gender}
                                                    </TableCell>

                                                    <TableCell align="left">
                                                        {row.status}
                                                    </TableCell>
                                                    <TableCell align="left">
                                                        {row.location}
                                                    </TableCell>
                                                    <TableCell align="left">
                                                        {moment(row.datecreated).format(
                                                            "DD-MM-YYYY hh:mm a"
                                                        )}
                                                    </TableCell>
                                                    <TableCell align="center">
                                                        <div style={{ display: "flex", justifyContent: "space-between" }} >
                                                            <Button variant="contained" color="success"
                                                                onClick={(event) =>
                                                                    handleViewClick(event, row._id)
                                                                }
                                                            >
                                                                View
                                                            </Button>
                                                            <Button variant="contained" color="secondary"
                                                                onClick={(event) =>
                                                                    handleEditClick(event, row._id)
                                                                }
                                                            >
                                                                Edit
                                                            </Button>
                                                            <Button variant="contained" color="error"
                                                                onClick={(event) =>
                                                                    handleDeleteClick(event, row._id)
                                                                }
                                                            >Delete</Button>
                                                        </div>
                                                    </TableCell>
                                                </TableRow>
                                            )
                                        })}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    marginTop: "20px",
                                }}
                            >
                                <Pagination
                                    count={pageCount}
                                    page={Number(currentPage)}
                                    onChange={handlePageChange}
                                    variant="outlined"
                                    color="primary"
                                />
                            </div>
                        </Grid>
                    </Grid>
                </div>
            )
            }

            {/* add employee dialog */}
            <AddEmployee
                addEmployeeOpen={addEmployeeOpen}
                setAddEmployeeOpen={setAddEmployeeOpen}
                getData={getData}
                setCurrentPage={setCurrentPage}
            />


            {/* edit employee dialog */}
            <EditEmployee
                editEmployeeopen={editEmployeeopen}
                setEditEmployeeOpen={setEditEmployeeOpen}
                tableRowId={tableRowId}
                getData={getData}
                currentPage={currentPage}
            />

            {/* {console.log("employeesData", employeesData, employeesData.length)} */}

            {/* delete employee dialog */}
            <DeleteEmployee
                deleteEmployeeOpen={deleteEmployeeOpen}
                setDeleteEmployeeOpen={setDeleteEmployeeOpen}
                tableRowId={tableRowId}
                getData={getData}
                page={pageCount == 0 ? 1 : pageCount == 1 ? 1 : (pageCount > 1 && employeesData?.length == 1) ? currentPage - 1 : currentPage}
                setCurrentPage={setCurrentPage}
            />
        </div>
    )
}

export default EmployeesTable