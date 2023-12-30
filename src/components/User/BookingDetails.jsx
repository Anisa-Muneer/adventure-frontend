import { Button, Card, CardBody, Chip, Spinner, Typography } from '@material-tailwind/react'
import { useQuery } from '@tanstack/react-query'
import React from 'react'
import userRequest from '../../utils/userRequest'
import CancelBooking from './CancelBooking'

function BookingDetails() {

    const { isLoading, error, data } = useQuery({
        queryKey: ['bookingDetails'],
        queryFn: () => userRequest.get('/bookingDetails').then((res) => res.data)
    })


    if (isLoading) {
        return <div className="h-screen flex justify-center items-center"><Spinner color="blue" className="h-10 w-10 " /></div>
    }

    if (error) {
        return <h1>Something went wrong</h1>
    }
    console.log(data, 'llllllllllllllllllllllllll');

    const TABLE_HEAD = ["Name", "Status", "Actions"];


    return (
        <div className="container mx-auto">
            <Card className='bg-gray-300 w-full my-2 p-3 shadow-none' >
                <Typography variant="h3">Bookings</Typography>
            </Card>
            {data.data.map((booking, index) => (
                <Card color="transparent" shadow={false} className="w-full bg-gray-200 p-3 my-2" key={index}>
                    <div className="grid md:grid-cols-[10rem,1fr,10rem]">
                        <div className=" ">
                            <div
                                color="transparent"
                                className="mx-0 flex items-center gap-4 pt-0 pb-8"
                            >
                                <img
                                    size="lg"
                                    src={booking.image}
                                    className="h-16 w-16 md:h-28 md:w-28 rounded-full"
                                />
                            </div>
                        </div>
                        <div className=" ">
                            <Typography variant="h3" className="my-2">
                                {booking.adventureId.name}
                            </Typography>
                            <Typography variant="h6" className="my-2">
                                Location: {booking.adventureId.location}
                            </Typography>
                            <div className="flex my-2">
                                <Typography>
                                    Category: {booking.categoryName}
                                </Typography>
                            </div>
                            <div className="flex my-2">
                                <Typography>
                                    Fee: {booking.entryFee}
                                </Typography>
                            </div>
                            <div className="flex flex-row my-2">
                                <Typography>
                                    Date: {new Date(booking.bookingDate
                                    ).toLocaleDateString('en-GB')}
                                </Typography>

                            </div>
                            {booking.scheduledAt.map((tim, ind) => (
                                <div className="flex flex-row gap-5 pb-2 items-center my-2" key={ind}>

                                    < Typography > {tim.time}


                                    </Typography>
                                    {tim.isBooked ?
                                        <CancelBooking id={booking._id} slotId={tim.slotId} isCompleted={booking.status} />
                                        : <p>Cancelled</p>
                                    }
                                </div>
                            ))}
                        </div>
                    </div>


                </Card>
            ))
            }

        </div >
    )
}

export default BookingDetails
