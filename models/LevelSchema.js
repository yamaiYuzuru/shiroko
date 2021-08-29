let mongoose = require('mongoose');

let LevelSchema = new mongoose.Schema({
    userID: {type: String, required: true},
    xp: {type: Number, default: 0},
    level: {type: Number, default: 0}
});

let model = mongoose.model('level', LevelSchema);

module.exports = model;