import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  Dimensions,
  TouchableOpacity
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Video from 'react-native-video';
import BASE_URL from '../../config';
import { deleteVideo } from '../api/useVideo.jsx/Video';

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



  
  const timeAgo = date => {
    const seconds = Math.floor((new Date() - new Date(date)) / 1000);

    const intervals = [
      {label: 'year', seconds: 31536000},
      {label: 'month', seconds: 2592000},
      {label: 'week', seconds: 604800},
      {label: 'day', seconds: 86400},
      {label: 'hour', seconds: 3600},
      {label: 'minute', seconds: 60},
      {label: 'second', seconds: 1},
    ];

    for (const interval of intervals) {
      const count = Math.floor(seconds / interval.seconds);
      if (count >= 1) {
        return `${count} ${interval.label}${count > 1 ? 's' : ''} ago`;
      }
    }
    return 'just now';
  };
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
        // <FlatList
        //   data={shorts}
        //   className="w-full bg-black"
        //   keyExtractor={(item, index) => index.toString()}
        //   pagingEnabled
        //   showsVerticalScrollIndicator={false}
        //   renderItem={({item}) => (
        //     <View className="h-[100vh] justify-center items-center relative bg-black">
        //       {/* Video player full-screen style */}
        //       <Video
        //         source={{uri: item.videoUrl}}
        //         style={{width: '100%', height: '100%'}}
        //         resizeMode="cover"
        //         controls
        //         repeat
        //       />

        //       {/* Overlay Info at bottom */}
        //       <View className="absolute bottom-16 left-4 right-4 px-2">
        //         <Text className="text-white text-lg font-bold">
        //           {item.title}
        //         </Text>
        //         <Text className="text-white text-sm mt-1">
        //           {item.description}
        //         </Text>
        //         <View className="flex-row mt-1">
        //           <Text className="text-white text-xs mr-4">
        //             Category: {item.category}
        //           </Text>
        //           <Text className="text-white text-xs">
        //             Views: {item.views}
        //           </Text>
        //         </View>
        //       </View>
        //     </View>
        //   )}
        //   ListEmptyComponent={
        //     <View className="h-[100vh] justify-center items-center bg-black">
        //       <Text className="text-white text-base">No Shorts found.</Text>
        //     </View>
        //   }
        // />
        <FlatList
          data={shorts}
          className="mt-4 w-full px-5"
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => (
            <View className="  overflow-hidden rounded-xl mb-5 shadow-sm">
              <Video
                source={{uri: item.videoUrl}}
                style={{width: '100%', height: 200, borderRadius: 12}}
                resizeMode="cover"
                controls
                muted={false}
                volume={1.0}
                repeat
              />

              <View className="py-4 bg-primary px-3">
                <View className="flex-row justify-between ">
                  <View className="flex-row gap-3 items-center">
                    <Text
                      className="text-white text-base font-bold"
                      numberOfLines={1}>
                      {item?.title}
                    </Text>
                    <Text
                      className="text-xs font-semibold  mt-1 text-primary rounded-full px-2 py-1 bg-purple-50 opacity-2
                      ">
                      {item?.category}
                    </Text>
                  </View>
                  <TouchableOpacity onPress={()=> deleteVideo(item._id)}>
                    <View>
                      <Text className="text-white text-xs bg-red-500 px-3 py-1 rounded-lg">
                        Delete
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>

                {/* Description (optional) */}
                {item?.description ? (
                  <Text
                    className="text-gray-300 text-sm mt-1"
                    numberOfLines={2}>
                    {item?.description}
                  </Text>
                ) : null}

                {/* Views and Time Ago */}
                <View className="flex-row mt-1">
                  <Text className="text-gray-400 text-xs">
                    {item?.views || 0} views • {timeAgo(item?.createdAt)}
                  </Text>
                </View>
              </View>
            </View>
          )}
          ListEmptyComponent={() => (
            <View className=" flex flex-1 justify-center items-center ">
              <Text className="text-base text-primary">No videos found.</Text>
            </View>
          )}
        />
      )}
    </View>
  );
};

export default MyShorts;
