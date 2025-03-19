import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, Image } from 'react-native';

const ChatScreen = () => {
  const [messages, setMessages] = useState([
    { id: '1', text: 'Hey, how are you?', sender: 'other', time: '10:30 AM', reaction: null },
    { id: '2', text: "I'm good! How about you?", sender: 'me', time: '10:32 AM', reaction: null },
  ]);
  const [inputText, setInputText] = useState('');

  const sendMessage = () => {
    if (inputText.trim() === '') return;
    setMessages([...messages, { id: Date.now().toString(), text: inputText, sender: 'me', time: 'Now', reaction: null }]);
    setInputText('');
  };

  const addReaction = (id, reaction) => {
    setMessages(messages.map(msg => msg.id === id ? { ...msg, reaction } : msg));
  };

  return (
    <View className="flex-1 bg-purple-100 p-5">
      <Text className="text-3xl font-bold text-center text-purple-800 mb-4">Chat</Text>
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View className={`p-3 my-2 rounded-lg max-w-[75%] ${item.sender === 'me' ? 'self-end bg-purple-700' : 'self-start bg-white'}`}> 
            <Text className={`text-lg ${item.sender === 'me' ? 'text-white' : 'text-gray-800'}`}>{item.text}</Text>
            <View className="flex-row justify-between items-center mt-2">
              <Text className="text-xs text-gray-500">{item.time}</Text>
              <View className="flex-row space-x-2">
                <TouchableOpacity onPress={() => addReaction(item.id, 'heart')}>
                  <Image source={require('../assets/Images/heart.png')} style={{ width: 18, height: 18, tintColor: item.reaction === 'heart' ? 'red' : 'gray' }} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => addReaction(item.id, 'like')}>
                  <Image source={require('../assets/Images/thumb-up.png')} style={{ width: 18, height: 18, tintColor: item.reaction === 'like' ? 'blue' : 'gray' }} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => addReaction(item.id, 'dislike')}>
                  <Image source={require('../assets/Images/dislike.png')} style={{ width: 18, height: 18, tintColor: item.reaction === 'dislike' ? 'red' : 'gray' }} />
                </TouchableOpacity>
              </View>
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
        <TouchableOpacity onPress={sendMessage} className="bg-purple-700 p-3 rounded-lg ml-2">
          <Text className="text-white text-lg font-semibold">Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// export { ChatScreen };
export default ChatScreen;