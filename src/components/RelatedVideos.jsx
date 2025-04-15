import React, { useEffect, useState } from 'react';
import {View, Text, StyleSheet, FlatList, TouchableOpacity, Image} from 'react-native';
import {getRelatedVideos} from '../api/useVideo.jsx/Video';
import { getTimeAgo } from './common/GetTime';
import Video from 'react-native-video';

const RelatedVideos = ({ videoId }) => {
  const [relatedVideos, setRelatedVideos] = useState([]);
  
  useEffect(() => {
    if (videoId) {
      fetchRelatedVideos();
    }
  }, [videoId]);

  const fetchRelatedVideos = async () => {
    const data = await getRelatedVideos(videoId);

    console.log('related', data.relatedVideos);
    setRelatedVideos(data.relatedVideos);
  };

  const renderItem = ({item}) => {
    const timeAgo = getTimeAgo(item.createdAt);
    const commentCount = item.comments?.length || 0;
    const creatorName = item.creatorId?.name || 'Unknown Creator';

    return (
      <TouchableOpacity className="flex-row mb-4 bg-white rounded-lg shadow-sm overflow-hidden">
        {/* Thumbnail */}
        <View className="relative w-40 h-24 rounded-l-lg overflow-hidden">
          <Video
            source={{uri: item.videoUrl}}
            style={{width: '100%', height: '100%'}}
            resizeMode="cover"
            paused={true}
            muted={true}
          />
          <View className="absolute left-16 top-10 inset-0 justify-center items-center">
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
    <FlatList
      data={relatedVideos}
      keyExtractor={item => item._id}
      renderItem={renderItem}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{paddingBottom: 20, paddingHorizontal: 10}}
    />
  );
};

export default RelatedVideos;
