class Database
{
    constructor(host, user, database, password)
    {
        this.host = host;
        this.user = user;
        this.database = database;
        this.password = password;
    }

    queryDB(query, callback) {
        var queryresult = con.query(query, function (err, result) {
            if (err) callback(err, null);
            else callback(null, result);
        });
    }
}

