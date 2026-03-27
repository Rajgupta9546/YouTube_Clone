import Video from "../models/video.model.js"

// ✅ GET ALL VIDEOS
export const getVideos = async (req, res) => {
  try {
    const { search, category } = req.query

    let query = {}

    if (search) {
      query.title = { $regex: search, $options: "i" }
    }

    if (category) {
      query.category = { $regex: `^${category}$`, $options: "i" }
    }

    const videos = await Video
      .find(query)
      .populate("channel", "channelName")
      .sort({ createdAt: -1 })

    res.json(videos)

  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// ✅ GET SINGLE VIDEO
export const getVideoById = async (req, res) => {
  try {
    const video = await Video
      .findById(req.params.id)
      .populate("channel", "channelName")

    if (!video) {
      return res.status(404).json("Video not found")
    }

    // safe increment
    video.views = (video.views || 0) + 1
    await video.save()

    res.json(video)

  } catch (err) {
    res.status(500).json(err.message)
  }
}

// ✅ CREATE VIDEO
export const createVideo = async (req, res) => {
  try {
    if (!req.user?.channelId) {
      return res.status(400).json("Create channel first ❌")
    }

    const video = new Video({
      ...req.body,
      channel: req.user.channelId
    })

    const savedVideo = await video.save()

    res.status(201).json(savedVideo)

  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// ✅ UPDATE VIDEO
export const updateVideo = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id)

    if (!video) {
      return res.status(404).json("Video not found")
    }

    if (video.channel.toString() !== req.user?.channelId) {
      return res.status(403).json("Not allowed")
    }

    const updated = await Video.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    )

    res.json(updated)

  } catch (err) {
    res.status(500).json(err.message)
  }
}

// ✅ DELETE VIDEO
export const deleteVideo = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id)

    if (!video) {
      return res.status(404).json("Video not found")
    }

    if (video.channel.toString() !== req.user?.channelId) {
      return res.status(403).json("Not allowed")
    }

    await video.deleteOne()

    res.json({ message: "Video deleted" })

  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// ✅ LIKE VIDEO (FIXED 🔥)
export const likeVideo = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id)

    if (!video) {
      return res.status(404).json("Video not found")
    }

    // safe increment
    video.likes = (video.likes || 0) + 1

    await video.save()

    res.json(video)

  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// ✅ DISLIKE VIDEO (FIXED 🔥)
export const dislikeVideo = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id)

    if (!video) {
      return res.status(404).json("Video not found")
    }

    // safe increment
    video.dislikes = (video.dislikes || 0) + 1

    await video.save()

    res.json(video)

  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}