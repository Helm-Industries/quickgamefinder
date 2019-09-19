class User
{
    constructor(username, password)
    {
        this.username = username;
        this.password = password;
    }

    login(sendNotification, notifContent)
    {
        if (this.username.length < 3 || this.password.length < 3)
        {
            if (sendNotification != null) {
                sendNotification("Nom de compte ou mot de passe incorrect");
            }
        }
        else
        {

            //login phase
            if (sendNotification != null)
            {
                sendNotification(notifContent);
            }
            initLogin(this, sendNotification);
        }
    }
}

var networkStreamExists = false;

function initLogin(user, sendNotification)
{
    const NetworkClient = require("./client.js").client;
    let client;
    if(networkStreamExists == false)
        client = new NetworkClient();
    networkStreamExists = true;
    client.ConnectToServer("78.114.52.238", 5000, sendNotification);
    client.connection.on("connect", () => {
        client.AuthenticateUser(user);
    });    
}

module.exports.user = User;