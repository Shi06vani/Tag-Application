import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity, FlatList, ScrollView } from "react-native";
import { styled } from "nativewind";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getFollowCounts, getFollowers, getFollowingList } from "../../api/useFollow/FollowUser";

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledImage = styled(Image);
const StyledTouchableOpacity = styled(TouchableOpacity);





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
                // source={{ uri: item.image }}
                source={
                  item?.image
                    ? { uri: item?.image }
                    : require('../../assets/Images/default-image.png') // replace with your actual path
                }
                className="w-10 h-10 rounded-full"
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

