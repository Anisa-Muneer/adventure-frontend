import React, { useState } from "react";
import {
    Button,
    Dialog,
    DialogHeader,
    Card,
    CardBody,
    Input,
    Option,
    Typography,
    Spinner,
    // Select,
} from "@material-tailwind/react";

import { useFormik } from "formik";
import { slotSchema } from "../../yup/validation";
import { QueryClient, useQuery } from "@tanstack/react-query";
import adventureRequest from "../../utils/adventureRequest";
import { setSlot } from "../../api/adventureApi";


export function AddSlot() {
    const [open, setOpen] = useState(false)
    const [selectedOptions, setSelectedOptions] = useState([])
    const handleOpen = () => setOpen(!open)
    const constructTime = (hour, minute, meridien) => {
        let formatedTime = `${hour}:${minute}`;
        if (meridien === 'PM') {
            let hourInt = parseInt(hour, 10)
            if (hourInt > 12) {
                formatedTime = `${hour + 12}:${minute}`
            }
        }
        return formatedTime
    }

    const initialValues = {
        category: "",
        startdate: "",
        enddate: "",
        startTimeHour: "",
        startTimeMinute: "",
        startTimeMeridiem: "",
        endTimeHour: "",
        endTimeMinute: "",
        endTimeMeridiem: ""
    }

    const {
        values,
        errors,
        touched,
        handleSubmit,
        handleBlur,
        handleChange,
        setFieldValue
    } = useFormik({
        initialValues: initialValues,
        validationSchema: slotSchema,
        onSubmit: async (values) => {
            const startTime = constructTime(values.startTimeHour, values.startTimeMinute, values.startTimeMeridiem)
            const endTime = constructTime(values.endTimeHour, values.endTimeMinute, values.endTimeMeridiem)
            const slotData = {
                startDate: values.startdate,
                endDate: values.enddate,
                startTime: startTime,
                endTime: endTime,
                category : values.category
            };
            console.log(values, 'its a values');

            try {
                const response = await setSlot(slotData);
                console.log(response,'jjjjdddedryeyrery');
                if (response) {
                    setOpen(!open)
                    QueryClient.invalidateQueries('slotsAdventure')
                }
            } catch (error) {

                console.error('Error setting slot:', error);
            }
        }
    })

    // const handleSingleChange = (selectedOptions) => {
    //     setFieldValue(
    //         "slots",
    //         selectedOptions.value
    //     )
    //     setSelectedOptions(selectedOptions)
    // }


    const { isLoading, error, data } = useQuery({
        queryKey: ['slotCategory'],
        queryFn: () => adventureRequest.get('/slotCategory').then((res) => res.data)
    })


    console.log(data, 'slot category is here');
    if (isLoading) {
        return <div className="h-screen flex justify-center items-center"><Spinner color="blue" className="h-10 w-10 " /></div>

    }

    if (error) {
        return <h1>Something went wrong</h1>

    }





    return (

        <>
            <Button onClick={handleOpen} variant="filled" className="bg-[#13453a]">
                add slot
            </Button>
            <Dialog open={open} handler={handleOpen}>
                <DialogHeader>ADD SLOTS</DialogHeader>
                <Card className="">
                    <CardBody>
                        <form onSubmit={handleSubmit}>
                            <Typography
                                variant="small"
                                color="blue-gray"
                                className="mb-2 font-medium"

                            >
                                category
                            </Typography>
                            <select
                                name="category"
                                value={values.category}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className="block appearance-none w-full bg-white border border-gray-500 hover:border-gray-400 px-4 py-2 pr-8 rounded-md leading-tight focus:outline-none focus:shadow-outline"
                            >
                                {data.data.category.map((item, index) => {
                                    return (
                                        <option key={index} >{item.categoryName}</option>
                                    )
                                })}


                            </select>
                            {touched.category && errors.category && (
                                <div className="text-red-500 text-xs">
                                    {errors.category}
                                </div>
                            )}



                            <p>Start Date</p>
                            <Input
                                className=""
                                variant="standard"
                                label=""
                                type="date"
                                name="startdate"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.startdate}

                            />
                            {touched.startdate && errors.startdate && (
                                <div className="text-red-500 text-xs ">
                                    {errors.startdate}
                                </div>
                            )}

                            <p>End Date</p>
                            <Input
                                className=""
                                variant="standard"
                                label=""
                                type="date"
                                name="enddate"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.enddate}

                            />
                            {touched.enddate && errors.enddate && (
                                <div className="text-red-500 text-xs ">
                                    {errors.enddate}
                                </div>
                            )}

                            <p>Start Time</p>
                            <div className="grid grid-cols-3 my-3 gap-3">
                                <div className="col-span-1 w-full">
                                    <select
                                        variant="standard"
                                        name="startTimeHour"
                                        onBlur={handleBlur}
                                        value={values.startTimeHour}
                                        onChange={handleChange}
                                        className="border border-gray-500 rounded w-full h-9"



                                    >
                                        <option value="" > Select....</option>
                                        <option value="1" > 1</option>
                                        <option value="2" > 2</option>
                                        <option value="3" > 3</option>
                                        <option value="4" > 4</option>
                                        <option value="5" > 5</option>
                                        <option value="6" > 6</option>
                                        <option value="7" > 7</option>
                                        <option value="8" > 8</option>
                                        <option value="9" > 9</option>
                                        <option value="10"> 10</option>
                                        <option value="11"> 11</option>
                                        <option value="12"> 12</option>
                                    </select>
                                    {touched.startTimeHour && errors.startTimeHour && (
                                        <div className="text-red-500 text-xs ">
                                            {errors.startTimeHour}
                                        </div>
                                    )}
                                </div>
                                <div className="col-span-1">
                                    <select
                                        variant="standard"
                                        name="startTimeMinute"
                                        value={values.startTimeMinute}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        className="border border-gray-500 rounded w-full h-9"

                                    >
                                        <option value="" > Select....</option>
                                        <option value="00"> 00</option>
                                        <option value="30"> 30</option>

                                    </select>
                                    {touched.startTimeMinute && errors.startTimeMinute && (
                                        <div className="text-red-500 text-xs ">
                                            {errors.startTimeMinute}
                                        </div>
                                    )}

                                </div>
                                <div className="col-span-1">
                                    <select
                                        variant="standard"
                                        name="startTimeMeridiem"
                                        value={values.startTimeMeridiem}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        className="border border-gray-500 rounded w-full h-9"

                                    >
                                        <option value="" > Select....</option>
                                        <option value="AM"> AM</option>
                                        <option value="PM"> PM</option>

                                    </select>
                                    {touched.startTimeMeridiem && errors.startTimeMeridiem && (
                                        <div className="text-red-500 text-xs ">
                                            {errors.startTimeMeridiem}
                                        </div>
                                    )}

                                </div>
                            </div>
                            <p>End Time</p>
                            <div className="grid grid-cols-3 mt-3 gap-3">
                                <div className="col-span-1">
                                    <select
                                        variant="standard"
                                        name="endTimeHour"
                                        value={values.endTimeHour}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        className="border border-gray-500 rounded w-full h-9"

                                    >

                                        <option value="" > Select....</option>
                                        <option value="1" > 1</option>
                                        <option value="2" > 2</option>
                                        <option value="3" > 3</option>
                                        <option value="4" > 4</option>
                                        <option value="5" > 5</option>
                                        <option value="6" > 6</option>
                                        <option value="7" > 7</option>
                                        <option value="8" > 8</option>
                                        <option value="9" > 9</option>
                                        <option value="10"> 10</option>
                                        <option value="11"> 11</option>
                                        <option value="12"> 12</option>
                                    </select>
                                    {touched.endTimeHour && errors.endTimeHour && (
                                        <div className="text-red-500 text-xs ">
                                            {errors.endTimeHour}
                                        </div>
                                    )}

                                </div>
                                <div className="col-span-1">
                                    <select
                                        variant="standard"
                                        name="endTimeMinute"
                                        value={values.endTimeMinute}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        className="border border-gray-500 rounded w-full h-9"

                                    >
                                        <option value="" > Select....</option>
                                        <option value="00"> 00</option>
                                        <option value="30"> 30</option>

                                    </select>
                                    {touched.endTimeMinute && errors.endTimeMinute && (
                                        <div className="text-red-500 text-xs ">
                                            {errors.endTimeMinute}
                                        </div>
                                    )}

                                </div>
                                <div className="col-span-1">
                                    <select
                                        variant="standard"
                                        name="endTimeMeridiem"
                                        onBlur={handleBlur}
                                        value={values.endTimeMeridiem}

                                        onChange={handleChange}
                                        className="border border-gray-500 rounded w-full h-9"

                                    >
                                        <option value="" > Select....</option>
                                        <option value="AM"> AM</option>
                                        <option value="PM"> PM</option>

                                    </select>
                                    {touched.endTimeMeridiem && errors.endTimeMeridiem && (
                                        <div className="text-red-500 text-xs ">
                                            {errors.endTimeMeridiem}
                                        </div>
                                    )}

                                </div>
                            </div>
                            <div className="my-3 flex justify-end">
                                <Button type="submit">Create</Button>
                            </div>
                        </form>
                    </CardBody>

                </Card>

            </Dialog>
        </>
    );
}