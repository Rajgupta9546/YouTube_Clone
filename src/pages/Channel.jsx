import { useEffect, useState } from "react"
import API from "../api/axios"
import "../styles/channel.css"

function Channel({ user }) {

  const [videos, setVideos] = useState([])
  const [editId, setEditId] = useState(null)
  const [newTitle, setNewTitle] = useState("")

  useEffect(() => {
    if (user) fetchVideos()
  }, [user])

  const fetchVideos = async () => {
    try {
      const res = await API.get("/videos")

      const myVideos = res.data.filter(
        (v) => v.channel && v.channel._id === user.channelId
      )

      setVideos(myVideos)

    } catch (err) {
      console.log(err)
    }
  }

  const handleUpdate = async (id) => {
    try {
      await API.put(`/videos/${id}`, { title: newTitle })
      setEditId(null)
      fetchVideos()
    } catch (err) {
      alert("Update failed")
    }
  }

  if (!user) {
    return <h2 style={{ padding: "20px" }}>Login First</h2>
  }

  return (
    <div className="channel">

      <h2>{user.username}'s Channel</h2>

      <div className="channel-videos">

        {videos.length === 0 && <p>No videos yet</p>}

        {videos.map((v) => (
          <div key={v._id} className="video-row">

            {editId === v._id ? (
              <>
                <input
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                />
                <button onClick={() => handleUpdate(v._id)}>Save</button>
              </>
            ) : (
              <>
                <p>{v.title}</p>
                <button onClick={() => {
                  setEditId(v._id)
                  setNewTitle(v.title)
                }}>
                  Edit
                </button>
              </>
            )}

            <button onClick={async () => {
              await API.delete(`/videos/${v._id}`)
              fetchVideos()
            }}>
              Delete
            </button>

          </div>
        ))}

      </div>

    </div>
  )
}

export default Channel