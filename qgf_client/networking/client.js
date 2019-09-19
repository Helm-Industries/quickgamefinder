var net = require("net");
var encryptToMD5 = require("../io/md5").encryptToMD5;
var client = new net.Socket();
client.setEncoding('utf8');

class Client
{
    constructor() 
    {
        this.username = undefined;
        this.rank = undefined;
    }

    ConnectToServer(ip, port, sendNotification)
    {
        client.connect({
            ip: ip,
            port: port
        });

        client.on("connect", () => {
            //this.WriteToServer("Connecte !");
          //  return "connected";
        });

        client.on("data", (data) => {
            console.log("Data from server: " + data);
        });

        client.on("end", () => {
            sendNotification("Connexion perdue !");
        });

        client.on("error", () => {
            sendNotification("Impossible de se connecter au serveur");
            client.end();
            return "connectionFailed";
        });
    }
    
    AuthenticateUser(user)
    {
        var md5Pass = encryptToMD5(user.password);
    }

    WriteToServer(message)
    {
        client.write(message);
    }
}

module.exports.client = Client;




// client.on('connect', function () {
//     console.log('Client: connection established with server');

//     console.log('---------client details -----------------');
//     var address = client.address();
//     var port = address.port;
//     var family = address.family;
//     var ipaddr = address.address;
//     console.log('Client is listening at port' + port);
//     console.log('Client ip :' + ipaddr);
//     console.log('Client is IP4/IP6 : ' + family);


//     // writing data to server
//     client.write('hello from client');

// });

// client.setEncoding('utf8');

// client.on('data', function (data) {
//     console.log('Data from server:' + data);
// });

//setTimeout(function () {
//   client.end('Bye bye server');
//}, 5000);

