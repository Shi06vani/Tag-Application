import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  FlatList,
  Alert,
} from 'react-native';
import TagList from '../components/Home/TagList.jsx';

import {getAllPostedVideos} from '../api/useVideo.jsx/Video.jsx';
import {useNavigation} from '@react-navigation/native';
import VideoPlayer from 'react-native-video-controls';
import LinearGradient from 'react-native-linear-gradient';
import SearchInput from '../components/common/SearchInput.jsx';
const Home = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isVideoPressed, setIsVideoPressed] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    setLoading(true);
    try {
      const result = await getAllPostedVideos('video');
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

  // Add this function in your component
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

  console.log('home video', videos);

  return (
    <View className="bg-white flex-1">
      <View className="pt-24 pb-2">
        <SearchInput />
      </View>

      <View className="flex flex-row items-center  pb-3  ">
        <View className="w-full">
          <TagList />
        </View>
      </View>

      <View className="bg-white px-3 pb-28 h-full">
        {loading ? (
           <View className="flex-1 justify-center items-center">
           <ActivityIndicator size="large" color="#441752" />
         </View>
        ) : (
          <FlatList
            data={videos}
            keyExtractor={item => item?._id}
            contentContainerStyle={{paddingBottom: 100}}
            extraData={videos}
            renderItem={({item}) => {
              return (
                <View className="mb-5 mx-1">
                  <TouchableOpacity>
                    {/* Video Player */}
                    <View className="rounded-xl overflow-hidden  border-2 border-primary">
                      {/* <View className="w-full ">
                          <VideoPlayer
                            style={{width: '100%', height: 200}}
                            source={{uri: item.videoUrl}}
                            resizeMode="contain"
                            paused={true}
                            showOnStart={true}
                            tapAnywhereToPause={true}
                            seekColor="#441752"
                            controlTimeout={3000}
                            disableBack={false}
                            disableVolume={false}
                            disableFullscreen={true}
                            fullscreenOrientation="landscape"
                            onPlay={() => trackVideoView(item._id, item)}
                          />
                        </View> */}
                      <View className="relative">
                        <TouchableOpacity
                          onPress={() => {
                            setIsVideoPressed(!isVideoPressed);
                            trackVideoView(item._id, item);
                          }}>
                          <Image
                            style={{width: '100%', height: 200}}
                            source={require('../assets/Images/thnumnail2.jpg')}
                          />
                        </TouchableOpacity>
                        <View className="  absolute top-20 left-40 ">
                          <TouchableOpacity
                            onPress={() => {
                              setIsVideoPressed(!isVideoPressed);
                              trackVideoView(item._id, item);
                            }}>
                            <View className="bg-black opacity-75 p-2 rounded-full">
                              <Image
                                tintColor={'white'}
                                className=" w-6 h-6"
                                source={require('../assets/Images/play.png')}

                                // source={  isVideoPressed ? require('../assets/Images/pause.png'): require("../assets/Images/play.png")}
                              />
                            </View>
                          </TouchableOpacity>
                        </View>
                      </View>

                      <LinearGradient
                        colors={['#6a0080', '#441752']}
                        style={{
                          width: '100%',
                          paddingVertical: 15,
                          flexDirection: 'row',
                          alignItems: 'center',
                          paddingHorizontal: 15,
                        }}>
                        <View className="flex-row ">
                          <TouchableOpacity
                            onPress={() =>
                              navigation.navigate('User-Details', {
                                userId: item?.creatorId?._id,
                              })
                            }
                            className="mr-3">
                            <Image
                              source={
                                item?.creatorId?.image
                                  ? {uri: item?.creatorId?.image}
                                  : require('../assets/Images/default-image.png')
                              }
                              className="w-10 h-10 rounded-full"
                            />
                          </TouchableOpacity>

                          <View className="flex-1">
                            <Text
                              className="text-base text-white font-bold mb-0.5"
                              numberOfLines={2}>
                              {item?.title || ''}
                            </Text>

                            <Text className="text-sm text-gray-200">
                              {item?.views || 0} views •{' '}
                              {formatDate(item?.createdAt)}
                            </Text>
                          </View>
                        </View>
                      </LinearGradient>
                    </View>
                  </TouchableOpacity>
                </View>
              );
            }}
            nestedScrollEnabled={true}
            ListEmptyComponent={
              <View className="flex-1 items-center justify-center py-20">
                <Image
                  source={require('../assets/Images/out-of-stock.png')}
                  // Optional: Add your own placeholder image
                  className="w-24 h-24 mb-4 opacity-60"
                  resizeMode="contain"
                />
                <Text className="text-gray-500 text-lg font-medium">
                  No Videos
                </Text>
              </View>
            }
          />
        )}
      </View>

     

      {/* <View className="px-1">
        <HomeShorts />
      </View> */}
    </View>
  );
};

export default Home;

{
  /* <Video
                    color={"black"}
                      source={{uri: item.videoUrl}}
                      style={{width: '100%', height: 200,color:"black"}}
                      controls={true}
                      resizeMode="cover"
                      onLoad={() => console.log('Video Loaded:', item.videoUrl)}
                      onError={error =>
                        console.log('Video Load Error:', error, item.videoUrl)
                      }  // <View className="mb-5">
                //   <TouchableOpacity>
                //     <VideoPlayer
                //       source={{uri: item.videoUrl}}
                //       style={{width: '100%', height: 200}}
                //       resizeMode="cover"
                //       paused={true}
                //       showOnStart={true}
                //       tapAnywhereToPause={true}
                //       seekColor="#441752"
                //       controlTimeout={3000}
                //       disableBack={false}
                //       disableVolume={false}
                //       disableFullscreen={true}
                //       fullscreenOrientation="landscape"
                //     />
                //   </TouchableOpacity>
                //   <TouchableOpacity
                //     onPress={() => navigation.navigate('User-Details')}>
                //     <View className="flex flex-row justify-between pb-5 border-b-8 border-gray-200 pt-3 px-3">
                //       <TouchableOpacity>
                //         <Image
                //           source={require('../assets/Images/user.png')}
                //           className="w-10 h-10 rounded-full"
                //         />
                //       </TouchableOpacity>
                //       <View className="flex flex-col gap-1 flex-1 ml-2">
                //         <Text className="text-sm font-medium text-black">
                //           {item?.title}
                //         </Text>
                //         <Text className="text-gray-500 text-xs font-medium">
                //           {item?.creatorId?.name} •{' '}
                //           {new Date(item.createdAt).toDateString()}
                //         </Text>
                //       </View>
                //       <TouchableOpacity>
                //         <Image source={require('../assets/Images/more.png')} />
                //       </TouchableOpacity>
                //     </View>
                //   </TouchableOpacity>
                // </View>
                      paused={true}
                      repeat={true}
                    /> */
}

// <FlatList
//   data={videos}
//   keyExtractor={item => item?._id}
//   extraData={videos}
//   renderItem={({item}) => {
//     return (
//       <View className="mb-5">
//         <TouchableOpacity>
//           <View className="rounded-xl overflow-hidden  border-4 border-primary">

//             <VideoPlayer
//               source={{uri: item.videoUrl}}
//               style={{width: '100%', height: 200}}
//               resizeMode="cover"
//               paused={true}
//               showOnStart={true}
//               tapAnywhereToPause={true}
//               seekColor="#441752"
//               controlTimeout={3000}
//               disableBack={false}
//               disableVolume={false}
//               disableFullscreen={true}
//               fullscreenOrientation="landscape"
//               onPlay={() => trackVideoView(item._id)}
//             />

//             {/* Gradient Background with User Details */}
//             <TouchableOpacity
//               onPress={() =>
//                 navigation.navigate('User-Details', {
//                   userId: item?.creatorId?._id,
//                 })
//               }>
//               <LinearGradient
//                 colors={['#6a0080', '#441752']}
//                 style={{
//                   position: '',

//                   bottom: 0,
//                   width: '100%',
//                   paddingVertical: 15,
//                   flexDirection: 'row',
//                   alignItems: 'center',
//                   paddingHorizontal: 15,
//                 }}>
//                 {/* User Image */}
//                 <Image
//                   source={require('../assets/Images/user.png')}
//                   style={{
//                     width: 35,
//                     height: 35,
//                     borderRadius: 50,
//                     marginRight: 10,
//                   }}
//                 />

//                 <View style={{flex: 1}}>
//                   <Text
//                     style={{
//                       color: 'white',
//                       fontSize: 14,
//                       fontWeight: 'bold',
//                     }}>
//                     {item?.creatorId?.name}
//                   </Text>
//                   <Text
//                     style={{
//                       color: 'white',
//                       fontSize: 12,
//                       opacity: 0.8,
//                     }}>
//                     {new Date(item.createdAt).toDateString()}
//                   </Text>
//                 </View>

//                 {/* More Options */}
//                 {/* <TouchableOpacity>
//                 <Image
//                 tintColor={"white"}
//                   source={require('../assets/Images/more.png')}
//                 />
//               </TouchableOpacity> */}
//               </LinearGradient>
//             </TouchableOpacity>
//           </View>
//         </TouchableOpacity>
//       </View>
//     );
//   }}
//   nestedScrollEnabled={true}
// />
