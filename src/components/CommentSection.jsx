import { useEffect, useState } from "react"
import API from "../api/axios"

function CommentSection({ videoId }) {

  const [comments, setComments] = useState([]) // ✅ fixed
  const [text, setText] = useState("")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchComments()
  }, [videoId])

  const fetchComments = async () => {
    try {
      const res = await API.get(`/comments/${videoId}`)
      setComments(res.data)
    } catch (err) {
      console.log(err)
    }
  }

  const addComment = async () => {
    if (!text.trim()) {
      alert("Write something")
      return
    }

    try {
      setLoading(true)

      const res = await API.post("/comments", {
        text: text,   // ✅ FIX
        video: videoId
      })

      setComments([res.data, ...comments])
      setText("")

    } catch (err) {
      alert("Login required")
    } finally {
      setLoading(false)
    }
  }

  const deleteComment = async (id) => {
    try {
      await API.delete(`/comments/${id}`)
      setComments(comments.filter(c => c._id !== id))
    } catch (err) {
      alert("Delete failed")
    }
  }

  return (
    <div style={{ marginTop: "20px" }}>

      <h3>Comments</h3>

      <div style={{ display: "flex", gap: "10px" }}>
        <input
          placeholder="Add comment"
          type="text"
          value={text} // ✅ FIX
          onChange={(e) => setText(e.target.value)} // ✅ FIX
          style={{ flex: 1, padding: "8px" }}
        />

        <button onClick={addComment}>
          {loading ? "Adding..." : "Add"}
        </button>
      </div>

      {comments.length === 0 && <p>No comments yet</p>}

      {comments.map(c => (
        <div key={c._id} style={{ marginTop: "12px" }}>
          <p>{c.text}</p>
          <button onClick={() => deleteComment(c._id)}>Delete</button>
        </div>
      ))}

    </div>
  )
}

export default CommentSection