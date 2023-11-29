import { ArrowLeftIcon, ArrowRightIcon, BookmarkIcon, MagnifyingGlassIcon, MapPinIcon } from '@heroicons/react/24/solid'
import { Button, Card, CardBody, CardFooter, Input, Radio, Spinner, Typography } from '@material-tailwind/react'
import { useQuery } from '@tanstack/react-query'
import React, { useEffect, useState } from 'react'
import userRequest from '../../utils/userRequest'
import { useNavigate } from 'react-router-dom'

function Adventures() {
    const navigate = useNavigate()
    // const [filter, setFilter] = useState('')
    // const [search, setSearch] = useState('')
    const [page, setPage] = useState(1)
    // const [debouncedSearch, setDebouncedSearch] = useState('')
    // useEffect(() => {
    //     const timeoutId = setTimeout(() => {
    //         setDebouncedSearch(search);
    //     }, 1000);

    //     return () => clearTimeout(timeoutId);
    // }, [search]);

    const { isLoading, error, data } = useQuery({
        queryKey: ['adventureFilter', { page: page}],
        queryFn: () => userRequest.get('/adventureFilter', { params: { page} }).then((res) => res.data)
    })
    console.log(data, 'adventure data is here');

    // const handleTabChange = (tabValue) => {
    //     setFilter(tabValue)
    // }

    // const handleSearchChange = (event) => {
    //     setSearch(event.target.value)
    // }

    const handlePageChange = (newPage) => {
        const totalPages = Math.ceil(data.count / data.pageSize);
        if (newPage < 1 || newPage > totalPages) {
            return;
        }
        setPage(newPage);
    };


    if (isLoading) {
        return <div className="h-screen flex justify-center items-center"><Spinner color="blue" className="h-10 w-10 " /></div>
    }
    if (error) {
        return <h1>Something went wrong</h1>
    }


    

    return (
        <div className="container mx-auto">
            <div className="h-16 flex items-center justify-around ">
                <div>
                    <h1 className="text-black font-serif text-2xl">
                        results
                    </h1>
                </div>
                <div className="w-96">
                    <Input
                        // label="Search"
                        // value={search}
                        // onChange={handleSearchChange}
                        variant="standard"
                        icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                    />
                </div>
            </div>
            <div className="grid grid-cols-[20rem,1fr] h-screen m-3">

                <div>
                    <Card className="h-auto m-3 bg-blue-gray-50">
                        <Radio

                            name="rating"
                            label="Trekking"
                        />
                        <Radio
                            name="rating"
                            label="Hiking"
                        />
                    </Card>

                        <Card className="h-auto m-3 bg-blue-gray-50" >
                    {data.data.map((loc, ind) => (
                            <Radio key={ind}
                                // value={filter}
                                // onChange={handleTabChange}
                                name="rating"
                                label={loc.location}

                            />

                            ))}
                        </Card>

                </div>


                <div className="max-h-screen overflow-y-scroll no-scrollbar">
                    <Card className=" h-auto">
                        {data.data.map((adventure) => (
                                <CardBody className="h-40 m-3 py-2 bg-blue-gray-50" key={adventure._id}>


                                    <div className="flex justify-between" >
                                        <img
                                            src={adventure.category.image}
                                            alt=""
                                            className="rounded-lg lg:w-32 lg:h-32 w-36 h-36 m-2"
                                        />
                                        <div className="ps-8 h-full">
                                            <Typography onClick={() => navigate('/single', { state: { _id: adventure._id } })}
                                                variant="h4"
                                                color="blue-gray"
                                                size="xl"
                                                className="pt-3  font-serif"
                                            >{adventure.name}
                                            </Typography>

                                            <Typography
                                                variant="h6"
                                                color="blue-gray"
                                                size="xl"
                                                className="font-serif"
                                            >{adventure.category.categoryName}
                                            </Typography>


                                            <div className='flex flex-row'>


                                                <Typography
                                                    color="blue-gray"
                                                    size="xl"
                                                    className="text-sm font-normal pb-2 flex items-center"
                                                >
                                                    <MapPinIcon className="h-4 w-4" />2H
                                                </Typography>

                                                <Typography
                                                    color="blue-gray"
                                                    size="xl"
                                                    className="text-sm font-normal pb-2 mx-3 flex items-center"
                                                >
                                                    <MapPinIcon className="h-4 w-4" />{adventure.location}
                                                </Typography>

                                            </div>

                                        </div>

                                        <div className="h-full ps-24 flex items-center  border-e-2">
                                        </div>

                                        <div className="w-72 h-full flex flex-col justify-center items-center">

                                            <Button className="flex items-center bg-green-600 gap-1">
                                                <BookmarkIcon className="h-5 text-white" />Save
                                            </Button>

                                            <Typography
                                                variant="h5"
                                                color="blue-gray"
                                                className="font-normal mt-1"
                                            >
                                                INR {adventure.category.entryFee}
                                            </Typography>


                                            <Button onClick={() => {
                                                navigate('/userBooking', { state: { fee: adventure.category.entryFee, _id: adventure._id, categoryName: adventure.category.categoryName } })
                                            }} className="flex items-center bg-green-600 gap-1 my-2">
                                                <BookmarkIcon className="h-5 text-white" />Book Now
                                            </Button>



                                        </div>
                                    </div>


                                </CardBody>
                         
                        )
                        )}

                        <CardFooter className="flex items-center justify-between border-t bg-  p-4">
                            <Typography variant="small" color="blue-gray" className="font-normal">
                            </Typography>
                            <div className="flex items-center gap-2 ">
                                <Button
                                    variant="text"
                                    className="flex items-center gap-2 "
                                    onClick={() => handlePageChange(page - 1)}
                                    disabled={page === 1}
                                >
                                    <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" /> Previous
                                </Button>
                                <Typography color="gray" className="font-normal text-black">
                                    Page <strong className="text-black mx-4">{page}</strong> of{" "}
                                    <strong className="text-black mx-4">{Math.ceil(data.count / data.pageSize)}</strong>
                                </Typography>
                                <Button
                                    variant="text"
                                    className="flex items-center gap-2 "
                                    onClick={() => handlePageChange(page + 1)}
                                    disabled={page === Math.ceil(data.count / data.pageSize)}
                                >
                                    Next
                                    <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
                                </Button>
                            </div>
                        </CardFooter>


                    </Card>
                </div>
            </div>
        </div>
    )
}

export default Adventures