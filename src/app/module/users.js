const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Users = new Schema({
    // "_id": ObjectId,
    "user_name": String,
    "password": String,
    "email": String,
    "status": String,
    "age": String,
    "skills": String
});

module.exports = mongoose.model("Users", Users);
