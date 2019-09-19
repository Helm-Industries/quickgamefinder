class User
{
    constructor()
    {
        this.username = null;
        this.password = null;
    }

    login(username, password, sendNotification, notifContent)
    {
        if(username.toString().length < 3)
        {
            if (sendNotification != null) {
                sendNotification("Nom de compte ou mot de passe incorrect");
            }
        }
        else if (password.toString().length < 3) {
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

function initLogin(user, sendNotification)
{
    const NetworkClient = require("./client.js").client;
    let client = new NetworkClient();
    var connectionState = client.ConnectToServer("78.114.52.238", 5000, sendNotification);
    console.log(connectionState);
    switch(connectionState)
    {
        case "connected": 
            sendNotification("Connecté au serveur");
            client.AuthenticateUser(user);
            break;
        default: 
            break;
    }

}

module.exports.user = User;