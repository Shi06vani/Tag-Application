import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image, FlatList } from "react-native";
import { styled } from "nativewind";
import { followUser } from "../api/useFollow/FollowUser"; // Assuming you have this function

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledImage = styled(Image);
const StyledTouchableOpacity = styled(TouchableOpacity);

const loggedInUserId = "67e016be9a50bd2709bbc2c2"; 

const dummyUsers = [
  { _id: "67e053780ca3791a112bfc9a", username: "John Doe", avatar: "https://randomuser.me/api/portraits/men/1.jpg" },
  { _id: "67e0567a0ca3791a112bfc9b", username: "Jane Smith", avatar: "https://randomuser.me/api/portraits/women/2.jpg" },
  { _id: "67e0578b0ca3791a112bfc9c", username: "Alice Johnson", avatar: "https://randomuser.me/api/portraits/women/3.jpg" },
  { _id: "67e0589c0ca3791a112bfc9d", username: "Bob Williams", avatar: "https://randomuser.me/api/portraits/men/4.jpg" },
];

const UserListing = () => {
  const [followingList, setFollowingList] = useState([]);

  const handleFollow = async (userId) => {
    const result = await followUser(loggedInUserId, userId);
    if (!result.error) {
      setFollowingList([...followingList, userId]);
    }
  };

  return (
    <StyledView className="flex-1 bg-white p-4">
      <StyledText className="text-lg font-bold text-center mb-4">Suggested Users</StyledText>

      <FlatList
        data={dummyUsers}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <StyledView className="flex-row shadow-lg items-center justify-between bg-purple-50 px-4 py-3 rounded-lg mb-3 ">
            <StyledImage source={{ uri: item.avatar }} className="w-12 h-12 rounded-full" />

            <StyledText className="flex-1 text-base font-semibold ml-3">{item.username}</StyledText>

            <StyledTouchableOpacity
              className={`px-4 py-2 rounded-full ${
                followingList.includes(item._id) ? "bg-gray-400" : "bg-primary"
              }`}
              onPress={() => handleFollow(item._id)}
              disabled={followingList.includes(item._id)}
            >
              <StyledText className="text-white font-medium">
                {followingList.includes(item._id) ? "Following" : "Follow"}
              </StyledText>
            </StyledTouchableOpacity>
          </StyledView>
        )}
      />
    </StyledView>
  );
};

export default UserListing;
