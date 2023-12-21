import { InfoIcon } from '@chakra-ui/icons'
import { Button, Dialog, DialogBody, DialogFooter, Typography } from '@material-tailwind/react'
import React, { useState } from 'react'
import { ToastContainer } from 'react-toastify'
import { deletePost } from '../../api/adventureApi'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { GenerateError, GenerateSuccess } from '../../toast/GenerateError'

function DeletePost({ id }) {
    const [open, setOpen] = useState(false)
    const handleOpen = () => setOpen(!open)
    const queryClient = useQueryClient()

    const handleDelete = async () => {

        const response = await deletePost({ id })
        if (response.data) {
            GenerateSuccess(response.data.message);
            queryClient.invalidateQueries("postDelete");
            setOpen(!open)
        } else {
            GenerateError(response.data.message);
            setOpen(!open);
        }
    }

    return (
        <>

            <div>
                <InfoIcon onClick={handleOpen} />
            </div>
            <Dialog open={open} handler={handleOpen} size="xs">
                <DialogBody className="flex flex-col justify-center items-center">
                    <Typography variant="h5"> Are You Sure </Typography>
                    <Typography variant="h6"> Delete the Post </Typography>
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
                        onClick={handleDelete}
                    >
                        <span>Yes</span>
                    </Button>
                </DialogFooter>
            </Dialog>
            <ToastContainer />
        </>
    )
}

export default DeletePost
