import { Button, Dialog, DialogBody, DialogFooter, DialogHeader, Rating, Textarea, Typography } from '@material-tailwind/react'
import React, { useState } from 'react'
import { ToastContainer } from 'react-toastify'
import { addReview } from '../../api/userApi'
import { useQueryClient } from '@tanstack/react-query'
import { GenerateSuccess } from '../../toast/GenerateError'

function Review({id}) {
    const[open,setOpen] = useState(false)
    const [rating, setRating] = React.useState(0);
    const [review, setReview] = React.useState("");
    const handleOpen = ()=>setOpen(!open)
    const queryClient = useQueryClient()

    
    const handleRating = (newRating) => {
        setRating(newRating)
    }

    const handleSubmit = async(e)=>{
           try {
            e.preventDefault()
            const data = {
                rating: rating,
                review: review,
                id: id
            }
            const res = await addReview(data)

            if (res.data.created) {
                queryClient.invalidateQueries(["review"])
                handleOpen()
                GenerateSuccess(res.data.message)
            }
        } catch (error) {
            console.log(error.message);
        }
    }
  return (
    <>
            <Button size="sm" variant="outlined" className="rounded-full hover:bg-gray-600 hover:text-white" onClick={handleOpen}>review</Button>
            <Dialog open={open} size="xs" handler={handleOpen} className="rounded-none">
                <div className="flex items-center justify-between">
                    <DialogHeader className="flex flex-col items-start">
                        {" "}
                        <Typography className="mb-1" variant="h4">
                        
                        </Typography>
                    </DialogHeader>

                </div>
                <DialogBody>

                    <div className="grid gap-6 ">

                        <Rating value={rating} className="h-16" onChange={handleRating}/>

                        <Textarea label="Message" value={review} onChange={(e) => setReview(e.target.value)} />
                    </div>
                </DialogBody>
                <DialogFooter className="space-x-2">
                    <Button variant="text" color="gray" onClick={handleOpen}>
                        cancel
                    </Button>
                    <Button variant="filled" size="sm" color="blue" onClick={handleSubmit}>
                        send
                    </Button>
                </DialogFooter>
            </Dialog>
            <ToastContainer />
        </>
  )
}

export default Review
