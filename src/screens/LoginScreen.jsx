import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  TouchableHighlight,
  TouchableWithoutFeedback,
  Image,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import BASE_URL from '../../config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from '../components/Header';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter email and password');
      return;
    }
    // try {
    //   const response = await fetch(`${BASE_URL}/api/auth/login`, {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({email, password}),
    //   });
    //   const data = await response.json();
    //   console.log('ddd', data.message);


    //   if (response.ok === "false") {
    //     Alert.alert('Failure', data.message);
    //   }

    //   Alert.alert('Success', 'Logged in successfully');
    //   navigation.replace('Main');
    //   await AsyncStorage.setItem('token', data?.token);
    //   await AsyncStorage.setItem('loginuser_id', data?.user?.id);
    //   await AsyncStorage.setItem('role', data?.user?.role);
    //   await AsyncStorage.setItem('category', data?.user?.topic);


    // } 
    try {
      const response = await fetch(`${BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
    
      const data = await response.json();
      console.log('Server response:', data);
    
      if (!response.ok) {
        Alert.alert('Failure', data.message || 'Login failed');
        return; // Stop further execution
      }
    
      // Success
      Alert.alert('Success', 'Logged in successfully');
    
      // Save credentials
      await Promise.all([
        AsyncStorage.setItem('token', data?.token),
        AsyncStorage.setItem('loginuser_id', data?.user?.id),
        AsyncStorage.setItem('role', data?.user?.role),
        // AsyncStorage.setItem('category', data?.user?.topic),
      ]);
    
      // Navigate to main screen
      navigation.replace('Main');
    } catch (error) {
      console.error('Login error:', error);
      Alert.alert('Login Failed', error.message);
    }
   
  };

  return (
    <View className="flex-1 justify-center items-center px-5 bg-purple-100">
      <View
        style={{position: 'absolute', top: 0, left: 0, right: 0, zIndex: 10}}>
        {/* <Header /> */}

        <View className="bg-white py-5 px-5 ">
          <TouchableOpacity
            onPress={() => navigation.navigate('Main')}
            className="flex-row items-center gap-5">
            <Image
              tintColor={''}
              source={require('../assets/Images/arrow-left.png')}
              className="w-5 h-5"
            />

            <Text className="font-medium text-gray-700 text-lg">Home</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-sm">
        <Text className="text-3xl font-bold text-center mb-6 text-primary">
          Welcome Back
        </Text>
        <TextInput
          className="w-full p-4 border border-gray-300 rounded-[50px] mb-4 text-lg"
          placeholder="Email"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          className="w-full p-4 border border-gray-300 rounded-[50px] mb-4 text-lg"
          placeholder="Password"
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
        <View className="w-full items-end mt-3">
          <TouchableOpacity
            onPress={() => navigation.navigate('Forget-Password')}>
            <Text className="text-sm text-primary font-semibold underline cursor-pointer">
              Forget password?
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default LoginScreen;
