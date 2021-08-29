let mongoose = require('mongoose');

let ShirokoSchema = new mongoose.Schema({
    clientID: {type: String, required: true},
    usedCommands: {type: Number, default: 0},
    botBannedUsers: {type: Array, default: []}
});

let model = mongoose.model('shiroko', ShirokoSchema, 'shiroko');

module.exports = model;