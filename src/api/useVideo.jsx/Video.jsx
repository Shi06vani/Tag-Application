import { use } from "react";
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


export const deleteVideo = async (videoId, userId) => {
  try {
    const response = await axios.delete(`${BASE_URL}/api/videos/delete/${videoId}`, 
      {
        data: {
          userId: userId,
        },
      },);

    return response.data;
  } catch (error) {
    console.error('Error deleting posted video:', error.message);
    return { error: error.message };
  }
};


export const isVideoLiked = async (videoId, userId) => {
  try {
    const response = await axios.get(`${BASE_URL}/api/social/videos/${videoId}/isliked/${userId}`);
    return response.data; // Assume backend returns { liked: true/false }
  } catch (error) {
    console.error('Error checking if video is liked:', error);
    throw error;
  }
};


export const searchVideos = async (searchText) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/videos/search`, {
      search: searchText
    });

    if (response.data) {
      return response.data; 
    } else {
    
      return console.warn('No videos found');
    }
  } catch (error) {
    return  console.error('Search API error:', error);
    ;
  }
};