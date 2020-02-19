var mongoose = require('mongoose');

var emailSchema = new mongoose.Schema({
    date: Date,
    send: String,
    data: Object

})

var emailinfo = mongoose.model('emailinfo', emailSchema, 'email');
module.exports = emailinfo;
