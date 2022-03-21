const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Courses = new Schema({
    "author": String,
    "type": String,
    "coin": Number,
    "courseName": String,
    "createDate": Date,
    "description": String,
    "thumbnail": String,
    "updateDate": Date
})

module.exports = mongoose.model("Course", Courses);