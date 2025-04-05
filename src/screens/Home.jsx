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
import LinearGradient from 'react-native-linear-gradient';
const Home = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    setLoading(true);
    try {
      const result = await getAllPostedVideos("video");
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


  console.log(videos,"videos")



  return (
    <ScrollView
      className="bg-white mt-16 "
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
                    <View className="rounded-xl overflow-hidden  border-4 border-primary">
                      {/* Video Player */}
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

                      {/* Gradient Background with User Details */}
                      <TouchableOpacity onPress={()=> navigation.navigate("User-Details",{userId:item?.creatorId?._id})}>
                      <LinearGradient
                        colors={['#6a0080', '#441752']}
                        style={{
                          position: '',
                          
                          bottom: 0,
                          width: '100%',
                          paddingVertical: 15,
                          flexDirection: 'row',
                          alignItems: 'center',
                          paddingHorizontal: 15,
                        
                          
                        }}>
                        {/* User Image */}
                        <Image
                          source={require('../assets/Images/user.png')}
                          style={{
                            width: 35,
                            height: 35,
                            borderRadius: 50,
                            marginRight: 10,
                          }}
                        />

                        <View style={{flex: 1}}>
                          <Text
                            style={{
                              color: 'white',
                              fontSize: 14,
                              fontWeight: 'bold',
                            }}>
                            {item?.creatorId?.name}
                          </Text>
                          <Text
                            style={{
                              color: 'white',
                              fontSize: 12,
                              opacity: 0.8,
                            }}>
                            {new Date(item.createdAt).toDateString()}
                          </Text>
                        </View>

                        {/* More Options */}
                        {/* <TouchableOpacity>
                          <Image
                          tintColor={"white"}
                            source={require('../assets/Images/more.png')}
                          />
                        </TouchableOpacity> */}
                      </LinearGradient>
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

      {/* <View className="px-1">
        <HomeShorts />
      </View> */}
    </ScrollView>
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



