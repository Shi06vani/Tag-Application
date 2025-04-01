import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from 'react-native';
import {styled} from 'nativewind';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getFollowingList} from '../api/useFollow/FollowUser';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledImage = styled(Image);
const StyledTouchableOpacity = styled(TouchableOpacity);

const Following = () => {
  const [followers, setFollowers] = useState([]);

  useEffect(() => {
    AsyncStorage.getItem('loginuser_id')
      .then(userId => {
        console.log(userId);
        if (userId) {
          fetchFollowingList(userId);
        }
      })
      .catch(error => {
        console.error('Error retrieving login user ID:', error);
      });
  }, []);

  const fetchFollowingList = async userId => {
    try {
      const result = await getFollowingList(userId);
      if (!result.error) {
        setFollowers(result.following);
      }
    } catch (error) {
      console.error('Error fetching following list:', error);
    }
  };

  return (
    <StyledView className="flex-1 bg-white">
      {/* <StyledText className="text-xl font-bold text-black px-4 py-2">
        Following
      </StyledText> */}

      <View>
        {followers && followers.length > 0 ? (
          <FlatList
            data={followers}
            keyExtractor={item => item._id}
            renderItem={({item}) => (
              <StyledView className="flex-row items-center px-4 py-3 border-b border-gray-200">
                <StyledImage
                  source={{uri: item.image}}
                  className="w-12 h-12 rounded-full"
                />

                {/* User Info */}
                <StyledView className="flex-1 ml-3">
                  <StyledText className="text-black font-semibold">
                    {item.name}
                  </StyledText>
                  <StyledText className="text-gray-500">
                    {item.email}
                  </StyledText>
                </StyledView>

                {/* Message Button */}
                <StyledTouchableOpacity>
                  <StyledText className="bg-gray-200 p-1.5 rounded-md">
                    Message
                  </StyledText>
                </StyledTouchableOpacity>
              </StyledView>
            )}
          />
        ) : (
          <StyledView className="flex items-center justify-center h-64">
            <StyledText className="text-gray-500 text-lg">
              No Followers Found
            </StyledText>
          </StyledView>
        )}
      </View>
    </StyledView>
  );
};

export default Following;

{
  /* <View>
        <FlatList
          data={followers}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <StyledView className="flex-row items-center px-4 py-3 border-b border-gray-200">
              <StyledImage
                source={{ uri: item.image }}
                className="w-12 h-12 rounded-full"
              />
              
              <StyledView className="flex-1 ml-3">
                <StyledText className="text-black font-semibold">{item.name}</StyledText>
                <StyledText className="text-gray-500">{item.email}</StyledText>
              </StyledView>

              <StyledTouchableOpacity>
              <StyledText className="bg-gray-200 p-1.5 rounded-md">
                Meassage
                </StyledText>
              </StyledTouchableOpacity>
           
            </StyledView>
          )}
        />
        </View> */
}
