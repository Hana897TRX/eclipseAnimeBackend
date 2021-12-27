const mongoose = require("mongoose");
const Anime = require("./../models/Anime");
const Episode = require("./../models/Episodes");

class AnimeService {
  constructor() {
    this.connection = mongoose.connect(
      "mongodb+srv://Hana897TRX:MThelegend1-@eclipseanime.ijyab.mongodb.net/EclipseAnimeDataBase?retryWrites=true&w=majority"
    );
  }

  getTop10Anime() {
    // TODO
  }

  async lastEpisodes() {
    let episodes = await Episode.aggregate([{ $limit : 20 }]).sort({
      lastUpdate: -1,
    }).exec()

    if(episodes) {
        return {
            message : 'sucess',
            data : episodes
        }
    }
    else {
        return {
            error : 'error',
        }
    }
  }

  async saveEpisode(episode, animeName) {
    let register = await Episode.find({
      $and: [
        { animeName: animeName },
        { episodesLanguage: episode.episodeLanguage },
      ],
    }).exec();
    if (register.length > 0) {
      let result = await Episode.updateOne(
        { _id: register[0]._id.toHexString() },
        {
          $push: {
            episodes: [
              {
                episodeNumber: episode.episodeNumber,
                episodeImgPath: episode.episodeImgPath,
                episodeUrl: episode.episodeImgPath,
                episodeDate: episode.episodeDate,
              },
            ],
          },
          lastUpdate: Date.now(),
        }
      ).exec();

      if (result["modifiedCount"] > 0) {
        return {
          message: "success",
          data: "episodes updated",
        };
      } else {
        return {
          error: "error",
          data: "error while updating episodes",
        };
      }
    } else {
      let anime = await Anime.find({ animeName: animeName }).exec();
      if (anime.length > 0) {
        let newEpisodeRecord = new Episode({
          animeName: animeName,
          animeId: anime._id,
          lastUpdate: Date.now(),
          episodesLanguage: episode.episodeLanguage,
          episodes: {
            episodeNumber: episode.episodeNumber,
            episodeImgPath: episode.episodeImgPath,
            episodeUrl: episode.episodeImgPath,
            episodeDate: episode.episodeDate,
          },
        });

        let result = await Episode.insertMany(newEpisodeRecord);

        if (result) {
          return {
            message: "success",
            data: "Created anime episodes succefully",
          };
        } else {
          return {
            error: "error",
            data: "error while updating episodes",
          };
        }
      } else {
        // Return error
        return {
          error: "error",
          data: "Error, you must register an anime before register episodes",
        };
      }
    }
  }

  async saveAnime(animeData) {
    let animeRegister = new Anime({
      animeName: animeData.animeName.toLowerCase(),
      animeTypeId: 1,
      coverUrl: animeData.coverUrl,
      splashArtUrl: animeData.splashArtUrl,
      animeDescription: animeData.animeDescription,
      publishDate: animeData.publishDate || Date.now(),
      status: "finished",
      likes: 0,
      creators: "No data",
    });

    console.log(animeRegister);

    animeRegister.save((error, anime) => {
      if (error)
        return {
          error: "error",
          data: error,
        };
      console.log(anime.animeName + "Anime saved");
    });

    return {
      message: "success",
      data: "Anime saved",
    };
  }

  async searchByName(animeName) {
    let animes = await Anime.aggregate({
        $match : {
            animeName : animeName
        }
    }).exec()

    if(animes) {
        return {
            message : 'success',
            data : animes
        }
    }
    else {
        return {
            message : 'success',
            data : []
        }
    }
  }
}

module.exports = AnimeService;
