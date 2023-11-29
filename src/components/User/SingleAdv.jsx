import { BookmarkIcon, BriefcaseIcon, DocumentPlusIcon, EnvelopeIcon, MapPinIcon, StarIcon, WalletIcon } from "@heroicons/react/24/solid"
import { Badge, Button, Card, Rating, Spinner, Typography } from "@material-tailwind/react"
import { useQuery } from "@tanstack/react-query"
import { ToastContainer } from "react-toastify"
import userRequest from "../../utils/userRequest"
import { useLocation } from "react-router-dom"


function SingleAdv() {
  const location = useLocation()
  const id = location.state._id
  const { isLoading, error, data } = useQuery({
    queryKey: ['advProfile'],
    queryFn: () => userRequest.get(`/advProfile/${id}`).then((res) => res.data)
  })
  console.log(data, 'adqwetuioo');
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
            {data.data &&


              <Card className="shadow-2xl mt-14 h-[450px]">
                <div className="row flex flex-row justify-center ">

                  <img
                    size=""
                    src={data.data.image}
                    alt="tania andrew"
                    className="rounded-full mx-8 m-5 lg:w-52 lg:h-52 w-32 h-32"
                  />
                  {/* </Badge> */}
                </div>
                <p className="text-3xl font-bold text-blue-gray-500 self-center font-serif mb-1">
                  {data.data.name}
                </p>
                <div className="flex flex-row w-full justify-center">
                <StarIcon color="yellow" className="w-8"/>
                <StarIcon color="yellow" className="w-8"/>
                <StarIcon color="yellow" className="w-8"/>
                <StarIcon color="yellow" className="w-8"/>
                </div>

                <div className="flex flex-row justify-evenly pt-3">
                 
                  <button className="flex flex-row rounded-lg border-2 border-green-500 px-5 py-1 text-base font-medium text-green-500 transition duration-200 hover:bg-green-100 active:bg-green-700/5 dark:border-green-400 dark:bg-green-400/10 dark:text-white dark:hover:bg-green-300/10 dark:active:bg-green-200/10">
                    <EnvelopeIcon className="w-6 me-2" />
                    Message
                  </button>
                </div>
                <p className="text-lg font-normal text-blue-gray-500 self-center font-serif mb-1 mt-2">
                  {data.data.description}
                </p>
             
              </Card>

            }

          </aside>
          <div className="p-4 pb-0 ps-0 grid grid-rows">
            <Card className=" shadow-2xl mt-14 p-5 h-auto">

              <Card className=" h-auto">
                {data.data.category.map((item, index) => (


                  <Card className="h-40 m-3 py-2 bg-blue-gray-50" key={index}>


                    <div className="flex justify-between" >
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
                          {data.data.name}

                        </Typography>



                        <Typography
                          variant="h6"
                          color="blue-gray"
                          size="xl"
                          className="font-serif"
                        >
                          {item.categoryName}
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
                            <MapPinIcon className="h-4 w-4" />{data.data.location}

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
                          INR {item.entryFee}
                        </Typography>


                        <Button className="flex items-center bg-green-600 gap-1 my-2">
                          <BookmarkIcon className="h-5 text-white" />Book Now
                        </Button>



                      </div>
                    </div>


                  </Card>

                ))}


              </Card>
            </Card>
          </div>
        </div>

      </div>
    </div>
  )
}

export default SingleAdv
