import React, { useEffect, useState } from 'react';
import {View, Image, TouchableOpacity, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Header = () => {
    const navigation = useNavigation();
    const [isLoggedIn, setIsLoggedIn] = useState(false); // Add this state to track login status

    useEffect(() => {
      checkUserLoginStatus(); // Add a function to check login status
    }, []);


    const checkUserLoginStatus = () => {
    
      AsyncStorage.getItem('token')
        .then(token => {
          if (token) {
            setIsLoggedIn(true);
          } else {
            setIsLoggedIn(false);
          }
        })
        .catch(err => console.error('Error checking auth status:', err));
      
    };
  
  return (
    <View className="flex flex-row justify-between items-center py-3 px-[15px]  border-b-2  border-b-[#ECECEC] bg-white ">
      <TouchableOpacity onPress={()=> navigation.replace("Main")}>
      <View className="flex flex-row gap-2 items-center justify-center shadow-lg">
        <Image
          source={require('../assets/Images/Transparent-logo.png')}
          className="w-10 h-10"
        />
        <Text className="text-xl font-bold font-serif text-[#441752]">Tag</Text>
      </View>
      </TouchableOpacity>
      

      <View className="flex flex-row items-center gap-4">
        {/* <TouchableOpacity>
          <Image
            source={require('../assets/Images/cast1.png')}
            className="w-6 h-6"
          />
        </TouchableOpacity> */}
        {!isLoggedIn && (
        <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
          <Text className='text-xs bg-primary rounded-full px-3 py-1 text-white font-semibold'>Signup</Text>
        </TouchableOpacity>
      )}
        <TouchableOpacity onPress={()=> navigation.navigate("User-Chatlist")}>
          <Image
            source={require('../assets/Images/chat-icon.png')}
            className="w-6 h-6"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Header;
