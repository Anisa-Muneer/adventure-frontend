import { Button, Card, Chip, Spinner, Typography } from '@material-tailwind/react'
import { useQuery } from '@tanstack/react-query'
import React from 'react'
import userRequest from '../../utils/userRequest'

function BookingDetails() {

    const{isLoading, error, data} = useQuery({
        queryKey : ['bookingDetails'],
        queryFn : () => userRequest.get('/bookingDetails').then((res)=>res.data)
    })

    
  if (isLoading) {
    return <div className="h-screen flex justify-center items-center"><Spinner color="blue" className="h-10 w-10 " /></div>
  }

  if (error) {
    return <h1>Something went wrong</h1>
  }
  console.log(data,'llllllllllllllllllllllllll');


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
                                  src={booking.adventureId.image}
                                    className="h-16 w-16 md:h-28 md:w-28 rounded-full"
                                />
                            </div>
                        </div>
                        <div className=" ">
                            <Typography variant="h3" className="my-2">
                                team {booking.adventureId.name}
                            </Typography>
                            <Typography variant="h6" className="my-2">
                                location @ {booking.adventureId.location}
                            </Typography>
                            <div className="flex my-2">
                                <Typography>
                                    
                                </Typography>
                            </div>
                        </div>
                        <div className="flex-col ">
                           <Button>
                            Cancel
                           </Button>
                              
                        
                           
                        </div>
                    </div>
                </Card>
            ))}
           
        </div>
  )
}

export default BookingDetails
