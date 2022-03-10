const mongoose = require('mongoose');

let url = process.env.DATABASE_URL || "mongodb://localhost:27017";


async function connect() {
    console.log("Url connect to db");
    console.log(url);
    try {
        await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log("Connect successfuly!!!");

    } catch (err) {
        console.log("Connect failed!!!");
        throw err;
    }
}

module.exports = { connect };