import openSocket from "socket.io-client";

const socket = openSocket("http://localhost:3000");

const subscribeToConnection = (data) => {
    socket.emit("connection", data);
    socket.on("users connected", (users) => {
        console.log(users);
    });
};

const subscribeToMessage = () => {

};

export { subscribeToMessage, subscribeToConnection };
