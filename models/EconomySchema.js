let mongoose = require('mongoose');

let EconomySchema = new mongoose.Schema({
    userID: {type: String, required: true},
    creditpoint: {type: Number, default: 100},
    items: {type: Array, default: ['ba0']},
    lastDaily: {type: Date},
    dailyStreak: {type: Number, default: 0}
});

let model = mongoose.model('economy', EconomySchema, 'economy');

module.exports = model;