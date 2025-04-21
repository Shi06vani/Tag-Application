// components/ChatUserItem.js
import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';

const ChatUserItem = ({user, onPress}) => {
  return (
    <TouchableOpacity
      className="flex-row items-center px-4 py-3 border-b border-gray-200"
      onPress={onPress}>
      <Image
        source={
          user?.image
            ? {uri: user?.image}
            : require('../assets/Images/default-image.png')
        }
        className="w-10 h-10 rounded-full mr-3"
      />
      <View className="flex-1">
        <Text className="text-base font-semibold text-black">{user.name}</Text>
        <Text className="text-sm text-gray-500">{user.lastMessageText}</Text>
      </View>
      <Text className="text-xs text-gray-400">
        {new Date(user.lastMessageTime).toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        })}
      </Text>
    </TouchableOpacity>
  );
};

export default ChatUserItem;
