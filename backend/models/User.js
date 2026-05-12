const {default: mongoose} = require("mongoose");

const UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    income: Number
}, {timestamps: true});

module.exports = mongoose.model('User', UserSchema);