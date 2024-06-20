// Import necessary libraries and components
import React, { useContext, useState, useEffect, useRef } from 'react';
import { Box, Container, styled } from "@mui/material";
import Chatfooter from './chatmessagebody/Chatfooter';
import Scrollchat from "./chatmessagebody/Scrollchat";
import { AccountContext } from '../../../Contextapi/Accountprovider';
import { sendmessageindatabase } from '../../../Apiservice/api';
import { getmessagefromdatabase } from '../../../Apiservice/api';

// Styled components for styling the Chatmessage component
const Wrapper = styled(Box)`
     background-image: url(${'https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png'});
    background-size: 50%;
`;

const Component = styled(Box)`
    height: 36rem;
    overflow-y: scroll;
`;

// Functional component representing the Chatmessage section
function Chatmessage({ person, conversation }) {
    const { account, socket, newMessageFlag, setNewMessageFlag } = useContext(AccountContext);
    const [incomingMessage, setIncomingMessage] = useState(null);
    const [textt, settext] = useState('');    // Represents the text entered in the footer input field
    const [messages, setmessages] = useState([]);  // Represents the object containing messages
    const scrollRef = useRef();

    // Effect to listen for incoming messages
    useEffect(() => {
        socket.current.on('getMessage', data => {
            setIncomingMessage({
                ...data,
                createdAt: Date.now()
            })
        })
    }, []);

    // Effect to fetch message details from the backend when the conversation or messages change
    useEffect(() => {
        const getMessageDetails = async () => {
            let data = await getmessagefromdatabase(conversation._id);
            setmessages(data);
        }
        getMessageDetails();
    }, [conversation._id, person._id, newMessageFlag]);

    // Effect to scroll to the latest message when the messages change
    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" })
    }, [messages]);

    // Effect to handle incoming messages and update the state
    useEffect(() => {
        incomingMessage && conversation?.members?.includes(incomingMessage.senderid) &&
            setmessages((prev) => [...prev, incomingMessage]);
    }, [incomingMessage, conversation]);

    // Function to send a message when the enter key is pressed
    const sendtext = async (e) => {
        const code = e.keyCode || e.which;

        // If the enter key is pressed (keycode 13)
        if (code === 13) {
            let message = {
                senderid: account.sub,
                receiverid: person.sub,
                conversationid: conversation._id,
                type: 'text',
                text: textt,
            }

            socket.current.emit('sendMessage', message);
            await sendmessageindatabase(message);     // Send the message to the database using the API function
            settext('');                   // Clear the input field after sending the message
            setNewMessageFlag(state => !state)    // Toggle the state to trigger a re-fetch of messages
        }
    }

    // Render the Chatmessage component
    return (
        <Wrapper>
            <Component>
                {
                    messages && messages.map(message => (
                        <Container ref={scrollRef} key={message._id}>
                            <Scrollchat message={message} />
                        </Container>
                    ))
                }
            </Component>
            <Chatfooter sendtext={sendtext} settext={settext} textt={textt} />
        </Wrapper>
    )
}

export default Chatmessage;
