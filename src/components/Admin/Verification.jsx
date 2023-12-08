import React, { useState } from 'react'
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Input,
    Checkbox,
    Button,
    Spinner
} from "@material-tailwind/react";
import { useQuery } from '@tanstack/react-query';
import adminRequest from '../../utils/adminRequest';
import { useLocation, useNavigate } from 'react-router-dom';
import { verifyAdventure } from '../../api/adminApi';
import Reject from './Reject';

function Verification() {
    const location = useLocation()
    const id = location.state._id
    const navigate = useNavigate()
    const [open,setOpen] = useState(false)
    const handleOpen = () => setOpen(!open)

    const { isLoading, error, data } = useQuery({
        queryKey: ['adventureVerification'],
        queryFn: () => adminRequest.get(`/adventure/${id}`).then((res) => res.data)
    })
    if (data) {
        
        console.log(data);
    }
    if(isLoading){
        return <div className="h-screen flex justify-center items-center"><Spinner color="blue" className="h-10 w-10 " /></div>
    }
    if(error){
        return <h1>Something went wrong</h1>
    }
    

    const handleVerify = async(advId)=>{
        const response = await verifyAdventure(advId)
        if(response.data.verified){
            navigate('/admin/adventures')
        }
    }
    return (
        <div className='container'>
            <div className='flex align-middle justify-center'>
            <div className='w-2/3'>

            <Card color="transparent" shadow={false} className="bg-[#b0bec5] mt-9">
                <div className="p-5 ">
                    <CardHeader
                        color="transparent"
                        floated={false}
                        shadow={false}
                        className="mx-0 flex items-center gap-4 pt-0 pb-8"
                    >
                        <div className="relative w-20 h-20 md:w-48 md:h-48">
                            <img
                                alt="tania andrew"
                                className="absolute top-0 left-0 w-full h-full rounded-full object-cover"
                                src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
                            />
                        </div>
                        <div className="flex flex-col">
                            <Typography variant="h5" className='text-2xl' color="blue-gray">
                            {data.data.name}
                            </Typography>
                            <Typography className="font-bold"> {data.data.email} </Typography>
                            <Typography className="text-gray-600">{data.data.mobile}</Typography>
                            <Typography className="text-gray-600">{data.data.description}</Typography>

                        </div>
                    </CardHeader>
                    <CardBody className="mb-6 p-0">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <Typography className="text-gray-900">Category:</Typography>

                                {data.data.category.map((cat,index)=>(

                                    <Typography className="font-bold" key={index}>{index+1}  {cat.categoryName} </Typography>
                                    ))
                                    
                                    }
                            </div>
                            <div>
                                <Typography className="text-gray-900">Location</Typography>
                                <Typography className="font-bold"> {data.data.location} </Typography>
                            </div>
                            <div>
                                <Typography className="text-gray-900">PAN</Typography>
                                <Typography className="font-bold"> {data.data.pan} </Typography>
                            </div>
                            <div>
                                <Typography className="text-gray-900">GST</Typography>
                                <Typography className="font-bold"> {data.data.gst} </Typography>
                            </div>
                            <div></div>
                            <div className='flex justify-end'>
                                {/* <Button onClick={()=>handleOpen(!open)} variant="text" color="red" className="mr-1"><span>Cancel</span></Button> */}
                                <Button variant="filled" className="rounded-none text-xs hover:bg-green-800 text-white me-4 bg-green-600" onClick={()=>handleVerify(data.data._id)}>approve</Button>
                                <Reject id={data.data._id} />

                            </div>
                        </div>
                    </CardBody>
                </div>
            </Card>
            </div>
            </div>
        </div>
    )
}

export default Verification
