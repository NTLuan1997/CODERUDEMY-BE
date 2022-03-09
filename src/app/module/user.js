const mongoose = require('mongoose');

let url = process.env.DATABASE_URL || "mongodb://localhost:27017";


async function connect() {
    try {
        await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log("Connect successfuly!!!");

    } catch (err) {
        console.log("Connect failed!!!");
        throw err;
    }
}

module.exports = { connect };