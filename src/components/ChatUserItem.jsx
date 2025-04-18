// components/ChatUserItem.js
import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';

const ChatUserItem = ({ user, onPress }) => {
  return (
    <TouchableOpacity
      className="flex-row items-center px-4 py-3 border-b border-gray-200"
      onPress={onPress}
    >
      <Image
        source={{ uri: user.profileImage }}
        className="w-12 h-12 rounded-full mr-3"
      />
      <View className="flex-1">
        <Text className="text-base font-semibold text-black">{user.name}</Text>
        <Text className="text-sm text-gray-500">{user.lastMessage}</Text>
      </View>
      <Text className="text-xs text-gray-400">{user.time}</Text>
    </TouchableOpacity>
  );
};

export default ChatUserItem;
