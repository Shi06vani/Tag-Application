// screens/ChatUsersList.js
import React from 'react';
import { FlatList, Text, View } from 'react-native';
import ChatUserItem from '../components/ChatUserItem';

const users = [
  {
    id: '1',
    name: 'Alice Johnson',
    lastMessage: 'Hey, how are you?',
    time: '2:15 PM',
    profileImage: 'https://randomuser.me/api/portraits/women/1.jpg',
  },
  {
    id: '2',
    name: 'Bob Smith',
    lastMessage: 'Let’s meet tomorrow.',
    time: '12:05 PM',
    profileImage: 'https://randomuser.me/api/portraits/men/2.jpg',
  },
  {
    id: '3',
    name: 'Emma Watson',
    lastMessage: 'Got it, thanks!',
    time: '9:30 AM',
    profileImage: 'https://randomuser.me/api/portraits/women/3.jpg',
  },
];

const UserChatlist = ({ navigation }) => {
  const renderItem = ({ item }) => (
    <ChatUserItem
      user={item}
      onPress={() => navigation.navigate('Chat', { user: item })}
    />
  );

  return (
    <View className="flex-1 bg-purple-50 pt-4">
      <FlatList
        data={users}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListEmptyComponent={<Text className="text-center text-gray-500 mt-10">No chats yet.</Text>}
      />
    </View>
  );
};

export default UserChatlist;
