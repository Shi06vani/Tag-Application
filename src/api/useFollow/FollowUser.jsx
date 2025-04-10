import BASE_URL from '../../../config';

export const followUser = async (loggedInUserId, followUserId) => {
  try {
    const response = await fetch(
      `${BASE_URL}/api/friend/follow/${followUserId}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({userId: loggedInUserId}),
      },
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to follow user');
    }

    return data;
  } catch (error) {
    console.error('Error following user:', error.message);
    return {error: error.message};
  }
};

export const unfollowUser = async (loggedInUserId, unfollowUserId) => {
  try {
    const response = await fetch(
      `${BASE_URL}/api/friend/unfollow/${unfollowUserId}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({userId: loggedInUserId}),
      },
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to unfollow user');
    }
    console.log("succesflllly unfollowed",data);

    return data;
  } catch (error) {
    console.error('Error unfollowing user:', error.message);
    return {error: error.message};
  }
};

export const getFollowingList = async loggedInUserId => {
  try {
    const response = await fetch(
      `${BASE_URL}/api/friend/following/${loggedInUserId}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch following list');
    }

    return data;
  } catch (error) {
    console.error('Error fetching following list:', error.message);
    return {error: error.message};
  }
};

export const getFollowers = async userId => {
  try {
    const response = await fetch(`${BASE_URL}/api/friend/followers/${userId}`);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching followers:', error);
    return null;
  }
};

export const getFollowCounts = async userId => {
  try {
    const response = await fetch(
      `${BASE_URL}/api/friend/follow-counts/${userId}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data; // Assuming the API returns follow count in JSON format
  } catch (error) {
    console.error('Failed to fetch follow counts:', error);
    return null;
  }
};
