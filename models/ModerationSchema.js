let mongoose = require('mongoose');

let ModerationSchema = new mongoose.Schema({
    userID: {type: String, required: true},
    guildID: {type: String, required: true},
    warnings: {type: Array, default: []}
});

let model = mongoose.model('moderation', ModerationSchema);

module.exports = model;