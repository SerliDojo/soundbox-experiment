var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
const chalk = require('chalk');

io.on('connection', client => {
    console.log(chalk.red("a person has connected to the server"))
    client.on('event', data => {
        /* … */ });
    client.on('disconnect', () => {
        /* … */ });
});

console.log(chalk.green('Server started on port 3000'))

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
  });  

app.listen(3000);