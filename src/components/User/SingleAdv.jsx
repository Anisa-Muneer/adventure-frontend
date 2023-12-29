import { EnvelopeIcon, StarIcon, } from "@heroicons/react/24/solid"
import { Card, Spinner, Typography } from "@material-tailwind/react"
import { useQuery } from "@tanstack/react-query"
import { ToastContainer } from "react-toastify"
import userRequest from "../../utils/userRequest"
import { useLocation } from "react-router-dom"
import Reviews from "./Reviews"

import { ThemeProvider, createTheme } from '@mui/material/styles';
import { IconButton, ImageList, ImageListItem, ImageListItemBar, ListSubheader } from '@mui/material';
import { InfoIcon } from '@chakra-ui/icons';
import { Button } from '@material-tailwind/react';


function SingleAdv() {



  const theme = createTheme({
    typography: {
      fontFamily: 'Arial, sans-serif', // Change this to the desired font family
    },
  });


  const location = useLocation()
  const id = location.state._id

  const { isLoading: profileIsLoading, error: profileError, data: profileData } = useQuery({
    queryKey: ['advProfile'],
    queryFn: () => userRequest.get(`/advProfile/${id}`).then((res) => res.data)
  })

  const { isLoading: postIsLoading, error: postError, data: postData } = useQuery({
    queryKey: ['userPosts'],
    queryFn: () => userRequest.get(`/adventurePost/${id}`).then((res) => res.data)
  })

  if (profileIsLoading) {
    return <div className="h-screen flex justify-center items-center"><Spinner color="blue" className="h-10 w-10 " /></div>
  }
  if (profileError) {
    return <h1>Something went wrong</h1>
  }

  console.log(postData, 'adqwetuioo');
  if (postIsLoading) {
    return <div className="h-screen flex justify-center items-center"><Spinner color="blue" className="h-10 w-10 " /></div>
  }
  if (postError) {
    return <h1>Something went wrong</h1>
  }

  return (
    <div className="">
      <ToastContainer />
      <div className="container mx-auto ">
        <div className="grid grid-cols-[26rem,1fr] ">
          <aside className=" rounded  p-4 pb-0 grid grid-rows-[28rem,1fr]">
            {profileData.data &&


              <Card className="shadow-2xl mt-14 h-[450px]">
                <div className="row flex flex-row justify-center ">

                  <img
                    size=""
                    src={profileData.data.image}
                    alt="tania andrew"
                    className="rounded-full mx-8 m-5 lg:w-52 lg:h-52 w-32 h-32"
                  />
                  {/* </Badge> */}
                </div>
                <p className="text-3xl font-bold text-blue-gray-500 self-center font-serif mb-1">
                  {profileData.data.name}
                </p>
                <div className="flex flex-row w-full justify-center">
                  <StarIcon color="yellow" className="w-8" />
                  <StarIcon color="yellow" className="w-8" />
                  <StarIcon color="yellow" className="w-8" />
                  <StarIcon color="yellow" className="w-8" />
                </div>

                <div className="flex flex-row justify-evenly pt-3">

                  <button className="flex flex-row rounded-lg border-2 border-green-500 px-5 py-1 text-base font-medium text-green-500 transition duration-200 hover:bg-green-100 active:bg-green-700/5 dark:border-green-400 dark:bg-green-400/10 dark:text-white dark:hover:bg-green-300/10 dark:active:bg-green-200/10">
                    <EnvelopeIcon className="w-6 me-2" />
                    Message
                  </button>
                </div>
                <p className="text-lg font-normal text-blue-gray-500 self-center font-serif mb-1 mt-2">
                  {profileData.data.description}
                </p>


              </Card>

            }

          </aside>
          <div className="shadow-2xl mt-14 h-[470px]">
            <div className="flex justify-end mx-20">
              <Typography
                variant="h4"

              >
                Posts
              </Typography>
            </div>

            <div className="flex justify-center">
              <ThemeProvider theme={theme}>
                <ImageList sx={{ width: 800, height: 390 }}>
                  {/* <ImageListItem key="Subheader" cols={3}>
        <ListSubheader component="div">December</ListSubheader>
      </ImageListItem> */}
                  {postData.data.map((item, indx) => (
                    <ImageListItem key={indx}>
                      <img
                        // srcSet={`${item.image} ? w = 248 & fit=crop & auto=format & dpr=2 2x`}
                        // src={`${item.image} ? w = 248 & fit=crop & auto=format`}
                        src={item.image}
                        alt=''
                        loading="lazy"
                      />
                      <ImageListItemBar
                        title={item.category}
                        subtitle=''
                        actionIcon={
                          < IconButton
                            sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                            aria-label={`info about ${item.category}`}
                          >
                          </IconButton>
                        }
                      />
                    </ImageListItem>
                  ))}
                </ImageList>
              </ThemeProvider>
            </div>

          </div>
        </div>
        <div className="pt-10">

          <Reviews id={profileData.data._id} />
        </div>

      </div>
    </div>
  )
}

export default SingleAdv
