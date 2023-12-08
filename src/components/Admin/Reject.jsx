import { Button, Card, CardBody, CardFooter, CardHeader, Dialog, Textarea, Typography } from '@material-tailwind/react'
import { useQueryClient } from '@tanstack/react-query'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { rejectAdventureSchema } from '../../yup/validation'
import { GenerateSuccess } from '../../toast/GenerateError'
import { useFormik } from 'formik'
import { rejectAdventure } from '../../api/adminApi'

function Reject({id}) {
    const queryClient = useQueryClient()
    const  navigate = useNavigate()
    const [open,setOpen] = useState(false)
    const handleOpen = ()=>{
        setOpen(!open)
    }

    const initialvalues = {
        reason: ""
    }
    
    const {
        values,
        errors,
        touched,
        handleBlur,
        handleSubmit,
        handleChange,
    } = useFormik({
        initialValues: initialvalues,
        validationSchema: rejectAdventureSchema,
        onSubmit: async (values) => {
            console.log(values);
            const response = await rejectAdventure(values, id)
            console.log(response,'jhjhjhjhj');
            if(response.data.reject){
                setOpen(!open)
                queryClient.invalidateQueries('adventureverification')
                GenerateSuccess(response.data.message)
                navigate('/admin/notification')

            }
        }
    })


  return (
     <>
            <Button onClick={handleOpen} className="rounded-none bg-red-500 hover:bg-red-800">reject</Button>

            <Dialog
                size="xs"
                open={open}
                handler={handleOpen}
                className="bg-transparent shadow-none"
            >
                <form onSubmit={handleSubmit}>
                    <Card className="mx-auto rounded-none w-full max-w-[24rem]">
                        <CardHeader
                            variant="filled"
                            color="red"
                            className="mb-4 rounded-none grid h-28 place-items-center shadow-none"
                        >
                            <Typography variant="h5" color="white">
                                REJECT VERIFICATION
                            </Typography>
                        </CardHeader>
                        <CardBody className="flex flex-col gap-4">
                            <Textarea
                                label="Reason"
                                variant="standard"
                                size="lg"
                                name="reason"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.reason}
                            />
                            {touched.reason && errors.reason && (
                                <div className="text-red-500 text-xs ">
                                    {errors.reason}
                                </div>
                            )}

                        </CardBody>
                        <CardFooter className="pt-0 flex justify-around">
                            <Button className="hover:bg-red-500 hover:text-white rounded-none" variant="text" onClick={handleOpen} >
                                cancel
                            </Button>
                            <Button variant="filled" type="submit" className="rounded-none bg-green-700"  >
                                confirm
                            </Button>

                        </CardFooter>
                    </Card>
                </form>
            </Dialog>
        </>
  )
}

export default Reject
