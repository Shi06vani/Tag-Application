import React, {useState} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  Dimensions,
  TextInput,
} from 'react-native';
import Video from 'react-native-video';

const {width} = Dimensions.get('window');

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
  const {videoData} = route.params;
  console.log('videoUrl', videoData);
  const [comments, setComments] = useState([
    {
      id: 1,
      name: 'Anjali',
      image: require('../assets/Images/user.png'),
      text: 'Nice video!',
    },
    {
      id: 2,
      name: 'Raj',
      image: require('../assets/Images/user.png'),
      text: 'Great content 👏',
    },
  ]);
  const [newComment, setNewComment] = useState('');
  const [showInput, setShowInput] = useState(false);
  const currentUser = {
    name: videoData.name,
    image: require('../assets/Images/man.png'),
  };

  const handleAddComment = () => {
    if (newComment.trim()) {
      const comment = {
        id: Date.now(),
        name: currentUser.name,
        image: currentUser.image,
        text: newComment,
      };
      setComments([comment, ...comments]);
      setNewComment('');
      setShowInput(false);
    }
  };

  return (
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
        {/* Title */}
        <Text className="text-lg font-bold text-black mt-4">
          {videoData.title}
        </Text>

        {/* Meta Info Row */}
        <View className="flex-row items-center mt-1 space-x-2">
          <Text className="text-gray-600 text-sm">{videoData.views} views</Text>
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
          onPress={() => setLiked(!liked)}>
          <Image
            source={
              liked
                ? require('../assets/Images/heart-filled.png') // filled FlatIcon
                : require('../assets/Images/heart-outline.png') // outline FlatIcon
            }
            className="w-6 h-6"
          />
          <Text className="text-gray-600 text-sm">{liked ? '1.1k' : '1k'}</Text>
        </TouchableOpacity>

        {/* Comment */}
        <TouchableOpacity
          className="flex-row items-center space-x-1"
          onPress={() => setShowInput(true)}>
          {/* <MessageCircle size={20} color="#6b7280" /> */}
          <Image
            tintColor={'#6b7280'}
            className="w-6 h-6"
            source={require('../assets/Images/video-comment.png')}
          />
          <Text className="text-gray-600 text-sm">125</Text>
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
        <Text className="mt-5 text-base font-semibold text-black">
          Comments
        </Text>

        <FlatList
          data={comments}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => (
            <TouchableOpacity onPress={() => setShowInput(true)}>
              <View className="flex-row items-start mt-3 space-x-2 shadow-sm">
                <Image source={item.image} className="w-8 h-8 rounded-full" />
                <View className="flex-1 bg-gray-50 p-2 rounded-lg">
                  <Text className="font-semibold text-sm">{item.name}</Text>
                  <Text className="text-sm text-gray-700">{item.text}</Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />

        {/* Add Comment Input */}
        {showInput && (
          <View className="flex-row items-center space-x-2 mt-4 border-t border-gray-300 pt-3">
            <Image
              source={currentUser.image}
              className="w-8 h-8 rounded-full"
            />
            <TextInput
              placeholder="Add a comment..."
              value={newComment}
              onChangeText={setNewComment}
              className="flex-1 border border-gray-300 rounded-full px-4 py-2 text-sm"
            />
            <TouchableOpacity onPress={handleAddComment}>
              <Text className="text-[#441752] font-bold">Post</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      {/* Suggested Videos */}
      <View className="flex-1 px-4 py-4">
        <Text className="text-xl font-bold text-[#441752] mb-2">
          Suggested Videos
        </Text>

        {/* <FlatList
          data={suggestedVideos}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) => (
            <TouchableOpacity className="flex-row mb-4 bg-white rounded-xl p-2 shadow-sm">
              <Image
                source={item.thumbnail}
                className="w-28 h-24 rounded-lg"
                resizeMode="cover"
              />
              <View className="ml-3 justify-center">
                <Text
                  className="text-base font-semibold text-[#441752]"
                  numberOfLines={1}>
                  {item.title}
                </Text>
                <Text className="text-sm text-gray-600">@{item.creator}</Text>
              </View>
            </TouchableOpacity>
          )}
        /> */}
        <FlatList
          data={suggestedVideos}
          keyExtractor={item => item.id.toString()}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) => (
            <TouchableOpacity className="flex-row mb-5 bg-white">
              <View className='relative'>
                <Image
                  source={item.thumbnail}
                  className="w-36 h-28 rounded-lg"
                  resizeMode="cover"
                />
                <View className="absolute left-14 top-10 inset-0 flex justify-center items-center ">
                  <Image
                  tintColor={"white"}
                    source={require('../assets/Images/play.png')}
                    className="w-5 h-5 p-3 rounded-full opacity-80"
                  />
                </View>
              </View>

              {/* Right Content */}
              <View className="ml-3 flex-1 justify-between py-3">
                <Text
                  className="text-base font-medium text-black"
                  numberOfLines={2}>
                  {item.title}
                </Text>
                <Text className="text-sm text-gray-600 mt-1">
                  @{item.creator}
                </Text>
                <Text className="text-sm text-gray-500">
                  {item.views} views • {item.timeAgo}
                </Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
};

export default VideoPlayerScreen;
