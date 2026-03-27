import "../styles/header.css"
import { FaBars, FaSearch, FaMicrophone, FaVideo } from "react-icons/fa"
import { IoNotificationsOutline } from "react-icons/io5"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import API from "../api/axios"

function Header({toggleSidebar, user, setSearchTerm}){

const navigate = useNavigate()

const [showUpload,setShowUpload] = useState(false)

const [title,setTitle] = useState("")
const [videoUrl,setVideoUrl] = useState("")
const [category,setCategory] = useState("")

return(

<div className="header">

<div className="header-left">

<FaBars className="menu-icon" onClick={toggleSidebar}/>

<img
className="logo"
src="https://upload.wikimedia.org/wikipedia/commons/b/b8/YouTube_Logo_2017.svg"
/>

</div>

<div className="header-search">

<input 
placeholder="Search"
onChange={(e)=>setSearchTerm(e.target.value)}
/>

<button className="search-btn" onClick={()=>{}}>
<FaSearch/>
</button>

<div className="mic">
<FaMicrophone/>
</div>

</div>

<div className="header-right">

{user ? (
  <>
    <FaVideo className="icon" onClick={()=>setShowUpload(true)} />

    <div className="create" onClick={()=> {
      if(user?.channelId){
        navigate(`/channel/${user.channelId}`)
      } else {
        navigate("/create-channel")
      }
    }}>
      <span>Your Channel</span>
    </div>

    <IoNotificationsOutline className="icon" />

    <img
      className="profile"
      src="https://i.pravatar.cc/40"
    />

    {/* ✅ ADD THIS */}
    <button 
      className="logout-btn"
      onClick={() => {
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        window.location.reload()
      }}
    >
      Logout
    </button>

  </>
) : (
<button className="login-btn" onClick={()=>navigate("/login")}>
Sign In
</button>
)}

</div>

{/*  UPLOAD MODAL */}
{showUpload && (
<div className="upload-modal">

<div className="upload-box">

<h3>Upload Video</h3>

<input 
placeholder="Title"
value={title}
onChange={(e)=>setTitle(e.target.value)}
/>

<input 
placeholder="Video URL (YouTube embed link)"
value={videoUrl}
onChange={(e)=>setVideoUrl(e.target.value)}
/>

<input 
placeholder="Category"
value={category}
onChange={(e)=>setCategory(e.target.value)}
/>

<button onClick={async ()=>{

try{

if (!user?.channelId) {
  alert("Create channel first ")
  return
}

await API.post("/videos", {
  title,
  videoUrl,
  category: category.toLowerCase()
})

alert("Uploaded ")
setShowUpload(false)

}catch(err){
alert("Login required ")
}

}}>
Upload
</button>

<button onClick={()=>setShowUpload(false)}>
Cancel
</button>

</div>

</div>
)}

</div>

)

}

export default Header