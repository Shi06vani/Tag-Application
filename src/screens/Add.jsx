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
import ShortVideoUpload from '../components/ShortVideoUpload';
import {useNavigation} from '@react-navigation/native';

const API_URL = 'https://tag-backend.vercel.app/api'; // Replace with your actual API URL

const Add = () => {
  const [activeTab, setActiveTab] = useState('Short Shorts');
  const [videoUri, setVideoUri] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [creatorId, setCreatorId] = useState(null);
  const [category, setCategory] = useState(null);

  const navigation = useNavigation();

  useEffect(() => {
    const init = async () => {
      try {
        const loginuserid = await AsyncStorage.getItem('loginuser_id');
        const category = await AsyncStorage.getItem('category');

        if (!loginuserid) {
          navigation.navigate('Login');
        } else {
          setCreatorId(loginuserid);
        }

        if (category) {
          setCategory(category);
        }
      } catch (error) {
        console.error('Error retrieving user data:', error);
      }
    };

    init();
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
    formData.append('type', 'video');
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
      <Text className="text-xl font-bold mb-4 text-center">
        Upload or Record {activeTab}
      </Text>

      {activeTab === 'Long Shorts' && (
        <View className="mt-16  ">
          {videoUri && (
            <View className="mb-4">
              <Text className="text-gray-600">Selected Video:</Text>
              <Text className="text-blue-500">{videoUri}</Text>
            </View>
          )}

          {/* Upload from Gallery */}
          <View className="flex justify-center items-center gap-2">
            <TouchableOpacity
              className="bg-[#441752] px-6 py-3 text-center rounded-full mb-4 flex-row items-center "
              onPress={pickVideo}>
              <Image
                tintColor={'white'}
                source={require('../assets/Images/camera.png')}
                className="w-7 h-7 mr-2"
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
      )}

      {activeTab === 'Short Shorts' && (
        <>
          <ShortVideoUpload />
        </>
      )}

      {/* Bottom Tabs */}
      <View className="absolute bottom-4 w-full flex justify-center items-center">
        <View className="flex-row gap-6">
          <TouchableOpacity
            className={`px-4 py-2 rounded-full ${
              activeTab === 'Long Shorts' ? 'bg-[#441752]' : 'bg-[#A888B5]'
            }`}
            onPress={() => setActiveTab('Long Shorts')}>
            <Text className="text-white font-bold">Long Shorts</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className={`px-4 py-2 rounded-full ${
              activeTab === 'Short Shorts' ? 'bg-[#441752]' : 'bg-[#A888B5]'
            }`}
            onPress={() => setActiveTab('Short Shorts')}>
            <Text className="text-white font-bold">Short Shorts</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Add;
