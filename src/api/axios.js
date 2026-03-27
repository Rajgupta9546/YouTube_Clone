import axios from "axios"

const API = axios.create({
  baseURL: "http://localhost:5000/api"
})

API.interceptors.request.use((req) => {
  const data = localStorage.getItem("user")

  if (data) {
    const user = JSON.parse(data)
    if (user.token) {
      req.headers.Authorization = "Bearer " + user.token
    }
  }

  return req
})

export default API