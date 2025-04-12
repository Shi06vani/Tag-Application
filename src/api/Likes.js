import axios from 'axios';
import BASE_URL from "../../config"


export const likeVideo = async (videoId, loginUserId) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/api/social/videos/${videoId}/like`,
      {
        userId: loginUserId,
      },

      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    console.log('Video liked:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error liking video:', error.response?.data || error.message);
    throw error;
  }
};



export const getVideoLikeCount = async (videoId) => {
  try {
    const response = await axios.get(`${BASE_URL}/api/social/videos/${videoId}/likes`);
    
    return response.data;
  } catch (error) {
    console.error('API Error:', error?.response?.data || error.message || error);
  }
};

