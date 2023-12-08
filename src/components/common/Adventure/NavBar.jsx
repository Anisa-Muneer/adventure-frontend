import React from "react";
import {
  //   Navbar,
  MobileNav,
  Typography,
  Button,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
  IconButton,
} from "@material-tailwind/react";
import {
  UserCircleIcon,
  ChevronDownIcon,
  PowerIcon,
  Bars2Icon,
} from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Logoutdetails } from "../../../Redux/AdventureSlice";

// profile menu component
const profileMenuItems = [
  {
    label: "My Profile",
    icon: UserCircleIcon,
  },
  {
    label: "Sign Out",
    icon: PowerIcon,
  },
];

function ProfileMenu() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { adventureInfo } = useSelector(state => state.adventure)
  console.log(adventureInfo,'adventureInfo is here');
  const id = adventureInfo.id
  const handleLogout = () => {
    localStorage.removeItem("currentAdventure")
    dispatch(Logoutdetails({
      adventureInfo: {}
    }))
    navigate('/adventure/login')
  }

  const handleProfile = () => {
    navigate('/adventure/profile', { state: { id } })
  }

  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
      <MenuHandler>
        <Button
          variant="text"
          color="blue-gray"
          className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto"
        >
          <Avatar
            variant="circular"
            size="sm"
            alt="tania andrew"
            className="border border-gray-900 p-0.5"
            src={adventureInfo.image}
          />
          <Typography color="black">{adventureInfo.name}</Typography>

          <ChevronDownIcon
            strokeWidth={2.5}
            className={`h-3 w-3 transition-transform ${isMenuOpen ? "rotate-180" : ""
              }`}
          />
        </Button>
      </MenuHandler>
      <MenuList className="p-1">
        {profileMenuItems.map(({ label, icon }, key) => {
          const logout = label === 'Sign Out'
          const profile = label === 'My Profile'
          const isLastItem = key === profileMenuItems.length - 1;
          return (
            <MenuItem
              key={label}
              onClick={() => {
                closeMenu
                if (logout) {
                  handleLogout();
                }
                if (profile) {
                  handleProfile()
                }
              }}
              className={`flex items-center gap-2 rounded ${isLastItem
                  ? "hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10"
                  : ""
                }`}
            >
              {React.createElement(icon, {
                className: `h-4 w-4 ${isLastItem ? "text-red-500" : ""}`,
                strokeWidth: 2,
              })}
              <Typography
                as="span"
                variant="small"
                className="font-normal"
                color={isLastItem ? "red" : "inherit"}
              >
                {label}
              </Typography>
            </MenuItem>
          );
        })}
      </MenuList>
    </Menu>
  );
}






function AdventureNavbar() {

  const [isNavOpen, setIsNavOpen] = React.useState(false);

  const toggleIsNavOpen = () => setIsNavOpen((cur) => !cur);

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setIsNavOpen(false),
    );
  }, []);

  return (
    <div>


      <navbar className="mx-auto max-w-full bg-[#13453a]  rounded-none border-none " >
        <div className="relative mx-auto px-5 flex items-center h-[5rem] justify-between  bg-[#13453a]  text-black ">
          <Typography
            as="a"
            href="#"
            className="mr-4 ml-2 cursor-pointer py-1.5 font-medium"
          >
            Adventure.
          </Typography>

          <IconButton
            size="sm"
            color="blue-gray"
            variant="text"
            onClick={toggleIsNavOpen}
            className="ml-auto mr-2 lg:hidden"
          >
            <Bars2Icon className="h-6 w-6" />
          </IconButton>

          {/* <Button size="sm" variant="text">
          <span>Log In</span>
        </Button> */}
          <ProfileMenu />
        </div>
        <MobileNav open={isNavOpen} className="overflow-scroll">

        </MobileNav>
      </navbar>
    </div>



  );
}

export default AdventureNavbar;

