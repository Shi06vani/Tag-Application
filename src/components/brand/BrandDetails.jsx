// import React, {useEffect, useState} from 'react';
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   Image,
//   Linking,
//   FlatList,
//   Dimensions,
//   ActivityIndicator,
//   ScrollView,
// } from 'react-native';
// // import * as ImagePicker from 'expo-image-picker';
// import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
// import Video from 'react-native-video';

// import {useNavigation} from '@react-navigation/native';
// import {
//   followUser,
//   getFollowCounts,
//   unfollowUser,
// } from '../../api/useFollow/FollowUser';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import {BrandInfo, BrandVideos} from '../../api/brandRequirements/Requiements';
// import FullScreenVideo from '../FullScreenVideo';
// import axios from 'axios';

// const BrandDetails = ({route}) => {
//   const {brandid} = route.params;
//   const navigation = useNavigation();
//   const [videos, setVideos] = useState([]);
//   const [isFollowing, setIsFollowing] = useState(false);
//   const [loginUserId, setLoginUserId] = useState('');
//   const [brand, setBrand] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [activeTab, setActiveTab] = useState('Videos');
//   const [followCounts, setFollowCounts] = useState(null);

//   const [brandShorts, setBrandShorts] = useState([]);

//   const [routes] = useState([
//     {key: 'videos', title: 'Videos'},
//     {key: 'shorts', title: 'Shorts'},
//   ]);

//   useEffect(() => {
//     const fetchUserId = async () => {
//       try {
//         const UserId = await AsyncStorage.getItem('loginuser_id');
//         if (UserId) {
//           setLoginUserId(UserId);
//         }
//       } catch (error) {
//         console.error('Error retrieving login user ID:', error);
//       }
//     };

//     fetchUserId();
//   }, []);

//   useEffect(() => {
//     const getBrandInfo = async () => {
//       const data = await BrandInfo(brandid);
//       if (data) {
//         setBrand(data.user);
//       }
//       setLoading(false);
//     };

//     getBrandInfo();
//   }, [brandid]);

//   useEffect(() => {
//     const getBrandVideos = async () => {
//       const videoData = await BrandVideos(brandid);
//       if (videoData) {
//         setVideos(videoData?.videos);
//       }
//       setLoadingVideos(false);
//     };

//     getBrandVideos();
//   }, [brandid]);

//   useEffect(() => {
//     callUserSortApi();
//   }, []);

//   const callUserSortApi = async () => {
//     try {
//       const response = await fetch(
//         `https://tag-backend.vercel.app/api/videos/user-sorts/${brandid}`,
//         {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({
//             type: 'video',
//           }),
//         },
//       );

//       const data = await response.json();
//       console.log(data, 'dataaaaa');
//       console.log(videos)

//       if (data) {
//         setBrandShorts(data?.videos);
//       }
//     } catch (error) {
//       console.error('API error:', error.response?.data || error.message);
//     }
//   };

//   const handleFollow = async () => {
//     if (!loginUserId) {
//       console.error('User ID not found');
//       return;
//     }

//     if (isFollowing) {
//       const result = await unfollowUser(loginUserId, brandid);
//       if (!result.error) {
//         setIsFollowing(false);
//       } else {
//         console.error('Error unfollowing user:', result.error);
//       }
//     } else {
//       const result = await followUser(loginUserId, brandid);
//       if (!result.error) {
//         setIsFollowing(true);
//       } else {
//         console.error('Error following user:', result.error);
//       }
//     }
//   };

//   useEffect(() => {
//     const fetchData = async () => {
//       const data = await getFollowCounts(brandid);
//       setFollowCounts(data);
//     };

//     fetchData();
//   }, [brandid]);

//   console.log('brandshorts', brandShorts);
//   console.log("video",videos)

//   return (
//     <ScrollView className="bg-white h-full flex-1">
//       <View className="pt-4 px-4  relative f ">
//         {loading ? (
//           <View className="flex-1 justify-center items-center">
//             <ActivityIndicator size="large" color="#441752" />
//           </View>
//         ) : (
//           <ScrollView className="flex-1  ">
//             <View className=" relative h-full">
//               <Image
//                 source={{uri: 'https://randomuser.me/api/portraits/men/1.jpg'}}
//                 className="w-32 h-32 rounded-full border self-center mb-4"
//               />

//               <View className="">
//                 <View className="flex-row justify-between">
//                   <TouchableOpacity onPress={handleFollow}>
//                     <Text className="text-center font-bold"></Text>
//                     <Text
//                       className={`text-sm font-bold px-4 py-2 rounded-md text-white ${
//                         isFollowing ? 'bg-secondary' : 'bg-primary'
//                       }   cursor-pointer`}>
//                       {isFollowing ? 'Unfollow' : 'Follow'}
//                     </Text>
//                   </TouchableOpacity>

//                   <View className="flex-row justify-center items-center gap-6">
//                     <TouchableOpacity
//                       onPress={() =>
//                         navigation.navigate('Brand-following', {
//                           brand_id: brandid,
//                         })
//                       }>
//                       <Text className="text-center font-bold">
//                         {followCounts?.following}
//                       </Text>
//                       <Text className="text-primary font-bold">Followings</Text>
//                     </TouchableOpacity>
//                     <TouchableOpacity
//                       onPress={() =>
//                         navigation.navigate('Brand-followers', {
//                           brand_id: brandid,
//                         })
//                       }>
//                       <Text className="text-center font-bold">
//                         {followCounts?.followers}
//                       </Text>
//                       <Text className="text-primary font-bold">Followers</Text>
//                     </TouchableOpacity>
//                   </View>
//                 </View>
//               </View>

//               <Text className="text-2xl font-bold text-gray-900 pt-4 pb-1">
//                 {brand?.name}
//               </Text>
//               <Text className="text-base text-primary">{brand?.role}</Text>

//               <View className="mt-2">
//                 <Text className="text-base font-semibold text-primary">
//                   Email: {brand?.email}
//                 </Text>
//               </View>

//               <View className="mt-3">
//                 <Text className="text-base font-semibold text-primary">
//                   Topic: {brand?.topic}
//                 </Text>
//               </View>

//               <View className=" flex border-dotted border-primary  py-5 mx-5  mb-4">
//                 <TouchableOpacity
//                   className="bg-[#441752] rounded-full cursor-pointer  py-2 px-6 "
//                   onPress={() => navigation.navigate('Brand-Video')}>
//                   <Text className="text-white text-base text-center font-bold">
//                     Upload Video
//                   </Text>
//                 </TouchableOpacity>
//               </View>

//               {videos && (
//                 <View className="">
//                   <Text className="text-[#441752] font-semibold">
//                     Selected Video:
//                   </Text>
//                   <Text className="text-gray-600">{videos}</Text>
//                 </View>
//               )}

//               <View className="flex-row justify-around gap-1 items-center py-3 ">
//                 <TouchableOpacity
//                   className={`px-4 py-2.5 rounded-full w-[45%] ${
//                     activeTab === 'Videos' ? 'bg-[#441752]' : 'bg-accent'
//                   }`}
//                   onPress={() => setActiveTab('Videos')}>
//                   <Text className="text-white text-center font-bold">
//                     Videos
//                   </Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity
//                   className={`px-4 py-2.5 rounded-full w-[45%] ${
//                     activeTab === 'Shorts' ? 'bg-[#441752]' : 'bg-accent'
//                   }`}
//                   onPress={() => setActiveTab('Shorts')}>
//                   <Text className="text-white text-center font-bold">
//                     Shorts
//                   </Text>
//                 </TouchableOpacity>
//               </View>

//               {activeTab === 'Videos' && (
//                 <View className="flex-1 px-2">
//                   <FlatList
//                     data={videos}
//                     // horizontal={true}
//                     keyExtractor={item => item._id}
//                     renderItem={({item}) => (
//                       <View className="px-2">
//                         <Video
//                           source={{uri: item.videoUrl}}
//                           style={{height: 200, marginTop: 10}}
//                           controls={true}
//                           resizeMode="cover"
//                           paused={true}
//                           className="rounded-lg w-full shadow-lg overflow-hidden"
//                         />
//                         <Text className="text-base font-bold text-black">
//                           {item?.title}
//                         </Text>
//                         <Text className="text-gray-500">
//                           {item?.description}
//                         </Text>
//                       </View>
//                     )}
//                   />
//                 </View>
//               )}

//               {activeTab === 'Shorts' && (
//                 <View className="flex-1 px-2">
//                   <FlatList
//                     data={brandShorts}
//                     // horizontal={true}
//                     keyExtractor={item => item._id}
//                     renderItem={({item}) => (
//                       <View className="px-2 ">
//                         <Video
//                           source={{uri: item.videoUrl}}
//                           style={{height: 200, marginTop: 10}}
//                           controls={true}
//                           resizeMode="cover"
//                           paused={true}
//                           className="rounded-lg w-full shadow-lg overflow-hidden"
//                         />
//                         <Text className="text-base font-bold text-black">
//                           {item?.title}
//                         </Text>
//                         <Text className="text-gray-500">
//                           {item?.description}
//                         </Text>
//                       </View>
//                     )}
//                   />
//                 </View>
//               )}
//             </View>
//           </ScrollView>
//         )}
//       </View>
//     </ScrollView>
//   );
// };

// export default BrandDetails;

import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Linking,
  FlatList,
  Dimensions,
  ActivityIndicator,
  ScrollView,
  Button,
} from 'react-native';
// import * as ImagePicker from 'expo-image-picker';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import Video from 'react-native-video';

import {useNavigation} from '@react-navigation/native';
import {
  followUser,
  getFollowCounts,
  unfollowUser,
} from '../../api/useFollow/FollowUser';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {BrandInfo, BrandVideos} from '../../api/brandRequirements/Requiements';

import BASE_URL from '../../../config';

const BrandDetails = ({route}) => {
  const {brandid} = route.params;
  const navigation = useNavigation();
  const [videos, setVideos] = useState([]);
  const [loginUserId, setLoginUserId] = useState('');
  const [brand, setBrand] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingVideos, setLoadingVideos] = useState(true);
  const [activeTab, setActiveTab] = useState('Videos');
  const [followCounts, setFollowCounts] = useState(null);

  const [brandShorts, setBrandShorts] = useState([]);
  const [loadingShorts, setLoadingShorts] = useState(true);

  const [isFollowing, setIsFollowing] = useState(false);
  const creatorId = brandid;
  const userId = loginUserId;

  
  const [routes] = useState([
    {key: 'videos', title: 'Videos'},
    {key: 'shorts', title: 'Shorts'},
  ]);

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const UserId = await AsyncStorage.getItem('loginuser_id');
        if (UserId) {
          setLoginUserId(UserId);
        }
      } catch (error) {
        console.error('Error retrieving login user ID:', error);
      }
    };

    fetchUserId();
  }, []);

  useEffect(() => {
    const getBrandInfo = async () => {
      const data = await BrandInfo(brandid);
      if (data) {
        setBrand(data.user);
      }
      setLoading(false);
    };

    getBrandInfo();
  }, [brandid]);

  useEffect(() => {
    const getBrandVideos = async () => {
      const videoData = await BrandVideos(brandid);
      if (videoData) {
        setVideos(videoData?.videos || []);
      }
      setLoadingVideos(false);
    };

    getBrandVideos();
  }, [brandid]);

  useEffect(() => {
    callUserSortApi();
  }, [brandid]); // Added brandid dependency

  const callUserSortApi = async () => {
    try {
      setLoadingShorts(true);
      const response = await fetch(
        `https://tag-backend.vercel.app/api/videos/user-sorts/${brandid}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            type: 'video',
          }),
        },
      );

      const data = await response.json();

      if (data && data.videos) {
        // Convert object with numeric keys to array if needed
        const shortsArray = Array.isArray(data.videos)
          ? data.videos
          : Object.values(data.videos);

        console.log('Shorts array:', shortsArray);
        setBrandShorts(shortsArray);
      } else {
        console.log('No shorts data found');
        setBrandShorts([]);
      }
    } catch (error) {
      console.error('API error:', error.response?.data || error.message);
      setBrandShorts([]);
    } finally {
      setLoadingShorts(false);
    }
  };

  const handleFollow = async () => {
    const result = await followUser(loginUserId, brandid);
    console.log("fllow result",result);

    if (!result.error) {

    } else {
      console.error('Error following user:', result.error);
    }
  };

  const handleUnFollow = async () => {
    const result = await unfollowUser(loginUserId, brandid);
    if (!result.error) {
    } else {
      console.error('Error unfollowing user:', result.error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await getFollowCounts(brandid);
      setFollowCounts(data);
    };

    fetchData();
  }, [brandid]);

  const renderVideoItem = ({item}) => {
    if (!item || !item.videoUrl) {
      return (
        <View className="px-2">
          <View
            style={{height: 200, marginTop: 10}}
            className="bg-gray-200 rounded-lg"
          />
          <Text className="text-base font-bold text-black">
            No Video Available
          </Text>
        </View>
      );
    }

    return (
      <View className="px-2">
        <Video
          source={{uri: item.videoUrl}}
          style={{height: 200, marginTop: 10}}
          controls={true}
          resizeMode="cover"
          paused={true}
          className="rounded-lg w-full shadow-lg overflow-hidden"
        />
        <Text className="text-base font-bold text-black">
          {item.title || 'Untitled'}
        </Text>
        <Text className="text-gray-500">
          {item.description || 'No description'}
        </Text>
      </View>
    );
  };

 

  useEffect(() => {
    const CheckUserFollowing = async () => {

    console.log("->>>>>>",userId)
      
      if (!userId) {
        console.error('User ID not found');
        return;
      }

      try {
        const response = await fetch(
          `${BASE_URL}/api/friend/is-following/${creatorId}/${userId}`,
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
        return result;
      } catch (error) {
        console.error('Error checking follow status:', error);
        return null;
      }
    };

    CheckUserFollowing();
  }, [creatorId, userId]);

  console.log('loginUserId', loginUserId);

  return (
    <ScrollView className="bg-white h-full flex-1">
      <View className="pt-4 px-4 relative">
        {loading ? (
          <View className="flex-1 justify-center items-center">
            <ActivityIndicator size="large" color="#441752" />
          </View>
        ) : (
          <ScrollView className="flex-1">
            <View className="relative h-full">
              <Image
                source={{uri: 'https://randomuser.me/api/portraits/men/1.jpg'}}
                className="w-32 h-32 rounded-full border self-center mb-4"
              />
              <View className="">
                <View className="flex-row justify-between">
                  {isFollowing ? (
                    <TouchableOpacity
                      onPress={handleFollow}
                      >
                      <Text className="text-sm font-bold px-4 py-2 rounded-md text-white bg-primary cursor-pointer">Follow</Text>
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      onPress={handleUnFollow}
                      className="">
                      <Text className='bg-secondary text-sm font-bold px-4 py-2 rounded-md text-white  cursor-pointer'>UnFollow</Text>
                    </TouchableOpacity>
                  )}

                  <View className="flex-row justify-center items-center gap-6">
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate('Brand-following', {
                          brand_id: brandid,
                        })
                      }>
                      <Text className="text-center font-bold">
                        {followCounts?.following || 0}
                      </Text>
                      <Text className="text-primary font-bold">Followings</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate('Brand-followers', {
                          brand_id: brandid,
                        })
                      }>
                      <Text className="text-center font-bold">
                        {followCounts?.followers || 0}
                      </Text>
                      <Text className="text-primary font-bold">Followers</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
              <Text className="text-2xl font-bold text-gray-900 pt-4 pb-1">
                {brand?.name || 'Brand Name'}
              </Text>
              <Text className="text-base text-primary">
                {brand?.role || 'Role'}
              </Text>
              <View className="mt-2">
                <Text className="text-base font-semibold text-primary">
                  Email: {brand?.email || 'N/A'}
                </Text>
              </View>
              <View className="mt-3">
                <Text className="text-base font-semibold text-primary">
                  Topic: {brand?.topic || 'N/A'}
                </Text>
              </View>
              <View className="flex border-dotted border-primary py-5 mx-5 mb-4">
                <TouchableOpacity
                  className="bg-[#441752] rounded-full cursor-pointer py-2 px-6"
                  onPress={() =>
                    navigation.navigate('Brand-Video', {
                      brand_id: brandid,
                    })
                  }>
                  <Text className="text-white text-base text-center font-bold">
                    Upload Video
                  </Text>
                </TouchableOpacity>
              </View>
              <View className="flex-row justify-around gap-1 items-center py-3">
                <TouchableOpacity
                  className={`px-4 py-2.5 rounded-full w-[45%] ${
                    activeTab === 'Videos' ? 'bg-[#441752]' : 'bg-accent'
                  }`}
                  onPress={() => setActiveTab('Videos')}>
                  <Text className="text-white text-center font-bold">
                    Videos
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  className={`px-4 py-2.5 rounded-full w-[45%] ${
                    activeTab === 'Shorts' ? 'bg-[#441752]' : 'bg-accent'
                  }`}
                  onPress={() => setActiveTab('Shorts')}>
                  <Text className="text-white text-center font-bold">
                    Shorts
                  </Text>
                </TouchableOpacity>
              </View>
              {activeTab === 'Videos' && (
                <View className="flex-1 px-2">
                  {loadingVideos ? (
                    <ActivityIndicator size="large" color="#441752" />
                  ) : videos && videos.length > 0 ? (
                    <FlatList
                      data={videos}
                      keyExtractor={item =>
                        item._id || Math.random().toString()
                      }
                      renderItem={({item}) => (
                        <View className=" mt-5 rounded-lg">
                          <Video
                            source={{uri: item.videoUrl}}
                            style={{height: 200, marginTop: 10}}
                            controls={true}
                            resizeMode="cover"
                            paused={true}
                            className=" w-full shadow-lg overflow-hidden"
                          />
                          <View className="py-2.5 px-2 bg-primary text-white">
                            <Text className="text-base font-bold text-white">
                              {item?.title}
                            </Text>
                            <Text className="text-gray-300">
                              {item?.description}
                            </Text>
                          </View>
                        </View>
                      )}
                    />
                  ) : (
                    <Text className="text-center text-gray-500 py-4">
                      No videos available
                    </Text>
                  )}
                </View>
              )}

              {activeTab === 'Shorts' && (
                <View className="flex-1 mt-2">
                  {loadingShorts ? (
                    <ActivityIndicator size="large" color="#441752" />
                  ) : brandShorts && brandShorts.length > 0 ? (
                    <FlatList
                      data={brandShorts}
                      keyExtractor={item =>
                        item._id || Math.random().toString()
                      }
                      renderItem={({item}) => (
                        <View className="my-4 rounded-xl overflow-hidden bg-black">
                          <View className="relative">
                            <Video
                              source={{uri: item.videoUrl}}
                              style={{height: 200}} // Taller for shorts style
                              controls={true}
                              resizeMode="cover"
                              paused={true}
                              className="w-full"
                            />

                            {/* Overlay for video controls */}
                            {/* <View className="absolute bottom-0 right-0 p-2 flex items-center">
                              <View className="bg-black/40 rounded-full p-2 mb-2">
                                <Text className="text-white font-bold">❤️</Text>
                              </View>
                              <View className="bg-black/40 rounded-full p-2 mb-2">
                                <Text className="text-white font-bold">💬</Text>
                              </View>
                              <View className="bg-black/40 rounded-full p-2 mb-2">
                                <Text className="text-white font-bold">↪️</Text>
                              </View>
                            </View> */}
                          </View>

                          {/* Content info at the bottom */}
                          <View className="p-3 bg-primary">
                            <View className="flex-row items-center mt-2">
                              <Image
                                source={require('../../assets/Images/user.png')}
                                className="w-8 h-8 rounded-full bg-gray-500 mr-2"
                              />
                              <Text className="text-gray-300 text-xs">
                                {item.title || 'Untitled'} •{' '}
                                {new Date(item.createdAt).toDateString()}
                              </Text>
                            </View>
                            <Text className="text-white font-bold text-base">
                              {item.title || 'Untitled'}
                            </Text>
                            <Text className="text-gray-300 text-sm">
                              {item.description || 'No description'}
                            </Text>
                          </View>
                        </View>
                      )}
                      // Use vertical full-screen scrolling for shorts
                      showsVerticalScrollIndicator={false}
                      snapToInterval={Dimensions.get('window').height}
                      snapToAlignment="start"
                      decelerationRate="fast"
                    />
                  ) : (
                    <Text className="text-center text-gray-500 py-4">
                      No shorts available
                    </Text>
                  )}
                </View>
              )}
            </View>
          </ScrollView>
        )}
      </View>
    </ScrollView>
  );
};

export default BrandDetails;

{
  /* 
          <TabView
            navigationState={{index, routes}}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={{width}}
            renderTabBar={props => (
              <TabBar
                {...props}
                indicatorStyle={{backgroundColor: '#441752'}}
                style={{backgroundColor: 'white'}}
                activeColor="#441752"
                inactiveColor="gray"
              />
            )}
          /> */
}

// const CardItem = ({item, type}) => (
//   <TouchableOpacity
//     className="mt-6 mx-2 p-3 bg-white  rounded-lg border"
//     onPress={() =>
//       navigation.navigate(
//         type === 'videos' ? 'FullScreenVideo' : 'FullScreenShorts',
//         {videoUri: item},
//       )
//     }>
//     <Image source={{uri: item}} className="w-full h-36 rounded-lg" />
//     <Text className="text-lg font-semibold mt-2">Video Title</Text>
//   </TouchableOpacity>
// );
