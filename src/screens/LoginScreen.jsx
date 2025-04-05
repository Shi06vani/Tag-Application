


import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import BASE_URL from "../../config"
import AsyncStorage from '@react-native-async-storage/async-storage';


const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter email and password');
      return;
    }
    try {
      const response = await fetch(`${BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
       console.log("logindata",data.token ,data.user.id ,data?.user?.topic)

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      Alert.alert('Success', 'Logged in successfully');
      navigation.replace('Main');
      await AsyncStorage.setItem('token',data?.token);
      await AsyncStorage.setItem('loginuser_id',data?.user?.id);
      await AsyncStorage.setItem('role',data?.user?.role);
      await AsyncStorage.setItem('category',data?.user?.topic);

    } catch (error) {
      Alert.alert('Login Failed', error.message);
    }
  };

  return (
    <View className="flex-1 justify-center items-center px-5 bg-purple-100">
      <View className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-sm">
        <Text className="text-3xl font-bold text-center mb-6 text-primary">Welcome Back</Text>
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
        <TouchableOpacity
          onPress={handleLogin}
          className="bg-primary p-4 rounded-[50px] w-full items-center mb-4">
          <Text className="text-white text-lg font-semibold">Login</Text>
        </TouchableOpacity>
        <View className="flex-row justify-center">
          <Text className="text-gray-600 text-lg">Don't have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
            <Text className="text-accent text-lg font-semibold">Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default LoginScreen;
