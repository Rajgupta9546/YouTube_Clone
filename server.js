import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import videoRoutes from "./routes/video.routes.js";
import commentRoutes from "./routes/comment.routes.js";
import authRoutes from "./routes/auth.routes.js";
import channelRoutes from "./routes/channel.routes.js";

dotenv.config();

const app = express();

app.use(cors({
  origin: ["http://localhost:5173"],
  credentials: true
}));

app.use(express.json());

// ROUTES
app.use("/api/videos", videoRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/channel", channelRoutes);

mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log("MongoDB Connected "))
.catch(err=>console.log(err));

app.listen(process.env.PORT,()=>{
console.log("Server running on port",process.env.PORT);
});