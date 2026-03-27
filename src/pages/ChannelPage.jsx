import { useEffect, useState } from "react";
import API from "../api/axios";
import { Link, useParams } from "react-router-dom";

function ChannelPage() {

  const { id } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchChannel();
  }, [id]);

  const fetchChannel = async () => {
    try {
      const res = await API.get(`/channel/${id}`);
      setData(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const getVideoId = (url) => {
    if (!url) return "";

    if (url.includes("embed/")) {
      return url.split("embed/")[1];
    }

    if (url.includes("watch?v=")) {
      return url.split("watch?v=")[1];
    }

    return "";
  };

  if (!data) return <h2 style={{ padding: "20px" }}>Loading...</h2>;

  return (
    <div style={{ padding: "20px" }}>


      <h2>{data.channel?.channelName || "My Channel"}</h2>
      <p>{data.channel?.description || "No description"}</p>

      <h3 style={{ marginTop: "20px" }}>Videos</h3>

      {data.videos.length === 0 && <p>No videos</p>}

      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
        {data.videos.map((v) => {
          const videoId = getVideoId(v.videoUrl);

          return (
            <Link 
              to={`/video/${v._id}`} 
              key={v._id}
              style={{ textDecoration: "none", color: "black" }}
            >

              <div style={{ width: "250px" }}>

          
                <img
                  src={
                    videoId
                      ? `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`
                      : "https://via.placeholder.com/300x180"
                  }
                  style={{ width: "100%", borderRadius: "10px" }}
                />

                
                <p style={{ marginTop: "8px", fontWeight: "bold" }}>
                  {v.title}
                </p>

              </div>

            </Link>
          );
        })}
      </div>

    </div>
  );
}

export default ChannelPage;