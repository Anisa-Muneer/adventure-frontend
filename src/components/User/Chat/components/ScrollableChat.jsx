import React, { useEffect, useRef } from 'react'
import { Avatar } from "@chakra-ui/avatar";
import { Tooltip } from '@material-tailwind/react';
import { isLastMessage, isSameSender, isSameSenderMargin, isSameUser } from './Config/ChatLogics';
import { ChatState } from './Context/ChatProvider';


const ScrollableChat = ({messages}) => {
    const { user } = ChatState()
     const chatContainerRef = useRef(null);


  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);
  return (
    <div
      ref={chatContainerRef}
      style={{
        maxHeight: '500px',
        overflowY: 'auto',
      }}
    >
      {messages && 
        messages.map((m,i)=>(
console.log(messages,'its a message'),
         <div style={{ display: "flex" }} key={i}>
            {(isSameSender(messages, m, i, user.id)||
            isLastMessage(messages, i, user.id)) && (

                <Tooltip label={m.sender.adventure.name}  placement="bottom-start" hasArrow>
               
                  <Avatar
                    mt="7px"
                    mr={1}
                    size="sm"
                    width={"8"}
                    height={"8"}
                    cursor="pointer"
                    name={m.sender.name}
                    src={ m.sender.adventure.image}
                    />
              
          
              
              </Tooltip>
         
                    )}
            <span
              style={{
                backgroundColor: `${
                  m.sender.user
                    ? m.sender.user.id === user.id
                      ? "#BEE3F8"
                      : "#B9F5D0"
                    : m.sender.adventure._id === user.id
                    ? "#BEE3F8"
                    : "#B9F5D0"
                }`,
                marginLeft: isSameSenderMargin(messages, m, i, user.id),
                marginTop: isSameUser(messages, m, i, user.id) ? 3 : 10,
                borderRadius: "20px",
                padding: "5px 15px",
                maxWidth: "75%",
              }}
            >
              {m.content}
            </span>
          </div>
  ))}
    </div>
  )
}

export default ScrollableChat
