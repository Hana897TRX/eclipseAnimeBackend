var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var episodeSchema = new Schema({
    animeName : String,
    animeId : String,
    lastUpdate : Date,
    episodesLanguage : String,
    episodes : [{ 
        episodeNumber : Number,
        episodeUrl : String,
        episodeImgPath : String,
        episodeDate : Date
     }]
});

module.exports = mongoose.model('episodes', episodeSchema);    