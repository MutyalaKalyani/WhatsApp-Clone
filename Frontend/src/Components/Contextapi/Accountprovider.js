import { createContext, useState, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';

// Create a context to manage user account information and related state
export const AccountContext = createContext(null);

const AccountProvider = ({ children }) => {
    // State variables to manage user account, login/logout button visibility, active users, and new messages
    const [account, setAccount] = useState(); // Account contains the data of the logged-in user.
    const [showloginButton, setShowloginButton] = useState(true); // Controls the visibility of the login button.
    const [showlogoutButton, setShowlogoutButton] = useState(false); // Controls the visibility of the logout button.
    const [activeUsers, setActiveUsers] = useState([]); // Shows the status (online or offline) of users.
    const [newMessageFlag, setNewMessageFlag] = useState(false); // Indicates whether there are new messages.

    // Ref to manage the WebSocket connection
    const socket = useRef();

    // Initialize the WebSocket connection when the component mounts
    useEffect(() => {
        // Create a WebSocket connection to the specified server
        socket.current = io('ws://localhost:9000');
    }, []);

    // Provide the state and functions to components consuming this context
    return (
        <AccountContext.Provider value={{
            account,
            setAccount,
            showloginButton,
            setShowloginButton,
            showlogoutButton,
            setShowlogoutButton,
            socket,
            activeUsers,
            setActiveUsers,
            newMessageFlag,
            setNewMessageFlag
        }}>
            {children}
        </AccountContext.Provider>
    );
};

export default AccountProvider;
