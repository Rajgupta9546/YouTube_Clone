import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import API from "../api/axios"
import CommentSection from "../components/CommentSection"
import "../styles/videoPlayer.css"

function VideoPlayer(){

const { id } = useParams()
const [video,setVideo] = useState(null)

//  DIRECT FETCH
useEffect(()=>{
API.get(`/videos/${id}`)
.then(res=>setVideo(res.data))
.catch(err=>console.log(err))
},[id])

const handleLike = async () => {
  try {
    const res = await API.post(`/videos/${id}/like`)
    setVideo(res.data)
  } catch (err) {
    alert("Login required")
  }
}

const handleDislike = async () => {
  try {
    const res = await API.post(`/videos/${id}/dislike`)
    setVideo(res.data)
  } catch (err) {
    alert("Login required")
  }
}

if(!video) return <h2>Loading...</h2>

return(

<div className="video-player">

<iframe
width="100%"
height="600"
src={video.videoUrl}
title="video"
allowFullScreen
/>

<h2>{video.title}</h2>

<p>{video.channel?.channelName || "Unknown Channel"}</p>

<div className="actions">

<button onClick={handleLike}>👍 {video.likes || 0}</button>
<button onClick={handleDislike}>👎 {video.dislikes || 0}</button>

</div>

<CommentSection videoId={id}/>

</div>

)

}

export default VideoPlayer