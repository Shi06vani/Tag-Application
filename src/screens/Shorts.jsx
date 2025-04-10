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
  console.log(videos, '==========videos');

  const getDaysAgo = dateString => {
    const uploadedDate = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - uploadedDate);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return '1 day ago';
    return `${diffDays} days ago`;
  };
  return (
    <FlatList
      data={videos}
      keyExtractor={item => item.id}
      renderItem={({item, index}) => (
        // <TouchableOpacity
        //   activeOpacity={1}
        //   style={{
        //     width,
        //     justifyContent: 'center',
        //     alignItems: 'center',
        //   }}>
        //   <View
        //     className="bg-black relative"
        //     style={{
        //       height,
        //       width,
        //       justifyContent: 'center',
        //       alignItems: 'center',
        //     }}>
        //     <Video
        //       ref={ref => (videoRefs.current[index] = ref)}
        //       source={{uri: item.videoUrl}}
        //       style={{width: '100%', height: '80%'}}
        //       resizeMode="contain"
        //       repeat
        //       muted={currentIndex !== index}
        //       playInBackground={false}
        //       playWhenInactive={false}
        //       paused={currentIndex !== index || !playing}
        //     />

        //     <View className="absolute bottom-0 left-4 right-4 px-4 flex-row justify-between">
        //       {/* Left section: Creator + Title + Description + Meta */}
        //       <View className="flex flex-col gap-2 max-w-[80%]  border border-white">
        //         {/* Creator Name */}
        //         <View className="flex flex-row items-center gap-2">
        //           <Image
        //             source={require('../assets/Images/user.png')}
        //             className="w-8 h-8 rounded-full"
        //           />
        //           <Text className="text-white text-base font-semibold">
        //             @{item.creatorId?.name}
        //           </Text>
        //         </View>

        //         {/* Title */}
        //         <Text
        //           className="text-white text-lg font-bold"
        //           numberOfLines={1}>
        //           {item.title}
        //         </Text>

        //         {/* Description */}
        //         <Text className="text-white text-sm" numberOfLines={2}>
        //           {item.description}
        //         </Text>

        //         {/* Meta: Category + Days ago + Views */}
        //         <View className="flex-row items-center mt-1 space-x-2">
        //           <Text className="text-white text-sm bg-white/20 px-2 py-0.5 rounded-full">
        //             {item.category}
        //           </Text>
        //           <Text className="text-white text-sm">
        //             • {getDaysAgo(item.createdAt)}
        //           </Text>
        //           <Text className="text-white text-sm">• 👁️ {item.views}</Text>
        //         </View>
        //       </View>

        //       {/* Right section: Like, Comment, Dislike, Music icons */}
        //       <View className="flex flex-col items-center justify-end space-y-6 bottom-7">
        //         <TouchableOpacity>
        //           <Image
        //             source={require('../assets/Images/thumbs-up.png')}
        //             className="w-7 h-7"
        //           />
        //         </TouchableOpacity>
        //         <TouchableOpacity>
        //           <Image
        //             source={require('../assets/Images/thumb-down.png')}
        //             className="w-7 h-7"
        //           />
        //         </TouchableOpacity>
        //         <TouchableOpacity>
        //           <Image
        //             source={require('../assets/Images/comment.png')}
        //             className="w-7 h-7"
        //           />
        //         </TouchableOpacity>
        //         <TouchableOpacity>
        //           <Image
        //             source={require('../assets/Images/forward.png')}
        //             className="w-7 h-7"
        //           />
        //         </TouchableOpacity>

        //         <TouchableOpacity>
        //           <Image
        //             source={require('../assets/Images/wave-sound.png')}
        //             className="w-9 h-9"
        //           />
        //         </TouchableOpacity>
        //       </View>
        //     </View>

        //   </View>
        // </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={1}
          style={{
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
            {/* Video Player */}
            <Video
              ref={ref => (videoRefs.current[index] = ref)}
              source={{uri: item.videoUrl}}
              style={{width: '100%', height: '80%'}}
              resizeMode="contain"
              repeat
              muted={currentIndex !== index}
              playInBackground={false}
              playWhenInactive={false}
              paused={currentIndex !== index || !playing}
            />

            {/* Overlay content */}
            <View className="absolute bottom-0 left-0 right-0 px-4 pb-6 flex-row justify-between items-end">
              {/* Left: Info */}
              <View className="flex flex-col space-y-2 max-w-[75%]">
                {/* Creator Info */}
                <View className="flex-row items-center space-x-2">
                  <Image
                    source={require('../assets/Images/user.png')}
                    className="w-8 h-8 rounded-full"
                  />
                  <Text className="text-white text-base font-semibold">
                    @{item.creatorId?.name}
                  </Text>
                </View>

                {/* Title */}
                <Text
                  className="text-white text-lg font-bold"
                  numberOfLines={1}>
                  {item.title}
                </Text>

                {/* Description */}
                <Text className="text-white text-sm" numberOfLines={2}>
                  {item.description}
                </Text>

                {/* Meta */}
                <View className="flex-row items-center space-x-2">
                  <Text className="text-white text-sm bg-white/20 px-2 py-0.5 rounded-full">
                    {item.category}
                  </Text>
                  <Text className="text-white text-sm">
                    • {getDaysAgo(item.createdAt)}
                  </Text>
                  <Text className="text-white text-sm">• 👁️ {item.views}</Text>
                </View>
              </View>

              {/* Right: Action Icons */}
              <View className="flex flex-col items-center space-y-6 mb-2">
                <TouchableOpacity>
                  <Image
                    source={require('../assets/Images/thumbs-up.png')}
                    className="w-7 h-7"
                  />
                </TouchableOpacity>
                <TouchableOpacity>
                  <Image
                    source={require('../assets/Images/thumb-down.png')}
                    className="w-7 h-7"
                  />
                </TouchableOpacity>
                <TouchableOpacity>
                  <Image
                    source={require('../assets/Images/comment.png')}
                    className="w-7 h-7"
                  />
                </TouchableOpacity>
                <TouchableOpacity>
                  <Image
                    source={require('../assets/Images/forward.png')}
                    className="w-7 h-7"
                  />
                </TouchableOpacity>
                <TouchableOpacity className="mt-2">
                  <Image
                    source={require('../assets/Images/wave-sound.png')}
                    className="w-10 h-10"
                  />
                </TouchableOpacity>
              </View>
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

{
  /* Only title and hashtags */
}
{
  /* <View
              style={{position: 'absolute', bottom: 95, left: 15, width: 300}}>
              <Text
                style={{
                  color: 'white',
                  fontSize: 16,
                  fontWeight: 'bold',
                  marginBottom: 10,
                }}>
                {item.creatorId.name}
              </Text>
              <Text className="mb-3 text-white text-sm">{item.title}</Text>
              <Text className="mb-3  text-white text-sm">
                {item.description}
              </Text>
              <Text className="mb-3  text-white text-sm">{item.category}</Text>
            </View> */
}

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
