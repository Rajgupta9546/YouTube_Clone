import { useState } from "react";

function CommentSection() {
  const [commentText, setCommentText] = useState(""); // ✅ add this

  return (
    <div>
      <input
        type="text"
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
        placeholder="Add a comment"
      />
    </div>
  );
}