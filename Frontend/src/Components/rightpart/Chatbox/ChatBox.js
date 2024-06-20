import React, { useEffect, useState } from 'react';
import Chatheader from './chatboxbody/Chatheader';
import Chatmessage from './chatboxbody/Chatmessage';
import { Box } from '@mui/material';
import { UserContext } from '../../Contextapi/Userprovider';
import { AccountContext } from '../../Contextapi/Accountprovider';
import { useContext } from 'react';
import { getconversation } from '../../Apiservice/api';

function ChatBox() {
  // Accessing the person and account from the context
  const { person } = useContext(UserContext);
  const { account } = useContext(AccountContext);

  // State to store conversation data
  const [data, setdata] = useState({});

  // Fetching conversation details when the person changes
  useEffect(() => {
    const getconversationdetails = async () => {
      try {
        // Fetching conversation details from the API
        let dataa = await getconversation({ senderid: account.sub, receiverid: person.sub });
        // Updating the state with the fetched data
        setdata(dataa);
      } catch (error) {
        console.error('Error fetching conversation details:', error.message);
      }
    };

    // Calling the function to get conversation details
    getconversationdetails();
  }, [person.sub]);

  return (
    <Box style={{ height: '75%' }}>
      {/* Rendering the Chatheader component with person data */}
      <Chatheader person={person} />
      {/* Rendering the Chatmessage component with person and conversation data */}
      <Chatmessage person={person} conversation={data} />
    </Box>
  );
}

export default ChatBox;
