import { Card, Input, Spinner,Badge } from "@material-tailwind/react";
import {
  DocumentPlusIcon,
  EnvelopeIcon,
  DevicePhoneMobileIcon,
  BriefcaseIcon,
  MapPinIcon,
  WalletIcon
} from "@heroicons/react/24/solid";
import { FaStar } from "react-icons/fa";
import { ToastContainer } from "react-toastify";
import { useQuery } from "@tanstack/react-query";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import userRequest from "../../utils/userRequest";
import EditImage from "./EditImage";

function Profile() {
const navigate = useNavigate()
    
    const { isLoading, error, data ,refetch} = useQuery({
        queryKey: ['userprofile'],
        queryFn: ()=>userRequest.get(`/profile`).then((res)=>res.data)
      })
    console.log(data);
    if (isLoading) {
        return <div className="h-screen flex justify-center items-center"><Spinner color="blue" className="h-10 w-10 " /></div>
      }
      if (error) {
        return <h1>Something went wrong</h1>
      }

  return (
    <div className="">
      <ToastContainer />
      <div className="container mx-auto ">
        <div className="grid grid-cols-[26rem,1fr] ">
          <aside className=" rounded  p-4 pb-0 grid grid-rows-[28rem,1fr]">
            <Card className="shadow-2xl mt-14 h-[450px]">
              <div className="row flex flex-row justify-center ">
               
                 <Badge
                content={<EditImage refetch={refetch} />}
                overlap="circular"
                placement="bottom-end"
                className="h-8 w-8 mb-5 me-2 hover:bg-white hover:text-[#5d7582] bg-[#5d7582] cursor-pointer"
              >
                <img
                  size=""
                  src={data.data.image}
                  alt="tania andrew"
                  className="rounded-full mx-8 m-5 lg:w-52 lg:h-52 w-32 h-32"
                />
              </Badge>
              </div>
              <p className="text-3xl font-bold text-blue-gray-500 self-center font-serif mb-1">
               {data.data.name}
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
                <button onClick={()=>navigate('/bookingDetails')}
                 
                  className="flex flex-row rounded-md  bg-gradient-to-br from-[#00C9FF] to-[#92FE9D] px-5 py-2 text-base font-medium text-white transition duration-200 hover:shadow-lg hover:shadow-[#00C9FF]/50"
                >
                  <DocumentPlusIcon className="w-6 me-2" />
                  Booking
                </button>
              </div>
            </Card>
            
          </aside>
          <div className="p-4 pb-0 ps-0 grid grid-rows">
            <Card className=" shadow-2xl mt-14 p-5 h-[450px]">
        
              <div className="mt-9">
                <p className="text-black text-3xl font-semibold">Details</p>
                <div className="m-4 w-3/4 flex flex-row justify-between">
                  <div className="flex flex-col">
                    <p className="flex flex-row">
                      <BriefcaseIcon className="w-8" />
                      <span className="text-xl">Email:</span>
                    </p>
                    <p className="text-xl text-black ps-11">
                      {data.data.email}
                    </p>
                  </div>
                  {/* <div className="flex flex-col">
                    <p className="flex flex-row">
                      <MapPinIcon className="w-8" />
                      <span className="text-xl">Mobile:</span>
                    </p>
                    <p className="text-xl text-black ps-11">{data.data.mobile}</p>
                  </div> */}
                </div>

                <div className="m-4 w-3/4 flex flex-row justify-between">
                  <div className="flex flex-col">
                    <p className="flex flex-row">
                      <BriefcaseIcon className="w-8" />
                      <span className="text-xl">Mobile:</span>
                    </p>
                    <p className="text-xl text-black ps-11">
                      {data.data.mobile}
                    </p>
                  </div>
                  {/* <div className="flex flex-col">
                    <p className="flex flex-row">
                      <MapPinIcon className="w-8" />
                      <span className="text-xl">Mobile:</span>
                    </p>
                    <p className="text-xl text-black ps-11">{data.data.mobile}</p>
                  </div> */}
                </div>
                
              </div>
            </Card>
          </div>
        </div>
      
      </div>
    </div>
  );
}

export default Profile;
