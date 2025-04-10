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
import {useNavigation} from '@react-navigation/native';

const API_URL = 'https://tag-backend.vercel.app/api';

const BrandVideoUpload = ({route}) => {
  const {brand_id} = route.params;

  const [videoUri, setVideoUri] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [brandtitle, setBrandTitle] = useState('');
  const [brandDescription, setBrandDescription] = useState('');
  const [creatorId, setCreatorId] = useState(null);
  const [category, setCategory] = useState(null);

  const navigation = useNavigation();

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
  const pickBrandVideo = () => {
    let options = {
      mediaType: 'video',
      quality: 1,
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
  const uploadBrandVideo = async () => {
    if (!videoUri) {
      Alert.alert('Error', 'Please select a video first.');
      return;
    }

    const missingFields = [];
    if (!brandtitle) missingFields.push('Title');
    if (!brandDescription) missingFields.push('Description');
    if (!category) missingFields.push('Category');
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
    formData.append('title', brandtitle);
    formData.append('description', brandDescription);
    formData.append('category', category);
    formData.append('type', 'video');
    formData.append('creatorId', creatorId);
    formData.append('brandId', brand_id);

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
      navigation.replace('Main');
    } catch (error) {
      console.error('Upload Error:', error);
      Alert.alert('Upload Failed', 'Something went wrong.');
    } finally {
      setIsUploading(false);
    }
  };

  console.log('data', brandtitle);
  console.log('data', brandDescription);
  console.log('brand_id', brand_id);
  console.log('creatorId', creatorId);

  return (
    <View className="flex-1 bg-purple-50 py-12  px-4">
      {videoUri && (
        <View className="mb-4">
          {/* <Text className="text-gray-600 mb-2">Selected Short Preview:</Text> */}
          {/* <Video
            source={{uri: videoUri}}
            style={{width: '100%', height: 200, borderRadius: 12}}
            resizeMode="cover"
            controls
          /> */}
          {/* <TouchableOpacity
            className="mt-2 text-sm self-center bg-red-500 px-4 py-2 rounded-full"
            onPress={() => setVideoUri(null)}>
            <Text className="text-white font-semibold">Remove Video</Text>
          </TouchableOpacity> */}
          <View className="flex-row items-center justify-center gap- border  border-primary bg-purple-50 rounded-lg my-3">
            <Image
              source={require('../../assets/Images/right-click-arrow.png')}
              className="w-14 h-14 border border-primary"
            />
            <Text className="text-primary text-base font-semibold">
              Video Selected Successfully
            </Text>
          </View>
        </View>
      )}

      {/* Upload from Gallery */}
      <View className="flex justify-center items-center">
        <TouchableOpacity
          className="bg-[#441752] px-6 py-3 rounded-full mb-4 flex-row items-center"
          onPress={pickBrandVideo}>
          <Image
            tintColor={'white'}
            source={require('../../assets/Images/camera.png')}
            className="w-6 h-6 mr-2"
          />
          <Text className="text-white">Select Video from Gallery</Text>
        </TouchableOpacity>
      </View>

      <View className="py-10">
        <View className="border-2 border-primary rounded-full px-4 py-2 bg-white mb-3 w-full">
          <TextInput
            className="text-black w-full"
            value={brandtitle}
            onChangeText={setBrandTitle}
            placeholder="Enter title"
            placeholderTextColor="#9ca3af"
          />
        </View>
        <View className="border-2 border-primary rounded-full px-4 py-2 bg-white">
          <TextInput
            className="text-black"
            value={brandDescription}
            onChangeText={setBrandDescription}
            placeholder="Enter description"
            placeholderTextColor="#9ca3af"
          />
        </View>
      </View>

      {/* Upload Button */}
      <View className="flex justify-center items-center">
        <TouchableOpacity
          className="bg-[#8174A0] px-6 py-3 rounded-full flex-row items-center"
          onPress={uploadBrandVideo}
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

export default BrandVideoUpload;
