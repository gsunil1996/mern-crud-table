import React, { useState } from 'react'
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Slide from '@mui/material/Slide';
import Button from '@mui/material/Button';
import axios from "axios";
import NotificationDialog from '../notifications/NotificationDialog';
import CircularProgress from '@mui/material/CircularProgress';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const DeleteEmployee = (props) => {
    const [loader, setLoader] = useState(false);
    const { deleteEmployeeOpen, setDeleteEmployeeOpen, tableRowId, getData, page, setCurrentPage } = props;

    const [successMessage, setSuccessMessage] = useState("")
    const [failureMessage, setFailureMessage] = useState("")
    const [notificationOpen, setNotificationOpen] = React.useState(false);

    const handleNotificationClickOpen = () => {
        setNotificationOpen(true);
    };

    const handleNotificationClose = () => {
        setNotificationOpen(false);
        setSuccessMessage("")
        setFailureMessage("")
    };

    const handleDeleteEmployeeClose = () => {
        setDeleteEmployeeOpen(false)
    }

    const handleUserDelete = () => {

        setLoader(true)

        // delete api call

        let config = {
            method: 'delete',
            url: `http://localhost:5000/deleteEmployee/${tableRowId}`,
        }

        //axios instance
        axios(config).then((data) => {
            // console.log("checkDeleteData", data.status, data.data)

            setSuccessMessage("User Deleted Successfully")
            setFailureMessage("")
            sessionStorage.setItem("employeePage", page)
            // get call
            getData({ search: "", gender: "all", status: "all", sort: "new", page });
            setCurrentPage(page)
            handleDeleteEmployeeClose()

        }).catch((error) => {
            //  console.log("checkDeleteData error", error.response.data, typeof (error.response.data.message))
            setSuccessMessage("")
            setFailureMessage("Something Went Wrong")
        })
            .finally(() => {
                setLoader(false);
                handleNotificationClickOpen()
            });
    }


    return (
        <div>
            <Dialog
                fullWidth={true}
                maxWidth='sm'
                open={deleteEmployeeOpen}
                onClose={handleDeleteEmployeeClose}
                TransitionComponent={Transition}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogContent>
                    <div style={{ textAlign: "center" }} >
                        <h3 style={{ marginTop: "0px" }} >Are you sure to delete this user</h3>
                    </div>
                    <div style={{ display: "flex", justifyContent: "center", gap: "10px", marginBottom: "10px" }} >
                        <Button variant="contained" color="primary" onClick={handleDeleteEmployeeClose} >
                            No
                        </Button>
                        <Button variant="contained" color="secondary" onClick={handleUserDelete} >
                            {loader ? (
                                <CircularProgress style={{ color: "#fff" }} />
                            ) : (
                                "Yes"
                            )}
                        </Button>
                    </div>

                </DialogContent>

            </Dialog>

            <NotificationDialog notificationOpen={notificationOpen} handleNotificationClose={handleNotificationClose} successMessage={successMessage} failureMessage={failureMessage} />
        </div>
    )
}

export default DeleteEmployee