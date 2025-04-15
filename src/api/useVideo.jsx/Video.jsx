import BASE_URL from "../../../config"
import axios from "axios";
export const getAllPostedVideos = async (type) => {
  try {
   
    const response = await fetch(`${BASE_URL}/api/videos/list`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        type: type
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to fetch videos");
    }

    return data; 
  } catch (error) {
    console.error("Error fetching posted videos:", error.message);
    return { error: error.message };
  }
};


export const getRelatedVideos = async (videoId) => {
  try {
    const response = await axios.get(`${BASE_URL}/api/social/videos/${videoId}/related`);
    return response.data; 
  } catch (error) {
    console.error("Error fetching posted videos:", error.message);
    return { error: error.message };
  }
};

export const deleteVideo = async (videoId) => {
  try {
    const response = await axios.get(`${BASE_URL}/api/social/videos/${videoId}/related`);
    return response.data; 
  } catch (error) {
    console.error("Error deleted posted videos:", error.message);
    return { error: error.message };
  }
};
