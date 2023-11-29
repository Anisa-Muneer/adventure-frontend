import React from 'react'
import { Alert, Button, Spinner, Typography } from '@material-tailwind/react'
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import adminRequest from '../../utils/adminRequest';



function Notification() {
    const navigate = useNavigate()
   
    const { isLoading, error, data } = useQuery({
        queryKey: ['notVerified'],
        queryFn: () => adminRequest.get('/notVerified').then((res) => res.data)
    })

    if(isLoading){
        return <div className="h-screen flex justify-center items-center"><Spinner color="blue" className="h-10 w-10 " /></div>
    }

    if(error){
        return <h1>Something went wrong</h1>
    }


    return (
        <div>
            {data.data.map(({name,_id}) => (
                <div className="flex w-full flex-col gap-2 p-3" key={_id} >
                <Alert
                    className="bg-[#b0bec5]"
                    action={
                        <Button variant="text"
                            color="grey"
                            size="md"
                            className="!absolute top-6 right-3" onClick={()=>navigate('/admin/verification',{ state: { _id } })} >view</Button>

                    }
                >
                    <Typography className="font-medium text-black">
                        Verification request.
                    </Typography>

                    <ul className="mt-2 ml-2 list-inside list-disc text-blue-gray-600">
                        <li>{`${name} Requested verification`}</li>
                    </ul>
                </Alert>

            </div>

            ))}
            

        </div>
    )
}

export default Notification
