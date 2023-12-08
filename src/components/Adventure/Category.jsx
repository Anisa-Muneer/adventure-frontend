import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { PencilIcon, UserPlusIcon, ArrowPathIcon, NoSymbolIcon } from "@heroicons/react/24/solid";
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
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { manageCategory, manageCategoryList } from "../../api/adventureApi";
import AddCategory from "./AddCategory";
import adventureRequest from "../../utils/adventureRequest";
import EditCategory from "./EditCategory";



const TABLE_HEAD = ["Name", "Description", "Entry Fee", "Status", "Action",""];
export function Category() {
    const queryClient = useQueryClient()
    const { isLoading, error, data, refetch } = useQuery({
        queryKey: ['category'],
        queryFn: () => adventureRequest.get('/allCategory').then((res) => res.data)

    })
console.log(data,"cat data");
    if (isLoading) {
        return <div className="h-screen flex justify-center items-center"><Spinner color="blue" className="h-10 w-10 " /></div>

    }
    if (error) {
        return <h1>Something went wrong</h1>
    }

    const handleActionList = async (categoryId) => {
        await manageCategoryList(categoryId)
        queryClient.invalidateQueries('category')
    }

    
    const handleAction = async (categoryId) => {
        await manageCategory(categoryId)
        queryClient.invalidateQueries('category')
    }



    return (
        <Card className="h-full w-full">
            <CardHeader floated={false} shadow={false} className="rounded-none">
                <div className="mb-8 flex items-center justify-between gap-8">
                    <div>
                        <Typography variant="h5" color="blue-gray">
                            Members list
                        </Typography>
                        <Typography color="gray" className="mt-1 font-normal">
                            See information about all members
                        </Typography>
                    </div>
                    <div className="flex shrink-0 flex-col gap-2 sm:flex-row">

                        <AddCategory refetch={refetch} />
                    </div>
                </div>
                <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
                    <Tabs value="all" className="w-full md:w-max">
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
                        {data.data.category.map(
                            (cat, index) => {
                                const isLast = index === data.data.length - 1;
                                const classes = isLast
                                    ? "p-4"
                                    : "p-4 border-b border-blue-gray-50";

                                return (
                                    <tr key={cat._id}>
                                        <td className={classes}>
                                            <div className="flex items-center gap-3">
                                                <Avatar  src={cat.image} />
                                                <div className="flex flex-col">
                                                    <Typography
                                                        variant="small"
                                                        color="blue-gray"
                                                        className="font-normal"
                                                    >
                                                        {cat.categoryName}
                                                    </Typography>
                                                    <Typography
                                                        variant="small"
                                                        color="blue-gray"
                                                        className="font-normal opacity-70"
                                                    >

                                                    </Typography>
                                                </div>
                                            </div>
                                        </td>
                                         <td className={classes}>
                                            <div className="flex flex-col">
                                                <Typography
                                                    variant="small"
                                                    color="blue-gray"
                                                    className="font-normal"
                                                >
                                                    {cat.catDescription}
                                                </Typography>
                                                <Typography
                                                    variant="small"
                                                    color="blue-gray"
                                                    className="font-normal opacity-70"
                                                >

                                                </Typography>
                                            </div>
                                        </td>
                                        <td className={classes}>
                                            <div className="flex flex-col">
                                                <Typography
                                                    variant="small"
                                                    color="blue-gray"
                                                    className="font-normal"
                                                >
                                                    {cat.entryFee}
                                                </Typography>
                                                <Typography
                                                    variant="small"
                                                    color="blue-gray"
                                                    className="font-normal opacity-70"
                                                >

                                                </Typography>
                                            </div>
                                        </td>
                                        <td className={classes}>
                                            <div className="w-max">
                                                <Chip
                                                    variant="ghost"
                                                    size="sm"
                                                    value={cat.status === false ? "deleted" : "active"}
                                                    color={cat.status === false ? "red" : "green"}
                                                />
                                            </div>
                                        </td>
                                        <>
                                            {cat.status === true ? (
                                                <td className={classes}>
                                                    <Tooltip content="Delete Department">
                                                        <Button size="sm" color="red" className="rounded-md flex gap-3" variant="outlined" onClick={() => handleAction(cat._id)}>
                                                            <NoSymbolIcon strokeWidth={1.5} stroke="currentColor" className="h-4 w-4" />
                                                            Unlist
                                                        </Button>
                                                    </Tooltip>
                                                </td>

                                            ) : (

                                                <td className={classes}>
                                                    {/* <Tooltip content="Undo Delete"> */}
                                                    <Button size="sm" color="green" className="rounded-md flex gap-2" variant="outlined" onClick={() => handleActionList(cat._id)}>
                                                        <ArrowPathIcon strokeWidth={1.5} stroke="currentColor" className="h-4 w-4" />

                                                        List
                                                    </Button>
                                                    {/* </Tooltip> */}
                                                </td>
                                            )}

                                        </>
                                        <td>
                                            <EditCategory category={cat}/>
                                        </td>
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