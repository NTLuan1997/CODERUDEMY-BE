const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Users = new Schema({
    "user_name": String,
    "password": String,
    "email": String,
    "status": String,
    "age": String,
    "skills": String
});

module.exports = mongoose.model("Users", Users);
