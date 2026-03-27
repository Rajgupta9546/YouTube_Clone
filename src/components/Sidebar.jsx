import "../styles/sidebar.css"
import { useNavigate } from "react-router-dom"
import {
FaHome,
FaFire,
FaVideo,
FaHistory,
FaClock,
FaThumbsUp,
FaDownload,
FaShoppingBag,
FaMusic,
FaGamepad,
FaNewspaper,
FaFutbol,
FaList
} from "react-icons/fa"

import { MdOutlineAccountCircle } from "react-icons/md"
import { MdOutlineSubscriptions } from "react-icons/md"

function Sidebar({sidebarOpen, setCategory}){

const navigate = useNavigate()

return(

<div className={sidebarOpen ? "sidebar open":"sidebar"}>

<div className="menu-item" onClick={()=>{
setCategory("")
navigate("/")
}}>
<FaHome/>
{sidebarOpen && <span>Home</span>}
</div>

<div className="menu-item" onClick={()=>{
// setCategory("shorts")
navigate("/shorts")
}}>
<FaFire/>
{sidebarOpen && <span>Shorts</span>}
</div>

<div className="menu-item" onClick={()=>{
setCategory("subscriptions")
navigate("/")
}}>
<MdOutlineSubscriptions/>
{sidebarOpen && <span>Subscriptions</span>}
</div>

<div className="menu-item" onClick={()=>{
navigate("/channel")
}}>
<MdOutlineAccountCircle/>
{sidebarOpen && <span>You</span>}
</div>


{sidebarOpen && (
<>

<hr/>

<div className="menu-item"><FaHistory/> <span>History</span></div>
<div className="menu-item"><FaList/> <span>Playlists</span></div>
<div className="menu-item"><FaClock/> <span>Watch later</span></div>
<div className="menu-item"><FaThumbsUp/> <span>Liked videos</span></div>
<div className="menu-item"><FaVideo/> <span>Your videos</span></div>
<div className="menu-item"><FaDownload/> <span>Downloads</span></div>

<hr/>

<h4 className="explore">Explore</h4>


<div className="menu-item" onClick={()=>setCategory("shopping")}>
<FaShoppingBag/> <span>Shopping</span>
</div>

<div className="menu-item" onClick={()=>setCategory("music")}>
<FaMusic/> <span>Music</span>
</div>

<div className="menu-item" onClick={()=>setCategory("gaming")}>
<FaGamepad/> <span>Gaming</span>
</div>

<div className="menu-item" onClick={()=>setCategory("news")}>
<FaNewspaper/> <span>News</span>
</div>

<div className="menu-item" onClick={()=>setCategory("sports")}>
<FaFutbol/> <span>Sports</span>
</div>

</>
)}

</div>

)

}

export default Sidebar