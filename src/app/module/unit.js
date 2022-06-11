const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Units = new Schema({
    Author: String,
    CourseId: String,
    Description: String,
    Name: String,
    Lesson: Number,
    Status: Boolean,
    CreateDate: Date,
    UpdateDate: Date,
});

module.exports = mongoose.model("Unit", Units);