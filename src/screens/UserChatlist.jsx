// screens/ChatUsersList.js
import React, {useEffect, useState} from 'react';
import {ActivityIndicator, FlatList, Text, View} from 'react-native';
import ChatUserItem from '../components/ChatUserItem';
import {getChatBetweenUsers, getUserChatList} from '../api/chat/Chat';
import AsyncStorage from '@react-native-async-storage/async-storage';



const UserChatlist = ({navigation}) => {
  const [chatData, setChatData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState('');

  const renderItem = ({item}) => (
    <ChatUserItem
      user={item}
      onPress={() => navigation.navigate('Chat', {brandid:item._id,user: item})}
    />
  );

  useEffect(() => {
    const fetchUserId = async () => {
      const id = await AsyncStorage.getItem('loginuser_id');
      setUserId(id);
    };

    fetchUserId();
  }, []);

  useEffect(() => {
    const fetchChat = async () => {
      const userId = await AsyncStorage.getItem('loginuser_id');
      console.log(userId, 'userId,,,,,');

      
      try {
        const data = await getUserChatList(userId);
        setChatData(data);

        console.log("chatlistdata",data)
      } catch (err) {
        console.log('Failed to load chat:', err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchChat();
  }, [userId]);

  if (loading) {
    return (
      <ActivityIndicator
        size="large"
        color="#441752"
        className="flex-1 justify-center items-center"
      />
    );
  }

  console.log(chatData, 'setChatData');

  return (
    <View className="flex-1 bg-purple-50 pt-4">
      <FlatList
        data={chatData}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        ListEmptyComponent={
          <Text className="text-center text-gray-500 mt-10">No chats yet.</Text>
        }
      />
    </View>
  );
};

export default UserChatlist;
