import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import moment from "moment";
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';

const CompanyProfile = () => {
    const navigate = useNavigate()
    const { id } = useParams();

    const [companyProfile, setCompanyProfile] = useState({});
    const [loader, setLoader] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        setLoader(true);
        axios.get(`http://localhost:5000/companiesTable/${id}`)
            .then((data) => {
                // console.log(
                //     "check dataa",
                //     data.data
                // );
                setCompanyProfile(data.data)
                setError("")
            })
            .catch((error) => {
                // console.log("check error", error.message);
                setCompanyProfile("")
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
                                    onClick={() => navigate("/companiesTable")}
                                >
                                    Back
                                </Button>
                            </div>
                            <div className="text-center">
                                <h3>{companyProfile?.fname + " " + companyProfile?.lname}</h3>
                                <h4>Email: {companyProfile?.email}</h4>
                                <h5>Phone Number: {companyProfile?.mobile}</h5>
                                <h4>Gender: {companyProfile?.gender}</h4>
                                <h4>Location: {companyProfile?.location}</h4>
                                <h4>Status: {companyProfile?.status}</h4>
                                <h5>
                                    Date Created:-
                                    {moment(companyProfile?.datecreated).format("DD-MM-YYYY")}
                                </h5>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}

export default CompanyProfile