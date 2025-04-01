import React, {useState} from 'react';
import {View, Text, TextInput, TouchableOpacity, Alert} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import BASE_URL from "../../config"

const UpdateProfileScreen = ({route}) => {
  const navigation = useNavigation();
  const {data} = route.params || {};


  const [userData, setUserData] = useState({
    name: data?.name || '',
    companyName: data?.companyName || '',
    website: data?.website || '',
    bio: data?.bio || '',
    topic: data?.topic || '',
  });
  
  const handleChange = (key, value) => {
    setUserData(prev => ({...prev, [key]: value}));
  };

  const updateProfile = async () => {
  const id = data?._id

    try {
      const response = await fetch(
        `${BASE_URL}/api/auth/update`,
        {
          method: 'PUT',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({ userId: id,...userData}),
        },
      );

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Failed to update');

      Alert.alert('Success', 'Profile updated successfully!');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <View className="flex-1 bg-white p-4">
      <Text className="text-xl font-bold mb-4">Update Profile</Text>

      <TextInput
        className="border border-secondary p-3 mb-4 text-base rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
        placeholder="Name"
        value={userData?.name}
        onChangeText={text => handleChange('name', text)}
      />

      <TextInput
        className="border border-secondary p-3 mb-4 text-base rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
        placeholder="Company Name"
        value={userData?.companyName}
        onChangeText={text => handleChange('companyName', text)}
      />

      <TextInput
        className="border border-secondary p-3 mb-4 text-base rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
        placeholder="Website"
        value={userData?.website}
        onChangeText={text => handleChange('website', text)}
      />

      <TextInput
        className="border border-secondary p-3 mb-4 text-base rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
        placeholder="Bio"
        value={userData.bio}
        onChangeText={text => handleChange('bio', text)}
      />

      <TextInput
        className="border border-secondary p-3 mb-4 text-base rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
        placeholder="Topic"
        value={userData.topic}
        onChangeText={text => handleChange('topic', text)}
      />

      <TouchableOpacity
        className="bg-primary p-3 rounded-md items-center"
        onPress={updateProfile}>
        <Text className="text-white font-bold">Update Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

export default UpdateProfileScreen;
