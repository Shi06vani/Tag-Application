import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import TagList from '../components/Home/TagList.jsx';
import Shorts from '../components/Home/HomeShorts.jsx';
import HomeShorts from '../components/Home/HomeShorts.jsx';
import Header from '../components/Header.jsx';
import {getAllPostedVideos} from '../api/useVideo.jsx/Video.jsx';
import Video from 'react-native-video';
import {useNavigation} from '@react-navigation/native';
import VideoPlayer from 'react-native-video-controls';
const Home = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [paused, setPaused] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    setLoading(true);
    try {
      const result = await getAllPostedVideos();
      console.log('Fetched Videos:', result);

      if (result && Array.isArray(result)) {
        setVideos(result);
      } else {
        console.error('Invalid data received:', result);
      }
    } catch (error) {
      console.error('Error fetching videos:', error);
    }
    setLoading(false);
  };

  return (
    <ScrollView
      className="bg-white mt-16 mb-5"
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={{flexGrow: 1}}>
      <View className="flex flex-row items-center p-3 ">
        {/* <View className="border-r-2 border-r-[#ECECEC] px-3">
          <Text className="text-sm font-medium px-4 py-2 rounded-lg bg-[#441752] text-white border-gray-300">
            Explore
          </Text>
        </View> */}
        <View className="w-full">
          <TagList />
        </View>
      </View>

      {/* Video List Section */}
      <View className="bg-white p-4">
        {loading ? (
          <ActivityIndicator size="large" color="#441752" />
        ) : (
          <FlatList
            data={videos}
            keyExtractor={item => item?._id}
            extraData={videos}
            renderItem={({item}) => {
              return (
                <View className="mb-5">
                  <TouchableOpacity>
                    {/* <Video
                    color={"black"}
                      source={{uri: item.videoUrl}}
                      style={{width: '100%', height: 200,color:"black"}}
                      controls={true}
                      resizeMode="cover"
                      onLoad={() => console.log('Video Loaded:', item.videoUrl)}
                      onError={error =>
                        console.log('Video Load Error:', error, item.videoUrl)
                      }
                      paused={true}
                      repeat={true}
                    /> */}
                    <VideoPlayer
                      source={{uri: item.videoUrl}}
                      style={{width: '100%', height: 200}}
                      resizeMode="cover"
                      paused={true}
                      showOnStart={true}
                      tapAnywhereToPause={true}
                      seekColor="#441752"
                      controlTimeout={3000}
                      disableBack={false}
                      disableVolume={false}
                      disableFullscreen={true}
                      fullscreenOrientation="landscape"
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => navigation.navigate('User-Details')}>
                    <View className="flex flex-row justify-between pb-5 border-b-8 border-gray-200 pt-3 px-3">
                      <TouchableOpacity>
                        <Image
                          source={require('../assets/Images/user.png')}
                          className="w-10 h-10 rounded-full"
                        />
                      </TouchableOpacity>
                      <View className="flex flex-col gap-1 flex-1 ml-2">
                        <Text className="text-sm font-medium text-black">
                          {item?.title}
                        </Text>
                        <Text className="text-gray-500 text-xs font-medium">
                          {item?.creatorId?.name} •{' '}
                          {new Date(item.createdAt).toDateString()}
                        </Text>
                      </View>
                      <TouchableOpacity>
                        <Image source={require('../assets/Images/more.png')} />
                      </TouchableOpacity>
                    </View>
                  </TouchableOpacity>
                </View>
              );
            }}
            nestedScrollEnabled={true}
          />
        )}
      </View>

      <View className="px-1">
        <HomeShorts />
      </View>
    </ScrollView>
  );
};

export default Home;
