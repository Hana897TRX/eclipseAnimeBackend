const mongoose = require("mongoose");
const Anime = require("./../models/Anime");
const Episode = require("./../models/Episodes");
const StatusCodes = require('./../Utils/StatusCodes')

class AnimeService {
  constructor() {
    this.connection = mongoose.connect(
      "mongodb+srv://EclipseAPI:Zlnvx2j0bthPy8LO@eclipseanime.ijyab.mongodb.net/EclipseAnimeDataBase?retryWrites=true&w=majority"
    );
  }

  getTop10Anime() {
    // TODO
  }

  async getEpisodes(animeId) {
    let animeInfoEpisode = await Episode.find({
        animeId : animeId
    },
    {
      "episodes" : 1
    }
    ).limit(1).exec()

    if(animeInfoEpisode) {
      return {
        message : 'success',
        code : StatusCodes.OK,
        data : animeInfoEpisode
      }
    }
    else {
      return {
        message : 'Episodes not found',
        code : StatusCodes.OK,
        data : []
      }
    }
  }

  async lastEpisodes() {
    let episodes = await Anime.aggregate([{ $limit : 20 }]).sort({
      lastUpdate: -1,
    }).exec()

    if(episodes) {
        return {
            message: 'success',
            code: StatusCodes.OK,
            data: episodes
        }
    }
    else {
        return {
          message : 'error getting last episodes data',
          code: StatusCodes.ErrorGettingData,
          data: [],
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
                episodeUrl: episode.episodeUrl,
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
          code: StatusCodes.OK,
          data: "episodes updated",
        };
      } else {
        return {
          message: "error while updating episodes",
          code : StatusCodes.ErrorWhileUpdating,
          data: [],
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
            episodeUrl: episode.episodeUrl,
            episodeDate: episode.episodeDate,
          },
        });

        let result = await Episode.insertMany(newEpisodeRecord);

        if (result) {
          return {
            message: "Created anime episodes succefully",
            code: StatusCodes.OK,
            data: result,
          };
        } else {
          return {
            message: "error while creating episode register.",
            code:  StatusCodes.AnimeMustBeRegister,
            data: [],
          };
        }
      } else {
        return {
          message: "Error, you must register an anime before register episodes",
          code: StatusCodes.AnimeMustBeRegister,
          data: [],
        };
      }
    }
  }

  async saveAnime(animeData) {
    let animeRegister = new Anime({
      animeName: animeData.animeName.toLowerCase(),
      alternaTitle : animeData.alternaTitle,
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
          message: "error :" + error,
          code: StatusCodes.AnimeSaveError,
          data: [],
        };
      console.log(anime.animeName + "Anime saved");
    });

    return {
      message: "Anime saved",
      code: StatusCodes.OK,
      data: [],
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
            code: StatusCodes.OK,
            data : animes
        }
    }
    else {
        return {
            message : 'success',
            code: StatusCodes.OK,
            data : []
        }
    }
  }
}

module.exports = AnimeService;
