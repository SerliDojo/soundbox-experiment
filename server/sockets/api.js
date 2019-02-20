const uuid = require("uuid/v4");
const chalk = require("chalk");

const User = require("../models/User");

const users = [];

const connection = (username) => {
    const user = new User(uuid(), username);
    users.push(user);
    console.log(chalk.green(users));
};

const listenToSocket = (io) => {
    io.on("connection", (socket) => {
        console.log(chalk.red("a person has connected to the server"));
        socket.on("connection", (data) => {
            connection(data);
            io.emit("users connected", JSON.stringify(users));
        });
        socket.on("event", (data) => {
            console.log(chalk.red(data));
        });
        socket.on("disconnect", () => {
            console.log(chalk.red("user disconnected"));
        });
        socket.on("chat message", (msg) => {
            io.emit("chat message", msg);
            console.log(chalk.green(`message : ${msg}`));
        });
    });
};

module.exports = {
    listenToSocket,
};
