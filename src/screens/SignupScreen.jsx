// import React, { useState } from 'react';
// import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
 
// import { useNavigation } from '@react-navigation/native';

// const SignupScreen = () => {
//   const [userType, setUserType] = useState('creator');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [username, setUsername] = useState('');
//   const [brandName, setBrandName] = useState('');
//   const [website, setWebsite] = useState('');
//   const navigation = useNavigation();

//   const handleSignup = async () => {
//     if (!email || !password || !username) {
//       Alert.alert('Error', 'Please fill in all required fields');
//       return;
//     }
//     try { 
//       Alert.alert('Success', 'Account created successfully');
//       navigation.navigate('Login');
//     } catch (error) {
//       Alert.alert('Signup Failed', error.message);
//     }
//   };

//   return (
//     <View className="flex-1 justify-center items-center px-5 bg-[#f8e7ff]">
//       <View className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-sm">
//         <Text className="text-3xl font-bold text-center mb-6 text-primary">Create an Account</Text>
//         <View className="flex-row justify-between mb-4">
//           <TouchableOpacity
//             className={`flex-1 p-3 rounded-[50px] mx-1 ${userType === 'creator' ? 'bg-primary' : 'bg-accent'}`}
//             onPress={() => setUserType('creator')}>
//             <Text className="text-white text-center font-semibold">Creator</Text>
//           </TouchableOpacity>
//           <TouchableOpacity
//             className={`flex-1 p-3 rounded-[50px] mx-1 ${userType === 'brand' ? 'bg-primary' : 'bg-accent'}`}
//             onPress={() => setUserType('brand')}>
//             <Text className="text-white text-center font-semibold">Brand</Text>
//           </TouchableOpacity>
//         </View>
//         <TextInput
//           className="w-full p-4 border border-gray-300 rounded-[50px] mb-4 text-lg"
//           placeholder='Email'
//           keyboardType='email-address'
//           value={email}
//           onChangeText={setEmail}
//         />
//         <TextInput
//           className="w-full p-4 border border-gray-300 rounded-[50px] mb-4 text-lg"
//           placeholder='Password'
//           secureTextEntry
//           value={password}
//           onChangeText={setPassword}
//         />
//         {userType === 'creator' ? (
//           <TextInput
//             className="w-full p-4 border border-gray-300 rounded-[50px] mb-4 text-lg"
//             placeholder='Username'
//             value={username}
//             onChangeText={setUsername}
//           />
//         ) : (
//           <>
//             <TextInput
//               className="w-full p-4 border border-gray-300 rounded-[50px] mb-4 text-lg"
//               placeholder='Brand Name'
//               value={brandName}
//               onChangeText={setBrandName}
//             />
//             <TextInput
//               className="w-full p-4 border border-gray-300 rounded-[50px] mb-4 text-lg"
//               placeholder='Website (optional)'
//               value={website}
//               onChangeText={setWebsite}
//             />
//           </>
//         )}
//         <TouchableOpacity
//           onPress={handleSignup}
//           className="bg-primary p-4 rounded-[50px] w-full items-center mb-4">
//           <Text className="text-white text-lg font-semibold">Sign Up</Text>
//         </TouchableOpacity>
//         <View className="flex-row justify-center">
//           <Text className="text-gray-600 text-lg">Already have an account? </Text>
//           <TouchableOpacity onPress={() => navigation.navigate('Login')}>
//             <Text className="text-primary text-lg font-semibold">Login</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </View>
//   );
// };

// export default SignupScreen;


import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import BASE_URL from "../../config"

const SignupScreen = () => {
  const [userType, setUserType] = useState('creator');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [brandName, setBrandName] = useState('');
  const [website, setWebsite] = useState('');
  const navigation = useNavigation();

  const handleSignup = async () => {
    if (!email || !password || (!username && userType === 'creator') || (!brandName && userType === 'brand')) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }
    
    const apiUrl = `${BASE_URL}/api/auth/signup`;
    const requestBody = userType === 'creator' ? {
      name: username,
      email,
      password,
      role: 'creator',
      topic: 'Music'
    } : {
      name: brandName,
      email,
      password,
      role: 'brand',
      topic: 'Music',
      companyName: brandName,
      website,
      bio: 'I will become a big brand'
    };
    
    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody)
      });
      
      const result = await response.json();
      if (response.ok) {
        Alert.alert('Success', 'Account created successfully');

        navigation.navigate('Login');
      } else {
        Alert.alert('Signup Failed', result.message || 'Something went wrong');
      }
    } catch (error) {
      Alert.alert('Signup Failed', error.message);
    }
  };

  return (
    <View className="flex-1 justify-center items-center px-5 bg-[#f8e7ff]">
      <View className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-sm">
        <Text className="text-3xl font-bold text-center mb-6 text-primary">Create an Account</Text>
        <View className="flex-row justify-between mb-4">
          <TouchableOpacity
            className={`flex-1 p-3 rounded-[50px] mx-1 ${userType === 'creator' ? 'bg-primary' : 'bg-accent'}`}
            onPress={() => setUserType('creator')}>
            <Text className="text-white text-center font-semibold">Creator</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className={`flex-1 p-3 rounded-[50px] mx-1 ${userType === 'brand' ? 'bg-primary' : 'bg-accent'}`}
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
          className="bg-primary p-4 rounded-[50px] w-full items-center mb-4">
          <Text className="text-white text-lg font-semibold">Sign Up</Text>
        </TouchableOpacity>
        <View className="flex-row justify-center">
          <Text className="text-gray-600 text-lg">Already have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text className="text-primary text-lg font-semibold">Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default SignupScreen;
