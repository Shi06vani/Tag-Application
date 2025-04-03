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
} from 'react-native';
// import * as ImagePicker from 'expo-image-picker';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import Video from 'react-native-video';

import {useNavigation} from '@react-navigation/native';
import {followUser, getFollowCounts, unfollowUser} from '../../api/useFollow/FollowUser';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {BrandInfo, BrandVideos} from '../../api/brandRequirements/Requiements';
import FullScreenVideo from '../FullScreenVideo';

const BrandDetails = ({route}) => {
  const {brandid} = route.params;
  const navigation = useNavigation();
  const [videos, setVideos] = useState([]);
  const [isFollowing, setIsFollowing] = useState(false);
  const [loginUserId, setLoginUserId] = useState('');
  const [brand, setBrand] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('Videos');
  const [index, setIndex] = useState(0);
  const [video, setVideo] = useState(null);
  const [followCounts, setFollowCounts] = useState(null);

  const [routes] = useState([
    {key: 'videos', title: 'Videos'},
    {key: 'shorts', title: 'Shorts'},
  ]);

  const pickVideo = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setVideo(result.uri);
    }
  };

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
        setVideos(videoData.videos);
      }
      setLoadingVideos(false);
    };

    getBrandVideos();
  }, [brandid]);

  const handleFollow = async () => {
    if (!loginUserId) {
      console.error('User ID not found');
      return;
    }

    if (isFollowing) {
      const result = await unfollowUser(loginUserId, brandid);
      if (!result.error) {
        setIsFollowing(false);
      } else {
        console.error('Error unfollowing user:', result.error);
      }
    } else {
      const result = await followUser(loginUserId, brandid);
      if (!result.error) {
        setIsFollowing(true);
      } else {
        console.error('Error following user:', result.error);
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await getFollowCounts(brandid);
      setFollowCounts(data);
    };

    fetchData();
  }, [brandid]);
  

  return (

    <ScrollView className='bg-white h-full flex-1'>
      <View className="pt-4 px-4  relative f ">
      {loading ? (
         <View className='flex-1 justify-center items-center'>
                <ActivityIndicator size="large" color="#441752" />
             </View>
      ) : (
        <ScrollView className="flex-1  ">
          <View className=" relative h-full">
            <Image
              source={{uri: 'https://randomuser.me/api/portraits/men/1.jpg'}}
              className="w-32 h-32 rounded-full border self-center mb-4"
            />

            <View className="">
              <View className="flex-row justify-between">
                <TouchableOpacity onPress={handleFollow}>
                  <Text className="text-center font-bold"></Text>
                  <Text
                    className={`text-sm font-bold px-4 py-2 rounded-md text-white ${
                      isFollowing ? 'bg-secondary' : 'bg-primary'
                    }   cursor-pointer`}>
                    {isFollowing ? 'Unfollow' : 'Follow'}
                  </Text>
                </TouchableOpacity>

                <View className="flex-row justify-center items-center gap-6">
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate('Brand-following', {
                        brand_id: brandid,
                      })
                    }>
                    <Text className="text-center font-bold">{followCounts?.following}</Text>
                    <Text className="text-primary font-bold">Followings</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate('Brand-followers', {
                        brand_id: brandid,
                      })
                    }>
                    <Text className="text-center font-bold">{followCounts?.followers}</Text>
                    <Text className="text-primary font-bold">Followers</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            <Text className="text-2xl font-bold text-gray-900 pt-4 pb-1">
              {brand?.name}
            </Text>
            <Text className="text-base text-primary">{brand?.role}</Text>

            <View className="mt-2">
              <Text className="text-base font-semibold text-primary">
                Email: {brand?.email}
              </Text>
            </View>

            <View className="mt-3">
              <Text className="text-base font-semibold text-primary">
                Topic: {brand?.topic}
              </Text>
            </View>

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
                  horizontal={true}
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
                />
              </View>
            )}

            {activeTab === 'Shorts' && (
              <View className="flex-1 px-2">
                <FlatList
                  data={videos}
                  horizontal={true}
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
                />
              </View>
            )}
          </View>
        </ScrollView>
      )}

     
    </View>
    <View className="flex  justify-center items-center  mt-20 px-4 ">
        <TouchableOpacity
          className="bg-[#441752]   w-full  p-3 rounded-lg "
          onPress={pickVideo}>
          <Text className="text-white text-center font-semibold">
            Upload Video
          </Text>
        </TouchableOpacity>
      </View>

      {video && (
        <View className="">
          <Text className="text-[#441752] font-semibold">Selected Video:</Text>
          <Text className="text-gray-600">{video}</Text>
        </View>
      )}
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
