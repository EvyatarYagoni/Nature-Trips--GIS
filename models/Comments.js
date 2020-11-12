const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    username: String,
    email: String,
    date: String,
    text: String
});

module.exports = mongoose.model("Comments", commentSchema);