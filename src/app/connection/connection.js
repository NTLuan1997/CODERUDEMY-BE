const { MongoClient } = require('mongodb');

class Connection {
    constructor() { }

    local = "mongodb://localhost:27017";
    // cloud = "mongodb+srv://codeudemy:Npd97*93@cluster0.g39g6.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

    connect(callBack) {
        MongoClient.connect(this.local, callBack);
    }

}

module.exports = new Connection;