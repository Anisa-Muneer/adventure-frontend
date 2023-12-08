import { MagnifyingGlassIcon } from '@heroicons/react/24/solid'
import { Card, Drawer, Input, List, ListItem, Typography } from '@material-tailwind/react'
import React, { useState } from 'react'
import UserListItem from './UserListItem'
import userRequest from '../../../../utils/userRequest';
import { ChatState } from './Context/ChatProvider';
import adventureRequest from '../../../../utils/adventureRequest';

function SideDrawer() {
  const [open, setOpen] = useState(false)
  const openDrawer = ()=>setOpen(true)  
  const closeDrawer = ()=>setOpen(false) 
  const [search,setSearch] = useState("") 
  const [loadingChat, setLoadingChat] = useState(false)
  const {setChats, setSelectedChat,user,chats} = ChatState()
  const [searchResult, setSearchResult] = useState([])
  const [loading, setLoading] = useState(false)

   const handleSearch = async () => {
        if (!search) {
            console.log("Please Enter something in search");
            return;
        }
         try {
            
            setLoading(true);
            const { data } = await adventureRequest.get(`/usersearch?search=${search}`);
            setLoading(false);
            setSearchResult(data);
        } catch (error) {
            console.log("somthing went wrong");
        }
    };


    const accessChat = async (userId) => {
       
         try {
            setLoadingChat(true);
            const adventureId = user.id
            console.log(adventureId,"adv last");
            const { data } = await userRequest.post(`/accesschat`, { adventureId, userId });

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
