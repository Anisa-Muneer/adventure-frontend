import { Button, Dialog, DialogBody, DialogFooter, Input, Typography } from '@material-tailwind/react'
import React, { useState } from 'react'

function AddPosts() {
    const [open, setOpen] = useState(false)
    const handleOpen = ()=>{
        setOpen(!open)
    }
  return (
    <>
    <div className='flex justify-end'>
        <Button onClick={handleOpen}>Add Post</Button>
    </div>
    
    <Dialog open={open} handler={handleOpen}>
        <form className="flex flex-col gap-3">
                    <DialogBody className="max-h-[400px] overflow-y-auto">
                        <div>
                            <Typography
                                variant="small"
                                color="blue-gray"
                                className="mb-2 font-medium"
                            >
                                Category
                            </Typography>
                            <Input
                                type="text"
                                name="categoryName"
                                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                            />
                        </div>

                        <div>
                        
                        <Input
                            type="file"
                            accept="image/*"
                            className=" !border-t-blue-gray-200 text-center focus:!border-t-gray-900"
                             name='image'
                        />

                        </div>

                        
                    </DialogBody>
                    <DialogFooter>
                        <Button
                            variant="text"
                            color="red"
                            onClick={()=>handleOpen(!open)}
                            className="mr-1"
                        >
                            <span>Cancel</span>
                        </Button>
                       
                        <Button type="submit" variant="gradient" color="green">
                            <span>Submit</span>
                        </Button>
                    </DialogFooter>
                </form>

    </Dialog>
    </>
  )
}

export default AddPosts
