import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  Typography,
} from "@material-tailwind/react";
import { useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { ToastContainer } from "react-toastify";
import { GenerateError, GenerateSuccess } from "../../toast/GenerateError";
import { cancelBooking } from "../../api/userApi";

function CancelBooking({ id, slotId, isCompleted }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);

  const queryClient = useQueryClient();

  const handleCancel = async () => {
    const response = await cancelBooking({ id, slotId });
    console.log(response);
    if (response.data.updated) {
      GenerateSuccess(response.data.message);
      queryClient.invalidateQueries("bookingUser");
      setOpen(!open);
    } else {
      GenerateError(response.data.message);
      setOpen(!open);
    }
  };
  return (
    <>

      <div className="flex-col ">
        <Button onClick={handleOpen}>Cancel</Button>
      </div>

      <Dialog open={open} handler={handleOpen} size="xs">
        <DialogBody className="flex flex-col justify-center items-center">
          <Typography variant="h5"> Are You Sure </Typography>
          <Typography variant="h6"> Cancel the Booking </Typography>
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1"
            size="sm"
          >
            <span>Cancel</span>
          </Button>
          <Button
            variant="filled"
            size="sm"
            color="green"
            onClick={handleCancel}
          >
            <span>Yes</span>
          </Button>
        </DialogFooter>
      </Dialog>
      <ToastContainer />
    </>
  );
}

export default CancelBooking;
