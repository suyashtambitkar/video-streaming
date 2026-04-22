const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const jwtVerify = require("../Utils/JwtVerify");
const video = require("../Models/Video");
const User = require("../Models/Users");
const Video = require("../Models/Video");


// get current user
router.get("/user", jwtVerify, async (req, res) => {
   const userId = req.user;
   const getUser = await User.findById(userId);
   return res.status(201).json(getUser);
})

// Upload Video
router.post("/uploadVideo", jwtVerify, async (req, res) => {
   const UserId = req.user;
   const { Title, Description, Thumbnail, FilePath } = req.body;

   if (!Title || !Description || !Thumbnail || !FilePath) {
      return res.status(403).json({ err: "video data not available" });
   }

   const createVideo = { Title, Description, Thumbnail, FilePath, Artist: new mongoose.Types.ObjectId(UserId) };
   const videoToSend = await video.create(createVideo);
   return res.status(201).json(videoToSend);
});

// Get All Videos
router.get("/getAllVideos", jwtVerify, async (req, res) => {
   
   const allVideos = await video.aggregate([
      { $sample: { size: 50 } } // shuffle ALL videos
    ]);

    const populatedVideos = await video.populate(allVideos, {
      path: "Artist",
    });
   return res.status(201).json(populatedVideos);
});

// get play video
router.get("/play/:id", jwtVerify, async (req, res) => {
   const videoId = req.params.id;

   const currentVideo = await video.findById(videoId).populate("Artist");

   // Get 6 random videos EXCEPT the current one
   const relatedVideos = await video.aggregate([
      {
         $match: {
            _id: { $ne: new mongoose.Types.ObjectId(videoId) }
         }
      },
      { $sample: { size: 6 } }
   ]);

   // Populate Artist in related videos
   await video.populate(relatedVideos, { path: "Artist" });

   return res.status(200).json({
      currentVideo,
      relatedVideos
   });
})

//get Profile data 
router.get("/profile", jwtVerify, async (req, res) => {
   const userId = req.user;
   const user = await User.findById(userId);
   if (!user) {
      return res.status(404).json({ err: "User not found" });
   }
   return res.status(201).json(user);
})

// get owned video
router.get("/myVideos", jwtVerify, async (req, res) => {
   const ArtistId = req.user;
   const allVideos = await video.find({ Artist: ArtistId }).populate("Artist");
   return res.status(202).json(allVideos);
});

//Get searched video
router.get("/search/:videoSearch", jwtVerify, async (req, res) => {
   const { videoSearch } = req.params;
   const regexPattern = new RegExp(videoSearch, 'i');
   const allVideos = await video.find({ Title: { $regex: regexPattern } }).populate("Artist");
   return res.status(202).json(allVideos);
});

//Save the video 
router.post("/saveVideo/:videoId", jwtVerify, async (req, res) => {
   const { videoId } = req.params;
   const userId = req.user;
   const user = await User.findById(userId);
   const video = await Video.findById(videoId);
   if (!user) {
      return res.status(404).json({ err: "User not found" });
   }

   if (user.SavedVideos.includes(videoId)) {
      return res.status(200).json({ message: "Video already saved" });
   }

   user.SavedVideos.push(videoId);
   await user.save();

   video.SavedVideosUser.push(userId);
   await video.save();

   return res.status(200).json({ message: "Video saved successfully" });
});


// Get saved videos
router.get("/savedVideos", jwtVerify, async (req, res) => {
   const userId = req.user;
   const user = await User.findById(userId).populate({ path: "SavedVideos", populate: { path: "Artist" } });
   if (!user) {
      return res.status(404).json({ err: "User not found" });
   }
   return res.status(200).json(user.SavedVideos);
});

// Delete saved videos 
router.delete("/unsaveVideo/:videoId", jwtVerify, async (req, res) => {
   const userId = req.user;
   const { videoId } = req.params;

   const user = await User.findById(userId);
   const video = await Video.findById(videoId);

   if (!user) {
      return res.status(404).json({ err: "User not found" });
   }

   user.SavedVideos = user.SavedVideos.filter(id => id.toString() !== videoId);
   await user.save();

   video.SavedVideosUser = video.SavedVideosUser.filter(id => id.toString() !== userId);
   await video.save();

   return res.status(200).json({ message: "video Removed" });
});


module.exports = router;
