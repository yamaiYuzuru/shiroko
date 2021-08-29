let mongoose = require('mongoose');

let UserSchema = new mongoose.Schema({
    userID: {type: String, required: true},
    prefixes: {type: Array, default: ["s$"]},
    joinedTimestamp: {type: Number, required: true},
    joinedDate: {type: Date, default: Date.now()}
});

let model = mongoose.model('user', UserSchema);

module.exports = model;
