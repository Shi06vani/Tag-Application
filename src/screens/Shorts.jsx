// import React, {useRef, useState, useEffect} from 'react';
// import {
//   View,
//   Dimensions,
//   FlatList,
//   TouchableOpacity,
//   Text,
//   Image,
//   AppState,
//   ActivityIndicator,
//   Alert,
// } from 'react-native';
// import Video from 'react-native-video';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import {getAllPostedVideos} from '../api/useVideo.jsx/Video';
// const {height, width} = Dimensions.get('window');

// const Shorts = () => {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [playing, setPlaying] = useState(true);
//   const appState = useRef(AppState.currentState);
//   const [showControls, setShowControls] = useState(true);
//   const videoRefs = useRef([]);
//   const [videos, setVideos] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [viewedVideos, setViewedVideos] = useState([]);

//   useEffect(() => {
//     const subscription = AppState.addEventListener('change', nextAppState => {
//       if (nextAppState === 'background' || nextAppState === 'inactive') {
//         setPlaying(false);
//       }
//     });

//     return () => {
//       subscription.remove();
//     };
//   }, []);

//   useEffect(() => {
//     const fetchVideos = async () => {
//       setLoading(true);
//       try {
//         const result = await getAllPostedVideos('short');
//         console.log('Fetched shorts:', result);

//         if (result && Array.isArray(result)) {
//           setVideos(result);
//         } else {
//           console.error('Invalid data received:', result);
//         }
//       } catch (error) {
//         Alert.alert('Failed', error.message);

//         console.error('Error fetching videos:', error);
//       }
//       setLoading(false);
//     };

//     fetchVideos();
//   }, []);

//   const getDaysAgo = dateString => {
//     const uploadedDate = new Date(dateString);
//     const now = new Date();
//     const diffTime = Math.abs(now - uploadedDate);
//     const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

//     if (diffDays === 0) return 'Today';
//     if (diffDays === 1) return '1 day ago';
//     return `${diffDays} days ago`;
//   };

//   const handleViewTracking = item => {
//     if (!viewedVideos.includes(item._id)) {
//       trackVideoView(item._id, item);
//       setViewedVideos(prev => [...prev, item._id]);
//     }
//   };

//   const trackVideoView = async (shortId, item) => {
//     try {
//       const response = await fetch(
//         `https://tag-backend.vercel.app/api/videos/onevideo/${shortId}/view`,
//         {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//         },
//       );

//       if (!response.ok) {
//         throw new Error('Failed to track video view');
//       }
//       console.log('shortsview', response);
//     } catch (error) {
//       Alert.alert('Failed', error.message);
//       console.error('Error tracking video view:', error);
//     }
//   };

//   const viewabilityConfig = {itemVisiblePercentThreshold: 80};

//   const onViewableItemsChanged = useRef();
//   onViewableItemsChanged.current = ({viewableItems}) => {
//     if (viewableItems && viewableItems.length > 0) {
//       setCurrentIndex(viewableItems[0].index);
//     }
//   };

//   if (loading) {
//     return (
//       <ActivityIndicator
//         size="large"
//         color="#441752"
//         className="flex-1 justify-center items-center"
//       />
//     );
//   }

//   return (
//     <FlatList
//       data={videos}
//       keyExtractor={item => item.id}
//       pagingEnabled
//       viewabilityConfig={viewabilityConfig}
//       onViewableItemsChanged={onViewableItemsChanged.current}
//       renderItem={({item, index}) => (
//         <TouchableOpacity
//           activeOpacity={1}
//           style={{
//             width,
//             justifyContent: 'center',
//             alignItems: 'center',
//           }}>
//           <View
//             className="bg-black relative"
//             style={{
//               height,
//               width,
//               justifyContent: 'center',
//               alignItems: 'center',
//             }}>
//             {/* Video Player */}
//             <Video
//               ref={ref => (videoRefs.current[index] = ref)}
//               source={{uri: item.videoUrl}}
//               style={{width: '100%', height: 200}}
//               resizeMode="cover"
//               repeat
//               muted={currentIndex !== index}
//               playInBackground={false}
//               playWhenInactive={false}
//               paused={currentIndex !== index || !playing}
//               onProgress={({currentTime}) => {
//                 if (currentIndex === index && playing && currentTime >= 2) {
//                   handleViewTracking(item); // 🔥 Call it once
//                 }
//               }}
//             />
//             <TouchableOpacity
//               onPress={() => {
//                 if (currentIndex === index) {
//                   setPlaying(prev => !prev);
//                 }
//               }}
//               className="absolute top-20 inset-0 justify-center items-center"
//               activeOpacity={1}>
//               {!playing && currentIndex === index && (
//                 <Image tintColor={"white"} source={require("../assets/Images/play.png")}/>
//               )}
//             </TouchableOpacity>

//             <View className="absolute bottom-0 left-0 right-0 px-4 pb-6 flex-row justify-between items-end">
//               {/* Left: Info */}
//               <View className="flex flex-col space-y-3 max-w-[80%]">
//                 {/* Title */}
//                 <Text
//                   className="text-white text-lg font-bold"
//                   numberOfLines={2}>
//                   {item.title}
//                 </Text>

//                 {/* Creator Info - YouTube Shorts style */}
//                 <View className="flex-row items-center space-x-2">
//                   <Image
//                     source={require('../assets/Images/user.png')}
//                     className="w-7 h-7 rounded-full"
//                   />
//                   <Text className="text-white text-sm font-medium">
//                     @{item.creatorId?.name}
//                   </Text>
//                   {/* Subscribe button like YouTube Shorts */}
//                   <TouchableOpacity className="bg-white rounded-full px-3 py-1 ml-1">
//                     <Text className="text-black text-xs font-bold">
//                       Subscribe
//                     </Text>
//                   </TouchableOpacity>
//                 </View>

//                 {/* Description - Optional like in YouTube Shorts */}
//                 {item.description ? (
//                   <Text className="text-white text-sm" numberOfLines={2}>
//                     {item.description}
//                   </Text>
//                 ) : null}
//               </View>

//               {/* Right: Action Icons (YouTube Shorts style) */}
//               <View className="flex flex-col items-center space-y-6">
//                 {/* Like */}
//                 <View className="items-center">
//                   <TouchableOpacity className="items-center">
//                     <Image
//                       source={require('../assets/Images/thumbs-up.png')}
//                       className="w-8 h-8"
//                     />
//                     <Text className="text-white text-xs mt-1">21.1k</Text>
//                   </TouchableOpacity>
//                 </View>

//                 {/* Dislike */}
//                 <View className="items-center">
//                   <TouchableOpacity className="items-center">
//                     <Image
//                       source={require('../assets/Images/thumb-down.png')}
//                       className="w-8 h-8"
//                     />
//                     <Text className="text-white text-xs mt-1">Dislike</Text>
//                   </TouchableOpacity>
//                 </View>

//                 {/* Comments */}
//                 <View className="items-center">
//                   <TouchableOpacity className="items-center">
//                     <Image
//                       source={require('../assets/Images/comment.png')}
//                       className="w-8 h-8"
//                     />
//                     <Text className="text-white text-xs mt-1">345</Text>
//                   </TouchableOpacity>
//                 </View>

//                 {/* Share */}
//                 <View className="items-center">
//                   <TouchableOpacity className="items-center">
//                     <Image
//                       source={require('../assets/Images/forward.png')}
//                       className="w-8 h-8"
//                     />
//                     <Text className="text-white text-xs mt-1">Share</Text>
//                   </TouchableOpacity>
//                 </View>

//                 {/* Remix (YouTube Shorts specific) */}
//                 <View className="items-center">
//                   <TouchableOpacity className="items-center">
//                     <Image
//                       source={require('../assets/Images/wave-sound.png')}
//                       className="w-8 h-8"
//                     />
//                     <Text className="text-white text-xs mt-1">Remix</Text>
//                   </TouchableOpacity>
//                 </View>

//                 {/* More (3 dots) - YouTube Shorts specific */}
//                 <View className="items-center">
//                   <TouchableOpacity className="items-center">
//                     <Text className="text-white text-2xl font-bold">⋯</Text>
//                   </TouchableOpacity>
//                 </View>
//               </View>
//             </View>
//           </View>
//         </TouchableOpacity>
//       )}
//     />
//   );
// };

// export default Shorts;

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
  Alert,
} from 'react-native';
import Video from 'react-native-video';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {getAllPostedVideos} from '../api/useVideo.jsx/Video';
const {height, width} = Dimensions.get('window');

const Shorts = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [playing, setPlaying] = useState(true);
  const appState = useRef(AppState.currentState);
  const [showControls, setShowControls] = useState(true);
  const videoRefs = useRef([]);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewedVideos, setViewedVideos] = useState([]);

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
          // Log the first video URL to check if it's valid
          if (result.length > 0) {
            console.log('First video URL:', result[0]?.videoUrl);
          }
        } else {
          console.error('Invalid data received:', result);
        }
      } catch (error) {
        Alert.alert('Failed', error.message);
        console.error('Error fetching videos:', error);
      }
      setLoading(false);
    };

    fetchVideos();
  }, []);

  const getDaysAgo = dateString => {
    const uploadedDate = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - uploadedDate);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return '1 day ago';
    return `${diffDays} days ago`;
  };

  const handleViewTracking = item => {
    if (!viewedVideos.includes(item._id)) {
      trackVideoView(item._id, item);
      setViewedVideos(prev => [...prev, item._id]);
    }
  };

  const trackVideoView = async (shortId, item) => {
    try {
      const response = await fetch(
        `https://tag-backend.vercel.app/api/videos/onevideo/${shortId}/view`,
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
      console.log('shortsview', response);
    } catch (error) {
      Alert.alert('Failed', error.message);
      console.error('Error tracking video view:', error);
    }
  };

  const viewabilityConfig = {itemVisiblePercentThreshold: 80};

  const onViewableItemsChanged = useRef();
  onViewableItemsChanged.current = ({viewableItems}) => {
    if (viewableItems && viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index);
    }
  };

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
      keyExtractor={item => item._id}
      pagingEnabled
      viewabilityConfig={viewabilityConfig}
      onViewableItemsChanged={onViewableItemsChanged.current}
      renderItem={({item, index}) => {
        // Debug current video state
        console.log('Video state:', {
          currentIndex,
          index,
          playing,
          videoUrl: item.videoUrl,
          isPaused: currentIndex !== index || !playing,
        });

        return (
          <TouchableOpacity
            activeOpacity={1}
            style={{
              width,
              height,
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
              {/* Video Player - Full height */}
              <Video
                ref={ref => (videoRefs.current[index] = ref)}
                source={{uri: item.videoUrl}}
                style={{width: '100%', height: height}}
                resizeMode="cover"
                repeat
                muted={currentIndex !== index}
                playInBackground={false}
                playWhenInactive={false}
                paused={currentIndex !== index || !playing}
                onProgress={({currentTime}) => {
                  if (currentIndex === index && playing && currentTime >= 2) {
                    handleViewTracking(item);
                  }
                }}
                onError={error => {
                  console.error('Video error:', error);
                }}
              />

              {/* Full screen touchable area for play/pause */}
              {/* <View className='absolute z-50 top-20 inset-0 justify-center items-center'>
                <TouchableOpacity
                  onPress={() => {
                    console.log('Video tapped, toggling play state');
                    setPlaying(prev => !prev);
                  }}
                  className=""
                  activeOpacity={1}>
                  {!playing && currentIndex === index && (
                    <View className="bg-black/30 rounded-full p-4">
                      <Image
                        source={require('../assets/Images/play.png')}
                        style={{width: 50, height: 50, tintColor: 'black'}}
                      />
                    </View>
                  )}
                </TouchableOpacity>
              </View> */}
{!playing && currentIndex === index && (
  <View className="absolute z-50 top-0 left-0 right-0 bottom-0 justify-center items-center">
    <TouchableOpacity
      onPress={() => setPlaying(prev => !prev)}
      activeOpacity={0.8}>
      <View className="bg-black/40 rounded-full p-4">
        <Image
          source={require('../assets/Images/play.png')}
          style={{width: 50, height: 50, tintColor: 'white'}}
        />
      </View>
    </TouchableOpacity>
  </View>
)}

              {/* Overlay content - Bottom info section */}
              <View className="absolute bottom-10 left-0 right-0 px-4 pb-6 flex-row justify-between items-end">
                {/* Left: Info */}
                <View className="flex flex-col space-y-3 max-w-[80%]">
                  {/* Title */}
                  <Text
                    className="text-white text-lg font-bold"
                    numberOfLines={2}>
                    {item.title}
                  </Text>

                  {/* Creator Info */}
                  <View className="flex-row items-center space-x-2">
                    <Image
                      source={require('../assets/Images/user.png')}
                      className="w-7 h-7 rounded-full"
                    />
                    <Text className="text-white text-sm font-medium">
                      @{item.creatorId?.name}
                    </Text>
                    {/* Subscribe button */}
                    <TouchableOpacity className="bg-white rounded-full px-3 py-1 ml-1">
                      <Text className="text-black text-xs font-bold">
                        Subscribe
                      </Text>
                    </TouchableOpacity>
                  </View>

                  {/* Description - Optional */}
                  {item.description ? (
                    <Text className="text-white text-sm" numberOfLines={2}>
                      {item.description}
                    </Text>
                  ) : null}
                </View>

                {/* Right: Action Icons */}
                <View
                  className="flex flex-col  items-center space-y-6"
                  pointerEvents="box-none">
                  {/* Like */}
                  <View className="items-center">
                    <TouchableOpacity className="items-center">
                      <Image
                        source={require('../assets/Images/thumbs-up.png')}
                        className="w-8 h-8"
                      />
                      <Text className="text-white text-xs mt-1">
                        {item.likes || '0'}
                      </Text>
                    </TouchableOpacity>
                  </View>

                  {/* Dislike */}
                  <View className="items-center">
                    <TouchableOpacity className="items-center">
                      <Image
                        source={require('../assets/Images/thumb-down.png')}
                        className="w-8 h-8"
                      />
                      <Text className="text-white text-xs mt-1">Dislike</Text>
                    </TouchableOpacity>
                  </View>

                  {/* Comments */}
                  <View className="items-center">
                    <TouchableOpacity className="items-center">
                      <Image
                        source={require('../assets/Images/comment.png')}
                        className="w-8 h-8"
                      />
                      <Text className="text-white text-xs mt-1">
                        {item.comments?.length || '0'}
                      </Text>
                    </TouchableOpacity>
                  </View>

                  {/* Share */}
                  <View className="items-center">
                    <TouchableOpacity className="items-center">
                      <Image
                        source={require('../assets/Images/forward.png')}
                        className="w-8 h-8"
                      />
                      <Text className="text-white text-xs mt-1">Share</Text>
                    </TouchableOpacity>
                  </View>

                  {/* Remix (YouTube Shorts specific) */}
                  <View className="items-center">
                    <TouchableOpacity className="items-center">
                      <Image
                        source={require('../assets/Images/wave-sound.png')}
                        className="w-8 h-8"
                      />
                      <Text className="text-white text-xs mt-1">Remix</Text>
                    </TouchableOpacity>
                  </View>

                  {/* More (3 dots) */}
                  <View className="items-center">
                    <TouchableOpacity className="items-center">
                      <Text className="text-white text-2xl font-bold">⋯</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>

              {/* Sound/Music ticker at bottom */}
              {/* <View className="absolute bottom-20 right-0 bg-black/50 rounded-l-full px-3 py-1.5 flex-row items-center">
                <Image
                  source={require('../assets/Images/wave-sound.png')}
                  className="w-4 h-4 mr-2"
                />
                <Text className="text-white text-xs" numberOfLines={1}>
                  Original sound • {item.creatorId?.name}
                </Text>
              </View> */}
            </View>
          </TouchableOpacity>
        );
      }}
    />
  );
};

export default Shorts;

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
