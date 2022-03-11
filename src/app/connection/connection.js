const { MongoClient } = require('mongodb');
const mongoose = require('mongoose');

class Connection {
    constructor() { }

    // local = "mongodb://localhost:27017";
    // cloud = process.env.DATABASE_URL;
    url = process.env.DATABASE_URL || "mongodb://localhost:27017";

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
        let URL = "mongodb+srv://udemy:Npd97*93@cluster0.zpycx.mongodb.net/codeudemy?retryWrites=true&w=majority" || "mongod://localhost:27017/codeudemy";
        try {
            await mongoose.connect(URL);
            console.log("Connect successful!!");

        } catch (err) {
            console.log("Connect fail!!");
            throw err;
        }
    }

}

module.exports = new Connection;