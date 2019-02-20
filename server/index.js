const app = require("express")();
const http = require("http").Server(app);
const io = require("socket.io")(http);
const chalk = require("chalk");

const socketApi = require("./sockets/api");

socketApi.listenToSocket(io);

http.listen(3000, () => {
    console.log(chalk.green("Server started on port 3000"));
});
