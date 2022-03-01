const { MongoClient } = require('mongodb');

class Connection {
    constructor() { }

    reConnect(callBack) {
        MongoClient.connect("mongodb://localhost:27017", callBack);
    }

}

module.exports = new Connection;