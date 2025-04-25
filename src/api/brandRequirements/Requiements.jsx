
import BASE_URL from "../../../config"

export const brandRequirements = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/requirements/list`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching requirements:', error);
      return null;
    }
  };
  


export const BrandInfo = async (brandId) => {
    try {
      const response = await fetch(`${BASE_URL}/api/auth/profile/${brandId}`);
      
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
  
  export const BrandVideos = async (brandId) => {
    try {
      const response = await fetch(`${BASE_URL}/api/videos/user/${brandId}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching brand videos:', error);
      return null;
    }
  };
  