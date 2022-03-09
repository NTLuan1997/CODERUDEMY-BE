const mongoose = require('mongoose');


// CLOUD
// uri = process.env.MONGODB_URI || "mongodb+srv://codeudemy:Npd97*93@cluster0.g39g6.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
// db = "codeudemy";
// password = "Npd97*93";

// LOCAL
db = "shopping";
password = "";
uri = `mongodb://localhost:27017/shopping`;


async function connect() {
    try {
        await mongoose.connect("mongodb+srv://codeudemy:Npd97*93@cluster0.g39g6.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true });
        console.log("Connect successfuly!!!");

    } catch (err) {
        console.log("Connect failed!!!");
        throw err;
    }
}

module.exports = { connect };