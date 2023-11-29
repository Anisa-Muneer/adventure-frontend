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
   
  export function AdminSidebar() {
    const navigate = useNavigate()
    return (
      <Card className="h-[calc(100vh-2rem)] w-full max-w-[20rem] p-4 shadow-xl bg-blue-gray-400 shadow-blue-gray-900/5 rounded-none">
        <div className="mb-2 p-4">
          <Typography variant="h5" color="blue-gray">
            Sidebar
          </Typography>
        </div>
        <List>
          <ListItem>
            <ListItemPrefix>
              <PresentationChartBarIcon className="h-5 w-5" />
            </ListItemPrefix>
            Dashboard
          </ListItem>
          <ListItem onClick={()=>navigate('/admin/users')}>
            <ListItemPrefix>
              <ShoppingBagIcon className="h-5 w-5" />
            </ListItemPrefix>
            User List
          </ListItem>
          <ListItem onClick={()=>navigate('/admin/adminCategory')}>
            <ListItemPrefix >
              <InboxIcon className="h-5 w-5" />
            </ListItemPrefix>
            Category
            
          </ListItem>
          <ListItem onClick={()=>navigate('/admin/adventures')}>
            <ListItemPrefix >
              <UserCircleIcon className="h-5 w-5" />
            </ListItemPrefix>
            Adventure List
          </ListItem>
          <ListItem onClick={()=>navigate('/admin/notification')}>
            <ListItemPrefix>
              <Cog6ToothIcon className="h-5 w-5" />
            </ListItemPrefix>
            Notification
          </ListItem>
          <ListItem>
            <ListItemPrefix>
              <PowerIcon className="h-5 w-5" />
            </ListItemPrefix>
            Log Out
          </ListItem>
        </List>
      </Card>
    );
  }