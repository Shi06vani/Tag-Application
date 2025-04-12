import BASE_URL from "../../config"
import axios from 'axios';


export const postComment = async (videoId, userId, commentText) => {
    try {
      const url = `${BASE_URL}/api/social/videos/${videoId}/comments`;
  
      const payload = {
        userId: userId,
        text: commentText
      };
  
      const response = await axios.post(url, payload);
  
      return response.data; 
    } catch (error) {
      console.error("Error posting comment:", error?.response?.data || error.message);
      return null;
    }
  };

  export const getVideoComments = async (videoId) => {
    try {
      const url = `${BASE_URL}/api/social/videos/${videoId}/comments`;
      const response = await axios.get(url);
  
      return response.data; // array of comments or whatever the backend returns
    } catch (error) {
      console.error("Error fetching comments:", error?.response?.data || error.message);
      return [];
    }
  };