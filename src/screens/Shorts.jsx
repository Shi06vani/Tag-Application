import React, {useRef, useState, useEffect} from 'react';
import {
  View,
  Dimensions,
  FlatList,
  TouchableOpacity,
  Text,
  Image,
  AppState,
  ActivityIndicator,
} from 'react-native';
import Video from 'react-native-video';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {getAllPostedVideos} from '../api/useVideo.jsx/Video';
const {height, width} = Dimensions.get('window');

const shortsData = [
  {
    id: '1',
    url: 'https://www.w3schools.com/html/mov_bbb.mp4',
    likes: 120,
    comments: 952,
    channel: 'SADEK Tuts',
    title: 'DIY Toys | Satisfying And Relaxing | SADek Tuts Tiktok Compition',
    hashtags: '#SADEK #Shorts #tiktok',
  },
  {
    id: '2',
    url: 'https://www.w3schools.com/html/movie.mp4',
    likes: 250,
    comments: 952,
    channel: 'SADEK Tuts',
    title: 'DIY Toys | Satisfying And Relaxing | SADek Tuts Tiktok Compition',
    hashtags: '#SADEK #Shorts #tiktok',
  },
  {
    id: '3',
    url: 'https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4',
    likes: 80,
    comments: 952,
    channel: 'SADEK Tuts',
    title: 'DIY Toys | Satisfying And Relaxing | SADek Tuts Tiktok Compition',
    hashtags: '#SADEK #Shorts #tiktok',
  },
];

const Shorts = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [playing, setPlaying] = useState(true);
  const appState = useRef(AppState.currentState);
  const [showControls, setShowControls] = useState(true);
  const videoRefs = useRef([]);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (nextAppState === 'background' || nextAppState === 'inactive') {
        setPlaying(false);
      }
    });

    return () => {
      subscription.remove();
    };
  }, []);

  useEffect(() => {
    const fetchVideos = async () => {
      setLoading(true);
      try {
        const result = await getAllPostedVideos('short');
        console.log('Fetched shorts:', result);

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

    fetchVideos();
  }, []);

  if (loading) {
    return (
      <ActivityIndicator
        size="large"
        color="#441752"
        className="flex-1 justify-center items-center"
      />
    );
  }

  return (
    <FlatList
      data={videos}
      keyExtractor={item => item.id}
      renderItem={({item, index}) => (
        <TouchableOpacity
          activeOpacity={1}
          style={{
            height,
            width,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            className="bg-black relative"
            style={{
              height,
              width,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Video
              ref={ref => (videoRefs.current[index] = ref)}
              source={{uri: item.videoUrl}}
              style={{width: '100%', height: height * 0.8}}
              resizeMode="contain"
              repeat
              muted={currentIndex !== index}
              playInBackground={false}
              playWhenInactive={false}
              paused={currentIndex !== index || !playing}
            />

            {/* Only title and hashtags */}
            <View
              style={{position: 'absolute', bottom: 95, left: 15, width: 300}}>
              <Text
                style={{
                  color: 'white',
                  fontSize: 16,
                  fontWeight: 'bold',
                  marginBottom: 10,
                }}>
                {item.title}
              </Text>
              <Text style={{color: 'white', fontSize: 14}}>
                {item.hashtags}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      )}
      pagingEnabled
      viewabilityConfig={{itemVisiblePercentThreshold: 50}}
    />
  );
};

export default Shorts;

// <FlatList
//   data={videos}
//   keyExtractor={item => item.id}
//   renderItem={({item, index}) => (
//     <TouchableOpacity
//       activeOpacity={1}
//       style={{
//         height,
//         width,
//         justifyContent: 'center',
//         alignItems: 'center',
//       }}
//       onPress={togglePlayPause}>
//       <View
//         className="bg-black relative"
//         style={{
//           height,
//           width,
//           justifyContent: 'center',
//           alignItems: 'center',
//         }}>
//         <Video
//           ref={ref => (videoRefs.current[index] = ref)}
//           source={{uri: item.videoUrl}}
//           style={{width: '100%', height: height * 0.8}}
//           resizeMode="contain"
//           repeat
//           muted={currentIndex !== index}
//           playInBackground={false}
//           playWhenInactive={false}
//           paused={currentIndex !== index || !playing}
//         />

//         {showControls && (
//           <TouchableOpacity
//             style={{
//               position: 'absolute',
//               top: height / 2,
//               alignSelf: 'center',
//               tintColor: 'white',
//             }}
//             onPress={() => setPlaying(!playing)}>
//             <Image
//               tintColor={'white'}
//               className="w-10 h-10 text-white "
//               source={
//                 playing
//                   ? require('../assets/Images/pause.png')
//                   : require('../assets/Images/play.png')
//               }
//             />
//           </TouchableOpacity>
//         )}

//         {/* <View
//           style={{
//             position: 'absolute',
//             right: 15,
//             bottom: 80,
//             alignItems: 'center',
//           }}>
//           <TouchableOpacity
//             style={{marginBottom: 25}}
//             onPress={() => console.log('Liked!')}
//             className="flex flex-col justify-center items-center">
//             <Image
//               source={require('../assets/Images/thumbs-up.png')}
//               className="w-7 h-7"
//             />
//             <Text style={{color: 'white', textAlign: 'center'}}>
//               {item.likes}
//             </Text>
//           </TouchableOpacity>

//           <TouchableOpacity
//             style={{marginBottom: 25}}
//             className="flex flex-col justify-center items-center">
//             <Image
//               source={require('../assets/Images/thumb-down.png')}
//               className="w-7 h-7"
//             />
//             <Text style={{color: 'white', textAlign: 'center'}}>
//               Dislike
//             </Text>
//           </TouchableOpacity>

//           <TouchableOpacity
//             style={{marginBottom: 25}}
//             className="flex flex-col justify-center items-center">
//             <Image
//               source={require('../assets/Images/comment.png')}
//               className="w-7 h-7"
//             />

//             <Text style={{color: 'white', textAlign: 'center'}}>
//               {item.comments}
//             </Text>
//           </TouchableOpacity>

//           <TouchableOpacity
//             style={{marginBottom: 25}}
//             className="flex flex-col justify-center items-center">
//             <Image
//               source={require('../assets/Images/forward.png')}
//               className="w-7 h-7"
//             />

//             <Text style={{color: 'white', textAlign: 'center'}}>Share</Text>
//           </TouchableOpacity>
//           <TouchableOpacity className="flex flex-col justify-center items-center">
//             <Image
//               source={require('../assets/Images/wave-sound.png')}
//               className="w-10 h-9"
//             />
//           </TouchableOpacity>
//         </View> */}

//         <View
//           style={{position: 'absolute', bottom: 95, left: 15, width: 300}}>
//           <Text
//             style={{
//               color: 'white',
//               fontSize: 16,
//               fontWeight: 'bold',
//               marginBottom: 10,
//             }}>
//             {item.title}
//           </Text>
//           <Text style={{color: 'white', fontSize: 14}}>
//             {item.hashtags}
//           </Text>
//         </View>

//         {/* Channel Info + Subscribe Button */}
//         {/* <View
//           style={{
//             position: 'absolute',
//             bottom: 45,
//             left: 15,
//             flexDirection: 'row',
//             alignItems: 'center',
//           }}>
//           <Image
//             source={require('../assets/Images/man.png')}
//             style={{
//               width: 35,
//               height: 35,
//               borderRadius: 20,
//               marginRight: 10,
//             }}
//           />
//           <Text style={{color: 'white', fontSize: 16}}>{item.channel}</Text>
//           <TouchableOpacity
//             style={{
//               backgroundColor: '#441752',
//               paddingVertical: 5,
//               paddingHorizontal: 10,
//               borderRadius: 5,
//               marginLeft: 10,
//             }}>
//             <Text style={{color: 'white', fontWeight: 'bold'}}>
//               SUBSCRIBE
//             </Text>
//           </TouchableOpacity>
//         </View> */}
//       </View>
//     </TouchableOpacity>
//   )}
//   pagingEnabled
//   onViewableItemsChanged={handleViewableItemsChanged}
//   viewabilityConfig={{itemVisiblePercentThreshold: 50}}
// />
