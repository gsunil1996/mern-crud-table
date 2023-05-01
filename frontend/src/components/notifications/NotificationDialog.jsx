import React from 'react'
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Slide from '@mui/material/Slide';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const NotificationDialog = (props) => {

    const { notificationOpen, handleNotificationClose, successMessage, failureMessage } = props;

    return (
        <div>
            <Dialog
                fullWidth={true}
                maxWidth={'sm'}
                open={notificationOpen}
                onClose={handleNotificationClose}
                TransitionComponent={Transition}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogContent>
                    {successMessage?.length > 0 ? (
                        <div
                            style={{
                                width: "100%",
                                display: "flex",
                                justifyContent: "center",
                                marginBottom: "20px",
                            }}
                        >
                            <CheckCircleIcon
                                style={{ color: "#2C5F2D", fontSize: "100px" }}
                            />
                        </div>
                    ) : failureMessage?.length > 0 ? (
                        <div
                            style={{
                                width: "100%",
                                display: "flex",
                                justifyContent: "center",
                                marginBottom: "20px",
                            }}
                        >
                            <CancelIcon style={{ color: "#990011FF", fontSize: "100px" }} />{" "}
                        </div>
                    ) : (<div></div>)}

                    <div style={{ width: "100%", textAlign: "center" }} >
                        {successMessage?.length > 0 ? (
                            <h1>{successMessage}</h1>
                        ) : failureMessage?.length > 0 ? (
                            <h1>{failureMessage}</h1>
                        ) : (<div></div>)}
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default NotificationDialog