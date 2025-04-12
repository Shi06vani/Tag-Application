import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';
import BASE_URL from '../../config';
import { useNavigation } from '@react-navigation/native';

const ForgetPassword = () => {
  const [email, setEmail] = useState('');
  const navigation = useNavigation()
  const handleSubmit = async () => {
    if (!email) {
      Alert.alert("Please enter your email");
      return;
    }

    try {
      const response = await axios.post(`${BASE_URL}/api/auth/forgot-password`, {
        email: email,
      });
      console.log("0000",response)

      Alert.alert("Success", response?.data?.message);
      setEmail("")
      navigation.navigate("Login")
    } catch (error) {
      console.error(error);
      Alert.alert("Error", error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <View className="flex-1 py-10 bg-white px-5">
      <Text className="text-xl font-semibold text-center mb-6">Forgot Password</Text>

      <TextInput
        placeholder="Enter your email"
        value={email}
        onChangeText={setEmail}
        className="border border-gray-300 rounded-lg p-4 text-base mb-4"
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TouchableOpacity className="bg-primary rounded-lg p-3" onPress={handleSubmit}>
        <Text className="text-white text-center text-base font-medium">Send Reset Link</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ForgetPassword;
