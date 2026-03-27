import express from "express"

import {
  getVideos,
  getVideoById,
  createVideo,
  updateVideo,
  deleteVideo,
  likeVideo,
  dislikeVideo
} from "../controllers/video.controller.js"

import { verifyToken } from "../middleware/jwt.middleware.js"

const router = express.Router()

router.get("/", getVideos)
router.get("/:id", getVideoById)



//  Create video 
router.post("/", verifyToken, createVideo)

// Update video 
router.put("/:id", verifyToken, updateVideo)

//  Delete video 
router.delete("/:id", verifyToken, deleteVideo)


//  Like video
router.post("/:id/like", verifyToken, likeVideo)

//  Dislike video
router.post("/:id/dislike", verifyToken, dislikeVideo)


export default router