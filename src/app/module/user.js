const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Users = new Schema(
    {
        "Name": String,
        "Password": String,
        "Email": String,
        "Status": Boolean,
        "DateOfBirth": Date,
        "Role": String,
    });

module.exports = mongoose.model("Users", Users);
