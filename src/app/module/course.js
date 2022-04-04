const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Courses = new Schema({
    "courseName": String,
    "author": String,
    "type": String,
    "unit": Number,
    "createDate": Date,
    "updateDate": Date,
    "description": String,
    "thumbnail": String
})

module.exports = mongoose.model("Course", Courses);