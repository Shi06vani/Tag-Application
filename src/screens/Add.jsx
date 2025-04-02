import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  PermissionsAndroid,
  Alert,
  Platform,
  ScrollView,
} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import Video from 'react-native-video';
import BASE_URL from '../../config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
const Add = () => {
  const [activeTab, setActiveTab] = useState('Long Shorts');
  const [videoFile, setVideoFile] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [uploading, setUploading] = useState(false);

  const [userId, setUserId] = useState(null);

  // short state
  const [shortsVideo, setShortsVideo] = useState(null);
  const [shortTitle, setShortTitle] = useState('');
  const [shortDescription, setShortDescription] = useState('');
  const [shortCategory, setShortCategory] = useState('');

  const navigation = useNavigation();

  useEffect(() => {
    const fetchUserId = async () => {
      const storedId = await AsyncStorage.getItem('loginuser_id');
      setUserId(storedId);
    };

    fetchUserId();
  }, []);

  useEffect(() => {
    const checkAuth = async () => {
      const userToken = await AsyncStorage.getItem('token');
      if (!userToken) {
        navigation.replace('Login');
      }
    };

    checkAuth();
  }, []);

  const requestPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        if (parseInt(Platform.Version, 10) >= 33) {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO,
          );
          return granted === PermissionsAndroid.RESULTS.GRANTED;
        } else {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          );
          return granted === PermissionsAndroid.RESULTS.GRANTED;
        }
      } catch (err) {
        console.warn('Permission request error:', err);
        return false;
      }
    }
    return true;
  };

  const pickVideo = async videoType => {
    const hasPermission = await requestPermission();
    if (!hasPermission) {
      Alert.alert(
        'Permission Denied',
        'You need to grant permission to access media.',
      );
      return;
    }

    const options = {
      mediaType: 'video',
      quality: 1,
      includeBase64: false,
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled video picker');
      } else if (response.errorCode) {
        console.error('Picker Error: ', response.errorMessage);
        Alert.alert('Error', response.errorMessage || 'Failed to select video');
      } else if (response.assets && response.assets.length > 0) {
        console.log('Video selected:', response.assets[0]);
        {
          videoType === 'video'
            ? setVideoFile(response.assets[0])
            : setShortsVideo(response.assets[0]);
        }
      } else {
        console.log('No video selected');
        Alert.alert('Error', 'No video was selected');
      }
    });
  };

  const handleUpload = async type => {
    console.log('type', type);
    if (!videoFile) {
      Alert.alert('No Video', 'Please select a video to upload.');
      return;
    }
    if (!title || !description || !category) {
      Alert.alert('Missing Details', 'Please fill in all fields.');
      return;
    }

    setUploading(true);

    // const userId = await AsyncStorage.getItem("loginuser_id");

    if (!userId) {
      Alert.alert('Error', 'User ID not found. Please log in again.');
      setUploading(false);
      return;
    }

    const formData = new FormData();

    formData.append('videoFile', videoFile);
    formData.append('title', title);
    formData.append('description', description);
    formData.append('category', category);
    formData.append('type', type);
    formData.append('creatorId', userId);

    try {
      const response = await fetch(`${BASE_URL}/api/videos/post/creator`, {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setUploading(false);
      const responseData = await response.json();

      if (responseData) {
        Alert.alert(
          'Success',
          responseData.message || 'Video uploaded successfully!',
        );
        {
          type === 'video' ? setVideoFile(null) : setShortsVideo(null);
        }
        setTitle('');
        setDescription('');
        setCategory('');
      } else {
        Alert.alert(
          'Upload Failed',
          responseData.message || 'Please try again later.',
        );
      }
    } catch (error) {
      setUploading(false);
      console.error('Error uploading video:', error);
      Alert.alert('Upload Failed', 'Please try again later.');
    }
  };

  return (
    <View className="flex-1">
      {activeTab === 'Long Shorts' && (
        <View className=" bg-purple-50  flex-1 p-4 mt-16 items-center max-h-full">
          {videoFile ? (
            <View className="w-full h-64 bg-black rounded-lg">
              <Video
                source={{uri: videoFile.uri}}
                style={{width: '100%', height: '100%'}}
                controls
                resizeMode="contain"
              />
            </View>
          ) : (
            <TouchableOpacity
              className="w-full h-64 border border-slate-100 bg-gray-100 rounded-lg items-center justify-center shadow-2xl"
              onPress={pickVideo}>
              <Text className="text-black font-semibold">Select a Video</Text>
            </TouchableOpacity>
          )}

          <TextInput
            className="w-full p-3 mt-4 bg-white rounded-lg"
            placeholder="Title"
            value={title}
            onChangeText={setTitle}
          />
          <TextInput
            className="w-full p-3 mt-4 bg-white rounded-lg"
            placeholder="Description"
            value={description}
            onChangeText={setDescription}
            multiline
            numberOfLines={3}
          />
          <TextInput
            className="w-full p-3 mt-4 bg-white rounded-lg"
            placeholder="Category"
            value={category}
            onChangeText={setCategory}
          />

          <TouchableOpacity
            className={`mt-4 px-6 py-3 rounded-lg ${
              videoFile ? 'bg-primary' : 'bg-accent'
            }`}
            onPress={() => handleUpload('video')}
            disabled={!videoFile || uploading}>
            {uploading ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text className="text-white font-bold">Upload Video</Text>
            )}
          </TouchableOpacity>
        </View>
      )}

      {activeTab === 'Shorts' && (
       <View>
        <Text>implementng</Text>
       </View>

        // <View className="bg-purple-50 flex-1 p-4 mt-16 items-center max-h-full">
        //   {shortsVideo ? (
        //     <View className="w-full h-64 bg-black rounded-lg">
        //       <Video
        //         source={{uri: shortsVideo.uri}}
        //         style={{width: '100%', height: '100%'}}
        //         controls
        //         resizeMode="contain"
        //       />
        //     </View>
        //   ) : (
        //     <TouchableOpacity className="w-full h-64 bg-gray-100 rounded-lg items-center justify-center">
        //       <Text className="text-black font-semibold">
        //         Select a short Video
        //       </Text>
        //     </TouchableOpacity>
        //   )}
        //   <TextInput
        //     className="w-full p-3 mt-4 bg-white rounded-lg"
        //     placeholder="Title"
        //     value={shortTitle}
        //     onChangeText={setShortTitle}
        //   />
        //   <TextInput
        //     className="w-full p-3 mt-4 bg-white rounded-lg"
        //     placeholder="Description"
        //     value={shortDescription}
        //     onChangeText={setShortDescription}
        //     multiline
        //     numberOfLines={3}
        //   />
        //   <TextInput
        //     className="w-full p-3 mt-4 bg-white rounded-lg"
        //     placeholder="Category"
        //     value={shortCategory}
        //     onChangeText={setShortCategory}
        //   />
        //   <TouchableOpacity
        //     className={`mt-4 px-6 py-3 rounded-lg ${
        //       shortsVideo ? 'bg-primary' : 'bg-accent'
        //     }`}
        //     onPress={() => handleUpload('shorts')}
        //     disabled={!shortsVideo || uploading}>
        //     {uploading ? (
        //       <ActivityIndicator color="white" />
        //     ) : (
        //       <Text className="text-white font-bold">Upload Video</Text>
        //     )}
        //   </TouchableOpacity>
        // </View>
      )}

      <View className="absolute bottom-4 w-full flex justify-center items-center">
        <View className="flex-row gap-6">
          <TouchableOpacity
            className={`px-4  py-2 rounded-full ${
              activeTab === 'Long Shorts' ? 'bg-[#441752]' : 'bg-[#A888B5]'
            }`}
            onPress={() => setActiveTab('Long Shorts')}>
            <Text className="text-white font-bold">Long Shorts</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className={`px-4 py-2 rounded-full ${
              activeTab === 'Shorts' ? 'bg-[#441752]' : 'bg-[#A888B5]'
            }`}
            onPress={() => setActiveTab('Shorts')}>
            <Text className="text-white font-bold">Short Shorts</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Add;


 // <View  className=" bg-purple-50  flex-1 p-4 mt-16 items-center max-h-full">
        // {videoFile ? (
        //   <View className="w-full h-64 bg-black rounded-lg">
        //     <Video
        //       source={{ uri: videoFile.uri }}
        //       style={{ width: "100%", height: "100%" }}
        //       controls
        //       resizeMode="contain"
        //     />
        //   </View>
        // ) : (
        //   <TouchableOpacity
        //     className="w-full h-64 bg-gray-100 rounded-lg items-center justify-center"
        //     // onPress={pickVideo}
        //   >
        //     <Text className="text-black font-semibold">Select a short Video</Text>
        //   </TouchableOpacity>
        // )}

        // <TextInput
        //   className="w-full p-3 mt-4 bg-white rounded-lg"
        //   placeholder="Title"
        //   value={title}
        //   onChangeText={setTitle}
        // />
        // <TextInput
        //   className="w-full p-3 mt-4 bg-white rounded-lg"
        //   placeholder="Description"
        //   value={description}
        //   onChangeText={setDescription}
        //   multiline
        //   numberOfLines={3}
        // />
        // <TextInput
        //   className="w-full p-3 mt-4 bg-white rounded-lg"
        //   placeholder="Category"
        //   value={category}
        //   onChangeText={setCategory}
        // />

        // <TouchableOpacity
        //   className={`mt-4 px-6 py-3 rounded-lg ${videoFile ? "bg-primary" : "bg-accent"}`}
        //   onPress={()=>handleUpload("shorts")}
        //   disabled={!videoFile || uploading}
        // >
        //   {uploading ? <ActivityIndicator color="white" /> : <Text className="text-white font-bold">Upload Video</Text>}
        // </TouchableOpacity>
        // </View>