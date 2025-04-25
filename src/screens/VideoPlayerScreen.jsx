// import AsyncStorage from '@react-native-async-storage/async-storage';
// import React, {useEffect, useState, useRef} from 'react';
// import {
//   View,
//   Text,
//   FlatList,
//   TouchableOpacity,
//   Image,
//   TextInput,
//   Alert,
//   ScrollView,
//   Dimensions,
//   TouchableWithoutFeedback,
//   StatusBar,
// } from 'react-native';
// import Video from 'react-native-video';
// import {getVideoLikeCount, likeVideo} from '../api/Likes';
// import {getVideoComments, postComment} from '../api/comment';
// import {groupByUser} from '../components/common/Comment';
// import {getRelatedVideos, isVideoLiked} from '../api/useVideo.jsx/Video';
// import {getTimeAgo} from '../components/common/GetTime';
// import RelatedVideos from '../components/RelatedVideos';
// import Orientation from 'react-native-orientation-locker';
// // import React, { useState, useRef } from 'react';
// import {useIsFocused} from '@react-navigation/native';
// const formatDate = dateString => {
//   if (!dateString) return '';

//   const now = new Date();
//   const date = new Date(dateString);
//   const diffTime = Math.abs(now - date);
//   const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

//   if (diffDays === 0) {
//     return 'Today';
//   } else if (diffDays === 1) {
//     return 'Yesterday';
//   } else if (diffDays < 7) {
//     return `${diffDays} days ago`;
//   } else if (diffDays < 30) {
//     const weeks = Math.floor(diffDays / 7);
//     return `${weeks} ${weeks === 1 ? 'week' : 'weeks'} ago`;
//   } else if (diffDays < 365) {
//     const months = Math.floor(diffDays / 30);
//     return `${months} ${months === 1 ? 'month' : 'months'} ago`;
//   } else {
//     const years = Math.floor(diffDays / 365);
//     return `${years} ${years === 1 ? 'year' : 'years'} ago`;
//   }
// };

// const VideoPlayerScreen = ({route}) => {
//   const [showDescription, setShowDescription] = useState(false);
//   const [liked, setLiked] = useState(false);
//   const [totalLikes, setTotalLike] = useState(0);
//   const {videoData} = route.params;
//   const [commentCount, setCommentCount] = useState();
//   const [comments, setComments] = useState([]);
//   const [expandedUsers, setExpandedUsers] = useState([]);
//   const groupedComments = groupByUser(comments);
//   const [hasError, setHasError] = useState(false);
//   const [newComment, setNewComment] = useState('');
//   const [showInput, setShowInput] = useState(false);
//   const [isliked, setIsLiked] = useState(false);
//   const [userId, setUserId] = useState('');
//   const isFocused = useIsFocused();
//   const [isPaused, setIsPaused] = useState(false);
//   const videoRef = useRef(null);
//   const [isMuted, setIsMuted] = useState(false);
//   const [isFullscreen, setIsFullscreen] = useState(false);

//   const VideoControls = () => (
//     <View className="absolute  inset-0 justify-between">
//       {/* Play/Pause center button */}
//       <View className="flex-1 justify-center items-center">
//         <TouchableOpacity
//           onPress={() => setIsPaused(prev => !prev)}
//           className="bg-black/60 p-3 rounded-full">
//           <Image
//             className="w-6 h-6"
//             tintColor={'white'}
//             source={
//               isPaused
//                 ? require('../assets/Images/play.png')
//                 : require('../assets/Images/pause.png')
//             }
//           />
//           {/* <Text>{isPaused ? 'play' : 'pause'}
//           </Text> */}
//         </TouchableOpacity>
//       </View>

//       {/* Bottom controls bar */}
//       <View className=" flex-row justify-between items-center px-4 py-2">
//         <TouchableOpacity onPress={() => setIsMuted(prev => !prev)}>
//           {/* <Text>{isMuted ? 'volume-mute' : 'volume-high'}</Text> */}
//           <Image
//             className="w-6 h-6"
//             tintColor={'white'}
//             source={
//               isMuted
//                 ? require('../assets/Images/volume-mute.png')
//                 : require('../assets/Images/volume-high.png')
//             }
//           />
//         </TouchableOpacity>

//         <TouchableOpacity onPress={toggleFullscreen}>
//           <Image
//             className="w-6 h-6"
//             tintColor={'white'}
//             source={
//               isFullscreen
//                 ? require('../assets/Images/shrink.png')
//                 : require('../assets/Images/switch-to-full-screen-button.png')
//             }
//           />

//           {/* <Text>{isFullscreen ? 'contract' : 'expand'}</Text> */}
//         </TouchableOpacity>
//       </View>
//     </View>
//   );

//   const toggleFullscreen = () => {
//     if (isFullscreen) {
//       Orientation.lockToPortrait();
//       StatusBar.setHidden(false);
//     } else {
//       Orientation.lockToLandscape();
//       StatusBar.setHidden(true);
//     }
//     setIsFullscreen(prev => !prev);
//   };

//   useEffect(() => {
//     // Reset when leaving screen
//     return () => {
//       Orientation.lockToPortrait();
//       StatusBar.setHidden(false);
//     };
//   }, [isFocused]);

//   const {width, height} = Dimensions.get('window');

//   useEffect(() => {
//     const getUserId = async () => {
//       const id = await AsyncStorage.getItem('loginuser_id');
//       setUserId(id);
//     };

//     getUserId();
//   }, []);

//   useEffect(() => {
//     const checkIfLiked = async () => {
//       const userId = await AsyncStorage.getItem('loginuser_id');

//       if (!userId) {
//         Alert.alert('Failure', 'You are not login , first login');
//       }

//       try {
//         const result = await isVideoLiked(videoData._id, userId);

//         console.log('likes result', result.liked);
//         setIsLiked(result.liked);
//       } catch (error) {
//         console.error('Failed to check liked status', error);
//       }
//     };

//     checkIfLiked();
//   }, [videoData._id, userId]);

//   useEffect(() => {
//     fetchLikes();
//     fetchComments();
//   }, [videoData._id]);

//   const fetchLikes = async () => {
//     const likeData = await getVideoLikeCount(videoData._id);
//     if (likeData) {
//       setTotalLike(likeData?.likeCount);
//     }
//   };

//   const fetchComments = async () => {
//     const comments = await getVideoComments(videoData._id);
//     if (comments) {
//       setCommentCount(comments.commentCount);
//       setComments(comments.comments);
//     } else {
//       console.log(error, 'no comments list');
//     }

//     console.log('Comments list:', comments);
//   };

//   const currentUser = {
//     name: videoData.name,
//     image: require('../assets/Images/man.png'),
//   };

//   const handleLike = async videoId => {
//     const userId = await AsyncStorage.getItem('loginuser_id');
//     if (!userId) {
//       Alert.alert('Failure', 'Please Login First hhhh');
//     }
//     try {
//       const result = await likeVideo(videoId, userId);
//       if (result) {
//         setLiked(!liked);
//         fetchComments();
//       }
//     } catch (error) {
//       Alert.alert(' Failed', error.message);

//       console.error(
//         'API Error:',
//         error?.response?.data || error.message || error,
//       );
//     }
//   };

//   const handleComment = async () => {
//     const videoId = videoData._id;
//     const userId = await AsyncStorage.getItem('loginuser_id');

//     if (!userId) {
//       Alert.alert('Failure', 'Please Login First');
//     }
//     const commentText = newComment;

//     let missingFields = [];

//     if (!videoId) {
//       missingFields.push('Video ID');
//     }

//     if (!commentText.trim()) {
//       missingFields.push('Comment');
//     }

//     if (missingFields.length > 0) {
//       Alert.alert(
//         'Missing Data',
//         `${missingFields.join(', ')} ${
//           missingFields.length > 1 ? 'are' : 'is'
//         } required.`,
//       );
//       return;
//     } else {
//       const result = await postComment(videoId, userId, commentText);
//       if (result) {
//         setNewComment('');
//       } else {
//         console.log('Failed to post comment.');
//       }
//     }
//   };

//   const toggleExpand = userId => {
//     setExpandedUsers(prev =>
//       prev.includes(userId)
//         ? prev.filter(id => id !== userId)
//         : [...prev, userId],
//     );
//   };

//   console.log('video data', groupedComments);

//   return (
//     <View className="flex-1 bg-purple-50">
//       {/* Fullscreen video layer */}
//       {isFullscreen && (
//         <View
//           className="absolute top-0 left-0 z-50 bg-black"
//           style={{
//             width: height, // flip for landscape
//             height: width,
//           }}>
//           <Video
//             source={{uri: videoData.videoUrl}}
//             className="w-full h-full"
//             resizeMode="cover"
//             controls
//           />

//           <TouchableOpacity
//             onPress={toggleFullscreen}
//             className="absolute bottom-4 right-3 p-2 rounded-full bg-black/40"></TouchableOpacity>
//         </View>
//       )}

//       {!isFullscreen && (
//         <ScrollView className="flex-1">
//           <View className="w-full bg-black" style={{height: 240}}>
//             <Video
//               source={{uri: videoData.videoUrl}}
//               className="w-full h-full"
//               resizeMode="cover"
//               controls
//             />

//             <TouchableOpacity
//               onPress={toggleFullscreen}
//               className="absolute bottom-2 right-3 p-2 rounded-full bg-black/40">
//               <Image
//                 className="w-6 h-6"
//                 source={require('../assets/Images/switch-to-full-screen-button.png')}
//               />
//             </TouchableOpacity>
//           </View>

//           <View className="px-3">
//             <View className="px-3">
//               <Text className="text-lg font-bold text-black mt-4">
//                 {videoData.title}
//               </Text>

//               <View className="flex-row items-center mt-1 space-x-2">
//                 <Text className="text-gray-600 text-sm">
//                   {videoData.views} views
//                 </Text>
//                 <Text className="text-gray-600 text-sm">•</Text>
//                 <Text className="text-gray-600 text-sm">
//                   {formatDate(videoData?.createdAt)}
//                 </Text>
//                 <Text className="text-gray-600 text-sm">•</Text>
//                 <TouchableOpacity
//                   onPress={() => setShowDescription(!showDescription)}>
//                   <Text className="text-[#441752] text-xs font-semibold">
//                     {showDescription ? 'less' : '...more'}
//                   </Text>
//                 </TouchableOpacity>
//               </View>

//               {showDescription && (
//                 <Text className="text-gray-700 mt-2 leading-5 text-sm">
//                   {videoData.description}
//                 </Text>
//               )}
//             </View>

//             <View className="flex-row justify-between items-center mt-3 px-2">
//               <TouchableOpacity
//                 className="flex-row items-center space-x-1"
//                 onPress={() => {
//                   handleLike(videoData._id);
//                 }}>
//                 <Image
//                   source={
//                     isliked
//                       ? require('../assets/Images/heart-filled.png')
//                       : require('../assets/Images/heart-outline.png')
//                   }
//                   className="w-6 h-6"
//                 />
//                 <Text className="text-gray-600 text-sm">
//                   {totalLikes > 999
//                     ? (totalLikes / 1000).toFixed(1) + 'k'
//                     : totalLikes || 0}
//                   {totalLikes || 0}
//                 </Text>
//               </TouchableOpacity>

//               <TouchableOpacity
//                 className="flex-row items-center space-x-1"
//                 onPress={() => {
//                   setShowInput(!showInput);
//                 }}>
//                 <Image
//                   tintColor={'#6b7280'}
//                   className="w-6 h-6"
//                   source={require('../assets/Images/video-comment.png')}
//                 />
//                 <Text className="text-gray-600 text-sm">{commentCount}</Text>
//               </TouchableOpacity>

//               <TouchableOpacity className="flex-row items-center space-x-1">
//                 <Image
//                   tintColor={'#6b7280'}
//                   className="w-6 h-6"
//                   source={require('../assets/Images/forward.png')}
//                 />
//                 <Text className="text-gray-600 text-sm">Share</Text>
//               </TouchableOpacity>
//             </View>

//             <View className="px-3">
//               {showInput &&
//                 groupedComments &&
//                 Object.keys(groupedComments).length > 0 && (
//                   <Text className="mt-5 text-base font-semibold text-black">
//                     Comments
//                   </Text>
//                 )}

//               <FlatList
//                 scrollEnabled
//                 data={groupedComments}
//                 keyExtractor={item => item[0].user._id}
//                 renderItem={({item}) => {
//                   const userId = item[0].user._id;
//                   const isExpanded = expandedUsers.includes(userId);
//                   const commentsToRender = isExpanded ? item : [item[0]];

//                   return (
//                     <View className="">
//                       <ScrollView className={showInput ? `h-46` : 'h-0 '}>
//                         <View className=" ">
//                           {showInput && (
//                             <>
//                               <View className="pb-4">
//                                 {commentsToRender.length > 0 ? (
//                                   commentsToRender.map((comment, index) => (
//                                     <View key={index}>
//                                       <TouchableOpacity>
//                                         <View className="flex-row gap-2 mt-2">
//                                           <Image
//                                             source={
//                                               hasError || !comment?.user?.image
//                                                 ? require('../assets/Images/default-image.png')
//                                                 : {uri: comment.user.image}
//                                             }
//                                             className="w-8 h-8 rounded-full"
//                                             onError={() => setHasError(true)}
//                                           />
//                                           <View className="flex-1 bg-white p-3 rounded-lg">
//                                             <View className="flex-row gap-1 items-center">
//                                               <Text className="font-semibold text-sm">
//                                                 {comment?.user?.name}
//                                               </Text>
//                                               <Text className="text-xs text-gray-500">
//                                                 •{' '}
//                                                 {getTimeAgo(comment.createdAt)}
//                                               </Text>
//                                             </View>
//                                             <Text className="text-sm text-gray-800">
//                                               {comment.text}
//                                             </Text>
//                                           </View>
//                                         </View>
//                                       </TouchableOpacity>
//                                     </View>
//                                   ))
//                                 ) : (
//                                   <Text className="text-center text-gray-500 mt-2">
//                                     No comments yet.
//                                   </Text>
//                                 )}
//                               </View>
//                               <View className="flex justify-end items-end">
//                                 {item.length > 1 && (
//                                   <TouchableOpacity
//                                     onPress={() => toggleExpand(userId)}>
//                                     <View className=" rounded-full p-2">
//                                       <Text className="text-xs font-semibold text-primary ">
//                                         {!isExpanded
//                                           ? `View ${
//                                               item.length - 1
//                                             } more comment${
//                                               item.length - 1 > 1 ? 's' : ''
//                                             }`
//                                           : 'View less comments'}
//                                       </Text>
//                                     </View>
//                                   </TouchableOpacity>
//                                 )}
//                               </View>
//                             </>
//                           )}
//                         </View>
//                       </ScrollView>
//                     </View>
//                   );
//                 }}
//               />
//               {showInput && (
//                 <View className="flex-row items-center space-x-2 mt-2 border-t border-gray-300 pt-3">
//                   <Image
//                     source={currentUser?.image}
//                     className="w-8 h-8 rounded-full"
//                   />
//                   <TextInput
//                     placeholder="Add a comment..."
//                     value={newComment}
//                     onChangeText={setNewComment}
//                     className="flex-1 border border-gray-300 rounded-full px-4 py-2 text-sm"
//                   />
//                   <TouchableOpacity onPress={handleComment}>
//                     <Text className="text-[#441752] font-bold">Post</Text>
//                   </TouchableOpacity>
//                 </View>
//               )}
//             </View>
//           </View>

//           <View className="flex-1 px-4  mt-3 py-2">
//             <Text className="text-xl font-bold text-[#441752] mb-4">
//               Suggested Videos
//             </Text>

//             <RelatedVideos videoId={videoData._id} />
//           </View>
//         </ScrollView>
//       )}
//     </View>
//   );
// };

// export default VideoPlayerScreen;

import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState, useRef} from 'react';
import Slider from '@react-native-community/slider';

import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  TextInput,
  Alert,
  ScrollView,
  Dimensions,
  TouchableWithoutFeedback,
  StatusBar,
} from 'react-native';
import Video from 'react-native-video';
import {getVideoLikeCount, likeVideo} from '../api/Likes';
import {getVideoComments, postComment} from '../api/comment';
import {groupByUser} from '../components/common/Comment';
import {getRelatedVideos, isVideoLiked} from '../api/useVideo.jsx/Video';
import {getTimeAgo} from '../components/common/GetTime';
import RelatedVideos from '../components/RelatedVideos';
import Orientation from 'react-native-orientation-locker';
import {useWindowDimensions} from 'react-native';

// import React, { useState, useRef } from 'react';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import FullScreenVideo from '../components/FullScreenVideo';
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

const formatTime = seconds => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
};

const VideoPlayerScreen = ({route}) => {
  const [showDescription, setShowDescription] = useState(false);
  const [liked, setLiked] = useState(false);
  const [totalLikes, setTotalLike] = useState(0);
  const {videoData, naviagtionpage} = route.params;
  const [commentCount, setCommentCount] = useState();
  const [comments, setComments] = useState([]);
  const [expandedUsers, setExpandedUsers] = useState([]);
  const groupedComments = groupByUser(comments);
  const [hasError, setHasError] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [showInput, setShowInput] = useState(false);
  const [isliked, setIsLiked] = useState(false);
  const [userId, setUserId] = useState('');
  const isFocused = useIsFocused();
  const [isPaused, setIsPaused] = useState(false);
  const videoRef = useRef(null);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // video stte
  const [paused, setPaused] = useState(true);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const navigation = useNavigation();
  const formatTime = seconds => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const {width, height} = useWindowDimensions();
  const isLandscape = width > height;

  const toggleFullscreen = () => {
    if (isFullscreen) {
      Orientation.lockToPortrait();
      StatusBar.setHidden(false);
    } else {
      Orientation.lockToLandscape();
      StatusBar.setHidden(true);
    }
    setIsFullscreen(prev => !prev);
  };

  useEffect(() => {
    // Reset when leaving screen
    return () => {
      Orientation.lockToPortrait();
      StatusBar.setHidden(false);
    };
  }, [isFocused]);

  // const {width, height} = Dimensions.get('window');

  useEffect(() => {
    const getUserId = async () => {
      const id = await AsyncStorage.getItem('loginuser_id');
      setUserId(id);
    };

    getUserId();
  }, []);

  useEffect(() => {
    const checkIfLiked = async () => {
      const userId = await AsyncStorage.getItem('loginuser_id');

      if (!userId) {
        Alert.alert('Failure', 'You are not login , first login');
      }

      try {
        const result = await isVideoLiked(videoData._id, userId);

        console.log('likes result', result.liked);
        setIsLiked(result.liked);
      } catch (error) {
        console.error('Failed to check liked status', error);
      }
    };

    checkIfLiked();
  }, [videoData._id, userId]);

  useEffect(() => {
    fetchLikes();
    fetchComments();
  }, [videoData._id]);

  const fetchLikes = async () => {
    const likeData = await getVideoLikeCount(videoData._id);
    if (likeData) {
      setTotalLike(likeData?.likeCount);
    }
  };

  const fetchComments = async () => {
    const comments = await getVideoComments(videoData._id);
    if (comments) {
      setCommentCount(comments.commentCount);
      setComments(comments.comments);
    } else {
      console.log(error, 'no comments list');
    }

    console.log('Comments list:', comments);
  };

  const currentUser = {
    name: videoData.name,
    image: require('../assets/Images/man.png'),
  };

  const handleLike = async videoId => {
    const userId = await AsyncStorage.getItem('loginuser_id');
    if (!userId) {
      Alert.alert('Failure', 'Please Login First hhhh');
    }else{
      try {
        const result = await likeVideo(videoId, userId);
        if (result) {
          setLiked(!liked);
          fetchComments();
        }
      } catch (error) {
        Alert.alert(' Failed', error.message);
  
        console.error(
          'API Error:',
          error?.response?.data || error.message || error,
        );
      }
    }
   
  };

  const handleComment = async () => {
    const videoId = videoData._id;
    const userId = await AsyncStorage.getItem('loginuser_id');

    if (!userId) {
      Alert.alert('Failure', 'Please Login First');
    }
    const commentText = newComment;

    let missingFields = [];

    if (!videoId) {
      missingFields.push('Video ID');
    }

    if (!commentText.trim()) {
      missingFields.push('Comment');
    }

    if (missingFields.length > 0) {
      Alert.alert(
        'Missing Data',
        `${missingFields.join(', ')} ${
          missingFields.length > 1 ? 'are' : 'is'
        } required.`,
      );
      return;
    } else {
      const result = await postComment(videoId, userId, commentText);
      if (result) {
        setNewComment('');
      } else {
        console.log('Failed to post comment.');
      }
    }
  };

  const toggleExpand = userId => {
    setExpandedUsers(prev =>
      prev.includes(userId)
        ? prev.filter(id => id !== userId)
        : [...prev, userId],
    );
  };

  return (
    <View className="flex-1 bg-purple-50">
      {/* Fullscreen video layer */}
      {/* {isFullscreen && (
        <View
          className="absolute top-0 left-0 z-50 bg-black"
          style={{
            width: height, // flip for landscape
            height: width-20,
          }}>
          <Video
            source={{uri: videoData.videoUrl}}
            className="w-full h-full"
            resizeMode="cover"
            controls
          />

          <TouchableOpacity
            onPress={toggleFullscreen}
            className="absolute bottom-20 right-3 p-2 rounded-full bg-black/40"> 
             <Image source={require("../assets/Images/shrink.png")}/>
            </TouchableOpacity>
        </View>

       
      )} */}
      {!isFullscreen && (
        <>
          <View className="bg-white flex-row items-center gap-10 py-4 px-4">
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Image
                tintColor={'#59525b'}
                source={require('../assets/Images/arrow-left.png')}
                className="w-5 h-5 "
              />
            </TouchableOpacity>

            <Text className="text-xl font-medium text-black">Header</Text>
          </View>
        </>
      )}
      <View></View>

      {isFullscreen && (
        <View
          className="absolute top-0 left-0 z-50 bg-black"
          style={{
            width: isLandscape ? width : height,
            height: isLandscape ? height : width,
            transform: isLandscape ? [] : [{rotate: '90deg'}],
          }}>
          <TouchableOpacity onPress={() => setPaused(!paused)}>
            <Video
              ref={videoRef}
              source={{uri: videoData.videoUrl}}
              className="w-full h-full"
              resizeMode="cover"
              paused={paused}
              onLoad={e => setDuration(e.duration)}
              onProgress={e => setCurrentTime(e.currentTime)}
            />
            {paused && (
              <>
                {/* Custom Controls */}
                <View className="absolute bottom-2 left-0 right-0  px-4 space-y-2">
                  {/* Time & Buttons */}
                  <View className="flex-row justify-between items-center w-full">
                    <Text className="text-white text-xs">
                      {formatTime(currentTime)}
                    </Text>

                    <View className="flex-row space-x-4 items-center">
                      <TouchableOpacity
                        onPress={() =>
                          videoRef.current.seek(Math.max(currentTime - 5, 0))
                        }>
                        <View className="bg-black opacity-60 rounded-full p-2">
                          <Image
                            tintColor={'white'}
                            source={require('../assets/Images/descrease.png')}
                            className="w-6 h-6"
                          />
                        </View>
                      </TouchableOpacity>

                      <TouchableOpacity onPress={() => setPaused(!paused)}>
                        {/* <Ionicons name={paused ? 'play' : 'pause'} size={30} color="white" /> */}
                        {/* <Text>{paused ? 'play' : 'pause'} </Text> */}

                        <View className="bg-black opacity-60 rounded-full p-2">
                          <Image
                            tintColor={'white'}
                            className="w-6 h-6"
                            source={
                              paused
                                ? require('../assets/Images/play.png')
                                : require('../assets/Images/pause.png')
                            }
                          />
                        </View>
                      </TouchableOpacity>

                      <TouchableOpacity
                        onPress={() => videoRef.current.seek(currentTime + 5)}>
                        <View className="bg-black opacity-60 rounded-full p-2">
                          <Image
                            tintColor={'white'}
                            source={require('../assets/Images/increase.png')}
                            className="w-6 h-6"
                          />
                        </View>
                      </TouchableOpacity>
                    </View>

                    <Text className="text-white text-xs">
                      {formatTime(duration)}
                    </Text>
                  </View>

                  {/* Progress Slider */}
                  <Slider
                    style={{width: '100%'}}
                    minimumValue={0}
                    maximumValue={duration}
                    value={currentTime}
                    onSlidingComplete={value => videoRef.current.seek(value)}
                    minimumTrackTintColor="#fff"
                    maximumTrackTintColor="#888"
                    thumbTintColor="#fff"
                  />
                </View>

                {/* Exit Fullscreen Button */}
                <TouchableOpacity
                  onPress={toggleFullscreen}
                  className="absolute bottom-20 right-3 p-2 rounded-full bg-black/40">
                  <Image
                    tintColor={'white'}
                    source={require('../assets/Images/shrink.png')}
                    className="w-6 h-6"
                  />
                </TouchableOpacity>
              </>
            )}
          </TouchableOpacity>
        </View>
      )}

      {!isFullscreen && (
        <ScrollView className="flex-1">
          <View className="w-full bg-black" style={{height: 250}}>
            {/* <Video
              source={{uri: videoData.videoUrl}}
              className="w-full h-full"
              resizeMode="cover"
              controls
            /> */}

            <TouchableOpacity onPress={() => setPaused(!paused)}>
              <Video
                ref={videoRef}
                source={{uri: videoData.videoUrl}}
                className="w-full h-full"
                resizeMode="cover"
                paused={paused}
                onLoad={e => setDuration(e.duration)}
                onProgress={e => setCurrentTime(e.currentTime)}
              />
              {paused && (
                <>
                  {/* Custom Controls */}
                  <View className="absolute bottom-2 left-0 right-0  px-3 space-y-1">
                    {/* Time & Buttons */}
                    <View className="flex-row justify-center  items-center w-full ">
                      <View className="flex-row space-x-4 items-center">
                        <TouchableOpacity
                          onPress={() =>
                            videoRef.current.seek(Math.max(currentTime - 5, 0))
                          }>
                          <View className="bg-black opacity-60 rounded-full p-2">
                            <Image
                              tintColor={'white'}
                              source={require('../assets/Images/descrease.png')}
                              className="w-5 h-5"
                            />
                          </View>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => setPaused(!paused)}>
                          <View className="bg-black opacity-60 rounded-full p-2">
                            <Image
                              tintColor={'white'}
                              className="w-5 h-5"
                              source={
                                paused
                                  ? require('../assets/Images/play.png')
                                  : require('../assets/Images/pause.png')
                              }
                            />
                          </View>
                        </TouchableOpacity>

                        <TouchableOpacity
                          onPress={() =>
                            videoRef.current.seek(currentTime + 5)
                          }>
                          <View className="bg-black opacity-60 rounded-full p-2">
                            <Image
                              tintColor={'white'}
                              source={require('../assets/Images/increase.png')}
                              className="w-5 h-5"
                            />
                          </View>
                        </TouchableOpacity>
                      </View>
                    </View>

                    <View className="flex-row  items-center">
                      {/* Progress Slider */}
                      <Text className="text-white text-xs">
                        {formatTime(currentTime)}
                      </Text>

                      <Slider
                        style={{width: '86%'}}
                        minimumValue={0}
                        maximumValue={duration}
                        value={currentTime}
                        onSlidingComplete={value =>
                          videoRef.current.seek(value)
                        }
                        minimumTrackTintColor="#fff"
                        maximumTrackTintColor="#888"
                        thumbTintColor="#fff"
                      />

                      <Text className="text-white text-xs">
                        {formatTime(duration)}
                      </Text>
                      <TouchableOpacity
                        onPress={toggleFullscreen}
                        className="absolute bottom-5  right-1 p-2 rounded-full bg-black/40">
                        <Image
                          className="w-3 h-3"
                          tintColor={'white'}
                          source={require('../assets/Images/switch-to-full-screen-button.png')}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                </>
              )}
            </TouchableOpacity>
          </View>

          {/* all content */}

          <View className="px-3">
            <View className="px-3">
              <Text className="text-lg font-bold text-black mt-4">
                {videoData.title}
              </Text>

              <View className="flex-row items-center mt-1 space-x-2">
                <Text className="text-gray-600 text-sm">
                  {videoData.views} views
                </Text>
                <Text className="text-gray-600 text-sm">•</Text>
                <Text className="text-gray-600 text-sm">
                  {formatDate(videoData?.createdAt)}
                </Text>
                <Text className="text-gray-600 text-sm">•</Text>
                <TouchableOpacity
                  onPress={() => setShowDescription(!showDescription)}>
                  <Text className="text-[#441752] text-xs font-semibold">
                    {showDescription ? 'less' : '...more'}
                  </Text>
                </TouchableOpacity>
              </View>

              {showDescription && (
                <Text className="text-gray-700 mt-2 leading-5 text-sm">
                  {videoData.description}
                </Text>
              )}
            </View>

            <View className="flex-row justify-between items-center mt-3 px-2">
              <TouchableOpacity
                className="flex-row items-center space-x-1"
                onPress={() => {
                  handleLike(videoData._id);
                }}>
                <Image
                  source={
                    isliked
                      ? require('../assets/Images/heart-filled.png')
                      : require('../assets/Images/heart-outline.png')
                  }
                  className="w-6 h-6"
                />
                <Text className="text-gray-600 text-sm">
                  {totalLikes > 999
                    ? (totalLikes / 1000).toFixed(1) + 'k'
                    : totalLikes || 0}
                  {totalLikes || 0}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                className="flex-row items-center space-x-1"
                onPress={() => {
                  setShowInput(!showInput);
                }}>
                <Image
                  tintColor={'#6b7280'}
                  className="w-6 h-6"
                  source={require('../assets/Images/video-comment.png')}
                />
                <Text className="text-gray-600 text-sm">{commentCount}</Text>
              </TouchableOpacity>

              <TouchableOpacity className="flex-row items-center space-x-1">
                <Image
                  tintColor={'#6b7280'}
                  className="w-6 h-6"
                  source={require('../assets/Images/forward.png')}
                />
                <Text className="text-gray-600 text-sm">Share</Text>
              </TouchableOpacity>
            </View>

            <View className="px-3">
              {showInput &&
                groupedComments &&
                Object.keys(groupedComments).length > 0 && (
                  <Text className="mt-5 text-base font-semibold text-black">
                    Comments
                  </Text>
                )}

              <FlatList
                scrollEnabled
                data={groupedComments}
                keyExtractor={item => item[0].user._id}
                renderItem={({item}) => {
                  const userId = item[0].user._id;
                  const isExpanded = expandedUsers.includes(userId);
                  const commentsToRender = isExpanded ? item : [item[0]];

                  return (
                    <View className="">
                      <ScrollView className={showInput ? `h-46` : 'h-0 '}>
                        <View className=" ">
                          {showInput && (
                            <>
                              <View className="pb-4">
                                {commentsToRender.length > 0 ? (
                                  commentsToRender.map((comment, index) => (
                                    <View key={index}>
                                      <TouchableOpacity>
                                        <View className="flex-row gap-2 mt-2">
                                          <Image
                                            source={
                                              hasError || !comment?.user?.image
                                                ? require('../assets/Images/default-image.png')
                                                : {uri: comment.user.image}
                                            }
                                            className="w-8 h-8 rounded-full"
                                            onError={() => setHasError(true)}
                                          />
                                          <View className="flex-1 bg-white p-3 rounded-lg">
                                            <View className="flex-row gap-1 items-center">
                                              <Text className="font-semibold text-sm">
                                                {comment?.user?.name}
                                              </Text>
                                              <Text className="text-xs text-gray-500">
                                                •{' '}
                                                {getTimeAgo(comment.createdAt)}
                                              </Text>
                                            </View>
                                            <Text className="text-sm text-gray-800">
                                              {comment.text}
                                            </Text>
                                          </View>
                                        </View>
                                      </TouchableOpacity>
                                    </View>
                                  ))
                                ) : (
                                  <Text className="text-center text-gray-500 mt-2">
                                    No comments yet.
                                  </Text>
                                )}
                              </View>
                              <View className="flex justify-end items-end">
                                {item.length > 1 && (
                                  <TouchableOpacity
                                    onPress={() => toggleExpand(userId)}>
                                    <View className=" rounded-full p-2">
                                      <Text className="text-xs font-semibold text-primary ">
                                        {!isExpanded
                                          ? `View ${
                                              item.length - 1
                                            } more comment${
                                              item.length - 1 > 1 ? 's' : ''
                                            }`
                                          : 'View less comments'}
                                      </Text>
                                    </View>
                                  </TouchableOpacity>
                                )}
                              </View>
                            </>
                          )}
                        </View>
                      </ScrollView>
                    </View>
                  );
                }}
              />
              {showInput && (
                <View className="flex-row items-center space-x-2 mt-2 border-t border-gray-300 pt-3">
                  <Image
                    source={currentUser?.image}
                    className="w-8 h-8 rounded-full"
                  />
                  <TextInput
                    placeholder="Add a comment..."
                    value={newComment}
                    onChangeText={setNewComment}
                    className="flex-1 border border-gray-300 rounded-full px-4 py-2 text-sm"
                  />
                  <TouchableOpacity onPress={handleComment}>
                    <Text className="text-[#441752] font-bold">Post</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </View>

          <View className="flex-1 px-4  mt-3 py-2">
            <Text className="text-xl font-bold text-[#441752] mb-4">
              Suggested Videos
            </Text>

            <RelatedVideos videoId={videoData._id} />
          </View>
        </ScrollView>
      )}
    </View>
  );
};

export default VideoPlayerScreen;
