const { MongoClient } = require('mongodb');

class Connection {
    constructor() { }

    // local = "mongodb://localhost:27017";
    // cloud = "mongodb+srv://codeudemy:Npd97*93@cluster0.g39g6.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
    url = process.env.DATABASE_URL || "mongodb://localhost:27017";

    connect(callBack) {
        console.log("Url connect to db");
        console.log(url);

        console.log("Check connect");
        console.log(MongoClient.connect(this.url, callBack));
        MongoClient.connect(this.url, callBack);
    }

    reConnect() {
        const client = new MongoClient(this.url, { useNewUrlParser: true, useUnifiedTopology: true });
        return client;
    }

}

module.exports = new Connection;