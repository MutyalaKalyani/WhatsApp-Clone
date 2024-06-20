import React from 'react';
import { Box, styled, InputBase } from '@mui/material';

// Styled components for styling the Chatfooter component
const Container = styled(Box)`
  height: 3.5rem;
  background: #ededed;
  width: 100%;
  display: flex;
  align-items: center;
  & > * {
    color: #919191;
  }
`;

const Search = styled(Box)`
  border-radius: 0.5rem;
  background-color: #FFFFFF;
  width: calc(94% - 5rem);
  margin-left: 3rem;
`;

const InputField = styled(InputBase)`
  width: 100%;
  padding: 0.5rem;
  font-size: 1rem;
  height: 2.5rem;
  width: 100%;
`;

// Functional component representing the chat footer
function Chatfooter({ sendtext, settext, textt }) {
  return (
    <Container>
      {/* Search box styling */}
      <Search>
        {/* Input field for typing the message */}
        <InputField
          placeholder="Type a message"
          onChange={(e) => settext(e.target.value)} // Update the text in the state when input changes
          onKeyPress={(e) => sendtext(e)} // Trigger the sendtext function when a key is pressed
          value={textt} // The current value of the input field
        />
      </Search>
    </Container>
  );
}

export default Chatfooter;
