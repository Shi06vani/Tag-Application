import React from 'react';
import { View,Image, TouchableOpacity, Text } from 'react-native';

const Header = () => {
  return (
    <View className="flex flex-row justify-between py-4 px-[10px]  bg-white ">
      <View className='flex flex-row gap-2 items-center justify-center'>
      <Image source={require('../assets/Images/logo.jpg')} className="w-7 h-7" />
      <Text className='text-xl font-bold font-serif text-[#441752]'>Tag</Text>
      </View>
   
    <View className="flex flex-row gap-4">
      <TouchableOpacity>
        <Image
          source={require('../assets/Images/cast1.png')}
          className="w-6 h-6"
        />
      </TouchableOpacity>
      <TouchableOpacity>
        <Image
          source={require('../assets/Images/bell1.png')}
          className="w-6 h-6"
        />
      </TouchableOpacity>
      <TouchableOpacity>
        <Image
          source={require('../assets/Images/search1.png')}
          className="w-6 h-6"
        />
      </TouchableOpacity>
    </View>
  </View>
  );
};


export default Header;