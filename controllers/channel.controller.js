import Channel from "../models/channel.model.js";
import Video from "../models/video.model.js";
import User from "../models/user.model.js";

//  CREATE CHANNEL + SAVE IN USER
export const createChannel = async (req, res) => {
  try {

    
    const existing = await Channel.findOne({ owner: req.user.id });

    if (existing) {
      return res.status(400).json("Channel already exists");
    }

    
    const channel = await Channel.create({
      channelName: req.body.channelName,
      description: req.body.description,
      owner: req.user.id
    });

    
    await User.findByIdAndUpdate(req.user.id, {
      channelId: channel._id
    });

    res.json(channel);

  } catch (err) {
    res.status(500).json(err.message);
  }
};


export const getMyChannel = async (req, res) => {
  try {

    const channel = await Channel.findOne({ owner: req.user.id });

    res.json(channel);

  } catch (err) {
    res.status(500).json(err.message);
  }
};


export const getChannelById = async (req, res) => {
  try {

    const channel = await Channel.findById(req.params.id);

    const videos = await Video
      .find({ channel: req.params.id })
      .sort({ createdAt: -1 });

    res.json({ channel, videos });

  } catch (err) {
    res.status(500).json(err.message);
  }
};