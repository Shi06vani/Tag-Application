import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  TextInput,
  Alert,
  ScrollView,
} from 'react-native';
import Video from 'react-native-video';
import {getVideoLikeCount, likeVideo} from '../api/Likes';
import {getVideoComments, postComment} from '../api/comment';
import {groupByUser} from '../components/common/Comment';
import {getRelatedVideos} from '../api/useVideo.jsx/Video';
import {getTimeAgo} from '../components/common/GetTime';
import RelatedVideos from '../components/RelatedVideos';

const suggestedVideos = [
  {
    id: '1',
    title: 'How to grow on YouTube in 2025',
    creator: 'DigitalCreator',
    views: '120k',
    timeAgo: '2 days ago',
    thumbnail: require('../assets/Images/man.png'),
  },
  {
    id: '2',
    title: 'React Native UI Tips & Tricks',
    creator: 'CodeMaster',
    views: '80k',
    timeAgo: '1 week ago',
    thumbnail: require('../assets/Images/man.png'),
  },
  // ...
];

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
const VideoPlayerScreen = ({route}) => {
  const [showDescription, setShowDescription] = useState(false);
  const [liked, setLiked] = useState(false);
  const [totalLikes, setTotalLike] = useState(0);
  const {videoData} = route.params;
  const [commentCount, setCommentCount] = useState();
  const [comments, setComments] = useState([]);
  const [expandedUsers, setExpandedUsers] = useState([]);
  const groupedComments = groupByUser(comments);
  const [hasError, setHasError] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [showInput, setShowInput] = useState(false);

  useEffect(() => {
    fetchLikes();
    fetchComments();
  }, [videoData._id]);

  const fetchLikes = async () => {
    const likeData = await getVideoLikeCount(videoData._id);
    if (likeData) {
      console.log('likeData', likeData.likeCount);
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
      Alert.alert('Failure', 'Please Login First');
    }
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

  // const getTimeAgo = timestamp => {
  //   const now = new Date();
  //   const created = new Date(timestamp);
  //   const diffInSeconds = Math.floor((now - created) / 1000);

  //   const minutes = Math.floor(diffInSeconds / 60);
  //   const hours = Math.floor(diffInSeconds / 3600);
  //   const days = Math.floor(diffInSeconds / 86400);
  //   const weeks = Math.floor(diffInSeconds / 604800);

  //   if (diffInSeconds < 60) return 'Just now';
  //   else if (minutes < 60) return `${minutes} min ago`;
  //   else if (hours < 24) return `${hours} hr ago`;
  //   else if (days < 7) return `${days} day${days > 1 ? 's' : ''} ago`;
  //   else return `${weeks} week${weeks > 1 ? 's' : ''} ago`;
  // };

  const toggleExpand = userId => {
    setExpandedUsers(prev =>
      prev.includes(userId)
        ? prev.filter(id => id !== userId)
        : [...prev, userId],
    );
  };

  return (
    <ScrollView>
      <View className="flex-1 bg-purple-50">
        {/* Video Player */}
        <View className="w-full h-60 bg-black">
          <Video
            source={{uri: videoData.videoUrl}}
            style={{width: '100%', height: '100%'}}
            resizeMode="cover"
            controls
          />
        </View>
        <View className="px-3">
          <View className="px-3">
            {/* Title */}
            <Text className="text-lg font-bold text-black mt-4">
              {videoData.title}
            </Text>

            {/* Meta Info Row */}
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

            {/* Description */}
            {showDescription && (
              <Text className="text-gray-700 mt-2 leading-5 text-sm">
                {videoData.description}
              </Text>
            )}
          </View>

          {/* Actions: Like (with FlatIcon), Comment, Share */}
          <View className="flex-row justify-between items-center mt-3 px-2">
            {/* Like */}
            <TouchableOpacity
              className="flex-row items-center space-x-1"
              onPress={() => {
                handleLike(videoData._id);
              }}>
              <Image
                source={
                  liked
                    ? require('../assets/Images/heart-filled.png')
                    : require('../assets/Images/heart-outline.png')
                }
                className="w-6 h-6"
              />
              <Text className="text-gray-600 text-sm">
                {/* {totalLikes > 999
                ? (totalLikes / 1000).toFixed(1) + 'k'
                : totalLikes || 0} */}
                {totalLikes || 0}
              </Text>
            </TouchableOpacity>

            {/* Comment */}
            <TouchableOpacity
              className="flex-row items-center space-x-1"
              onPress={() => {
                setShowInput(!showInput);
              }}>
              {/* <MessageCircle size={20} color="#6b7280" /> */}
              <Image
                tintColor={'#6b7280'}
                className="w-6 h-6"
                source={require('../assets/Images/video-comment.png')}
              />
              <Text className="text-gray-600 text-sm">{commentCount}</Text>
            </TouchableOpacity>

            {/* Share */}
            <TouchableOpacity className="flex-row items-center space-x-1">
              <Image
                tintColor={'#6b7280'}
                className="w-6 h-6"
                source={require('../assets/Images/forward.png')}
              />
              <Text className="text-gray-600 text-sm">Share</Text>
            </TouchableOpacity>
          </View>

          {/* Comments Section */}
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
                      <View className="pb-4 pt-2">
                        {showInput && (
                          <>
                           <View className="pb-4 pt-2">
                            {commentsToRender.length > 0 ? (
                              commentsToRender.map((comment, index) => (
                                <View>
                                  <TouchableOpacity key={index}>
                                    <View className="flex-row gap-2 mt-2">
                                      <Image
                                        source={
                                          hasError || !comment.imageUri
                                            ? require('../assets/Images/default-image.png')
                                            : {uri: comment.imageUri}
                                        }
                                        className="w-8 h-8 rounded-full"
                                        onError={() => setHasError(true)}
                                      />
                                      <View className="flex-1 bg-white p-3 rounded-lg">
                                        <View className="flex-row gap-1 items-center">
                                          <Text className="font-semibold text-sm">
                                            {comment.user.name}
                                          </Text>
                                          <Text className="text-xs text-gray-500">
                                            • {getTimeAgo(comment.createdAt)}
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

                         

                          //   <>
                          //     {commentsToRender.map((comment, index) => (
                          //       <TouchableOpacity
                          //         key={index}
                          //         // onPress={() => {
                          //         //   setShowInput(!showInput);
                          //         // }}
                          //       >
                          //         <View
                          //           key={index}
                          //           className="flex-row gap-2 mt-2">
                          //           <Image
                          //             source={
                          //               hasError || !comment.imageUri
                          //                 ? require('../assets/Images/default-image.png')
                          //                 : {uri: comment.imageUri}
                          //             }
                          //             className="w-8 h-8 rounded-full"
                          //             onError={() => setHasError(true)}
                          //           />
                          //           <View className="flex-1 bg-white p-3 rounded-lg">
                          //             <View className="flex-row gap-1 items-center">
                          //               <Text className="font-semibold text-sm">
                          //                 {comment.user.name}
                          //               </Text>
                          //               <Text className="text-xs text-gray-500">
                          //                 • {getTimeAgo(comment.createdAt)}
                          //               </Text>
                          //             </View>
                          //             <Text className="text-sm text-gray-800">
                          //               {comment.text}
                          //             </Text>
                          //           </View>
                          //         </View>
                          //       </TouchableOpacity>
                          //     ))}

                          //     <View className="flex justify-end items-end">
                          //       {item.length > 1 && (
                          //         <TouchableOpacity
                          //           onPress={() => toggleExpand(userId)}>
                          //           <View className=" rounded-full p-2">
                          //             <Text className="text-xs font-semibold text-primary ">
                          //               {!isExpanded
                          //                 ? `View ${
                          //                     item.length - 1
                          //                   } more comment${
                          //                     item.length - 1 > 1 ? 's' : ''
                          //                   }`
                          //                 : 'View less comments'}
                          //             </Text>
                          //           </View>
                          //         </TouchableOpacity>
                          //       )}
                          //     </View>

                          //   </>
                        )}
                      </View>
                    </ScrollView>
                  </View>
                );
              }}
            />
            {showInput && (
              
              <View className="flex-row items-center space-x-2  border-t border-gray-300 pt-3">
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

        {/* Suggested Videos */}
        <View className="flex-1 px-4  mt-3 py-2">
          <Text className="text-xl font-bold text-[#441752] mb-4">
            Suggested Videos
          </Text>

          <RelatedVideos videoId={videoData._id} />
        </View>
      </View>
    </ScrollView>
  );
};

export default VideoPlayerScreen;
