import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
 
import { useNavigation } from '@react-navigation/native';

const SignupScreen = () => {
  const [userType, setUserType] = useState('creator');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [brandName, setBrandName] = useState('');
  const [website, setWebsite] = useState('');
  const navigation = useNavigation();

  const handleSignup = async () => {
    if (!email || !password || !username) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }
    try { 
      Alert.alert('Success', 'Account created successfully');
      navigation.navigate('Login');
    } catch (error) {
      Alert.alert('Signup Failed', error.message);
    }
  };

  return (
    <View className="flex-1 justify-center items-center px-5 bg-purple-100">
      <View className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-sm">
        <Text className="text-3xl font-bold text-center mb-6 text-purple-800">Create an Account</Text>
        <View className="flex-row justify-between mb-4">
          <TouchableOpacity
            className={`flex-1 p-3 rounded-[50px] mx-1 ${userType === 'creator' ? 'bg-purple-600' : 'bg-gray-300'}`}
            onPress={() => setUserType('creator')}>
            <Text className="text-white text-center font-semibold">Creator</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className={`flex-1 p-3 rounded-[50px] mx-1 ${userType === 'brand' ? 'bg-purple-600' : 'bg-gray-300'}`}
            onPress={() => setUserType('brand')}>
            <Text className="text-white text-center font-semibold">Brand</Text>
          </TouchableOpacity>
        </View>
        <TextInput
          className="w-full p-4 border border-gray-300 rounded-[50px] mb-4 text-lg"
          placeholder='Email'
          keyboardType='email-address'
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          className="w-full p-4 border border-gray-300 rounded-[50px] mb-4 text-lg"
          placeholder='Password'
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        {userType === 'creator' ? (
          <TextInput
            className="w-full p-4 border border-gray-300 rounded-[50px] mb-4 text-lg"
            placeholder='Username'
            value={username}
            onChangeText={setUsername}
          />
        ) : (
          <>
            <TextInput
              className="w-full p-4 border border-gray-300 rounded-[50px] mb-4 text-lg"
              placeholder='Brand Name'
              value={brandName}
              onChangeText={setBrandName}
            />
            <TextInput
              className="w-full p-4 border border-gray-300 rounded-[50px] mb-4 text-lg"
              placeholder='Website (optional)'
              value={website}
              onChangeText={setWebsite}
            />
          </>
        )}
        <TouchableOpacity
          onPress={handleSignup}
          className="bg-purple-600 p-4 rounded-[50px] w-full items-center mb-4">
          <Text className="text-white text-lg font-semibold">Sign Up</Text>
        </TouchableOpacity>
        <View className="flex-row justify-center">
          <Text className="text-gray-600 text-lg">Already have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text className="text-purple-600 text-lg font-semibold">Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default SignupScreen;

