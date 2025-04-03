
import BASE_URL from "../../../config"


export const userProfileInfo = async (userId) => {
    try {
      const response = await fetch(`${BASE_URL}/api/auth/profile/${userId}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching brand info:', error);
      return null;
    }
  };