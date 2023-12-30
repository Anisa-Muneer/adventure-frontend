import { Button, Card, CardBody, Chip, Spinner, Typography } from '@material-tailwind/react'
import React from 'react'
import dp from '../../assets/images/payment.png'
import { BookmarkIcon } from '@heroicons/react/24/solid'
import { useLocation, useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import userRequest from '../../utils/userRequest'
import AddWallet from './AddWallet'


function WalletHistory() {
  const location = useLocation()
  const id = location.state


  const { isLoading, error, data } = useQuery({
    queryKey: ['userWallet'],
    queryFn: () => userRequest.get('/walletHistory').then((res) => res.data)
  })

  if (isLoading) {
    return <div className="h-screen flex justify-center items-center"><Spinner color="blue" className="h-10 w-10 " /></div>
  }

  if (error) {
    return <h1>Something went wrong</h1>
  }

  console.log(data, 'wallet data is here');

  return (
    <>
      <div>
        <div className='flex justify-center'>
          <div className="flex justify-center items-center relative w-3/4 h-32  mt-16">
            <div className="absolute left-0 w-1/2 h-full bg-black flex flex-col justify-center items-center rounded-s-xl ">

              <Typography
                className=''
                color='white'
                variant='h1'
              >
                {id}
              </Typography>
              <Typography
                className=''
                size='sm'
                color='white'
              >
                Your Wallet Amount
              </Typography>
            </div>
            <div className="absolute right-0 w-1/2 h-full bg-green-50 rounded-e-xl flex justify-center align items-center">
              <AddWallet id={id} />
            </div>

            {/* <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-red-500">
        <img className='rounded-full' src={dp} alt="" />
      </div> */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-red-500">
              <img className='rounded-full w-full h-full' src={dp} alt="" />
            </div>

          </div>
        </div>


        <div className='flex flex-col'>
          <Typography
            className='mt-10 mx-48'
            variant='h4'
          >
            Credit History
          </Typography>
          <hr className=" mx-52 mt-2 border border-gray-300" />
        </div>


        <div className='w-3/4  h-auto mx-48 mt-5'>
          {data && data.data.map((booking, index) => (

            <CardBody className="h-40 m-3  py-2 bg-blue-gray-50 rounded-lg" key={index} >


              <div className="flex justify-between" >

                <div className="ps-8 h-full">
                  {/* <Typography 
                                                variant="h4"
                                                color="blue-gray"
                                                size="xl"
                                                className="pt-3  font-serif"
                                            >₹ {booking.entryFee}
                                                
                                            </Typography> */}
                  <Typography
                    variant="h5"
                    color="blue-gray"
                    size="xl"
                    className="  font-serif"
                  >{booking.adventureId.name}
                  </Typography>

                  <Typography
                    variant="h6"
                    color="blue-gray"
                    size="xl"
                    className="font-serif"
                  >{booking.categoryName}
                  </Typography>
                  <div className='flex flex-row'>
                    <Typography

                      color="blue-gray"
                      size="sm"
                      className="font-normal"
                    >{new Date(booking.bookingDate).toLocaleDateString('en-GB')}
                    </Typography>
                    <Typography

                      color="blue-gray"
                      size="sm"
                      className="font-normal"
                    >  {booking.scheduledAt.time}
                    </Typography>
                  </div>


                </div>

                <div className="h-full ps-24 flex items-center  border-e-2">
                </div>
                <div className="w-72 h-full flex flex-col justify-center items-center">
                  {/* {booking.status === 'cancelled'  ? (

                                            <Button className="flex items-center bg-green-600 gap-1">
                                                <span>Debit</span>
                                            </Button>
                                            ):(
                                                
                                                 <Button className="flex items-center bg-green-600 gap-1">
                                                <span>Credit</span>
                                            </Button>
                                    )} */}

                  <Chip
                    variant="ghost"
                    size="sm"
                    value={booking.status === 'cancel' ? `+ ${booking.entryFee}` : `-${booking.entryFee}`}
                    color={booking.status === 'cancel' ? "green" : "red"}
                  />
                </div>
              </div>



            </CardBody>
          ))}

        </div>



      </div>

    </>
  )
}

export default WalletHistory
