import { useState } from "react"
import { useNavigate } from "react-router-dom"
import API from "../api/axios"
import "../styles/auth.css"

function Register(){

const [username,setUsername] = useState("")
const [email,setEmail] = useState("")
const [password,setPassword] = useState("")

const navigate = useNavigate()

const handleRegister = async (e)=>{
e.preventDefault()

if(!username || !email || !password){
alert("Fill all fields")
return
}

try{

await API.post("/auth/register",{
username,
email: email.toLowerCase(),
password
})

alert("Registered Successfully")
navigate("/login")

}catch(err){
alert("Error")
console.log(err)
}
}

return(

<div className="auth-container">

<form className="auth-box" onSubmit={handleRegister}>

<h2>Register</h2>

<input 
placeholder="Username"
value={username}
onChange={(e)=>setUsername(e.target.value)}
/>

<input 
type="email"
placeholder="Email"
value={email}
onChange={(e)=>setEmail(e.target.value)}
/>

<input 
type="password"
placeholder="Password"
value={password}
onChange={(e)=>setPassword(e.target.value)}
/>

<button type="submit">Register</button>

</form>

</div>

)

}

export default Register