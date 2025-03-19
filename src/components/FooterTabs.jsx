import React, { useState } from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';

const footerTabs = [
  {
    logo: require('../assets/Images/home.png'),
    darklogo: require('../assets/Images/home-dark.png'),
    tabname: 'Home',
  },
  {
    logo: require('../assets/Images/home.png'),
    darklogo: require('../assets/Images/home-dark.png'),
    tabname: 'Shorts',
  },
  {
    logo: require('../assets/Images/home.png'),
    darklogo: require('../assets/Images/home-dark.png'),
    tabname: 'Subscription',
  },
  {
    logo: require('../assets/Images/home.png'),
    darklogo: require('../assets/Images/home-dark.png'),
    tabname: 'User',
  },
];

const FooterTabs = ({navigation}) => {
  console.warn(navigation)
  const [activeTab, setActiveTab] = useState('Home');

  const handeRouting = tab => {
    setActiveTab(tab);
    navigation.navigate(tab);
  };

  return (
    <View className="flex flex-row justify-around bg-white py-4  ">
      {footerTabs.map((tabs, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => handeRouting(tabs.tabname)}>
          <View className="" key={index}>
            <View className="flex justify-center items-center">
              <Image
                source={activeTab === tabs.tabname ? tabs.darklogo : tabs.logo}
                alt="image"
                className="w-6 h-6 object-cover"
              />
            </View>
            <Text
              className={
                activeTab === tabs.tabname ? 'text-[#1437B7]' : 'text-[#646464]'
              }>
              {tabs.tabname}
            </Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default FooterTabs;
