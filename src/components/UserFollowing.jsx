import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {styled} from 'nativewind';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getFollowingList} from '../api/useFollow/FollowUser';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledImage = styled(Image);
const StyledTouchableOpacity = styled(TouchableOpacity);

const UserFollowing = ({route}) => {
  const {user_id} = route.params;
  const [isFollowing, setIsFollowing] = useState(false);
  const [followers, setFollowers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUserFollowingList();
  }, []);

  const fetchUserFollowingList = async () => {
    try {
      const result = await getFollowingList(user_id);
      if (!result.error) {
        setFollowers(result.following);
        setLoading(false);

        // setIsFollowing(result.includes(brand.id));
      }
    } catch (error) {
      console.error('Error fetching following list:', error);
    }
  };

  {
    loading && (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#441752" />
      </View>
    );
  }

  return (
    <StyledView className="flex-1 bg-white">
      <View className="flex-1">
        {loading ? (
          <View className="flex-1 justify-center items-center">
            <ActivityIndicator size="large" color="#441752" />
          </View>
        ) : (
          <FlatList
            data={followers}
            keyExtractor={item => item._id}
            renderItem={({item}) => (
              <StyledView className="flex-row items-center px-4 py-3 border-b border-gray-200">
                <Image
                  source={
                    item?.image
                      ? {uri: item?.image}
                      : require('../assets/Images/default-image.png')
                  }
                  className="w-12 h-12 rounded-full"
                />

                <StyledView className="flex-1 ml-3">
                  <StyledText className="text-black font-semibold">
                    {item.name}
                  </StyledText>
                  <StyledText className="text-gray-500">
                    {item.email}
                  </StyledText>
                </StyledView>
              </StyledView>
            )}
            ListEmptyComponent={
              <View className="flex-1 items-center justify-center py-20">
                <Image
                  source={require('../assets/Images/out-of-stock.png')}
                  className="w-24 h-24 mb-4 opacity-60"
                  resizeMode="contain"
                />
                <Text className="text-gray-500 text-lg font-medium">
                  No followings to show.
                </Text>
              </View>
            }
          />
        )}
      </View>
    </StyledView>
  );
};

export default UserFollowing;

// <View>
// <FlatList
//   data={followers}
//   keyExtractor={item => item._id}
//   renderItem={({item}) => (
//     <StyledView className="flex-row items-center px-4 py-3 border-b border-gray-200">
//       <Image
//         source={
//           item?.image
//             ? {uri: item?.image}
//             : require('../assets/Images/default-image.png')
//         }
//         className="w-12 h-12 rounded-full "
//       />

//       {/* User Info */}
//       <StyledView className="flex-1 ml-3">
//         <StyledText className="text-black font-semibold">
//           {item.name}
//         </StyledText>
//         <StyledText className="text-gray-500">{item.email}</StyledText>
//       </StyledView>

//       {/* Follow/Following Button */}
//       {/* <StyledTouchableOpacity>
//         <StyledText className="bg-gray-200 p-1.5 rounded-md">
//           Meassage
//         </StyledText>
//       </StyledTouchableOpacity> */}
//     </StyledView>
//   )}
//   ListEmptyComponent={
//     <View className="flex-1 items-center justify-center py-20">
//       <Image
//         source={require('../assets/Images/out-of-stock.png')}
//         // Optional: Add your own placeholder image
//         className="w-24 h-24 mb-4 opacity-60"
//         resizeMode="contain"
//       />
//       <Text className="text-gray-500 text-lg font-medium">
//         No followings to show.
//       </Text>
//     </View>
//   }
// />
// </View>
