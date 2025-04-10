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

const API_URL = 'https://tag-backend.vercel.app/api';

const Add = () => {
  const [activeTab, setActiveTab] = useState('Short Shorts');
  const [videoUri, setVideoUri] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [creatorId, setCreatorId] = useState(null);
  const [category, setCategory] = useState(null);

  const navigation = useNavigation();

  // useEffect(() => {
  //   const init = async () => {
  //     try {
  //       const loginuserid = await AsyncStorage.getItem('loginuser_id');
  //       const category = await AsyncStorage.getItem('category');

  //       if (!loginuserid) {
  //         navigation.navigate('Login');
  //       } else {
  //         setCreatorId(loginuserid);
  //       }

  //       if (category) {
  //         setCategory(category);
  //       }
  //     } catch (error) {
  //       console.error('Error retrieving user data:', error);
  //     }
  //   };

  //   init();
  // }, []);

  useEffect(() => {
    const init = async () => {
      try {
        const loginuserid = await AsyncStorage.getItem('loginuser_id');
        const category = await AsyncStorage.getItem('category');

        if (!loginuserid) {
          navigation.reset({
            index: 0,
            routes: [{name: 'Login'}],
          });
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
  const uploadVideo = async () => {
    if (!videoUri) {
      Alert.alert('Error', 'Please select a video first.');
      return;
    }

    const missingFields = [];
    if (!title) missingFields.push('Title');
    if (!description) missingFields.push('Description');
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
      navigation.replace('Main');
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
            <View className="">
              {/* <Text className="text-gray-600 mb-2">
                Selected Video Preview:
              </Text> */}

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
             <View className='flex-row items-center justify-center gap- border  border-primary bg-purple-50 rounded-lg my-3'>
                <Image  source={require("../assets/Images/right-click-arrow.png")} className='w-14 h-14 border border-primary'/>
                <Text className='text-primary text-base font-semibold'>Video Selected Successfully</Text>
              </View>
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
