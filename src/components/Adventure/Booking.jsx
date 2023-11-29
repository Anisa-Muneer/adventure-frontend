import React, { useState } from 'react'
import { AddSlot } from './AddSlot'
import { Card, CardBody, Chip, Option, Select, Spinner, Typography } from '@material-tailwind/react'
import { useQuery } from '@tanstack/react-query';
import adventureRequest from '../../utils/adventureRequest';

function Booking() {
    const [selectedDate, setSelectedDate] = useState("")
    const { isLoading: dateisLoading, error: dateError, data: dateData } = useQuery({
        queryKey: ['slotAdventure'],
        queryFn: () => adventureRequest.get('/slotDate').then((res) => res.data)

    })

    const { isLoading: slotDataLoading, error: slotDataError, data: slotData } = useQuery({
        queryKey: ['slots', selectedDate],
        queryFn: () => adventureRequest.get(`/slots?date=${selectedDate}`).then((res) => res.data),

    });
    if (dateisLoading) {
        return <div className="h-screen flex justify-center items-center"><Spinner color="blue" className="h-10 w-10 " /></div>
    }
    if (dateError) {
        return <h1>Something went Wrong</h1>
    }


    console.log(slotData, 'slotData is here');

    if (slotDataLoading) {
        return <div className="h-screen flex justify-center items-center"><Spinner color="blue" className="h-10 w-10 " /></div>
    }
    if (slotDataError) {
        return <h1>Something went Wrong</h1>
    }
    const TABLE_HEAD = ["Category", "Date", "Time", "Status"];
    return (
        <>
            <div className="container mx-auto">
                <div className="m-3 flex items-center justify-between gap-8 bg-[#588157] rounded-md p-3">
                    <div>
                        <Typography variant="h5" color="blue-gray">
                            SLOTS AND BOOKINGS
                        </Typography>
                        <Typography color="gray" className="mt-1 font-normal text-[#344E41]">
                            See information about provided slotes and Bookings
                        </Typography>
                    </div>
                    <div className="flex shrink-0 flex-col gap-2 sm:flex-row ">
                        <AddSlot />
                    </div>
                </div>

                <div className="grid md:grid-cols">
                    <div className="col-span-1">

                        <Card className="my-3 mx-3 rounded-md p-3  bg-[#588157] ">
                            <Typography variant="h5" className="text-blue-gray-900 ">Given Slotes</Typography>
                        </Card>


                        <Card className="my-3 mx-3 rounded-md min-h-[20rem] p-3  w-auto bg-[#588157] ">


                            <div className="mx-2 w-96  ">
                                <Select
                                    size="md"
                                    color='blue-gray'
                                    label="Choose date"
                                    value={selectedDate}
                                    onChange={(val) => {
                                        const newSlectedDate = val
                                        setSelectedDate(newSlectedDate)
                                    }}
                                >
                                    {dateData.data.map((dates, index) => (

                                        <Option key={index} value={dates}>
                                            {new Date(dates).toLocaleDateString('en-GB')}
                                        </Option>
                                    ))}
                                </Select>
                            </div>


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
                                                    {slotData && slotData.data
                                                        ? slotData.data.map((data, i) => (
                                                            console.log(slotData.data,'llkkjjhhggff'),
                                                            // For each 'data' in slotData.data, create a separate row (tr)
                                                            data.slotes.map((slot, index) => (
                                                                console.log(data.slotes,'data.slote is here'),
                                                                <tr key={`${i}-${index}`}>
                                                                    <td>
                                                                        <div className="flex items-center mx-7">
                                                                            <div>
                                                                                
                                                                                <Typography color="blue-gray" className="mb-2">
                                                                                    {slot.category}
                                                                                </Typography>
                                                                            </div>
                                                                        </div>
                                                                    </td>

                                                                    <td>
                                                                        <div className="flex items-center mx-7">
                                                                            <div>
                                                                                <Typography color="blue-gray" className="mb-2">
                                                                                Date: {new Date(slot.slotDate).toLocaleDateString('en-GB')}
                                                                                </Typography>
                                                                            </div>
                                                                        </div>
                                                                    </td>

                                                                    <td>
                                                                        <div className="flex items-center mx-7">
                                                                            <div>
                                                                                <Typography color="blue-gray" className="mb-2">
                                                                                    {slot.slotTime}
                                                                                </Typography>
                                                                            </div>
                                                                        </div>
                                                                    </td>

                                                                    <td>
                                                                        <div className="flex items-center mx-7">
                                                                            <div>
                                                                                <Typography color="light-green" className="mb-2">
                                                                                    <Chip
                                                                                        className="text-center my-2"
                                                                                        variant="ghost"
                                                                                        size="md"
                                                                                        value={slot.isBooked === true ? "BOOKED" : "AVAILABLE"}
                                                                                        color={slot.isBooked === true ? "red" : "green"}
                                                                                    />
                                                                                </Typography>
                                                                            </div>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                            ))
                                                        ))
                                                        : ""}
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

export default Booking
