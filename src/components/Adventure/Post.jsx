import React from "react";
import { Carousel } from "@material-tailwind/react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import {
  IconButton,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  ListSubheader,
} from "@mui/material";
import { InfoIcon } from "@chakra-ui/icons";
import { Button, Spinner } from "@material-tailwind/react";
import AddPosts from "./AddPosts";
import { useQuery } from "@tanstack/react-query";
import adventureRequest from "../../utils/adventureRequest";
import DeletePost from "./DeletePost";

function Post() {
  const { isLoading, error, data } = useQuery({
    queryKey: ["Posts"],
    queryFn: () => adventureRequest.get('/getPosts').then((res) => res.data)
  })
  console.log(data, 'post data is here');
  if (isLoading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <Spinner color="blue" className="h-10 w-10 " />
      </div>
    );
  }
  if (error) {
    return <h1>Something went wrong</h1>;
  }

  const theme = createTheme({
    typography: {
      fontFamily: "Arial, sans-serif", // Change this to the desired font family
    },
  });

  return (
    <div className="p-10 justify-center items-center">
      <ThemeProvider theme={theme}>
        <AddPosts />

        <div className="justify-center align items-center mt-2 overflow-y-scroll h-[40rem]">
          <ImageList sx={{ width: 1180, height: 550 }} cols={3} row>
            {
              data.data.map((item, ind) => (
                <ImageListItem key={ind}>
                  {/* <img
                    src={item.image}
                    alt=''
                    loading="lazy"
                    style={{
                      width: '100%', height: 390, objectFit: 'cover'
                    }}
                  /> */}
                  <Carousel className="rounded-xl">
                    <img
                      src="https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2560&q=80"
                      alt="image 1"
                      className="h-full w-full object-cover"
                    />
                    <img
                      src="https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80"
                      alt="image 2"
                      className="h-full w-full object-cover"
                    />
                    <img
                      src="https://images.unsplash.com/photo-1518623489648-a173ef7824f3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2762&q=80"
                      alt="image 3"
                      className="h-full w-full object-cover"
                    />
                  </Carousel>
                  < ImageListItemBar
                    title={item.category}
                    subtitle=''
                    actionIcon={
                      < IconButton
                        sx={{ color: "rgba(255, 255, 255, 0.54)" }}
                        aria-label={`info about ${item.category}`}
                      >
                        <DeletePost id={item._id} />
                      </IconButton>
                    }
                  />
                </ImageListItem>
              ))
            }
          </ImageList>
        </div>
      </ThemeProvider >
    </div >
  );
}

export default Post;
