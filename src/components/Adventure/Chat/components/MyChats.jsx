import React, { useEffect, useState } from 'react'

import SideDrawer from './SideDrawer'
import { Spinner } from "@material-tailwind/react";
import { Box } from "@chakra-ui/react";
import { Stack, Text } from "@chakra-ui/layout";
import { useSelector } from 'react-redux';
import adventureRequest from '../../../../utils/adventureRequest';
import { ChatState } from './Context/ChatProvider';
import dp from "../../../../assets/images/dp.png"

const MyChats = ({fetchAgain}) => {

    const [loggedUser, setLoggedUser] = useState();
    const {setChats, selectedChat, setSelectedChat, user, chats} = ChatState()

    const fetchChats = async () => {
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };
            const userId = user.id
            console.log(userId,'userId is here');
            const { data } = await adventureRequest.get(`/fetchchat/${userId}`, config);
            console.log(data,'data is here');
            setChats(data);
        } catch (error) {
            console.log("Failed to Load the chats");
        }
    };

    const { adventureInfo } = useSelector((state) => state.adventure)
    useEffect(() => {
        setLoggedUser(adventureInfo);
        fetchChats();
    }, [fetchAgain]);
    
  return (
   <Box
            display={{ base: selectedChat ? "none" : "flex", md: "flex" }}
            flexDir="column"
            alignItems="center"
            p={3}

            w={{ base: "100%", md: "31%" }}
            borderRadius="lg"
            borderWidth="1px"
            bg="#E2ECED"
        >
            <Box
                display="flex"
                w="100%"
                alignItems="center"
                justifyContent="space-around"
            >
                <Box
                    pb={3}
                    px={3}
                    fontSize={{ base: "28px", md: "30px" }}
                    fontFamily="Work sans"
                    display="flex"
                    w="100%"
                    justifyContent="space-between"
                    alignItems="center"
                >
                    My Chats
                </Box>
                <Box>
               { user && <SideDrawer />}
                </Box>
            </Box>
            <Box
                display="flex"
                flexDir="column"
                p={3}
                bg="#E2ECED"
                w="100%"
                h="100%"
                borderRadius="lg"
                overflowY="hidden"

            >
       {chats ? (

       
                  <Stack overflowY="scroll">
                  
                      {chats.map((chat)=>(
                        <Box
                       onClick={() => setSelectedChat(chat)}
                        cursor="pointer"
                        bg={selectedChat === chat ? "#38B2AC" : "white"}
                        color={selectedChat === chat ? "white" : "black"}
            
                        px={3}
                        py={2}
                                borderRadius="lg"
                               key={chat._id}
                                display="flex"
                                >
                                <Box>
                                    <img src={chat.users.user ? chat.users.user.image : dp} className="h-10 w-10 me-3 rounded-full"/>
                                </Box>
                                <Box>
                                    <Text>
                                       {chat.users.user?.name}
                                    </Text>
                                   
                           
                                </Box>
                            </Box>
                   ))}
                               
                    </Stack>
                         
                     ):(

                    <Spinner />
                     )}
                   

       
            </Box>
        </Box>
  )
}

export default MyChats
