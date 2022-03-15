const { MongoClient } = require('mongodb');
const mongoose = require('mongoose');

class Connection {
    constructor() { }

    url = process.env.DATABASE_URL || "mongodb+srv://udemy:Npd97*93@cluster0.zpycx.mongodb.net/codeudemy?retryWrites=true&w=majority" || "mongod://localhost:27017/codeudemy";

    connect(callBack) {
        console.log("Reconnect");
        try {
            MongoClient.connect(this.url, function (err, client) {
                if (err) throw err;
                console.log("Check value");
                client.db("codeudemy").collection("courses").find().forEach((e) => { console.log(e) });
            })
            MongoClient.connect(this.url, callBack);
        } catch (err) {
            console.log(err);
        }
    }

    async reConnect() {
        try {
            await mongoose.createConnection(this.url);

        } catch (err) {
            throw err;
        }
    }

}

module.exports = new Connection;