import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Alert,
  TextInput,
  ScrollView,
} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import Video from 'react-native-video';

const API_URL = 'https://tag-backend.vercel.app/api';

const ShortVideoUpload = () => {
  const [videoUri, setVideoUri] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [creatorId, setCreatorId] = useState(null);
  
  // const [category, setCategory] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const id = await AsyncStorage.getItem('loginuser_id');

        if (id) setCreatorId(id);
      } catch (error) {
        console.error('Error retrieving user ID:', error);
      }
    };

    fetchUserId();
  }, []);

  // Function to pick video from gallery
  const pickVideo = () => {
    let options = {
      mediaType: 'video', // Only allow videos
      quality: 1, // High quality
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled video picker');
      } else if (response.errorMessage) {
        console.log('Error:', response.errorMessage);
      } else {
        setVideoUri(response.assets[0].uri);
      }
    });
  };

  // Function to upload the selected video
  const uploadVideo = async () => {
    if (!videoUri) {
      Alert.alert('Error', 'Please select a video first.');
      return;
    }

    // Validation step
    const missingFields = [];
    // if (!title) missingFields.push('Title');
    // if (!description) missingFields.push('Description');
    if (!title) missingFields.push('Title');
    if (!description) missingFields.push('Description');
    if (!creatorId) missingFields.push('Creator ID');

    if (missingFields.length > 0) {
      Alert.alert(
        'Missing Fields',
        `Please fill the following field(s):\n${missingFields.join(', ')}`,
      );
      return;
    }

    setIsUploading(true);

    const formData = new FormData();
    formData.append('videoFile', {
      uri: videoUri,
      name: 'uploaded_video.mp4',
      type: 'video/mp4',
    });
    formData.append('title', title.trim());
    formData.append('description', description.trim());
    // formData.append('category', category);
    formData.append('type', 'short');
    formData.append('creatorId', creatorId);

    try {
      const response = await axios.post(
        `${API_URL}/videos/post/creator`,
        formData,
        {
          headers: {'Content-Type': 'multipart/form-data'},
        },
      );

      Alert.alert('Success', "Video Uploaded sucessfully");
      setVideoUri(null);
      navigation.replace('Main');
    } catch (error) {
      console.error('Upload Error:', error);
      Alert.alert('Upload Failed', 'Something went wrong.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <ScrollView className="flex-1 bg-purple-50">
      <View className=" mt-16  p-2">
        {videoUri && (
          <View className="">
            <Text className="text-gray-600 mb-2">Selected Video Preview:</Text>
            <Video
              source={{
                uri: videoUri,
                type: 'video/mp4', // Explicitly set the video type
              }}
              style={{width: '100%', height: 200, borderRadius: 12}}
              resizeMode="cover"
              controls
            />

            <View className="flex-row items-center justify-center gap- border  border-primary bg-purple-50 rounded-lg my-2">
              <Image
                source={require('../assets/Images/right-click-arrow.png')}
                className="w-10 h-10 border border-primary"
              />
              <Text className="text-primary text-xs font-semibold">
                Video Selected Successfully
              </Text>
            </View>
            <TouchableOpacity
              className=" mt-2 mb-4 text-xs self-center bg-red-500 px-4 py-2 rounded-full"
              onPress={() => setVideoUri(null)}>
              <Text className="text-white font-semibold">Remove Video</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Upload from Gallery */}
        <View className="flex justify-center items-center">
          <TouchableOpacity
            className="bg-[#441752] px-6 py-3 rounded-full mb-4 flex-row items-center"
            onPress={pickVideo}>
            <Image
              tintColor={'white'}
              source={require('../assets/Images/camera.png')}
              className="w-6 h-6 mr-2"
            />
            <Text className="text-white">Select Video from Gallery</Text>
          </TouchableOpacity>
        </View>

        <View className="py-10">
          <View className="border-2 border-primary rounded-full px-4 py-2 bg-white mb-3 w-full">
            <TextInput
              className="text-black w-full"
              value={title}
              onChangeText={setTitle}
              placeholder="Enter title"
              placeholderTextColor="#9ca3af"
            />
          </View>
          <View className="border-2 border-primary rounded-full px-4 py-2 bg-white">
            <TextInput
              className="text-black"
              value={description}
              onChangeText={setDescription}
              placeholder="Enter description"
              placeholderTextColor="#9ca3af"
            />
          </View>
        </View>

        {/* Upload Button */}
        <View className="flex justify-center items-center">
          <TouchableOpacity
            className="bg-primary px-6 py-3 rounded-full flex-row  items-center"
            onPress={uploadVideo}
            disabled={isUploading}>
            {/* Loader */}
            {isUploading && (
              <ActivityIndicator color="white" className="mr-2 w-5 h-5" />
            )}
            <Text className="text-white">
              {isUploading ? 'Uploading...' : 'Upload Video'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default ShortVideoUpload;
