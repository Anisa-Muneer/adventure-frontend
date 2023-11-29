import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { PencilIcon, UserPlusIcon , NoSymbolIcon} from "@heroicons/react/24/solid";
import {  useQuery, useQueryClient} from '@tanstack/react-query'
import img from '../../assets/images/dp.png'
import {
  Card,
  CardHeader,
  Input,
  Typography,
  Button,
  CardBody,
  Chip,
  CardFooter,
  Tabs,
  TabsHeader,
  Tab,
  Avatar,
  IconButton,
  Tooltip,
  Spinner,
} from "@material-tailwind/react";
import adminRequest from "../../utils/adminRequest";
import { manageUsers } from "../../api/adminApi";
 
 
const TABLE_HEAD = ["Name", "Status", "Date", "Actions"];

export function Users() {
  
  const queryClient = useQueryClient()
  const {isLoading, error, data} = useQuery({
    queryKey : ['users'],
    queryFn : ()=>adminRequest.get('/users').then((res)=>res.data)
  })
  

  if(isLoading){
    return <div className="h-screen flex justify-center items-center"><Spinner color="blue" className="h-10 w-10 " /></div>
  }
  
  if(error){
    return <h1>Something went wrong</h1>
  }

  const handleAction = async(userId)=>{
    await manageUsers(userId)
    queryClient.invalidateQueries("users")

  }
  

  return (
    <Card className="h-full w-full">
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="mb-8 flex items-center justify-between gap-8">
          <div>
            <Typography variant="h5" color="blue-gray">
              USERS
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
              See information about all users
            </Typography>
          </div>
          {/* <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
            <Button variant="outlined" size="sm">
              view all
            </Button>
            <Button className="flex items-center gap-3" size="sm">
              <UserPlusIcon strokeWidth={2} className="h-4 w-4" /> Add member
            </Button>
          </div> */}
        </div>
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <Tabs value="all" className="w-full md:w-max">
            <TabsHeader>
               <Tab value="">All</Tab>
               <Tab value="active" >Active</Tab>
               <Tab value="pending" >Pending</Tab>
               <Tab value="blocked" >Blocked</Tab>
     
            </TabsHeader>
          </Tabs>
          <div className="w-full md:w-72">
            <Input
              label="Search"
              icon={<MagnifyingGlassIcon className="h-5 w-5" />}
            />
          </div>
        </div>
      </CardHeader>
      <CardBody className="overflow-scroll px-0">
        <table className="mt-4 w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th
                  key={head}
                  className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.data.map(
              ({ displaypicture, name, email, verified ,is_blocked, joinDate, _id ,image}, index) => {
                const isLast = index === data.data - 1;
                const classes = isLast
                  ? "p-4"
                  : "p-4 border-b border-blue-gray-50";
 
                return (
                  <tr key={name}>
                    <td className={classes}>
                      <div className="flex items-center gap-3 ">
                        <Avatar src={displaypicture ? displaypicture : image} alt={name} size="sm" />
                        <div className="flex flex-col">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {name}
                          </Typography>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal opacity-70"
                          >
                            {email}
                          </Typography>
                        </div>
                      </div>
                    </td>
                    <td className={classes}>
                      <div className="w-max">
                        <Chip
                          variant="ghost"
                          size="sm"
                          value = {is_blocked===true ? "blocked" : "active"}
                          color = {is_blocked===true ? "red" : "green"}
                        />
                         </div>
                    </td>
                    
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {joinDate}
                      </Typography>
                    </td>
                    {is_blocked === false ? (
                      <td className={classes}>
                      <Tooltip content="Block User">
                        <Button
                          size="sm"
                          color="red"
                          className="rounded-md flex gap-3"
                          variant="outlined"
                          onClick={()=>handleAction(_id)}
                        >
                          <NoSymbolIcon
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="h-4 w-4"
                          />
                          block
                        </Button>
                      </Tooltip>
                    </td>
                    ):(
                      <td className={classes}>
                          <Tooltip content="unblock User">
                            <Button
                              size="sm"
                              color="green"
                              className="rounded-md flex px-5"
                              variant="outlined"
                              onClick={()=>handleAction(_id)}
                            >
                              unblock
                            </Button>
                          </Tooltip>
                        </td>
                    )}
                  </tr>
                );
              },
            )}
          </tbody>
        </table>
      </CardBody>
      <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
        <Typography variant="small" color="blue-gray" className="font-normal">
          Page 1 of 10
        </Typography>
        <div className="flex gap-2">
          <Button variant="outlined" size="sm">
            Previous
          </Button>
          <Button variant="outlined" size="sm">
            Next
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}