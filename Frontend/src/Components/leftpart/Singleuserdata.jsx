import { React, useEffect, useContext, useState } from 'react';
import { UserContext } from '../Contextapi/Userprovider';
import { AccountContext } from '../Contextapi/Accountprovider';
import { setconversation } from '../Apiservice/api';
import { getconversation } from '../Apiservice/api';
import { styled, Box, Typography } from "@mui/material";

// Function to format the timestamp
const formatDate = (date) => {
  const hours = new Date(date).getHours();
  const minutes = new Date(date).getMinutes();
  return `${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}`;
}

// Styled components for UI elements
const Component = styled(Box)`
  height: 2.2rem;
  display: flex;
  padding: 1rem 0;
  cursor: pointer;
`;

const Image = styled('img')({
  width:"2rem",
  height: "2rem",
  objectFit: 'cover',
  borderRadius: '50%',
  padding: '0 1rem'
});

const Container = styled(Box)`
  display: flex;
`;

const Timestamp = styled(Typography)`
  font-size: 0.7rem;
  margin-left: auto;
  color: #00000099;
  margin-right: 1rem;
`;

const Text = styled(Typography)`
  display: block;
  color: rgba(0, 0, 0, 0.6);
  font-size: 1rem;
`;

// Default picture URL when user picture is not available
const emptypicture = 'https://www.kindpng.com/picc/m/78-785827_user-profile-avatar-login-account-male-user-icon.png';

function Singleuserdata({ user }) {
  const url = user.picture || emptypicture; // Display picture URL
  const { setperson } = useContext(UserContext);
  const { account, newMessageFlag } = useContext(AccountContext);
  const [message, setMessage] = useState({});

  useEffect(() => {
    const getConversationMessage = async () => {
      const data = await getconversation({ senderid: account.sub, receiverid: user.sub });
      setMessage({ text: data?.message, timestamp: data?.updatedAt });
    }
    getConversationMessage();
  }, [newMessageFlag, message]);

  // Set the user details and initiate a conversation
  const getUser = async () => {
    setperson(user);
    await setconversation({ senderid: account.sub, receiverid: user.sub });
  }

  return (
    <Component onClick={() => getUser()}>
      <Box>
        <Image src={url} alt="display picture" />
      </Box>
      <Box style={{ width: '100%' }}>
        <Container>
          <Typography>{user.name}</Typography>
          {
            message?.text &&
            <Timestamp>{formatDate(message?.timestamp)}</Timestamp>
          }
        </Container>
        <Box>
          <Text>{message?.text}</Text>
        </Box>
      </Box>
    </Component>
  );
}

export default Singleuserdata;
