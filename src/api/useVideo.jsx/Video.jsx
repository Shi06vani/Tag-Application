import BASE_URL from "../../../config"

export const getAllPostedVideos = async () => {
  try {
    const response = await fetch(`${BASE_URL}/api/videos/list`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
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
