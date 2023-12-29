import { Card, CardBody, Chip, Select, Spinner, Typography } from '@material-tailwind/react'
import { useQuery } from '@tanstack/react-query';
import React from 'react'
import adventureRequest from '../../utils/adventureRequest';

function UserBooking() {
    const TABLE_HEAD = ["Category", "User", "No of Slots", "Date", "Time"];

    const { isLoading, error, data } = useQuery({
        queryKey: ['userBooking'],
        queryFn: () => adventureRequest.get('/userBooking').then((res) => res.data)
    })
    console.log(data, 'user booking data is here');


    if (isLoading) {
        return <div className="h-screen flex justify-center items-center"><Spinner color="blue" className="h-10 w-10 " /></div>
    }

    if (error) {
        return <h1>Something went wrong</h1>
    }



    return (
        <>
            <div className="container mx-auto">


                <div className="grid md:grid-cols">
                    <div className="col-span-1">

                        <Card className="my-3 mx-3 rounded-md p-3  bg-[#588157] ">
                            <Typography variant="h5" className="text-blue-gray-900 ">Booking</Typography>
                        </Card>


                        <Card className="my-3 mx-3 rounded-md min-h-[20rem] p-3  w-auto bg-[#588157] ">



                            <div className="grid grid-cols-1 max-h-[50rem] overflow-y-scroll">
                                <div className="col-span-1" >

                                    <Card className="mt-6 mx-2 min-w-min bg-white rounded-md hover:shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1" >
                                        <CardBody className="overflow-hidden px-0">
                                            <table className="mt-4 w-full min-w-max table-auto text-left m-1 gap-9">

                                                <thead>
                                                    <tr>
                                                        {TABLE_HEAD.map((head) => (
                                                            <th
                                                                key={head}
                                                                className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 "
                                                            >
                                                                <Typography
                                                                    variant="small"
                                                                    color="blue-gray"
                                                                    className="font-normal leading-none opacity-100 mx-4"
                                                                >
                                                                    {head}
                                                                </Typography>
                                                            </th>
                                                        ))}
                                                    </tr>
                                                </thead>


                                                <tbody>
                                                    {data.data.map((booking, index) => (



                                                        <tr key={index} >
                                                            <td>
                                                                <div className="flex items-center mx-7" >
                                                                    <div>

                                                                        <Typography color="blue-gray" className="mb-2">
                                                                            {booking.categoryName}
                                                                        </Typography>
                                                                    </div>
                                                                </div>
                                                            </td>

                                                            <td>
                                                                <div className="flex items-center mx-7">
                                                                    <div>
                                                                        <Typography color="blue-gray" className="mb-2">
                                                                            {booking.user.name}
                                                                        </Typography>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <div className="flex items-center mx-7">
                                                                    <div>
                                                                        <Typography color="blue-gray" className="mb-2">
                                                                            {booking.noOfSlots}
                                                                        </Typography>
                                                                    </div>
                                                                </div>
                                                            </td>

                                                            <td>
                                                                <div className="flex items-center mx-7">
                                                                    <div>
                                                                        <Typography color="blue-gray" className="mb-2">
                                                                            {new Date(booking.bookingDate).toLocaleDateString('en-GB')}

                                                                        </Typography>
                                                                    </div>
                                                                </div>
                                                            </td>

                                                            <td>
                                                                <div className="flex items-center mx-7">
                                                                    <div>


                                                                        <Typography color="blue-gray" className="mb-2" >
                                                                            {booking.scheduledAt.time}
                                                                        </Typography>


                                                                    </div>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    ))}

                                                </tbody>

                                            </table>
                                        </CardBody>

                                    </Card>

                                </div>
                            </div>
                        </Card>
                    </div >

                </div >
            </div>
        </>
    )
}

export default UserBooking
