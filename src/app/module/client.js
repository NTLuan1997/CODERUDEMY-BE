const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Client = new Schema({
    Address: String,
    DateOfBirth: Date,
    Email: String,
    Name: String,
    Password: String,
    Gender: String,
    registerCourse: Array,
    Phone: String,
    Thumbnail: String
})

module.exports = mongoose.model("Client", Client);