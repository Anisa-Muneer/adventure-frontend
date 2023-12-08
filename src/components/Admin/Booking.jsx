import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { PencilIcon, UserPlusIcon, NoSymbolIcon } from "@heroicons/react/24/solid";
import { useQuery, useQueryClient } from '@tanstack/react-query'
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



const TABLE_HEAD = ["Adventure Team", "Category", "User Name", "Date","Action"];



export function Booking() {
 
  const { isLoading, error, data } = useQuery({
    queryKey: ['adminBooking'],
    queryFn: () => adminRequest.get('/booking').then((res) => res.data)
  })
  console.log(data,'data is loading');

  if (isLoading) {
    return <div className="h-screen flex justify-center items-center"><Spinner color="blue" className="h-10 w-10 " /></div>
  }

  if (error) {
    return <h1>Something went wrong</h1>
  }

  
  return (
    <Card className="h-full w-full">
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="mb-8 flex items-center justify-between gap-8 rouded-md p-3">
          <div>
            <Typography variant="h5" color="blue-gray">
              Adventure Team
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
              See information about all adventure team
            </Typography>
          </div>
         
        </div>
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <Tabs value="all" className="w-full md:w-96 rounded-lg">
            <TabsHeader>
              <Tab value="">All</Tab>
              <Tab value="active" >Active</Tab>
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
      <CardBody className="overflow-hidden px-0">
        <table className="mt-4 w-full min-w-max table-auto text-left m-1">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th
                  key={head}
                  className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 "
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-100 mx-4"
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
               {data.data.map((booking, index) => {

              
                const isLast = index === data.data - 1;
                const classes = isLast
                  ? "p-4"
                  : "p-4 border-b border-blue-gray-50";

                return (
          
                  <tr >
                    <td class={classes}>
                      <div className="flex items-center gap-9 ">
                        <div className="flex flex-col">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                             {booking.adventureId.name}
                          </Typography>
                       
                        </div>
                      </div>
                    </td>
                    <td class={classes} >
                      <div className="w-max">
                     <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-100 mx-4"
                  >
                  {booking.categoryName}
                  </Typography>
                      </div>
                    </td>
                    <td class={classes}>
                      <div className="w-max">
                      <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-100 mx-4"
                  >
                   {booking.userId.name}
                  </Typography>
                      </div>
                    </td>
                  
                   
                      <td class={classes}>
                        <div className="w-max">
                      <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-100 mx-4"
                  >
                  {new Date(booking.scheduledAt.slotDate).toLocaleDateString('en-GB')}
                  </Typography>
                      </div>
                      </td>

                         <td class={classes}>
                        <div className="w-max">
                      <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-100 mx-4"
                  >
                  
                  </Typography>
                      </div>
                      </td>
                 
                  </tr>
                  )
               
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