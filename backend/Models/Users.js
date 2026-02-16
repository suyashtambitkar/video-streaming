const mongoose = require("mongoose");

const User = new mongoose.Schema({
    Fullname: {
        type: String,
        required: true
    },
    Username: {
        type: String,
        required: true
    },
    Profileimg: {
        type:String,
        required:true
    },
    Email: {
        type: String,
        required: true
    },
    Password: {
        type: String,
        required: true
    },
    SavedVideos: [
        {
            type: mongoose.Types.ObjectId,
            ref: "videos"
        }
    ]
});

module.exports = mongoose.model("users", User);