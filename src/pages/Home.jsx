import { useEffect, useState } from "react"
import CategoryFilter from "../components/CategoryFilter"
import VideoCard from "../components/VideoCard"
import API from "../api/axios"
import "../styles/home.css"

function Home({ searchTerm, selectedCategory, setSelectedCategory }) {

  const [videos, setVideos] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {

    const fetchVideos = async () => {
      try {
        setLoading(true)

        let url = "/videos"

        const params = new URLSearchParams()

        if (searchTerm) params.append("search", searchTerm)
        if (selectedCategory) params.append("category", selectedCategory)

       if ([...params].length > 0) {
        url += `?${params.toString()}`
        }

        console.log("API URL", url)

        const res = await API.get(url)

        console.log("VIDEOS DATA", res.data)

        if (Array.isArray(res.data)) {
          setVideos(res.data)
        } else {
          setVideos([])
        }

      } catch (err) {
        console.log("ERROR", err.message)
        setVideos([]) 
      } finally {
        setLoading(false)
      }
    }

    fetchVideos()

  }, [searchTerm, selectedCategory])

  return (

    <div className="home">

      {/*  Category Filter */}
      <CategoryFilter setSelectedCategory={setSelectedCategory} />

      {/*  Loading */}
      {loading && <h2>Loading...</h2>}

      <div className="video-grid">

        {/*  No Videos */}
        {!loading && videos.length === 0 && (
          <h2 style={{ textAlign: "center", marginTop: "20px" }}>
            No Videos Found 
          </h2>
        )}

        {/* Videos */}
        {videos.map((video) => (
          <VideoCard key={video._id} video={video} />
        ))}

      </div>

    </div>

  )
}

export default Home