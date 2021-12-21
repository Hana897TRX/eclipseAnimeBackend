var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var animeSchema = new Schema({
    animeName : String,
    animeTypeId : Number,
    coverUrl : String,
    splashArtUrl : String,
    animeDescription : String,
    publishDate: Date,
    status : String,
    likes : Number,
    creators : String
});

module.exports = mongoose.model('animes', animeSchema);      