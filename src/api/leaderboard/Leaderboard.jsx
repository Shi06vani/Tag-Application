import BASE_URL from "../../../config"


export const getLeaderboard = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/auth/leaderboard`);
      if (!response.ok) {
        throw new Error('Failed to fetch leaderboard');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
      return [];
    }
  };
  