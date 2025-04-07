import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Video from 'react-native-video';
import BASE_URL from '../../config';

const {width} = Dimensions.get('window');

const MyShorts = () => {
  const [shorts, setShorts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUserShorts = async () => {
    try {
      const userId = await AsyncStorage.getItem('loginuser_id');
      if (!userId) return;

      const response = await fetch(
        `${BASE_URL}/api/videos/user-sorts/${userId}`,
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

  return (
    <View className="flex-1 bg-white">
      {loading ? (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#441752" />
        </View>
      ) : shorts?.length === 0 ? (
        <Text className="text-center mt-6 text-gray-500 text-base">
          No shorts found
        </Text>
      ) : (
        <FlatList
          data={shorts}
          className="w-full bg-black"
          keyExtractor={(item, index) => index.toString()}
          pagingEnabled
          showsVerticalScrollIndicator={false}
          renderItem={({item}) => (
            <View className="h-[100vh] justify-center items-center relative bg-black">
              {/* Video player full-screen style */}
              <Video
                source={{uri: item.videoUrl}}
                style={{width: '100%', height: '100%'}}
                resizeMode="cover"
                controls
                repeat
              />

              {/* Overlay Info at bottom */}
              <View className="absolute bottom-16 left-4 right-4 px-2">
                <Text className="text-white text-lg font-bold">
                  {item.title}
                </Text>
                <Text className="text-white text-sm mt-1">
                  {item.description}
                </Text>
                <View className="flex-row mt-1">
                  <Text className="text-white text-xs mr-4">
                    Category: {item.category}
                  </Text>
                  <Text className="text-white text-xs">
                    Views: {item.views}
                  </Text>
                </View>
              </View>
            </View>
          )}
          ListEmptyComponent={
            <View className="h-[100vh] justify-center items-center bg-black">
              <Text className="text-white text-base">No Shorts found.</Text>
            </View>
          }
        />
      )}
    </View>
  );
};

export default MyShorts;
