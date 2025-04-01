import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity, FlatList, ScrollView } from "react-native";
import { styled } from "nativewind";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getFollowers, getFollowingList } from "../../api/useFollow/FollowUser";

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledImage = styled(Image);
const StyledTouchableOpacity = styled(TouchableOpacity);



const followers = [
  {
    id: "1",
    name: "John Doe",
    username: "john_doe",
    image: "https://randomuser.me/api/portraits/men/1.jpg",
    isFollowing: true,
  },
  {
    id: "2",
    name: "Emily Smith",
    username: "emily_smith",
    image: "https://randomuser.me/api/portraits/women/2.jpg",
    isFollowing: false,
  },
  {
    id: "3",
    name: "Michael Brown",
    username: "michael_brown",
    image: "https://randomuser.me/api/portraits/men/3.jpg",
    isFollowing: false,
  },
];

const BrandFollowers = ({route}) => {

  const {brand_id} = route.params;
  const [isFollowing, setIsFollowing] = useState(false);
  const [followers, setFollowers] = useState([]);

  useEffect(() => {
    fetchFollowingList();

  }, []);

  const fetchFollowingList = async () => {
    try {
      const result = await getFollowers(brand_id);
      if (!result.error) {

        setFollowers(result.followers);
        // setIsFollowing(result.includes(brand.id)); 
      }
    } catch (error) {
      console.error("Error fetching following list:", error);
    }
  };



  return (
    <StyledView className="flex-1 bg-white">
      {/* <StyledText className="text-xl font-bold text-black px-4 py-2">
       Br Following
      </StyledText> */}
      
        <View>
        <FlatList
          data={followers}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <StyledView className="flex-row items-center px-4 py-3 border-b border-gray-200">
              <StyledImage
                source={{ uri: item.image }}
                className="w-12 h-12 rounded-full"
              />
              
              {/* User Info */}
              <StyledView className="flex-1 ml-3">
                <StyledText className="text-black font-semibold">{item.name}</StyledText>
                <StyledText className="text-gray-500">{item.email}</StyledText>
              </StyledView>

              {/* Follow/Following Button */}
              <StyledTouchableOpacity>
              <StyledText className="bg-gray-200 p-1.5 rounded-md">
                Meassage
                </StyledText>
              </StyledTouchableOpacity>
           
            </StyledView>
          )}
        />
        </View>
      
    </StyledView>
  );
};

export default BrandFollowers;

