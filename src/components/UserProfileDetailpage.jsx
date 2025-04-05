import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  ActivityIndicator,
  Touchable,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {userProfileInfo} from '../api/userDetail/User';
import {getFollowCounts} from '../api/useFollow/FollowUser';
import {BrandVideos} from '../api/brandRequirements/Requiements';
import Video from 'react-native-video';

export default function UserProfileDetailpage({route}) {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const {userId} = route.params;
  const [followCounts, setFollowCounts] = useState(null);
  const [activeTab, setActiveTab] = useState('Videos');
  const [videos, setVideos] = useState(null);

  // useEffect(() => {
  //   const fetchUserData = async () => {
  //     const data = await userProfileInfo(userId);
  //     setUserData(data?.user);
  //     setLoading(false);
  //   };

  //   fetchUserData();
  // }, [userId]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const data = await getFollowCounts(userId);
  //     setFollowCounts(data);
  //   };

  //   fetchData();
  // }, [userId]);

  // useEffect(() => {
  //   const getBrandVideos = async () => {
  //     const videoData = await BrandVideos(userId);
  //     if (videoData) {
  //       setVideos(videoData.videos);
  //     }
  //     setLoadingVideos(false);
  //   };

  //   getBrandVideos();
  // }, [userId]);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const [userDataRes, followCountsRes, brandVideosRes] =
          await Promise.all([
            userProfileInfo(userId),
            getFollowCounts(userId),
            BrandVideos(userId),
          ]);

        setUserData(userDataRes?.user);
        setFollowCounts(followCountsRes);
        if (brandVideosRes) {
          setVideos(brandVideosRes.videos);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
        setLoadingVideos(false);
      }
    };

    fetchAllData();
  }, [userId]);

  if (loading) {
    return (
      <ActivityIndicator
        size="large"
        color="#441752"
        className="flex-1 justify-center items-center"
      />
    );
  }

  return (
    <View className="flex-1 bg-white">
      {userData ? (
        <ScrollView className="px-5 pb-5">
          <View className="items-center mb-5 rounded-b-full bg-primary py-8">
            <Image
              source={require('../assets/Images/user.png')}
              className="w-24 h-24 rounded-full"
            />
            <Text className="text-xl font-bold text-white mt-3">
              {userData?.name}
            </Text>
            <Text className="text-gray-300 text-sm">{userData?.bio}</Text>
          </View>

          {/* Company & Website */}
          <View className="bg-purple-50 p-4 rounded-lg mb-3">
            <Text className="text-black font-semibold">
              Company: {userData?.companyName}
            </Text>
            <Text className="text-primary">{userData.website}</Text>
          </View>

          {/* User Role & Topic */}
          <View className="bg-purple-50 p-4 rounded-lg mb-3">
            <Text className="text-black font-semibold">
              Role: {userData.role}
            </Text>
            <Text className="text-gray-700">Topic: {userData.topic}</Text>
          </View>
          <View className='flex flex-row gap-3'>
            <View className="bg-purple-50 p-4 rounded-lg  w-[50%]">
              <Text className='text-primary text-sm text-center'> {followCounts?.followers}</Text>
              <Text className="text-black font-semibold text-center">
                Followers
              </Text>
            </View>

            <View className="bg-purple-50 p-4 rounded-lg w-[50%]">
              <Text  className='text-primary text-sm text-center'>
              {followCounts?.following}
              </Text>
              <Text className="text-black font-semibold text-center">
                Following
              </Text>
            </View>
          </View>

          <View className="my-3">
            <View className="flex-row justify-around gap-1 items-center py-3 ">
              <TouchableOpacity
                className={`px-4 py-2 rounded-full w-[45%] ${
                  activeTab === 'Videos' ? 'bg-[#441752]' : 'bg-accent'
                }`}
                onPress={() => setActiveTab('Videos')}>
                <Text className="text-purple-50 text-center font-bold">
                  Videos
                </Text>
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
                    <View className="px-2">
                      <Video
                        source={{uri: item.videoUrl}}
                        style={{height: 200, marginTop: 10}}
                        controls={true}
                        resizeMode="cover"
                        paused={true}
                        className="rounded-lg w-32 shadow-lg overflow-hidden"
                      />
                      <Text className="text-base font-bold text-black">
                        {item.title}
                      </Text>
                      <Text className="text-gray-500">{item.description}</Text>
                    </View>
                  )}
                  ListEmptyComponent={() => (
                    <View className="flex-1 items-center justify-center mt-10 w-full">
                      <Text className="text-gray-600 text-lg text-center">
                        No videos
                      </Text>
                    </View>
                  )}
                />
              </View>
            )}

            {activeTab === 'Shorts' && (
              <View className="flex-1 px-2">
                <FlatList
                  data={videos}
                  // horizontal={true}
                  keyExtractor={item => item._id}
                  renderItem={({item}) => (
                    <View className="px-2 ">
                      <Video
                        source={{uri: item.videoUrl}}
                        style={{height: 200, marginTop: 10}}
                        controls={true}
                        resizeMode="cover"
                        paused={true}
                        className="rounded-lg w-32 shadow-lg overflow-hidden"
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
        </ScrollView>
      ) : (
        <View className="flex-1 items-center justify-center">
          <Text className="text-gray-500">Loading user details...</Text>
        </View>
      )}
    </View>
  );
}
