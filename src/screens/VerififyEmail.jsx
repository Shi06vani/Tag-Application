import React, {useState} from 'react';
import {View, Text, TextInput, TouchableOpacity, Alert} from 'react-native';
import axios from 'axios';
import BASE_URL from '../../config';
import {useNavigation} from '@react-navigation/native';

const VerifyEmail = () => {
  const [email, setEmail] = useState('');
  const navigation = useNavigation();
  const handleResendVerification = async () => {
    if (!email) {
      Alert.alert('Error', 'Please enter your email address.');
      return;
    }

    try {
      const response = await axios.post(
        `${BASE_URL}/api/auth/resend-verification`,
        {
          email: email,
        },
      );

      if (response.data.success) {
        Alert.alert('Success', 'Verification email has been sent.');
        navigation.navigate('Login');
      } else {
        Alert.alert(
          'Failed',
          response.data.message || 'Failed to send verification email.',
        );
      }
    } catch (error) {
      console.error(error);
      Alert.alert(
        'Error',
        error?.response?.data?.message || 'Something went wrong.',
      );
    }
  };

  return (
    <View className="flex-1 py-10 px-6 bg-white">
      <Text className="text-xl font-bold mb-6 text-primary">
        Verify Your Email
      </Text>

      <TextInput
        className="w-full border border-gray-300 rounded-lg p-3 text-base mb-6"
        placeholder="Enter your email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TouchableOpacity
        onPress={handleResendVerification}
        className="bg-primary w-full py-3 rounded-full items-center">
        <Text className="text-white text-base font-semibold">
          Send Verification Email
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default VerifyEmail;
