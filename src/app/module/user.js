const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Users = new Schema(
    {
        Name: String,
        DateOfBirth: Date,
        Email: String,
        Password: String,
        Gender: String,
        Phone: String,
        Address: String,
        Role: String,
        Status: Boolean
    });

module.exports = mongoose.model("Users", Users);
