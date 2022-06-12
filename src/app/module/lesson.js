const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Lessons = new Schema({
    Content: String,
    CreateDate: Date,
    Name: String,
    Status: Boolean,
    Thumbnail: String,
    UnitId: String,
    UpdateDate: Date,
});

module.exports = mongoose.model("Lessons", Lessons);