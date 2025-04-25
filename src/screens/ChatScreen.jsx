import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, Image } from 'react-native';
import { sendChatMessage } from '../api/chat/Chat';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import BASE_URL from '../../config';

const ChatScreen = ({ route }) => {
  const { brandid } = route.params;
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [userid, setUserId] = useState('');


  useEffect(() => {
    const fetchUserId = async () => {
      const id = await AsyncStorage.getItem('loginuser_id');
      setUserId(id);
    };
    fetchUserId();
  }, []);
  
  useEffect(() => {
    if (userid && brandid) {
      fetchChatMessages();
    }
  }, [userid, brandid]);
  

  const fetchChatMessages = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/chat/${userid}/${brandid}`);
      const data = response.data.map(item => ({
        id: item._id,
        text: item.text,
        sender: item.senderId === userid ? 'me' : 'other',
        time: new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        reaction: null,
      }));
      setMessages(data);
    } catch (error) {
      console.log('Failed to fetch chat:', error);
    }
  };

  

  // ✅ Send message and update list
  const sendMessage = async () => {
    if (!inputText.trim()) return;
  
    try {
      const messageData = {
        senderId: userid,              // Your sender's user ID
        receiverId: brandid,           // Receiver's ID
        text: inputText,               // The actual message
        type: "text"
      };
  
      console.log("Sending message:", messageData);
  
      // Send to backend
      const response = await axios.post(`${BASE_URL}/chat/send`, messageData, {
        headers: {
          'Content-Type': 'application/json',
        }
      });
  
      console.log('Message sent successfully:', response.data);
  
      // Optional: Update UI (if you're managing a message list locally)
      const newMessage = {
        ...response.data,
        sender: 'me',
        time: 'Now', // or format new Date()
        reaction: null,
      };
  
      setMessages(prev => [...prev, newMessage]); // only if using setMessages
      setInputText(''); // Clear input
    } catch (error) {
      console.error('Failed to send message:', error.response?.data || error.message);
    }
  };
  

  const addReaction = (id, reaction) => {
    setMessages(prev =>
      prev.map(msg => (msg.id === id ? { ...msg, reaction } : msg))
    );
  };

  return (
    <View className="flex-1 bg-purple-50 p-5">
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View className={`p-3 my-2 rounded-lg max-w-[75%] ${item.sender === 'me' ? 'self-end bg-primary' : 'self-start bg-white'}`}>
            <Text className={`text-lg ${item.sender === 'me' ? 'text-white' : 'text-gray-800'}`}>{item.text}</Text>
            <View className="flex-row justify-between items-center mt-2">
              <Text className="text-xs text-gray-500">{item.time}</Text>
              {/* <View className="flex-row space-x-2">
                <TouchableOpacity onPress={() => addReaction(item.id, 'heart')}>
                  <Image source={require('../assets/Images/heart.png')} style={{ width: 18, height: 18, tintColor: item.reaction === 'heart' ? 'red' : 'gray' }} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => addReaction(item.id, 'like')}>
                  <Image source={require('../assets/Images/thumblike.png')} style={{ width: 18, height: 18, tintColor: item.reaction === 'like' ? 'blue' : 'gray' }} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => addReaction(item.id, 'dislike')}>
                  <Image source={require('../assets/Images/dislike.png')} style={{ width: 18, height: 18, tintColor: item.reaction === 'dislike' ? 'red' : 'gray' }} />
                </TouchableOpacity>
              </View> */}
            </View>
          </View>
        )}
      />

      <View className="flex-row items-center p-3 bg-white rounded-lg shadow-md mt-3">
        <TextInput
          className="flex-1 p-3 border border-purple-300 rounded-lg text-lg"
          placeholder="Type a message..."
          value={inputText}
          onChangeText={setInputText}
        />
        <TouchableOpacity onPress={sendMessage} className="bg-primary p-3 rounded-lg ml-2">
          <Text className="text-white text-lg font-semibold">Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ChatScreen;
