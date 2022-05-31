const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Units = new Schema({
    CourseId: String,
    Name: String,
    AmountLesson: Number,
    Status: Boolean,
    CreateDate: Date,
    UpdateDate: Date
});

module.exports = mongoose.model("Unit", Units);