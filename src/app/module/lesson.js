const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Lessons = new Schema({
    unitId: String,
    lessonName: String,
    lessonContent: String,
    status: Boolean,
    thumbnail: String,
    createDate: Date,
    updateDate: Date
});

module.exports = mongoose.model("Lessons", Lessons);