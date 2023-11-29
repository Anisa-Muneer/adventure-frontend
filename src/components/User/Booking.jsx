import { MdEventSeat } from "react-icons/md";
import { Button, Card, Input, Option, Select, Spinner, Typography } from '@material-tailwind/react';
import React, { useEffect, useState } from 'react';
import { Ri24HoursLine } from 'react-icons/ri';
import { AiOutlineSafety } from 'react-icons/ai';
import { FaPersonHiking } from 'react-icons/fa6';
import { useQuery } from '@tanstack/react-query';
import { useLocation } from 'react-router-dom';
import userRequest from '../../utils/userRequest';
import { InformationCircleIcon } from "@heroicons/react/24/solid";
import Payment from "./Payment";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
const stripePromise = loadStripe('pk_test_51OF855SGN2zHCLENlnBfUdHrHEbCfUNqspaKKfywKGcqCU4FUYgPL2lbowonYJlZR13VbasNRGuflNVvoXN1Pi6e001LUW1lZq');

function Booking() {
    const location = useLocation()
    const [selectedDate, setSelectedDate] = useState("")
    const [clientSecret,setClientSecret] = useState("")
    const [slot,setSlot] = useState("")
    const [booking, setBooking] = useState({
        time: "", 
        date: "",
        fee:null
    })

    
    const { categoryName, fee, _id } = location.state;

    useEffect(()=>{
        if(_id){
            const makePayment=async()=>{
                try {
                    const response = await userRequest.get(`/payment/${_id}/${categoryName}`)
                    console.log(response,'its a response');
                    setClientSecret(response.data.clientSecret);
                } catch (error) {
                    console.log(error.message);
                }
            }
            makePayment()
        }
        
    },[_id])

    const appearance = {
        theme: 'stripe',
      };
      const options = {
        clientSecret,
        appearance,
      };


    const { isLoading: dateIsLoading, error: dateError, data: dateData } = useQuery({
        queryKey: ['slotDate'],
        queryFn: () => userRequest.get(`/slotdate?adventureId=${_id}&categoryName=${categoryName}`).then((res) => res.data),
    });

    const { isLoading: slotIsLoading, error: slotError, data: slotData } = useQuery({
        queryKey: ['slotUser', selectedDate],
        queryFn: () => userRequest.get(`/slotsuser?date=${selectedDate}&adventureId=${_id}`).then((res) => res.data),
    });

    console.log(dateData, 'date data is here');
    console.log(slotData, 'slot data is here');

    if (dateIsLoading) {
        return <div className="h-screen flex justify-center items-center"><Spinner color="blue" className="h-10 w-10 " /></div>
    }
    if (dateError) {
        return <h1>Something went Wrong</h1>
    }

    if (slotIsLoading) {
        return <div className="h-screen flex justify-center items-center"><Spinner color="blue" className="h-10 w-10 " /></div>
    }
    if (slotError) {
        return <h1>Something went Wrong</h1>
    }

    const handleClick = async (slot) => {
        setSlot(slot)
       setBooking({
            time: slot.slotTime, date: slot.slotDate,fee:fee
        })
    }





    return (
        <>
            <div className='flex flex-col md:flex-row bg-gray-200'>

                <div className='md:w-full '>
                    <Card className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center justify-evenly h-auto m-4 md:my-9 py-7 bg-blue-gray-200 rounded-none">

                        <div className="flex flex-col items-center">
                            <div className="ps-8">
                                <Ri24HoursLine className="h-12 md:h-28 w-12 md:w-28 text-white" />
                            </div>
                            <div className="ps-8">
                                <Typography
                                    variant="h6"
                                    color="white"
                                    size="l"
                                    className="font-serif"
                                >
                                    Cancellation up to 24 hrs
                                </Typography>
                            </div>
                        </div>

                        <div className="flex flex-col items-center">
                            <div className="ps-8">
                                <FaPersonHiking className="h-12 md:h-28 w-12 md:w-28 text-white" />
                            </div>
                            <div className="ps-8">
                                <Typography
                                    variant="h6"
                                    color="white"
                                    size="l"
                                    className="font-serif"
                                >
                                    Personal Guide
                                </Typography>
                            </div>
                        </div>

                        <div className="flex flex-col items-center">
                            <div className="ps-8">
                                <AiOutlineSafety className="h-12 md:h-28 w-12 md:w-28 text-white" />
                            </div>
                            <div className="ps-8">
                                <Typography
                                    variant="h6"
                                    color="white"
                                    size="l"
                                    className="font-serif"
                                >
                                    Safety
                                </Typography>
                            </div>
                        </div>

                    </Card>
                    <div className='md:h-96 m-4 md:my-9 py-7 mx-10'>
                        <div className='mx-4'>

                            <Typography
                                variant="h3"
                                color="black"
                                className="font-serif"
                            >
                                Booking Details
                            </Typography>

                        </div>

                        <form className="mt-4 md:mt-8 mb-2 mx-4 md:mx-9 w-full max-w-screen-lg sm:w-96">


                            <div className="mb-2 mt-4 flex flex-col md:flex-row gap-4">
                                <Typography variant="h6" color="blue-gray" className="md:-mb-2 md:mt-2 w-full md:w-1/3">
                                    Date
                                </Typography>
                                <Select
                                    size="lg"
                                    label='choose date'
                                    value={selectedDate}
                                    onChange={(val) => {
                                        const newSelectedDate = val
                                        setSelectedDate(newSelectedDate);
                                    }}

                                >
                                    {dateData ? dateData.data.map((dates, index) => (
                                        <Option key={index} value={dates}>
                                            {new Date(dates).toLocaleDateString('en-GB')}
                                        </Option>
                                    )) : (
                                        <Option >No Slots</Option>
                                    )}
                                </Select>
                            </div>
                            <div className="flex flex-row mt-7">


                                <Typography variant="h6" color="blue-gray" className=" md:mt-3 w-full md:w-1/3">
                                    Select Time
                                </Typography>
                                <div className="flex flex-row">
                                    {slotData.data ? (
                                        slotData.data.map((slot, slotIndex) => (
                                            <div className="px-4">
                                            {slot && slot.isBooked === false ?
                                            <div className="flex flex-col mt-2 gap-2" key={slotIndex} onClick={() => handleClick(slot)}>
                                                  <MdEventSeat className="h-10 w-10 mx-2" />
                                                <Typography className="">
                                                    {slot.slotTime}
                                                </Typography>
                                            </div>:
                                            <div className="flex flex-col mt-2 gap-2" key={slotIndex} onClick={() => handleClick(slot)}>
                                                  <MdEventSeat className="h-10 w-10 mx-2" color="red" />
                                                <Typography className="" color="red">
                                                    {slot.slotTime}
                                                </Typography>
                                            </div>
                                        }
                                        </div>

                                        ))
                                    ) : (

                                        <div className="flex-col h-20">
                                            <div className="flex justify-center">
                                                <InformationCircleIcon className="h-12 w-12 text-[#050505] mt-5" />
                                            </div>
                                            <div className="flex justify-center">
                                                <p className=" text-[#080808]">please choose a date to show slots</p>
                                            </div>
                                        </div>

                                    )}
                                </div>

                            </div>


                            {/* <div className="flex w-full md:w-max gap-4 mt-8 md:mt-10 mx-auto">
                                <Button className='w-full md:w-40' type="">Submit</Button>
                            </div> */}
                        </form>

                    </div>
                </div>



                <div className='flex justify-center items-center w-full md:w-1/2'>
                    <div className='bg-white h-4/5 w-full md:w-4/5'>
                        <Typography
                            variant="h5"
                            size="s"
                            className="m-8">
                            YOUR SLOT
                        </Typography>
                        <div className="px-8">
                            <hr className="border border-gray-300" />
                        </div>



                        <div className="flex flex-row justify-around mt-10 w-full">
                            <div className="mr-14 mx-14 w-1/2">Date</div>
                            <div className="w-1/2">{booking?.date ? new Date(booking.date).toLocaleDateString('en-GB') : ''}</div>
                        </div>
                        <div className="flex flex-row justify-around mt-10 w-full">
                            <div className="mx-14 w-1/2">Time</div>
                            <div className="w-1/2 ">{booking?.time}</div>
                        </div>
                        <div className="flex flex-row justify-around mt-10 w-full">
                            <div className="mr-8 mx-14 w-1/2">Price</div>
                            <div className="w-1/2">{booking.fee}</div>
                        </div>
                        <div className="px-8 mt-8">
                            <hr className="border border-gray-300" />
                        </div>

                        <div className="flex flex-row justify-around mt-10 w-full">
                            <div className="mr-10 mx-6 w-1/2">Total</div>
                            <div><h1 className="text-red-800 w-1/2"> {booking.fee}</h1></div>
                        </div>

                        {/* <div className="flex flex-row justify-center mt-10">
                            <Button className="rounded-3xl w-72">Book Now</Button>
                        </div> */}


                        { slot && slot.isBooked === false ? clientSecret && (
                                <Elements options={options} stripe={stripePromise}>
                                  <Payment Secret={clientSecret} advId={_id} slotId={slot._id} slotDate={slot.slotDate} slotTime={slot.slotTime} fee={fee} categoryName={categoryName} />
                                </Elements>
                              ) : ""
                              }

                    </div>
                </div>

            </div>
        </>
    );
}

export default Booking;
