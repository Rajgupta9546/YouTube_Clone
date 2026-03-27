import { useState } from "react"
import { useNavigate } from "react-router-dom"
import API from "../api/axios"
import "../styles/auth.css"

function Login({ setUser }) {

const [email,setEmail] = useState("")
const [password,setPassword] = useState("")
const [loading,setLoading] = useState(false)

const navigate = useNavigate()

const handleLogin = async (e)=>{
e.preventDefault()

if(!email || !password){
alert("Fill all fields")
return
}

try{

setLoading(true)

const res = await API.post("/auth/login",{
email: email.trim().toLowerCase(),
password: password.trim()
})

//  SAVE TOKEN
const userData = {
  ...res.data.user,
  token: res.data.token
}

localStorage.setItem("user", JSON.stringify(userData))

setUser(userData)

alert("Login Successful ")

navigate("/")

}catch(err){
console.log(err)
alert(err.response?.data || "Login failed ")
}finally{
setLoading(false)
}
}

return(

<div className="auth-container">

<form className="auth-box" onSubmit={handleLogin}>

<h2>Login</h2>

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

<button type="submit">
{loading ? "Logging..." : "Login"}
</button>

<p onClick={()=>navigate("/register")}>
Create account
</p>

</form>

</div>

)

}

export default Login