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
          <ImageList sx={{ width: 1180, height: 520 }} cols={3} row>
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

                  <Carousel className="rounded-xl" >
                    {item.image.map((img, index) => (

                      < img
                        key={index}
                        src={img}


                        style={{
                          width: '100%', height: 390, objectFit: 'cover'
                        }}
                      />

                    ))}
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
