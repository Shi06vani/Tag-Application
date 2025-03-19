import React from 'react';
import { View, Text, ScrollView, Image } from 'react-native';

const creators = [
  { name: 'John Doe', points: 1200, followers: 50, profilePic: '../assets/Images/user.png' },
  { name: 'Jane Smith', points: 1100, followers: 45, profilePic: '../assets/Images/user.png' },
  { name: 'Alex Johnson', points: 1050, followers: 40, profilePic: '../assets/Images/user.png' },
  { name: 'Chris Brown', points: 980, followers: 35, profilePic: '../assets/Images/user.png' },
  { name: 'Emma Wilson', points: 950, followers: 30, profilePic: '../assets/Images/user.png' },
  { name: 'John Doe', points: 1200, followers: 50, profilePic: '../assets/Images/user.png' },
  { name: 'Jane Smith', points: 1100, followers: 45, profilePic: '../assets/Images/user.png' },
  { name: 'Alex Johnson', points: 1050, followers: 40, profilePic: '../assets/Images/user.png' },
  { name: 'Chris Brown', points: 980, followers: 35, profilePic: '../assets/Images/user.png' },
  { name: 'Emma Wilson', points: 950, followers: 30, profilePic: '../assets/Images/user.png' },
  { name: 'Emma Wilson', points: 950, followers: 30, profilePic: '../assets/Images/user.png' },
  { name: 'John Doe', points: 1200, followers: 50, profilePic: '../assets/Images/user.png' },
  { name: 'Jane Smith', points: 1100, followers: 45, profilePic: '../assets/Images/user.png' },
  { name: 'Alex Johnson', points: 1050, followers: 40, profilePic: '../assets/Images/user.png' },
  { name: 'Chris Brown', points: 980, followers: 35, profilePic: '../assets/Images/user.png' },
  { name: 'Emma Wilson', points: 950, followers: 30, profilePic: '../assets/Images/user.png' },
];

// based on followers of creator , we will decide its points in Leaderboard
const Leaderboard = () => {
  return (
    <View className="flex-1 bg-purple-100 p-[15px]">
      <Text className="text-4xl font-bold text-center text-primary mb-4">Top Creators</Text>
      <ScrollView className="bg-white rounded-lg shadow-lg py-3 px-3 flex-1">
        {creators.map((creator, index) => (
          <View key={index} className="flex-row items-center justify-between p-2 border-b border-purple-300">
            <View className="flex-row items-center">
              <Image source={require(`../assets/Images/user.png`)} className="w-12 h-12 rounded-full mr-4" />
              <View>
                <Text className="text-xl font-semibold text-primary">{index + 1}. {creator.name}</Text>
                <Text className="text-md text-secondary">{creator.followers}K Followers</Text>
              </View>
            </View>
            <Text className="text-xl font-bold text-purple-900">{creator.points} pts</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default Leaderboard;
