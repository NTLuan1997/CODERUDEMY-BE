const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Users = new Schema(
    {
        "user_name": String,
        "password": String,
        "email": String,
        "status": Boolean,
        "dateOfBirth": Date,
        "role": String,
        "courses": Array
    });

module.exports = mongoose.model("Users", Users);
