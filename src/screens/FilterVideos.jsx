import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {ScrollView, Image, View, Text, TouchableOpacity} from 'react-native';

const FilterVideos = ({route}) => {
  const {filterVideos} = route.params;
  console.log(filterVideos);
  const [isVideoPressed, setIsVideoPressed] = useState(false);

  const navigation = useNavigation();

  const formatDate = dateString => {
    if (!dateString) return '';

    const now = new Date();
    const date = new Date(dateString);
    const diffTime = Math.abs(now - date);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
      return 'Today';
    } else if (diffDays === 1) {
      return 'Yesterday';
    } else if (diffDays < 7) {
      return `${diffDays} days ago`;
    } else if (diffDays < 30) {
      const weeks = Math.floor(diffDays / 7);
      return `${weeks} ${weeks === 1 ? 'week' : 'weeks'} ago`;
    } else if (diffDays < 365) {
      const months = Math.floor(diffDays / 30);
      return `${months} ${months === 1 ? 'month' : 'months'} ago`;
    } else {
      const years = Math.floor(diffDays / 365);
      return `${years} ${years === 1 ? 'year' : 'years'} ago`;
    }
  };

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

  return (
    <ScrollView className="pb-16 pt-4 px-4 flex-1 bg-purple-50">
      {/* {filterVideos?.map((video, index) => (
        <TouchableOpacity
          onPress={() => {
            setIsVideoPressed(!isVideoPressed);
            trackVideoView(video._id, video);
          }}>
          <View
            key={index}
            className="w-full rounded-xl overflow-hidden border border-purple-400 bg-white mb-4">
            <View className="relative">
              <Image
                source={require('../assets/Images/thnumnail1.jpg')}
                className="w-full h-52"
                resizeMode="cover"
              />
              <TouchableOpacity
                onPress={() => {
                  setIsVideoPressed(!isVideoPressed);
                  trackVideoView(video._id, video);
                }}
                className="absolute top-20 left-40 inset-0 opacity-50 p-2 rounded-full  items-center justify-center bg-black">
                <Image
                  tintColor={'white'}
                  className="w-7 h-7"
                  source={require('../assets/Images/play.png')}
                />
              </TouchableOpacity>
            </View>

            <View className="flex-row  gap-3 bg-[#441752] px-4 pb-4 pt-2">
              <TouchableOpacity>
                <Image
                  source={
                    video.image
                      ? {uri: video.avatar}
                      : require('../assets/Images/default-image.png')
                  }
                  className="w-9 h-9 rounded-full"
                />
              </TouchableOpacity>

              <View>
                <Text className="text-white font-semibold text-sm">
                  {video.title}
                </Text>
                <Text className="text-xs text-gray-300">
                  {video.views || 0} views • {video.timeAgo}{' '}
                  {formatDate(video?.createdAt)}
                </Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      ))} */}
      {filterVideos && filterVideos.length > 0 ? (
        filterVideos.map((video, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => {
              setIsVideoPressed(!isVideoPressed);
              trackVideoView(video._id, video);
            }}>
            <View className="w-full rounded-xl overflow-hidden border border-purple-400 bg-white mb-4">
              {/* Thumbnail + Play Button */}
              <View className="relative">
                <Image
                  source={require('../assets/Images/thnumnail1.jpg')}
                  className="w-full h-52"
                  resizeMode="cover"
                />
                <TouchableOpacity
                  onPress={() => {
                    setIsVideoPressed(!isVideoPressed);
                    trackVideoView(video._id, video);
                  }}
                  className="absolute top-20 left-40 inset-0 opacity-50 p-2 rounded-full items-center justify-center bg-black">
                  <Image
                    tintColor={'white'}
                    className="w-7 h-7"
                    source={require('../assets/Images/play.png')}
                  />
                </TouchableOpacity>
              </View>

              {/* Bottom Bar */}
              <View className="flex-row gap-3 bg-[#441752] px-4 pb-4 pt-2">
                <TouchableOpacity>
                  <Image
                    source={
                      video.image
                        ? {uri: video.avatar}
                        : require('../assets/Images/default-image.png')
                    }
                    className="w-9 h-9 rounded-full"
                  />
                </TouchableOpacity>

                <View>
                  <Text className="text-white font-semibold text-sm">
                    {video.title}
                  </Text>
                  <Text className="text-xs text-gray-300">
                    {video.views || 0} views • {video.timeAgo}{' '}
                    {formatDate(video?.createdAt)}
                  </Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        ))
      ) : (
        <View className="flex-1 justify-center items-center">
          <Text className="text-sm text-gray-400 ">No videos</Text>
        </View>
      )}
    </ScrollView>
  );
};

export default FilterVideos;
