import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import {getRelatedVideos} from '../api/useVideo.jsx/Video';
import {getTimeAgo} from './common/GetTime';
import Video from 'react-native-video';
import {useNavigation} from '@react-navigation/native';

const RelatedVideos = ({videoId}) => {
  const [relatedVideos, setRelatedVideos] = useState([]);
  const navigation = useNavigation();
  const [isVideoPressed, setIsVideoPressed] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (videoId) {
      fetchRelatedVideos();
    }
  }, [videoId]);

  const fetchRelatedVideos = async () => {
    const data = await getRelatedVideos(videoId);
    if (data) {
      setLoading(false);
    }

    console.log('related', data.relatedVideos);
    setRelatedVideos(data.relatedVideos);
  };

  const renderItem = ({item}) => {
    const timeAgo = getTimeAgo(item.createdAt);
    const commentCount = item.comments?.length || 0;
    const creatorName = item.creatorId?.name || 'Unknown Creator';

    // First, let's create a function to track video views
    const trackVideoView = async (videoId, item) => {
      try {
        const response = await fetch(
          `https://tag-backend.vercel.app/api/videos/onevideo/${videoId}/view`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
          },
        );

        if (!response.ok) {
          throw new Error('Failed to track video view');
        }
        navigation.navigate('Videos', {videoData: item});
      } catch (error) {
        Alert.alert(' Failed', error.message);

        console.error('Error tracking video view:', error);
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
      <TouchableOpacity className="flex-row mb-4 bg-white rounded-lg shadow-sm overflow-hidden">
        {/* Thumbnail */}
        <View className="relative w-40 h-24 rounded-l-lg overflow-hidden">
          {/* <Video
            source={{uri: item.videoUrl}}
            style={{width: '100%', height: '100%'}}
            resizeMode="cover"
            paused={true}
            muted={true}
          /> */}
          <TouchableOpacity
            onPress={() => {
              setIsVideoPressed(!isVideoPressed);
              trackVideoView(item._id, item);
            }}>
            <Image
              source={require('../assets/Images/thnumnail1.jpg')}
              className="w-full h-full"
            />
          </TouchableOpacity>
          <View className="absolute left-20 top-10 inset-0 justify-center items-center">
            <Image
              tintColor="white"
              source={require('../assets/Images/play.png')}
              className="w-5 h-5 opacity-80"
            />
          </View>
        </View>
        {/* Right Content */}
        <View className="flex-1 px-4 py-2 justify-between">
          <Text className="text-sm font-semibold text-black" numberOfLines={2}>
            {item.title}
          </Text>
          <Text className="text-xs text-gray-600 mt-1">@{creatorName}</Text>
          <Text className="text-xs text-gray-500">
            {item.views} views • {timeAgo}
          </Text>
          <Text className="text-xs text-gray-400">{commentCount} comments</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <>
{loading ? (
  <View className="flex-1 justify-center items-center">
    <ActivityIndicator size="large" color="#441752" />
  </View>
) : (

    <FlatList
      data={relatedVideos}
      keyExtractor={item => item._id}
      renderItem={renderItem}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{paddingBottom: 20, paddingHorizontal: 10}}
      ListEmptyComponent={
        <Text
          style={{
            textAlign: 'center',
            marginTop: 20,
            fontSize: 16,
            color: 'gray',
          }}>
          No videos found
        </Text>
      }
    />)}
  </>
  );
};

export default RelatedVideos;
