var net = require("net");
const port = 5000;
const server = new net.Server();
var clients = [];

server.listen(port, () => {
    console.log("Server ready");
});

server.on('connection', function (socket) {
    console.log('A new connection has been established.');
    socket.setEncoding('utf8')
    clients.push(socket);
    socket.write('Hello, client.');
    // The server can also receive data from the client by reading from its socket.
    socket.on('data', function (chunk) {
        console.log("Data received from client: " + chunk.toString());
    });

    socket.on('end', function() {
        console.log('Closing connection with the client');
    });

    socket.on('error', function(err) {
        console.log("Error: " + err.toString());
    });
});