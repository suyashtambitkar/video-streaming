const mongoose = require("mongoose");

const Video = mongoose.Schema({
    Title: {
        type: String,
        required: true
    },
    Description: {
        type: String,
        required: true
    },
    Artist: {
        type: mongoose.Types.ObjectId,
        ref: "users"
    },
    Thumbnail: {
        type: String,
        required: true
    },
    FilePath: {
        type: String,
        required: true
    },
    SavedVideosUser: [
        {
            type: mongoose.Types.ObjectId,
            ref: "users"
        }
    ]

})
module.exports = mongoose.model("videos", Video);