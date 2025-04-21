import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  TextInput,
  Button,
  FlatList,
  Text,
  Image,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import io from 'socket.io-client';
import axios from 'axios';
import {launchImageLibrary} from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BASE_URL from '../../config';

const socket = io('http://localhost:5000'); // Replace with your machine's LAN IP

export default function ChatScreensPage({route}) {
  const currentUserId = 'currentUserId';

  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [userId, setUserID] = useState('');
  const flatListRef = useRef(null);
  const {brandid} = route.params;

  console.log('7777', brandid);
  console.log('7997', userId);

  useEffect(() => {
    const getLoginuserId = async () => {
      const id = await AsyncStorage.getItem('loginuser_id');
      setUserID(id);
    };

    getLoginuserId();
  }, []);

  useEffect(() => {
    socket.emit('registerUser', userId);

    socket.on('receiveMessage', data => {
      setMessages(prev => [...prev, data]);
    });

    fetchChatHistory();

    return () => {
      socket.disconnect();
    };
  }, []);

  const fetchChatHistory = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/chat/${userId}/${brandid}`);
      console.log(res,"response")
      setMessages(res.data);
    } catch (error) {
      console.error('Error fetching chat history:', error);
    }
  };

  const sendTextMessage = () => {
    if (!message.trim()) return;

    const newMsg = {
      senderId: userId,
      receiverId: brandid,
      text: message,
      type: 'text',
    };

    socket.emit('sendMessage', newMsg);
    setMessages(prev => [...prev, newMsg]);
    setMessage('');
  };

  const sendImage = async () => {
    try {
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        );
        if (granted !== PermissionsAndroid.RESULTS.GRANTED) return;
      }

      const result = await launchImageLibrary({mediaType: 'photo'});
      if (result.didCancel || !result.assets?.length) return;

      const file = result.assets[0];
      const formData = new FormData();
      formData.append('file', {
        uri: file.uri,
        type: file.type,
        name: file.fileName,
      });

      const uploadRes = await axios.post(
        'http://localhost:5000/upload',
        formData,
        {
          headers: {'Content-Type': 'multipart/form-data'},
        },
      );

      const newMsg = {
        senderId: userId,
        receiverId: brandid,
        text: uploadRes.data.url,
        type: 'image',
      };

      socket.emit('sendMessage', newMsg);
      setMessages(prev => [...prev, newMsg]);
    } catch (err) {
      console.error('Image upload error:', err);
    }
  };

  const renderMessage = ({item}) => {
    if (item.type === 'image') {
      return (
        <Image
          source={{uri: item.text}}
          style={{width: 200, height: 200, marginVertical: 10}}
        />
      );
    } else {
      return <Text style={{padding: 8}}>{item.text}</Text>;
    }
  };

  return (
    <View style={{flex: 1, padding: 10}}>
      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderMessage}
      />

      <TextInput
        value={message}
        onChangeText={setMessage}
        placeholder="Type your message"
        style={{
          borderWidth: 1,
          borderColor: '#ccc',
          marginVertical: 10,
          padding: 10,
          borderRadius: 8,
        }}
      />

      <Button title="Send Text" onPress={sendTextMessage} />
      <View style={{height: 10}} />
      <Button title="Send Image" onPress={sendImage} />
    </View>
  );
}
