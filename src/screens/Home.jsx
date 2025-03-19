import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import TagList from '../components/Home/TagList.jsx';
import Shorts from '../components/Home/HomeShorts.jsx';
import HomeShorts from '../components/Home/HomeShorts.jsx';
import Header from '../components/Header.jsx';
const Home = () => {
  return (
    <View className=" bg-white">
        {/* <Header /> */}
      <View className="flex flex-row items-center p-3">
        <View className="  border-r-2 border-r-[#ECECEC] px-3">
          <Text className="text-sm font-medium  text-[#000000] p-2 rounded-lg bg-[#ECECEC] border-gray-300">
            Explore
          </Text>
        </View>
        <TagList />
      </View>
      <View>
        <Image
          source={require('../assets/Images/heart-touching.png')}
          className="w-full"
        />
        <View className="flex flex-row justify-between pb-5 border-b-8 border-[#ECECEC] pt-[14px] px-3">
          <TouchableOpacity>
            <Image source={require('../assets/Images/user.png')} />
          </TouchableOpacity>
          <View className="flex flex-col gap-1">
            <Text className="text-sm font-medium text-[#0A0A0A]">
              The Beauty of Existence - Heart Touching Nasheed
            </Text>
            <Text className="text-[#6C6C6C] text-xs font-medium">
              19,210,251 viewsJul • 1, 2016
            </Text>
          </View>
          <TouchableOpacity>
            <Image source={require('../assets/Images/more.png')} />
          </TouchableOpacity>
        </View>
      </View>
      <View>
        <HomeShorts />
      </View>
    </View>
  );
};

export default Home;
