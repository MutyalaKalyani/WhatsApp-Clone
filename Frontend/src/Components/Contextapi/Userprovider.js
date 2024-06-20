import { createContext, useState } from 'react';

// Create a context to manage details of a person for chatting
export const UserContext = createContext(null);

const UserProvider = ({ children }) => {
    // State variable to store details of a person
    const [person, setperson] = useState({});

    // Provide the state and functions to components consuming this context
    return (
        <UserContext.Provider value={{ person, setperson }}>
            {children}
        </UserContext.Provider>
    );
};

// Export the UserProvider as the default export
export default UserProvider;
