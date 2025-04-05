import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Alert,
  TextInput,
} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'https://tag-backend.vercel.app/api';

const ShortVideoUpload = () => {
  const [videoUri, setVideoUri] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [creatorId, setCreatorId] = useState(null);
  const [category, setCategory] = useState(null);

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const id = await AsyncStorage.getItem('loginuser_id');
        const category = await AsyncStorage.getItem('category');
        setCategory(category);
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

    setIsUploading(true);

    const formData = new FormData();
    formData.append('videoFile', {
      uri: videoUri,
      name: 'uploaded_video.mp4',
      type: 'video/mp4',
    });
    formData.append('title', title);
    formData.append('description', description);
    formData.append('category', category);
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

      Alert.alert('Success', response.data.message);
      setVideoUri(null);
    } catch (error) {
      console.error('Upload Error:', error);
      Alert.alert('Upload Failed', 'Something went wrong.');
    } finally {
      setIsUploading(false);
    }
  };

  console.log('data', title);
  console.log('data', description);

  return (
    <View className="flex-1 bg-purple-50 mt-16  p-4">
      {videoUri && (
        <View className="mb-4">
          <Text className="text-gray-600">Selected Short Video:</Text>
          <Text className="text-blue-500">{videoUri}</Text>
        </View>
      )}

      {/* Upload from Gallery */}
      <View className='flex justify-center items-center'>
      <TouchableOpacity
        className="bg-[#441752] px-6 py-3 rounded-full mb-4 flex-row items-center"
        onPress={pickVideo}>
        <Image
        tintColor={"white"}
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
          className="bg-[#8174A0] px-6 py-3 rounded-full flex-row items-center"
          onPress={uploadVideo}
          disabled={isUploading}>
          
          <Text className="text-white">
            {isUploading ? 'Uploading...' : 'Upload Video'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Loader */}
      {isUploading && (
        <ActivityIndicator size="large" color="#441752" className="mt-4" />
      )}
    </View>
  );
};

export default ShortVideoUpload;
