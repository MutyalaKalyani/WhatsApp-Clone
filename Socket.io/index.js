const { Server } = require("socket.io");

// Create a new instance of the Socket.IO server
const io = new Server(9000, {
    cors: {
        origin: 'http://localhost:3000',
    },
});

// Array to store connected users
let users = [];

// Function to add a user to the users array
const addUser = (userData, socketId) => {
    // Check if the user is not already in the array
    !users.some(user => user.sub === userData.sub) && users.push({ ...userData, socketId });
}

// Function to remove a user based on their socketId
const removeUser = (socketId) => {
    users = users.filter(user => user?.socketId !== socketId);
}

// Function to get user details based on their userId
const getUser = (userId) => {
    return users.find(user => user.sub === userId);
}

// Event handler for a new socket connection
io.on('connection', (socket) => {
    console.log('user connected');

    // Event handler for adding a new user
    socket.on("addUser", userData => {
        addUser(userData, socket.id);
        io.emit("getUsers", users); // Broadcast the updated list of users to all connected clients
    })

    // Event handler for sending a message
    socket.on('sendMessage', (data) => {
        const user = getUser(data.receiverid);
        io.to(user?.socketId).emit('getMessage', data); // Emit the message to the specific user's socket
    })

    // Event handler for a socket disconnect
    socket.on('disconnect', () => {
        console.log('user disconnected');
        removeUser(socket.id);
        io.emit('getUsers', users); // Broadcast the updated list of users to all connected clients
    })
});
