import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
  Spinner,
  Badge
} from "@material-tailwind/react";
import {
  TagIcon,
  BriefcaseIcon,
  MapPinIcon,
  CheckBadgeIcon
} from "@heroicons/react/24/solid";
import React from 'react'
import { useQuery } from "@tanstack/react-query";
import adventureRequest from "../../utils/adventureRequest";
import { useLocation } from "react-router-dom";
import EditProfile from "./EditProfile";
import EditImage from "./EditImage";


function AdventureProfile() {
  const location = useLocation()
  const id = location.state.id
  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ['adventure'],
    queryFn: () => adventureRequest.get(`/profile/${id}`).then((res) => res.data)
  })
  console.log(data,'map is not working onn profile');
  if (isLoading) {
    return <div className="h-screen flex justify-center items-center"><Spinner color="blue" className="h-10 w-10 " /></div>
  }
  if (error) {
    return <h1>Something went wrong</h1>
  }

  
  
  return (
    <>
      <div className="container mx-auto">


        {/* <div className="pt-0 rounded-none mt-6 flex justify-end mx-14">
        <Button className="bg-[#588157]">Edit Profile</Button>
    </div> */}

        <div className="flex justify-center h-52">
          <Card className="mt-6 w-11/12  flex bg-[#588157] text-[#344E41]">
            <CardBody className="flex-1 flex">
              <div className="w-2/12">
            
                <div className="row flex flex-row justify-center bg-white w-36 h-36  rounded-full overflow-hidden">
                <Badge
                
                content={<EditImage refetch={refetch} />}
                overlap="circular"
                placement="bottom-end"
                className="h-8 w-8 mb-5 me-2 hover:bg-white hover:text-[#5d7582] bg-[#5d7582] cursor-pointer"
              >
                  
                  <img
                    src={data.data.image}
                    alt="User Profile"
                    className="w-full h-full object-cover "
                  />
                  </Badge>
                </div>
              </div>
              <div className="w-2/3 p-1 ">
                {/* Right Side */}
                <div className="flex flex-row">
                  <Typography variant="h5" color="blue-gray" className=" text-2xl">
                    {data.data.name}
                  </Typography>
                  {data.data.verified && (
                    <CheckBadgeIcon className="text-white h-5 w-5 m-1 rounded-full " />
                  )}

                </div>
                <Typography variant="" color="blue-gray" className="">+91
                  {data.data.mobile}
                </Typography>
                <Typography variant="" color="blue-gray" className="mb-1">
                  {data.data.email}
                </Typography>
                <Typography>
                  {data.data.description}
                </Typography>
              </div>
              <div>
                <EditProfile adventure={data.data} />
                {!data.data.requested &&(<p className="text-red-800">Complete your profile *</p> ) }

                {data.data.requested && !data.data.verified && (<p className="text-red-800">Verification requested *</p>)}

                 
                
              </div>

              {/* {data.data.requested && !data.data.verified && (
      <h1 className="text-green-600 font-serif">Verification Requested</h1>
    )}
    {!data.data.requested && !data.data.verified && (
      <Form/>
    )} */}

            </CardBody>

          </Card>
        </div>


        <div className="flex justify-center h-52">
          <Card className="mt-6 w-11/12 h-96 flex bg-[#588157] text-[#344E41]">
            <p className="text-black text-3xl font-semibold mt-3 mx-5">Details</p>

            <div className="m-4 w-3/4 flex flex-row justify-between">
              <div className="flex flex-col w-1/3">
                <p className="flex flex-row">
                  <TagIcon className="w-8" />
                  <span className="text-xl">Category:</span>
                </p>
                {
                  data.data.category.map((item, index) => {
                    return (
                      <p key={index} className="text-xl text-black ps-11">{item.categoryName}</p>
                    )
                  })
                }
                

              </div>
              <div className="flex flex-col w-1/3">
                <p className="flex flex-row">
                  <MapPinIcon className="w-8" />
                  <span className="text-xl">Location:</span>
                </p>
                <p className="text-xl text-black ps-11">{data.data.location}</p>
              </div>
            </div>

            <div className="m-4 w-3/4 flex flex-row justify-between">
              <div className="flex flex-col w-1/3">
                <p className="flex flex-row">
                  <TagIcon className="w-8" />
                  <span className="text-xl">PAN:</span>
                </p>
                <p className="text-xl text-black ps-11">{data.data.pan}</p>
              </div>
              <div className="flex flex-col w-1/3">
                <p className="flex flex-row">
                  <MapPinIcon className="w-8" />
                  <span className="text-xl">GST:</span>
                </p>
                <p className="text-xl text-black ps-11">{data.data.gst}</p>
              </div>
            </div>





          </Card>
        </div>


      </div>
    </>
  )
}

export default AdventureProfile
