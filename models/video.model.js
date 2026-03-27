import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({

title:String,
description:String,
thumbnailUrl:String,
videoUrl:String,
category:String,

views:{
type:Number,
default:0
},

likes:{
type:Number,
default:0
},

dislikes:{
type:Number,
default:0
},

channel: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "Channel"
}

},{timestamps:true});

export default mongoose.model("Video",videoSchema);