import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  ScrollView,
  Alert,
  ActivityIndicator,
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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AsyncStorage.getItem('loginuser_id')
      .then(userId => {
        console.log(userId);
        if (userId) {
          fetchFollowingList(userId);
        }
      })
      .catch(error => {
        Alert.alert(' Failed', error.message);

        console.error('Error retrieving login user ID:', error);
      });
  }, []);

  const fetchFollowingList = async userId => {
    try {
      const result = await getFollowingList(userId);
      if (!result.error) {
        setFollowers(result.following);
        setLoading(false);
      }
    } catch (error) {
      console.error('Error fetching following list:', error);
    }
  };

  return (
    <StyledView className="flex-1 bg-white">
      <View className='flex-1'>
        {loading ? (
          <View className="flex-1 justify-center items-center ">
            <ActivityIndicator size="large" color="#441752" />
          </View>
        ) : followers && followers.length > 0 ? (
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

                {/* User Info */}
                <StyledView className="flex-1 ml-3">
                  <StyledText className="text-black font-semibold">
                    {item.name}
                  </StyledText>
                  <StyledText className="text-gray-500">
                    {item.email}
                  </StyledText>
                </StyledView>

                {/* Message Button (optional) */}
                {/* <StyledTouchableOpacity>
            <StyledText className="bg-gray-200 p-1.5 rounded-md">
              Message
            </StyledText>
          </StyledTouchableOpacity> */}
              </StyledView>
            )}
          />
        ) : (
          <StyledView className="flex items-center justify-center h-[100%]">
                        <Image source={require("../assets/Images/out-of-stock.png")}/>
            
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

// <View>
// {followers && followers.length > 0 ? (
//   <FlatList
//     data={followers}
//     keyExtractor={item => item._id}
//     renderItem={({item}) => (
//       <StyledView className="flex-row items-center px-4 py-3 border-b border-gray-200">

//          <Image
//             source={  item?.image?  {   uri: item?.image} : require("../assets/Images/default-image.png")}
//             className="w-12 h-12 rounded-full "
//           />

//         {/* User Info */}
//         <StyledView className="flex-1 ml-3">
//           <StyledText className="text-black font-semibold">
//             {item.name}
//           </StyledText>
//           <StyledText className="text-gray-500">
//             {item.email}
//           </StyledText>
//         </StyledView>

//         {/* Message Button */}
//         {/* <StyledTouchableOpacity>
//           <StyledText className="bg-gray-200 p-1.5 rounded-md">
//             Message
//           </StyledText>
//         </StyledTouchableOpacity> */}
//       </StyledView>
//     )}
//   />
// ) : (
//   <StyledView className="flex items-center justify-center h-64">
//     <StyledText className="text-gray-500 text-lg">
//       No Followers Found
//     </StyledText>
//   </StyledView>
// )}
// </View>

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
