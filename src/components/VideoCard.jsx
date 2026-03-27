import { Link } from "react-router-dom"
import "../styles/video.css"

function VideoCard({ video }) {

  const getVideoId = (url) => {
  if (!url) return ""

  if (url.includes("embed/")) {
    return url.split("embed/")[1].split("?")[0]
  }

  if (url.includes("watch?v=")) {
    return url.split("watch?v=")[1].split("&")[0] // ✅ FIX
  }

  return ""
}

  const videoId = getVideoId(video.videoUrl)

  return (
    <Link to={`/video/${video._id}`} className="video-card">

      <img
        src={
  videoId
    ? `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`
    : "https://via.placeholder.com/300x180"
}
        alt="thumbnail"
        className="thumbnail"
      />

      <div className="video-info">

        <div>
          <h4>{video.title || "No Title"}</h4>

          {/* CHANNEL NAME ADD */}
          <p>{video.channel?.channelName || "Unknow Channel"}</p>
          <p>{video.category || "No Category"}</p>
          <p>{video.views || 0} views</p>
        </div>

      </div>

    </Link>
  )
}

export default VideoCard