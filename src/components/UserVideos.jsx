import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Video from 'react-native-video';
import BASE_URL from "../../config"

const UserVideos = () => {
  const [videos, setVideos] = useState([]);
  const [showVideos, setShowVideos] = useState(false);
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchUserVideos();
  }, []);

  const fetchUserVideos = async () => {
    try {
      setLoading(true);
      const userId = await AsyncStorage.getItem('loginuser_id');
      if (!userId) {
        navigation.navigate('Login');
        return;
      }

      const response = await axios.get(`${BASE_URL}/api/videos/user/${userId}`,
      );
      setVideos(response.videos);
      setShowVideos(true);
    } catch (error) {
      console.error('Error fetching videos:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 bg-purple-50">
    {loading && (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#441752" />
      </View>
    )}

    {!loading && showVideos && videos?.length === 0 && (
      <Text className="mt-5 text-base text-gray-500 text-center">
        No videos found
      </Text>
    )}

    {!loading && videos?.length > 0 && (
      <FlatList
        data={videos}
        className="mt-4 w-full px-4"
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View className="py-4 border-b border-gray-200 bg-white rounded-xl mb-3 shadow-sm p-3">
            <Text className="text-[#441752] text-base font-semibold mb-1">
              {item.title}
            </Text>

            <Video
              source={{ uri: item.videoUrl }}
              style={{ width: '100%', height: 200, borderRadius: 12 }}
              resizeMode="cover"
              controls
              muted={false}
              volume={1.0}
              repeat
            />

            <Text className="text-gray-500 text-xs mt-2">
              {item.description}
            </Text>

            <View className="flex-row justify-between mt-2">
              <Text className="text-xs text-gray-400">Views: {item.views}</Text>
              <Text className="text-xs text-gray-400">Category: {item.category}</Text>
            </View>
          </View>
        )}
        ListEmptyComponent={
          <Text className="text-center mt-4 text-gray-900 text-base">
            No videos found.
          </Text>
        }
      />
    )}
  </View>
  );
};

export default UserVideos;
