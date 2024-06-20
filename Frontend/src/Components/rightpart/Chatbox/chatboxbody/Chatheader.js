import React from 'react';
import { Box, Typography, styled } from '@mui/material';
import { useContext } from 'react';
import { AccountContext } from '../../../Contextapi/Accountprovider';

// Styled components for styling the Chatheader component
const Header = styled(Box)`
    height: 2rem;
    background: #ededed;
    display: flex;
    padding: 1rem 2rem;
    align-items: center;

`;
    
const Image = styled('img')({
    width: "2rem",
    height: "2rem",
    objectFit: 'cover',
    borderRadius: '50%'
})

const Name = styled(Typography)`
    margin-left: 0.7rem !important;
`;

const Status = styled(Typography)`
    font-size: 0.7rem !important;
    color: rgb(0, 0, 0, 0.6);
    margin-left: 0.7rem !important;
`;

// Default profile image URL
const emptyimage = 'https://www.kindpng.com/picc/m/78-785827_user-profile-avatar-login-account-male-user-icon.png';

// Functional component representing the Chatheader section
const Chatheader = ({ person }) => {
    const url = person.picture || emptyimage;  // Display the profile picture or use the default image
    const { activeUsers } = useContext(AccountContext);

    return (
        <Header>
            <Image src={url} alt="display picture" />     
            <Box>
                <Name>{person.name}</Name>
                <Status>{activeUsers?.find(user => user.sub === person.sub) ? 'Online' : 'Offline'}</Status>    
            </Box>   
        </Header>
    )
};

export default Chatheader;
