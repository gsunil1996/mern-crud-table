import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import moment from "moment";
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';

const EmployeesProfile = () => {
    const navigate = useNavigate()
    const { id } = useParams();

    const [employeeProfile, setEmployeeProfile] = useState({});
    const [loader, setLoader] = useState(false);
    const [error, setError] = useState("");

    const handleBack = () => {
        navigate("/")
    }

    useEffect(() => {
        setLoader(true);
        axios.get(`http://localhost:5000/employeesTable/${id}`)
            .then((data) => {
                // console.log(
                //     "check dataa",
                //     data.data
                // );
                setEmployeeProfile(data.data)
                setError("")
            })
            .catch((error) => {
                // console.log("check error", error.message);
                setEmployeeProfile("")
                setError("Something Went Wrong")
            })
            .finally(() => {
                setLoader(false);
            });
    }, [id])

    return loader ? (
        <div style={{ width: "100%", marginTop: "20px" }}>
            <CircularProgress />
        </div>
    ) : error.length > 0 ? (
        <div style={{ width: "100%", marginTop: "20px", textAlign: "center" }}>
            <h1>{error}</h1>
        </div>
    ) : (
        <div>
            <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
                <div style={{ maxWidth: "max-content", margin: "auto" }}>
                    <Card variant="outlined" style={{ marginTop: "20px" }}>
                        <CardContent>
                            <div>
                                <Button
                                    size="large"
                                    variant="contained"
                                    color="primary"
                                    onClick={handleBack}
                                >
                                    Back
                                </Button>
                            </div>
                            <div className="text-center">
                                <h3>{employeeProfile?.fname + " " + employeeProfile?.lname}</h3>
                                <h4>Email: {employeeProfile?.email}</h4>
                                <h5>Phone Number: {employeeProfile?.mobile}</h5>
                                <h4>Gender: {employeeProfile?.gender}</h4>
                                <h4>Location: {employeeProfile?.location}</h4>
                                <h4>Status: {employeeProfile?.status}</h4>
                                <h5>
                                    Date Created:-
                                    {moment(employeeProfile?.datecreated).format("DD-MM-YYYY")}
                                </h5>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}

export default EmployeesProfile