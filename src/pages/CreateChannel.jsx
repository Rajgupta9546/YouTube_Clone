import React, { useState } from "react";
import axios from "axios";

const CreateChannel = () => {

  const [channelName, setChannelName] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {

    const token = localStorage.getItem("token")

    if (!token) {
      alert("Login first ")
      return
    }

    const res = await axios.post(
      "http://localhost:5000/api/channel",
      { channelName, description },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    alert("Channel Created ");

  } catch (err) {
    console.log(err.response?.data || err.message)
    alert(err.response?.data || "Error creating channel ");
  }
};

  return (
    <div style={{ padding: "20px" }}>
      <h2>Create Channel</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Channel Name"
          value={channelName}
          onChange={(e) => setChannelName(e.target.value)}
        />

        <br /><br />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <br /><br />

        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default CreateChannel;