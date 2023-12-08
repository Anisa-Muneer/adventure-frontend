import { MagnifyingGlassIcon } from '@heroicons/react/24/solid'
import { Card, Drawer, Input, Typography } from '@material-tailwind/react'
import React, { useState } from 'react'
import { ChatState } from './Context/ChatProvider'
import userRequest from '../../../../utils/userRequest'
import UserListItem from './UserListItem'

function SideDrawer() {
    const [open,setOpen] = useState(false)
    const openDrawer = ()=>setOpen(true)
    const closeDrawer = ()=>setOpen(false)
    const [search, setSearch] = useState("")
    const [searchResult, setSearchResult] = useState([])
    const [loading, setLoading] = useState(false)
    const [loadingChat, setLoadingChat] = useState(false)
    const { user,chats,setSelectedChat,setChats } = ChatState()

    const handleSearch = async () =>{
        if(!search){
            console.log("Please enter something in search");
            return 
        }
        try {
            setLoading(true)
            const config = {
                headers : {
                    Authorization : `Bearer ${user.token}`
                }
            }
            const { data } = await userRequest.get(`/usersearch?search=${search}`,config)
            setLoading(false)
            setSearchResult(data)
        } catch (error) {
            console.log("Something went wrong");
        }
    }

    const accessChat = async (adventureId) => {
        
        try {
            setLoadingChat(true);
            
            const userId = user.id
            const { data } = await userRequest.post(`/accesschat`, { adventureId, userId });
            console.log(data);

            if (!chats.find((c) => c._id === data._id)) {
                console.log('nothing');
                setChats([data, ...chats])
            }
            console.log(data, 'data');
            console.log(chats, 'chat');
            setSelectedChat(data);
            setLoadingChat(false);
            setOpen(!open)
        } catch (error) {
            console.log("Error fetching the chat")
        }
    };
  return (
     <>

            <>
            <div onClick={openDrawer}  className="flex bg-blue-gray-400 p-1 rounded-3xl cursor-pointer" >
                <Typography className="mx-3 ">search</Typography>
                <MagnifyingGlassIcon className="h-6 w-6 me-3"/>
            </div>
                <Drawer open={open} onClose={closeDrawer} >
                    <div className='p-5'>


                        <Input
                            className=""
                            label="Search by name or email:"
                            type="text"
                            variant="standard"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                           
                        />

                        <button onClick={handleSearch} >Go</button>
                    </div>
                    {loading ? (
                        <div>Loading...</div>
                    ):(
                        <div>
                            {searchResult?.map((user)=>(
                                // <Card key={user._id} className="bg-blue-gray-200">
                                //     <button onClick={()=> accessChat(user._id)}>
                                //         {user.name}
                                //     </button>
                                // </Card>
                                <UserListItem
                                    key={user._id}
                                    user={user}
                                    handleFunction={()=>accessChat(user._id)}
                                />
                            ))}
                        </div>
                    )}
                 
                       
                   
                    {loadingChat && <div>Loading chat...</div>}
                </Drawer>
            </>
        </>
  )
}

export default SideDrawer
