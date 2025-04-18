import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
  ScrollView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import BASE_URL from '../../config';
import {launchImageLibrary} from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
const UpdateProfileScreen = ({route}) => {
  const navigation = useNavigation();
  const {data} = route.params || {};
  const [selectedImage, setSelectedImage] = useState(null);
  const [role, setRole] = useState('');

  useEffect(() => {
    const getRole = async () => {
      const role = await AsyncStorage.getItem('role');
      if (role) {
        setRole(role);
      } else {
        Alert.alert('role not Found');
      }
    };
    getRole();
  }, []);

  const pickImage = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        quality: 0.8,
      },
      response => {
        if (response.assets && response.assets.length > 0) {
          setSelectedImage(response.assets[0]);
        }
      },
    );
  };

  const [userData, setUserData] = useState({
    name: data?.name || '',
    companyName: data?.companyName || '',
    website: data?.website || '',
    bio: data?.bio || '',
    // topic: data?.topic || '',
    email: data?.email || '',
  });

  const handleChange = (key, value) => {
    setUserData(prev => ({...prev, [key]: value}));
  };

  const updateProfile = async () => {
    const id = data?._id;
    console.log('id', id);
    if (!id) {
      console.log('id not found');
    }

    if (!selectedImage) {
      Alert.alert('Please select an image');
      return;
    }
    if (
      !userData?.name ||
      !userData?.email ||
      !userData?.bio
      
    ) {
      Alert.alert('Please fill out all required fields');
      return;
    }
    if (role === 'brand') {
      if (!userData?.companyName || !userData?.website) {
        Alert.alert(
          'Please fill out both companyName and website for Brand profile.',
        );
        return;
      }
    }

    const formData = new FormData();

    formData.append('userId', id);
    formData.append('name', userData?.name);
    formData.append('email', userData?.email);
    formData.append('bio', userData?.bio);

    formData.append('image', {
      uri: selectedImage.uri,
      type: selectedImage.type || 'image/jpeg',
      name: selectedImage.fileName || 'photo.jpg',
    });

    if (role === 'brand') {
      formData.append('companyName', userData?.companyName);
      formData.append('website', userData?.website);
    }

    try {
      const response = await axios.put(
        `${BASE_URL}/api/auth/update`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );
      console.log(response.data.user.image, 'updat profile data');

      if (!response) throw new Error(data.message || 'Failed to update');
      Alert.alert('Success', response.data.message);
      navigation.goBack();
    } catch (error) {
      Alert.alert('error', error.message);

      console.log('Error', error.message);
    }
  };

  return (
    <ScrollView className='flex-1 bg-white'>
      <View className=" p-6">
        <View className="mb-5 flex justify-center items-center">
          <TouchableOpacity
            onPress={pickImage}
            className="border-2 border-dashed border-primary rounded-full w-40 bg-purple-50 h-40 items-center justify-center overflow-hidden">
            {selectedImage ? (
              <Image
                source={{uri: selectedImage.uri}}
                className="w-40 h-40 rounded-full"
                resizeMode="cover"
              />
            ) : (
              <View className="flex-col items-center gap-2">
                <Image
                  tintColor={'#441752'}
                  className="w-12 h-12"
                  source={require('../assets/Images/camera.png')}
                />
                <Text className="text-primary text-sm font-medium">
                  Tap to select image
                </Text>
              </View>
            )}
          </TouchableOpacity>
          <Text className="text-xl text-primary font-bold my-4 text-center">
            Select Image
          </Text>
        </View>
        <Text className="text-primary mb-1 text-base font-semibold">Name</Text>
        <TextInput
          className="border-2 border-secondary p-3 shadow-xl mb-4 text-base rounded-full focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="Name"
          value={userData?.name}
          onChangeText={text => handleChange('name', text)}
        />
        <Text className="text-primary mb-2 text-base font-semibold">Email</Text>
        <TextInput
          className="border-2 border-secondary p-3 shadow-xl mb-4 text-base rounded-full focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="Email"
          value={userData?.email}
          onChangeText={text => handleChange('email', text)}
        />
        {/* <Text className="text-primary mb-2 text-base font-semibold">Topic</Text>
        <TextInput
          className="border-2 border-secondary p-3 shadow-xl mb-4 text-base rounded-full focus:outline-none focus:ring-1 focus:ring-primary"
          placeholder="Topic"
          value={userData.topic}
          onChangeText={text => handleChange('topic', text)}
        /> */}
        <Text className="text-primary mb-2 text-base font-semibold">Bio</Text>

        <TextInput
          className="border-2 border-secondary p-3 shadow-xl mb-4 text-base rounded-full focus:outline-none focus:ring-1 focus:ring-primary"
          placeholder="Bio"
          value={userData?.bio}
          onChangeText={text => handleChange('bio', text)}
        />

        {role === 'brand' && (
          <View>
            <Text className="text-primary mb-2 text-base font-semibold">
              Company Name
            </Text>

            <TextInput
              className="border-2 border-secondary p-3 shadow-xl mb-4 text-base rounded-full focus:outline-none focus:ring-1 focus:ring-primary"
              placeholder="Company Name"
              value={userData?.companyName}
              onChangeText={text => handleChange('companyName', text)}
            />
            <Text className="text-primary mb-2 text-base font-semibold">
              website{' '}
            </Text>

            <TextInput
              className="border-2 border-secondary p-3 shadow-xl mb-4 text-base rounded-full focus:outline-none focus:ring-1 focus:ring-primary"
              placeholder="Website"
              value={userData?.website}
              onChangeText={text => handleChange('website', text)}
            />
          </View>
        )}

        <TouchableOpacity
          className="bg-primary p-3 rounded-md items-center my-4"
          onPress={updateProfile}>
          <Text className="text-white font-bold">Update Profile</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default UpdateProfileScreen;
