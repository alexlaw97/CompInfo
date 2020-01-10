var mongoose = require('mongoose');

var infoSchema = new mongoose.Schema({
    keyword: String,
    info: Object,
    country : String
})

var compinfo = mongoose.model('compinfo', infoSchema, 'ArticleInfo');
module.exports = compinfo;
