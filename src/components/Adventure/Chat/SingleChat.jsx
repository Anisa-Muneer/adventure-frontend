import React, { useEffect, useState } from 'react'
import { ArrowBackIcon } from "@chakra-ui/icons";
import { Box, Text } from "@chakra-ui/layout";
import { IconButton, Spinner, useToast } from "@chakra-ui/react";
import { FormControl } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Button } from "@material-tailwind/react";
import { ToastContainer } from "react-toastify";
import userRequest from '../../../utils/userRequest';
import adventureRequest from '../../../utils/adventureRequest';
import ScrollableChat from './components/ScrollableChat';
import { ChatState } from './components/Context/ChatProvider';
import  io  from 'socket.io-client';
import { GenerateError } from '../../../toast/GenerateError';
const ENDPOINT = import.meta.env.VITE_BACKENDURL;
var socket, selectedChatCompare;

const SingleChat = ({ fetchAgain, setFetchAgain }) => {
 const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [socketConnected, setSocketConnected] = useState(false);
  const [typing, setTyping] = useState(false);
  const [istyping, setIsTyping] = useState(false);
  const { selectedChat, setSelectedChat, user, notification, setNotification } =
    ChatState();

const  fetchMessages = async () => {
    if (!selectedChat) return;

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      setLoading(true);
      console.log(selectedChat);
      const { data } = await userRequest.get(
        `/message/${selectedChat._id}`,
        config
      );
      setMessages(data);
      setLoading(false);

      socket.emit("join chat", selectedChat._id);
    } catch (error) {
      GenerateError(
       
         "Failed to Load the Messages"
        );
    }
  };

  const sendMessage = async (event) => {
      console.log(event.key,"in.........");
      if (event.key === "Enter" && newMessage) {
      socket.emit("stop typing", selectedChat._id);
      try {
        // const config = {
        //   headers: {
        //     "Content-type": "application/json",
        //     Authorization: `Bearer ${user.token}`,
        //   },
        // };
        setNewMessage("");
        const { data } = await adventureRequest.post(
          "/message",
          {
            content: newMessage,
            chatId: selectedChat,
            userId:user.id
          },
        //   config
        );
       
        socket.emit("new message", data);
        setMessages([...messages, data]);
      } catch (error) {
        GenerateError("Failed to send the Message");
      }
    }
  };

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("setup", user);
    socket.on("connected", () => setSocketConnected(true));
    socket.on("typing", () => setIsTyping(true));
    socket.on("stop typing", () => setIsTyping(false));

    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    fetchMessages();

    selectedChatCompare = selectedChat;
    // eslint-disable-next-line
  }, [selectedChat]);

  useEffect(() => {
    const handleNewMessageReceived = (newMessageReceived) => {
      console.log('New message received:', newMessageReceived);
      console.log('Selected chat compare:', selectedChatCompare);
  
      if (
        !selectedChatCompare || // If chat is not selected or doesn't match the current chat
        selectedChatCompare._id !== newMessageReceived.chat._id
      ) {
        if (!notification.includes(newMessageReceived)) {
          setNotification([newMessageReceived, ...notification]);
          setFetchAgain(!fetchAgain);
        }
      } else {
        // Update the messages state to include the new message while preserving previous messages
        setMessages([...messages, newMessageReceived]);
      }
    };
  
    // Register the event listener
    socket.on("message received", handleNewMessageReceived);
  
    // Cleanup: Remove the event listener when the component unmounts
    return () => {
      // Unregister the event listener
      socket.off("message received", handleNewMessageReceived);
    };
  }, [selectedChatCompare, notification, fetchAgain,messages]);
  
  
  

  const typingHandler = (e) => {
    setNewMessage(e.target.value);

    if (!socketConnected) return;

    if (!typing) {
      setTyping(true);
      socket.emit("typing", selectedChat._id);
    }
    let lastTypingTime = new Date().getTime();
    var timerLength = 3000;
    setTimeout(() => {
      var timeNow = new Date().getTime();
      var timeDiff = timeNow - lastTypingTime;
      if (timeDiff >= timerLength && typing) {
        socket.emit("stop typing", selectedChat._id);
        setTyping(false);
      }
    }, timerLength);
  };

  const isMessageSender = (currentUser, selectedChat) => {
    return (
      selectedChat.sender && currentUser.adventure._id === selectedChat.sender._id
    );
  };
    

   
  return (
   <>
     {selectedChat ? (
        <>
          <Text
            fontSize={{ base: "28px", md: "30px" }}
            pb={3}
            px={2}
            w="100%"
            fontFamily="Work sans"
            display="flex"
            justifyContent={{ base: "start" }}
            alignItems="center"
          >
            <IconButton
              display={{ base: "flex", md: "none" }}
              icon={<ArrowBackIcon />}
              onClick={()=> selectedChat("")}
            />
             <img src={selectedChat.users.user && selectedChat.users.user.image} className='h-10 w-10 rounded-full me-2' />
            {selectedChat.users.user && selectedChat.users.user.name}
          </Text>
          <Box
            display="flex"
            flexDir="column"
            justifyContent="flex-end"
            p={3}
            bg="#E8E8E8"
            w="100%"
            h="90%"
            borderRadius="lg"
            overflowY="hidden"
          >
         
            {loading ? (
                
                <Spinner size="xl" w={20} h={20} alignSelf="center" margin="auto" />
                ):(
                  <div className="messages overflow-hidden">
                <ScrollableChat messages={messages} user={user} />
              </div>  
                )}
            
       {istyping && !isMessageSender(user,selectedChat) ? (

      
              <div>
                <p style={{ marginBottom: 8, marginLeft: 0, color: "gray" }}>
                  Typing...
                </p>
              </div>
               ):(
                <></>
               )}
          
            <FormControl className="w-full pt-3" id="first-name" isRequired>
              <div className="relative flex w-full">
                <Input
                  className="w-full"
                  borderRadius={15}
                  bg="#E0E0E0"
                  placeholder="Enter a message..."
                  value={newMessage}
                  onChange={typingHandler}
                  onKeyDown={sendMessage}
                />
                <Button onClick={sendMessage}>Send</Button>
              </div>
            </FormControl>
          </Box>
        </>

       ):(
         <Box display="flex" alignItems="center" justifyContent="center" h="100%">
          <Text fontSize="3xl" pb={3} fontFamily="Work sans">
            Click on a user to start chatting
          </Text>
        </Box>
       )}
    
      <ToastContainer/>
    </>
  )
}

export default SingleChat