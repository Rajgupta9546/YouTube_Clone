import { useState, useEffect } from "react"
import { Routes, Route } from "react-router-dom"

import Header from "./components/Header"
import Sidebar from "./components/Sidebar"
import Home from "./pages/Home"
import VideoPlayer from "./pages/VideoPlayer"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Channel from "./pages/Channel"
import CreateChannel from "./pages/CreateChannel"
import ChannelPage from "./pages/ChannelPage"   

import "./styles/layout.css"

function App(){

const [sidebarOpen,setSidebarOpen] = useState(true)
const [user,setUser] = useState(null)

const [searchTerm,setSearchTerm] = useState("")
const [selectedCategory,setSelectedCategory] = useState("")

useEffect(()=>{
const savedUser = localStorage.getItem("user")
if(savedUser){
setUser(JSON.parse(savedUser))
}
},[])

return(

<div>

<Header 
toggleSidebar={()=>setSidebarOpen(!sidebarOpen)}
user={user}
setSearchTerm={setSearchTerm}
/>

<div className="layout">

<Sidebar 
sidebarOpen={sidebarOpen}
setCategory={setSelectedCategory}
/>

<div className={sidebarOpen ? "content shift":"content"}>

<Routes>

<Route path="/" element={
<Home 
searchTerm={searchTerm}
selectedCategory={selectedCategory}
setSelectedCategory={setSelectedCategory}
/>
}/>

<Route path="/video/:id" element={<VideoPlayer/>}/>

<Route path="/login" element={<Login setUser={setUser}/>}/>
<Route path="/register" element={<Register/>}/>
<Route path="/channel" element={<Channel user={user}/>}/>
<Route path="/create-channel" element={<CreateChannel />} />
<Route path="/channel/:id" element={<ChannelPage />} /> 

</Routes>

</div>

</div>

</div>

)

}

export default App