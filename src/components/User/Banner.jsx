import { Carousel, Input } from "@material-tailwind/react";
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Button,
  } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
 
function Banner() {
    const navigate = useNavigate()
    const handleLogout = async () => {
        localStorage.removeItem("currentUser")
    
        navigate('/login')
      }
  return (
    <>
    
    <figure className="relative h-[400px] w-full">
        <img
          className="h-full w-full object-cover object-center"
          src="https://www.oyorooms.com/travel-guide/travel-guide/wp-content/uploads/sites/7/2021/11/OYO-Website-CategoryHomePage_Adventure-1350x400px.jpg"
          alt="nature image"
        />
        <figcaption className="absolute bottom-24 left-[450px] flex w-3/6 -translate-x-2/4 justify-center  bg-transparent py-4 px-6 shadow-lg shadow-black/5 saturate-200 ">
          <div className="flex flex-col">
            <div className="pb-8 w-2/3 self-center">
              <Typography
                variant="h1"
                color="blue-gray"
                className="font-semibold"
              >
                
              </Typography>
            </div>
          
          </div>
        </figcaption>
      </figure>
      <div className="flex flex-col">
    <div className="mx-10 my-8 self-center">
        <Typography variant="h2" color="blue-gray" className="mb-2">
          Top Activities
        </Typography>
      </div>

       <div className="grid grid-cols-1 mx-10 md:grid-cols-3 mt-6 md:mx-40">
       <Card className=" w-80 md:h-96">
      <CardHeader color="blue-gray" className="relative h-48">
        <img
          src="https://wallpapercave.com/wp/wp7115478.jpg"
          alt="card-image"
        />
      </CardHeader>
      <CardBody>

        <Typography variant="h5" color="blue-gray" className="mb-2">
          Kayaking
        </Typography>
        <Typography>
          The place is close to Barceloneta Beach and bus stop just 2 min by
          walk and near to &quot;Naviglio&quot;
        </Typography>
      </CardBody>
      <CardFooter className="pt-0">
        <Button>Read More</Button>
      </CardFooter>
    </Card>

    
        <Card className=" w-80 md:h-96">
      <CardHeader color="blue-gray" className="relative h-48">
        <img
          src="https://wallpaperteg.com/wp-content/uploads/2021/06/Surfing-Wallpaper.jpg"
          alt="card-image"
        />
      </CardHeader>
      <CardBody>

        <Typography variant="h5" color="blue-gray" className="mb-2">
          Surfing
        </Typography>
        <Typography>
        The place is close to Barceloneta Beach and bus stop just 2 min by
          walk and near to &quot;Naviglio&quot;
        </Typography>
      </CardBody>
      <CardFooter className="pt-0">
        <Button>Read More</Button>
      </CardFooter>
    </Card>

        <Card className=" w-80 md:h-96">
      <CardHeader color="blue-gray" className="relative h-48">
        <img
        className="w-full"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2DnIKgc8caflwGKkhG7Ezj9G3eVbHF8CSSA&usqp=CAU"
          alt="card-image"
        />
      </CardHeader>
      <CardBody>

        <Typography variant="h5" color="blue-gray" className="mb-2">
          Trekking
        </Typography>
        <Typography>
        The place is close to Barceloneta Beach and bus stop just 2 min by
          walk and near to &quot;Naviglio&quot;
        </Typography>
      </CardBody>
      <CardFooter className="pt-0">
        <Button onClick={handleLogout}>Read More</Button>
      </CardFooter>
    </Card>
       </div>
       </div>

    </>
  );
}
export default Banner