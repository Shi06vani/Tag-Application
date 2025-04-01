import React from 'react';
import {View, Image, TouchableOpacity, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const Header = () => {
    const navigation = useNavigation();
  
  return (
    <View className="flex flex-row justify-between py-4 px-[10px]  border-b-4  border-b-[#ECECEC] bg-white ">
      <TouchableOpacity onPress={()=> navigation.replace("Main")}>
      <View className="flex flex-row gap-2 items-center justify-center">
        <Image
          source={require('../assets/Images/logo.jpg')}
          className="w-7 h-7"
        />
        <Text className="text-xl font-bold font-serif text-[#441752]">Tag</Text>
      </View>
      </TouchableOpacity>
      

      <View className="flex flex-row gap-4">
        {/* <TouchableOpacity>
          <Image
            source={require('../assets/Images/cast1.png')}
            className="w-6 h-6"
          />
        </TouchableOpacity> */}
        <TouchableOpacity onPress={()=> navigation.navigate("Signup")}>
          <Text className='text-xs bg-primary rounded-full px-3 py-1 text-white font-semibold'>Signup</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=> navigation.navigate("Chat")}>
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
