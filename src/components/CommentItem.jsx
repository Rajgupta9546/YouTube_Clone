import { useState } from "react"

function CommentItem({comment,onDelete,onEdit}){

const [editing,setEditing] = useState(false)
const [text,setText] = useState(comment.text)

return(

<div className="comment">

{editing ? (
<>
<input value={text} onChange={(e)=>setText(e.target.value)}/>
<button onClick={()=>{
onEdit(comment.id,text)
setEditing(false)
}}>Save</button>
</>
):(
<p>{comment.text}</p> 
)}

<div className="comment-actions">

<button onClick={()=>setEditing(!editing)}>Edit</button>
<button onClick={()=>onDelete(comment.id)}>Delete</button>

</div>

</div>

)

}

export default CommentItem