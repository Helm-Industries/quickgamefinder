var net = require("net");
var mysql = require("mysql");
const port = 5000;
const server = new net.Server();
var clients = [];
var con = mysql.createConnection({
    host: "mysql-quickgamefinder.alwaysdata.net",
    user: "189919",
    database:"quickgamefinder_dev",
    password: "Yujilaosyalere94"
});

server.listen(port, () => {
    console.log("Server ready");

    con.connect(function (err) {
        if (err) throw err;
        console.log("Connected to DB");
    });
});

server.on('connection', function (socket) {
    console.log('A new connection has been established.');
    socket.setEncoding('utf8')
    clients.push(socket);
    //socket.write('Hello, client.');
    // The server can also receive data from the client by reading from its socket.
    socket.on('data', function (chunk) {
        console.log(chunk);
        handleData(chunk, socket);
    });

    socket.on('end', function() {
        console.log('Closing connection with the client');
    });

    socket.on('error', function(err) {
        console.log("Error: " + err.toString());
    });
});

function handleData(data, socket)
{
    var tab = JSON.parse(data);
    if(tab.length >= 1)
    {
        var requestID = tab[0];
        switch(requestID)
        {
            case "AuthenticationRequest":
                if(tab.length == 3)
                    AuthenticateUser(tab[1], tab[2], socket);
                break;
            default: 
                sendWrongQuery(socket);
                break;
        }
    }
}

function sendWrongQuery(socket)
{
    socket.write("Erreur lors de l'interpretation de la requete");
}

function writeSocket(data, socket)
{
    socket.write(JSON.stringify(data));
}

function AuthenticateUser(username, password, socket)
{
    queryDB("SELECT * FROM users WHERE username='" + username + "' AND password='" + password + "'", function(err, data)
    {
        if(err)
        {
            console.log(err);
            sendWrongQuery(socket);
        }
        else
        {
            if(data.length == 1)
            {
                socket.write("authenticationSuccess");
            }
        }
    });
}

function queryDB(query, callback)
{
    var queryresult = con.query(query, function (err, result) {
        if (err) callback(err, null);
        else callback(null, result);
    });
}