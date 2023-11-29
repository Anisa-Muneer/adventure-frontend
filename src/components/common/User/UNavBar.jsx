import React from "react";
import {
    Navbar,
    MobileNav,
    Typography,
    Button,
    Menu,
    MenuHandler,
    MenuList,
    MenuItem,
    Avatar,
    Card,
    IconButton,
} from "@material-tailwind/react";
import { BsChatLeftFill } from "react-icons/bs";
import {
    UserCircleIcon,
    Square3Stack3DIcon,
    ChevronDownIcon,
    PowerIcon,
    RocketLaunchIcon,
    Bars2Icon,
} from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Logoutdetails } from "../../../Redux/UserSlice";


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
    const { userInfo } = useSelector(state => state.user)
    const id = userInfo.id
    const navigate = useNavigate()
    const handleLogout = () => {
        localStorage.removeItem("currentUser")

        navigate('/login')
    }
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    const closeMenu = () => setIsMenuOpen(false);

    const handleProfile = () => {
        console.log(id);
        navigate('/profile')
    }


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

                        src={userInfo.image}
                    />
                    <Typography className="font-serif" color="black">{userInfo.name}</Typography>

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
                                } if (profile) {
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



function NavListMenu() {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const navigate = useNavigate()

    const renderItems =
        <a href="#">
            <MenuItem>
                <Typography variant="h6" color="blue-gray" className="mb-1" onClick={() => navigate('/adventures')}>
                    Find by Activity
                </Typography>
                <Typography variant="small" color="gray" className="font-normal">

                </Typography>
            </MenuItem>
        </a>


    return (
        <React.Fragment>
            <Menu allowHover open={isMenuOpen} handler={setIsMenuOpen}>
                <MenuHandler>
                    <Typography as="a" href="#" variant="small" className="font-normal">
                        <MenuItem className="hidden items-center gap-2 font-medium text-blue-gray-900 lg:flex lg:rounded-full">
                            <Square3Stack3DIcon className="h-[18px] w-[18px] text-blue-gray-500" />{" "}
                            Activities{" "}
                            <ChevronDownIcon
                                strokeWidth={2}
                                className={`h-3 w-3 transition-transform ${isMenuOpen ? "rotate-180" : ""
                                    }`}
                            />
                        </MenuItem>
                    </Typography>
                </MenuHandler>
                <MenuList className="hidden w-[36rem] grid-cols-7 gap-3 overflow-visible lg:grid">

                    <ul className="col-span-4 flex w-full flex-col gap-1">
                        {renderItems}
                    </ul>
                </MenuList>
            </Menu>
            <MenuItem className="flex items-center gap-2 font-medium text-blue-gray-900 lg:hidden">
                <Square3Stack3DIcon className="h-[18px] w-[18px] text-blue-gray-500" />{" "}
                Activities{" "}
            </MenuItem>
            <ul className="ml-6 flex w-full flex-col gap-1 lg:hidden">
                {renderItems}
            </ul>
        </React.Fragment>
    );
}

// nav list component
const navListItems = [
    //   {
    //     label: "Account",
    //     icon: UserCircleIcon,
    //   },
    //   {
    //     label: "Blocks",
    //     icon: CubeTransparentIcon,
    //   },
    //   {
    //     label: "Docs",
    //     icon: CodeBracketSquareIcon,
    //   },
];

function NavList() {

    return (
        <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center">
            <NavListMenu />
            {navListItems.map(({ label, icon }, key) => (
                <Typography
                    key={label}
                    as="a"
                    href="#"
                    variant="small"
                    color="gray"
                    className="font-medium text-blue-gray-500"
                >
                    <MenuItem className="flex items-center gap-2 lg:rounded-full">
                        {React.createElement(icon, { className: "h-[18px] w-[18px]" })}{" "}
                        <span className="text-gray-900"> {label}</span>
                    </MenuItem>
                </Typography>
            ))}
        </ul>
    );
}

function UNavBar() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const handleLogout = async () => {
        localStorage.removeItem("currentUser")
        dispatch(Logoutdetails({
            userInfo: {}
        }))
        navigate('/login')
    }
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
            <Navbar className="mx-auto max-w-full py-2 px-4 lg:px-8 lg:py-4 rounded-none" >
                <div className="relative mx-auto flex items-center justify-between text-blue-gray-900">
                    <Typography
                        as="a"
                        href="#"
                        className="mr-4 ml-2 cursor-pointer py-1.5 font-medium" onClick={handleLogout}
                    >
                        Adventure.
                    </Typography>
                    <div className="hidden lg:block">
                        <NavList />
                    </div>

                    <IconButton
                        size="sm"
                        color="blue-gray"
                        variant="text"
                        onClick={toggleIsNavOpen}
                        className="ml-auto mr-2 lg:hidden"
                    >
                        <Bars2Icon className="h-6 w-6" />
                    </IconButton>
                    <div className="text-gray-600">

                        <BsChatLeftFill />
                    </div>

                    <ProfileMenu />
                </div>
                <MobileNav open={isNavOpen} className="overflow-scroll">
                    <NavList />
                </MobileNav>
            </Navbar>
        </div>

        



    );
}

export default UNavBar;

