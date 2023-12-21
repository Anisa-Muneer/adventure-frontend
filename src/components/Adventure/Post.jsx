import React from "react";

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
  const itemData = [
    {
      img: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e",
      title: "Breakfast",
      author: "@bkristastucchio",
      rows: 2,
      cols: 3,
      featured: true,
    },
    {
      img: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d",
      title: "Burger",
      author: "@rollelflex_graphy726",
    },
    {
      img: "https://images.unsplash.com/photo-1522770179533-24471fcdba45",
      title: "Camera",
      author: "@helloimnik",
    },
    {
      img: "https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c",
      title: "Coffee",
      author: "@nolanissac",
      cols: 2,
    },
    {
      img: "https://images.unsplash.com/photo-1533827432537-70133748f5c8",
      title: "Hats",
      author: "@hjrc33",
      cols: 2,
    },
    {
      img: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62",
      title: "Honey",
      author: "@arwinneil",
      rows: 2,
      cols: 2,
      featured: true,
    },
    {
      img: "https://images.unsplash.com/photo-1516802273409-68526ee1bdd6",
      title: "Basketball",
      author: "@tjdragotta",
    },
    {
      img: "https://images.unsplash.com/photo-1518756131217-31eb79b20e8f",
      title: "Fern",
      author: "@katie_wasserman",
    },
    {
      img: "https://images.unsplash.com/photo-1597645587822-e99fa5d45d25",
      title: "Mushrooms",
      author: "@silverdalex",
      rows: 2,
      cols: 2,
    },
    {
      img: "https://images.unsplash.com/photo-1567306301408-9b74779a11af",
      title: "Tomato basil",
      author: "@shelleypauls",
    },
    {
      img: "https://images.unsplash.com/photo-1471357674240-e1a485acb3e1",
      title: "Sea star",
      author: "@peterlaster",
    },
    {
      img: "https://images.unsplash.com/photo-1589118949245-7d38baf380d6",
      title: "Bike",
      author: "@southside_customs",
      cols: 2,
    },
  ];

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
          <ImageList sx={{ width: 1180, height: 1180 }} cols={3} row>
            {
              data.data.map((item, ind) => (
                <ImageListItem key={ind}>
                  <img
                    srcSet={`${item.image}?w=248&fit=crop&auto=format&dpr=2 2x`}
                    src={`${item.image}?w=248&fit=crop&auto=format`}
                    alt=''
                    loading="lazy"
                    style={{
                      width: '100%', height: 250, objectFit: 'cover'
                    }}
                  />
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
