const { MongoClient } = require('mongodb');

class Connection {
    constructor() { }

    // local = "mongodb://localhost:27017";
    // cloud = "mongodb+srv://codeudemy:Npd97*93@cluster0.g39g6.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
    // url = process.env.MONGODB_URI || "mongodb://localhost:27017";

    connect(callBack) {
        MongoClient.connect("mongodb+srv://DuyNguyen:Npd97*93@cluster0.xuzsg.mongodb.net/coderudemy?retryWrites=true&w=majority", callBack);
    }

    reConnect() {
        const client = new MongoClient("mongodb+srv://DuyNguyen:Npd97*93@cluster0.xuzsg.mongodb.net/coderudemy?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true });
        return client;
    }

}

module.exports = new Connection;