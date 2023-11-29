import { BookmarkIcon, MagnifyingGlassIcon } from '@heroicons/react/24/solid'
import { Button, Card, Input, Radio, Typography } from '@material-tailwind/react'
import React from 'react'

function singleAdventure() {
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
                label="Search"

                variant="standard"
                icon={<MagnifyingGlassIcon className="h-5 w-5" />}
            />
        </div>
    </div>
    <div className="grid grid-cols-[20rem,1fr] h-screen m-3">
    <div className="row flex flex-row justify-center ">
               
               <Badge
             
              overlap="circular"
              placement="bottom-end"
              className="h-8 w-8 mb-5 me-2 hover:bg-white hover:text-[#5d7582] bg-[#5d7582] cursor-pointer"
            >
              <img
                size=""
                src="https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436178.jpg?w=740&t=st=1694511037~exp=1694511637~hmac=7afb019f7b279def27b7c8cff245f9ab0ecc12fadc50d085af0db00d777ee63b"
                alt="tania andrew"
                className="rounded-full mx-8 m-5 lg:w-52 lg:h-52 w-32 h-32"
              />
            </Badge>
            </div>
            <p className="text-3xl font-bold text-blue-gray-500 self-center font-serif mb-1">
             
            </p>
            
            <div className="flex flex-row justify-evenly pt-3">
              <button className="flex flex-row rounded-lg bg-gradient-to-br from-[#FF416C] to-[#FF4B2B] ps-2 px-5 py-1 text-base font-medium text-white transition duration-200 hover:shadow-lg hover:shadow-[#FF416C]/50">
                <WalletIcon className="w-6 me-2" />
                Wallet
              </button>
              <button className="flex flex-row rounded-lg border-2 border-green-500 px-5 py-1 text-base font-medium text-green-500 transition duration-200 hover:bg-green-100 active:bg-green-700/5 dark:border-green-400 dark:bg-green-400/10 dark:text-white dark:hover:bg-green-300/10 dark:active:bg-green-200/10">
                <EnvelopeIcon className="w-6 me-2" />
                Message
              </button>
            </div>
            <div className="self-center pt-6">
              <button
               
                className="flex flex-row rounded-md  bg-gradient-to-br from-[#00C9FF] to-[#92FE9D] px-5 py-2 text-base font-medium text-white transition duration-200 hover:shadow-lg hover:shadow-[#00C9FF]/50"
              >
                <DocumentPlusIcon className="w-6 me-2" />
                Book a Slot
              </button>
            </div>
        <div className="max-h-screen overflow-y-scroll no-scrollbar">
            <Card className=" h-auto ">
            
                        <Card className="h-40 m-3 py-2 bg-blue-gray-50">
                            <div className="flex items-center">
                                <img

                                    alt=""
                                    className="rounded-lg lg:w-32 lg:h-32 w-36 h-36 m-2"
                                />
                                <div className="ps-8 h-full">
                                    <Typography
                                        variant="h4"
                                        color="blue-gray"
                                        size="xl"
                                        className="pt-3  font-serif"
                                    >
                                    </Typography>
                                    <Typography
                                        variant="h6"
                                        color="blue-gray"
                                        size="xl"
                                        className="font-serif"
                                    >Trekking
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
                                            <MapPinIcon className="h-4 w-4" />

                                        </Typography>

                                    </div>

                                    {/* <Typography
                                color="blue-gray"
                                size="xl"
                                className="text-lg font-bold"
                            >
                                <span className="font-semibold text-black">
                                    Specialized in:
                                </span>{" "}
                                Family Buissines
                            </Typography> */}
                                    {/* <Typography
                                color="blue-gray"
                                size="xl"
                                className="text-lg font-bold"
                            >
                                <span className="font-semibold text-black">Email:</span>{" "}

                            </Typography> */}
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
                                        INR 600
                                    </Typography>


                                    <Button className="flex items-center  bg-green-600 gap-1  my-2">
                                        <BookmarkIcon className="h-5 text-white" />Book Now

                                    </Button>


                                    {/* <Button className="flex items-center gap-3 bg-green-600">
                <BookmarkIcon className="h-5 text-white" />
                save
              </Button> */}
                                </div>
                            </div>
                            {/* <CardFooter className="self-center">
                        <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                        ></Typography>
                        <div className="flex items-center gap-2 text-black">
                            <Button
                                variant="text"
                                className="flex items-center gap-2 text-black text-base"

                            >
                                <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" />{" "}
                                Previous
                            </Button>
                            <Typography
                                color="gray"
                                className="font-normal text-black"
                            >

                                <strong className="text-black mx-4 font-serif text-lg">

                                </strong>{" "}
                                of{" "}
                                <strong className="text-black mx-4">

                                </strong>
                            </Typography>
                            <Button
                                variant="text"
                                className="flex items-center gap-2 text-black text-base"


                            >
                                Next
                                <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
                            </Button>
                        </div>
                    </CardFooter> */}
                        </Card>


            </Card>
        </div>
    </div>
</div>
  )
}

export default singleAdventure
