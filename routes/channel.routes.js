import express from "express"
import { createChannel, getMyChannel, getChannelById } from "../controllers/channel.controller.js"
import { verifyToken } from "../middleware/jwt.middleware.js"

const router = express.Router()

//  CREATE CHANNEL (protected)
router.post("/", verifyToken, createChannel)

//  GET MY CHANNEL (protected)
router.get("/me", verifyToken, getMyChannel)

//  GET CHANNEL BY ID (public)
router.get("/:id", getChannelById)

export default router