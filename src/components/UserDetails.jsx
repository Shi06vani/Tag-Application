import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  FlatList,
  Alert,
} from 'react-native';
import {userProfileInfo} from '../api/userDetail/User';
import {
  followUser,
  getFollowCounts,
  unfollowUser,
} from '../api/useFollow/FollowUser';
import LinearGradient from 'react-native-linear-gradient';
import {BrandVideos} from '../api/brandRequirements/Requiements';
import Video from 'react-native-video';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import BASE_URL from '../../config';

export default function UserDetails({route}) {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const {userId} = route.params;
  const [followCounts, setFollowCounts] = useState(null);
  const [activeTab, setActiveTab] = useState('Videos');
  const [videos, setVideos] = useState(null);
  const [isFollowing, setIsFollowing] = useState(false);
  const [loginUserId, setLoginUserId] = useState('');
  const [shorts, setShorts] = useState([]);
  const navigation = useNavigation();
  const creatorId = userId;
  useEffect(() => {
    const getUserLoginId = async () => {
      const loginUserId = await AsyncStorage.getItem('loginuser_id');
      if (loginUserId) {
        setLoginUserId(loginUserId);
      } else {
        Alert.alert("Not Found",'login user id not found ,login first');
          navigation.navigate("Login")
      }
    };
    const fetchUserData = async () => {
      const data = await userProfileInfo(userId);
      setUserData(data?.user);
      setLoading(false);
    };

    fetchUserData();
    getUserLoginId();
  }, [userId]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getFollowCounts(userId);
      setFollowCounts(data);
    };

    fetchData();
  }, [userId]);

  useEffect(() => {
    const getBrandVideos = async () => {
      const videoData = await BrandVideos(userId);
      if (videoData) {
        setVideos(videoData.videos);
      }
      setLoadingVideos(false);
    };

    getBrandVideos();
  }, [userId]);

  const handleFollow = async () => {
    const result = await followUser(loginUserId, creatorId);
    if (result) {
      setIsFollowing(true);
    }
    if (!result.error) {
    } else {
      console.error('Error following user:', result.error);
    }
  };

  const handleUnFollow = async () => {
    const result = await unfollowUser(loginUserId, creatorId);
    if (result) {
      setIsFollowing(false);
    }
    if (!result.error) {
    } else {
      console.error('Error unfollowing user:', result.error);
    }
  };

  // useEffect(() => {
  //   const CheckUserFollowing = async () => {
  //     const userId = loginUserId;
  //     if (!userId) {
  //       console.error('User ID not found');
  //       return;
  //     }

  //     try {
  //       const response = await fetch(
  //         `${BASE_URL}/api/friend/is-following/${creatorId}/${userId}`,
  //         {
  //           method: 'GET',
  //           headers: {
  //             'Content-Type': 'application/json',
  //           },
  //         },
  //       );

  //       if (!response.ok) {
  //         throw new Error(`Request failed with status ${response.status}`);
  //       }

  //       const result = await response.json();
  //       setIsFollowing(result?.isFollowing);
  //       return result;
  //     } catch (error) {
  //       console.error('Error checking follow status:', error);
  //       return null;
  //     }
  //   };

  //   CheckUserFollowing();
  // }, [creatorId, loginUserId]);

  useEffect(() => {
    if (!loginUserId || !creatorId) return;

    const CheckUserFollowing = async () => {
      try {
        const response = await fetch(
          `${BASE_URL}/api/friend/is-following/${creatorId}/${loginUserId}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          },
        );

        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        const result = await response.json();
        setIsFollowing(result?.isFollowing);
      } catch (error) {
        console.error('Error checking follow status:', error);
      }
    };

    CheckUserFollowing();
  }, [creatorId, loginUserId]);

  const fetchUserShorts = async () => {
    try {
      if (!creatorId) {
        Alert.alert('createrId  not found');
      }
      const response = await fetch(
        `${BASE_URL}/api/videos/user-sorts/${creatorId}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      const data = await response.json();

      setShorts(data.videos || []);
    } catch (error) {
      console.error('Error fetching shorts:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserShorts();
  }, []);

  if (loading) {
    return (
      <ActivityIndicator
        size="large"
        color="#441752"
        className="flex-1 justify-center items-center"
      />
    );
  }

  console.log('video user shorts', shorts);

  return (
    <ScrollView className="flex-1 bg-white">
      <View>
        <LinearGradient
          colors={['#6a0080', '#441752']}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}
          className="pb-8 pt-8 items-center rounded-b-full shadow-lg">
          <Image
            source={require('../assets/Images/default-image.png')}
            className="w-24 h-24 rounded-full border-4 border-white"
          />
          <Text className="text-xl font-bold text-white mt-3">
            {userData?.name}
          </Text>
          <Text className="text-gray-200 text-sm">{userData?.email}</Text>
        </LinearGradient>
      </View>
      ;
      <View className="p-5">
        {/* Role & Topic Card */}
        <View className="bg-purple-50 p-5 rounded-2xl shadow-md mb-4 flex-col justify-between">
          <View className="flex-row justify-between items-center ">
            <View className="flex-row   items-center">
              <Text className="text-black font-semibold ml-2">
                Role:{' '}
                {userData?.role.charAt(0).toUpperCase() +
                  userData?.role.slice(1)}
              </Text>
            </View>
            
            <Text className="text-primary font-bold text-xs  px-2 py-1 rounded-full "> {userData?.topic ? "Topic:":""} {userData?.topic}</Text>
          </View>
          <View className='flex-row items-center justify-between gap-3 py-2'>
            <View className="shadow-lg ">
              {isFollowing ? (
                <TouchableOpacity onPress={handleUnFollow} className="">
                  <Text className="bg-secondary text-sm font-bold px-4 py-2 rounded-md text-white  cursor-pointer">
                    UnFollow
                  </Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity onPress={handleFollow}>
                  <Text className="text-sm font-bold px-4 py-2 text-center rounded-full text-white bg-primary cursor-pointer">
                    Follow
                  </Text>
                </TouchableOpacity>
              )}
            </View>
            <View className="">
              <TouchableOpacity
                className="bg-primary flex-row px-3 py-3 items-center   rounded-full "
                onPress={() =>
                  navigation.navigate('Chat', {
                    brandid: userData?._id,
                  })
                }>
                  <Image tintColor={"white"} source={require("../assets/Images/chat-icon.png")} className='w-5 h-5'/>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Following & Followers */}
        <View className="flex-row justify-between">
          <TouchableOpacity
            className="w-[48%]"
            onPress={() =>
              navigation.navigate('User-Followings', {user_id: userId})
            }>
            <View className="bg-purple-50 p-5 rounded-2xl shadow-md  items-center">
              <Text className="text-gray-700 text-lg font-bold">
                {followCounts?.following}
              </Text>
              <Text className="text-black font-semibold mt-2">Following</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            className="w-[48%]"
            onPress={() =>
              navigation.navigate('User-Followers', {user_id: userId})
            }>
            <View className="bg-purple-50 p-5 rounded-2xl shadow-md items-center">
              <Text className="text-gray-700 text-lg font-bold">
                {followCounts?.followers}
              </Text>
              <Text className="text-black font-semibold mt-2">Followers</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* tabs */}
        <View className="py-3">
          <View className="flex-row justify-around gap-1 items-center py-3 ">
            <TouchableOpacity
              className={`px-4 py-2 rounded-full w-[45%] ${
                activeTab === 'Videos' ? 'bg-[#441752]' : 'bg-accent'
              }`}
              onPress={() => setActiveTab('Videos')}>
              <Text className="text-white text-center font-bold">Videos</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className={`px-4 py-2 rounded-full w-[45%] ${
                activeTab === 'Shorts' ? 'bg-[#441752]' : 'bg-accent'
              }`}
              onPress={() => setActiveTab('Shorts')}>
              <Text className="text-white text-center font-bold">Shorts</Text>
            </TouchableOpacity>
          </View>
          {activeTab === 'Videos' && (
            <View className="flex-1 px-2">
              <FlatList
                data={videos}
                // horizontal={true}
                keyExtractor={item => item._id}
                renderItem={({item}) => (
                  <View className="">
                    <Video
                      source={{uri: item.videoUrl}}
                      style={{height: 200, marginTop: 15}}
                      controls={true}
                      resizeMode="cover"
                      paused={true}
                      className="rounded-lg w-full shadow-lg overflow-hidden"
                    />
                    <Text className="text-base font-bold text-black">
                      {item.title}
                    </Text>
                    <Text className="text-gray-500">{item.description}</Text>
                  </View>
                )}
                ListEmptyComponent={() => (
                  <View className="flex-1 items-center justify-center mt-10">
                    <Text className="text-gray-500 text-lg">No videos</Text>
                  </View>
                )}
              />
            </View>
          )}

          {activeTab === 'Shorts' && (
            <View className="flex-1 px-2">
              <FlatList
                data={shorts}
                keyExtractor={item => item._id}
                renderItem={({item}) => (
                  <View className=" mb-5">
                    <Video
                      source={{uri: item.videoUrl}}
                      style={{height: 200, marginTop: 10}}
                      controls={true}
                      resizeMode="cover"
                      paused={true}
                      className="rounded-lg w-full shadow-lg overflow-hidden"
                    />
                    <Text className="text-base font-bold text-black">
                      {item.title}
                    </Text>
                    <Text className="text-gray-500">{item.description}</Text>
                  </View>
                )}
                ListEmptyComponent={() => (
                  <View className="flex-1 items-center justify-center mt-10">
                    <Text className="text-gray-500 text-lg">No Shorts</Text>
                  </View>
                )}
              />
            </View>
          )}
        </View>
      </View>
    </ScrollView>
  );
}

// <View className="flex-1 bg-white">
//       {userData ? (
//         <ScrollView className="p-5">
//           <View className="items-center mb-5">
//             <Image
//               source={require('../assets/Images/user.png')}
//               className="w-24 h-24 rounded-full"
//             />
//             <Text className="text-xl font-bold text-black mt-3">
//               {userData?.name}
//             </Text>
//             <Text className="text-gray-500 text-sm">{userData?.bio}</Text>
//           </View>

//           <View className="bg-gray-100 p-4 rounded-lg mb-5">
//             <Text className="text-black font-semibold">
//               Company: {userData?.companyName}
//             </Text>
//             <Text className="text-blue-500">{userData.website}</Text>
//           </View>

//           <View className="bg-gray-100 p-4 rounded-lg mb-5">
//             <Text className="text-black font-semibold">
//               Role: {userData.role}
//             </Text>
//             <Text className="text-gray-700">Topic: {userData.topic}</Text>
//           </View>

//           <View className="bg-gray-100 p-4 rounded-lg">
//             <Text className="text-black font-semibold">
//               Following: 2
//             </Text>
//           </View>
//         </ScrollView>
//       ) : (
//         <View className="flex-1 items-center justify-center">
//           <Text className="text-gray-500">Loading user details...</Text>
//         </View>
//       )}
//     </View>

// <View className="flex-1 bg-white">
//   <View className="flex-1 bg-white">
//     {userData ? (
//       <ScrollView className="p-5">
//         <View className="items-center mb-5">
//           <Image
//             source={require('../assets/Images/user.png')}
//             className="w-24 h-24 rounded-full"
//           />
//           <Text className="text-xl font-bold text-black mt-3">
//             {userData?.name}
//           </Text>
//           <Text className="text-gray-500 text-sm">{userData?.email}</Text>
//         </View>

//         {/* User Role & Topic */}
//         <View className="bg-gray-100 p-4 rounded-lg mb-5">
//           <Text className="text-black font-semibold">
//             Role:{' '}
//             {userData.role.charAt(0).toUpperCase() + userData.role.slice(1)}
//           </Text>
//           <Text className="text-gray-700">Topic: {userData.topic}</Text>
//         </View>

//         {/* Following Count */}
//         <View className="bg-gray-100 p-4 rounded-lg mb-5">
//           <Text className="text-black font-semibold">
//             Following: {followCounts?.following}
//           </Text>
//         </View>
//         <View className="bg-gray-100 p-4 rounded-lg mb-5">
//           <Text className="text-black font-semibold">
//             Following: {followCounts?.followers}
//           </Text>
//         </View>
//       </ScrollView>
//     ) : (
//       <View className="flex-1 items-center justify-center">
//         <ActivityIndicator size="large" color="#441752" />
//         <Text className="text-gray-500 mt-3">Loading user details...</Text>
//       </View>
//     )}
//   </View>
// </View>

// <View className="flex-1 px-2">
//   <FlatList
//     data={videos}
//     horizontal={true}
//     keyExtractor={item => item._id}
//     renderItem={({item}) => (
//       <View className="px-2">
//         <Video
//           source={{uri: item.videoUrl}}
//           style={{height: 200, marginTop: 10}}
//           controls={true}
//           resizeMode="cover"
//           paused={true}
//           className="rounded-lg w-32 shadow-lg overflow-hidden"
//         />
//         <Text className="text-base font-bold text-black">
//           {item.title}
//         </Text>
//         <Text className="text-gray-500">{item.description}</Text>
//       </View>
//     )}
//   />
// </View>
