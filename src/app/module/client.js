const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Client = new Schema({
    Name: String,
    Email: String,
    Password: String,
    Gender: String,
    Phone: String,
    DateOfBirth: Date,
    Address: String,
    Thumbnail: String,
    registerCourse: Array
})

module.exports = mongoose.model("Client", Client);