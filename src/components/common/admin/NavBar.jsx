import {
  Navbar,
  Typography,
  IconButton,
  Button,
  Input,
} from "@material-tailwind/react";
import { BellIcon, Cog6ToothIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";

 
export function NavbarDark() {

  const navigate = useNavigate()
  const handleLogout = async () => {
    localStorage.removeItem("currentAdmin")
      navigate('/admin/login')
  }
  
  return (
    <Navbar
      variant="gradient"
      color="blue-gray"
      className="mx-auto max-w-full py-2 px-4 lg:px-8 lg:py:4 rounded-none"
    >
      <div className="flex flex-wrap items-center justify-between gap-y-4 text-white">
        <Typography
          as="a"
          href="#"
          variant="h6"
          className="mr-4 ml-2 cursor-pointer py-1.5"
        >
          Material Tailwind
        </Typography>
        <div className="ml-auto flex gap-1 md:mr-4">
        <IconButton variant="text" color="white">
            <BellIcon className="h-4 w-4" />
          </IconButton>
        
            <Button  className="p-2 text-xs bg-gray-700 text-white"  onClick={handleLogout} > Logout
            </Button>
          
         
        </div>
        <div className="relative flex w-full gap-2 md:w-max">
          <Input
            type="search"
            color="white"
            label="Type here..."
            className="pr-20"
            containerProps={{
              className: "min-w-[288px]",
            }}
          />
          <Button
            size="sm"
            color="white"
            className="!absolute right-1 top-1 rounded"
          >
            Search
          </Button>
        </div>
      </div>
    </Navbar>
  );
}