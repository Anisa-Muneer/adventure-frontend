import {
    Card,
    Typography,
    List,
    ListItem,
    ListItemPrefix,
    ListItemSuffix,
    Chip,
  } from "@material-tailwind/react";
  import {
    PresentationChartBarIcon,
    ShoppingBagIcon,
    UserCircleIcon,
    Cog6ToothIcon,
    InboxIcon,
    PowerIcon,
  } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";
   
  export function AdventureSidebar() {
    const navigate = useNavigate()
    return (
      <Card className="h-[calc(100vh-2rem)] w-full max-w-[20rem] p-4 shadow-xl bg-[#13453a] shadow-blue-green-900/5 rounded-none">
        {/* <div className="mb-2 p-4">
          <Typography variant="h5" color="black">
            Sidebar
          </Typography>
        </div> */}
        <List className="text-black">
          <ListItem>
            <ListItemPrefix>
              <PresentationChartBarIcon className="h-5 w-5" />
            </ListItemPrefix>
            Dashboard
          </ListItem>
          <ListItem onClick={()=>navigate('/adventure/slot')}>
            <ListItemPrefix>
              <ShoppingBagIcon className="h-5 w-5" />
            </ListItemPrefix>
            Slot
          </ListItem>
          <ListItem onClick={()=>navigate('/adventure/booking')}>
            <ListItemPrefix>
              <InboxIcon className="h-5 w-5" />
            </ListItemPrefix>
            Booking
            <ListItemSuffix>

            </ListItemSuffix>
          </ListItem>
          <ListItem onClick={()=>navigate('/adventure/category')}>
            <ListItemPrefix >
              <UserCircleIcon className="h-5 w-5" />
            </ListItemPrefix>
            Category
          </ListItem>
          <ListItem  onClick={()=>navigate('/adventure/chats')}>
            <ListItemPrefix>
              <Cog6ToothIcon className="h-5 w-5" />
            </ListItemPrefix>
            Chats
          </ListItem>
          <ListItem onClick={()=>navigate('/adventure/posts')}>
            <ListItemPrefix>
              <PowerIcon className="h-5 w-5" />
            </ListItemPrefix>
            Posts
          </ListItem>
        </List>
      </Card>
    );
  }