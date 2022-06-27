const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Courses = new Schema({
    "Name": String,
    "Author": String,
    "Type": String,
    "Unit": Number,
    "CreateDate": Date,
    "UpdateDate": Date,
    "Description": String,
    "Thumbnail": String,
    "Register": Number,
    "Status": Boolean
})

module.exports = mongoose.model("Course", Courses);