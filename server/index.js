const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const chalk = require('chalk');

const uuid = require('uuid/v4');

const users = [];

const User = function(id, name) {
    this.id = id
    this.name = name
}

const connection = (data) => {
    const user = new User(uuid(), data)
    users.push(user);
    console.log(chalk.green(users))
}

io.on('connection', socket => {
    console.log(chalk.red("a person has connected to the server"))
    
    socket.on('connection', data => {
        connection(data);
        io.emit('users connected', JSON.stringify(users));
    })
    socket.on('event', data => {
        console.log(chalk.red(data))
    });
    socket.on('disconnect', () => {
        console.log(chalk.red("user disconnected"))
    });
    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
        console.log(chalk.green('message: ' + msg));
    });
});

http.listen(3000, () => {
    console.log(chalk.green('Server started on port 3000'))
});